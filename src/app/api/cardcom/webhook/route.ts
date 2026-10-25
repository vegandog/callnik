import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'
import { findAvailableIsraeliNumber, orderIsraeliNumber } from '@/lib/telnyx'

const CARDCOM_TERMINAL = 190666
const CARDCOM_API_NAME = 'sAwPXwN5jjRPhSKn5NRn'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function dbGet(table: string, filter: string, columns: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}&select=${columns}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  const data = await res.json()
  return Array.isArray(data) ? data[0] : null
}

async function dbPost(table: string, body: Record<string, unknown>) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function dbPatch(table: string, filter: string, body: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  const rawText = await req.text()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = {}
  try {
    data = JSON.parse(rawText)
  } catch {
    const params = new URLSearchParams(rawText)
    params.forEach((v, k) => { data[k] = v })
  }

  if (data.ResponseCode !== 0) {
    return new NextResponse('-1', { headers: { 'Content-Type': 'text/plain' } })
  }

  const parts = (data.ReturnValue || '').split(':')
  const customerId = parts[0]
  const plan = parts[1]
  // Format: customerId:billingPlan:tier[:intro|:promo:promoId]
  // Backwards compat: old format was customerId:billingPlan[:intro|:promo:promoId]
  const hasTier = parts[2] === 'basic' || parts[2] === 'pro'
  const tierVal: 'basic' | 'pro' = hasTier ? (parts[2] as 'basic' | 'pro') : 'basic'
  const p3 = hasTier ? parts[3] : parts[2]
  const promoCodeId = p3 === 'promo' ? (hasTier ? parts[4] : parts[3]) || null : null
  const isIntro = p3 === 'intro'

  if (!customerId) return NextResponse.json({ ok: false })

  // Mark promo code as used
  if (promoCodeId) {
    const promoUser = await dbGet('users', `customer_id=eq.${customerId}`, 'id')
    await dbPatch('promo_codes', `id=eq.${promoCodeId}`, {
      used_at: new Date().toISOString(),
      used_by: promoUser?.id || null,
    })
  }

  // Fetch customer (including fields needed for activation email + telnyx check)
  const customer = await dbGet('customers', `id=eq.${customerId}`, 'pending_lp_id,business_name,carrier,voice_id,telnyx_number')
  const lowProfileId = customer?.pending_lp_id

  let token: string | null = null
  let cardMonth: string | null = null
  let cardYear: string | null = null
  let tokenExDate: string | null = null
  let lpTransactionId: number | null = null
  let lpDocumentNumber: number | null = null
  let lpDocumentUrl: string | null = null

  if (lowProfileId) {
    try {
      const lpRes = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/GetLpResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TerminalNumber: CARDCOM_TERMINAL, ApiName: CARDCOM_API_NAME, LowProfileId: lowProfileId }),
      })
      const lpData = await lpRes.json()
      if (lpData.ResponseCode === 0 && lpData.TokenInfo?.Token) {
        token = lpData.TokenInfo.Token
        cardMonth = String(lpData.TokenInfo.CardMonth || lpData.UIValues?.CardMonth || '')
        cardYear = String(lpData.TokenInfo.CardYear || lpData.UIValues?.CardYear || '')
        tokenExDate = lpData.TokenInfo.TokenExDate || null
        lpTransactionId = lpData.TranzactionId || null
        lpDocumentNumber = lpData.DocumentNumber || null
        lpDocumentUrl = lpData.DocumentUrl || null
      }
    } catch (e) {
      console.error('GetLpResult error:', e)
    }
  }

  const now = new Date()
  const nextBilling = plan === 'annual'
    ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())

  const monthlyBase = tierVal === 'pro' ? 234.82 : 116.82  // ₪199 or ₪99 + 18% VAT
  const annualBase  = tierVal === 'pro' ? 2348.20 : 1118.64 // ₪1990 or ₪948 + 18% VAT
  const tierLabel   = tierVal === 'pro' ? 'Pro' : 'Basic'
  const firstPaymentAmount = plan === 'annual' ? annualBase : plan === 'test' ? 1 : promoCodeId ? 1 : isIntro ? 34.22 : monthlyBase
  const firstPaymentLabel = plan === 'annual'
    ? `מנוי Callnik ${tierLabel} שנתי - callnik.com`
    : plan === 'test'
    ? 'טסט Callnik - callnik.com'
    : promoCodeId
    ? `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון ב-₪1 (קופון)`
    : isIntro
    ? `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון ₪34.22 כולל מע"מ | מחודש שני: ₪${monthlyBase} כולל מע"מ`
    : `מנוי Callnik ${tierLabel} חודשי - callnik.com | ₪${monthlyBase} לחודש כולל מע"מ`

  await dbPost('billing_history', {
    customer_id: customerId,
    amount: firstPaymentAmount,
    cardcom_transaction_id: lpTransactionId,
    cardcom_document_number: lpDocumentNumber,
    document_url: lpDocumentUrl,
    plan: plan === 'test' ? 'monthly' : plan || 'monthly',
    description: firstPaymentLabel,
  })

  await dbPatch('customers', `id=eq.${customerId}`, {
    status: 'active',
    cardcom_token: token || null,
    card_month: cardMonth || null,
    card_year: cardYear || null,
    token_expiry: tokenExDate ? parseExpiry(tokenExDate) : null,
    plan: (plan === 'test' ? 'monthly' : plan) || 'monthly',
    tier: tierVal,
    next_billing_date: token ? nextBilling.toISOString().split('T')[0] : null,
    billing_failures: 0,
    pending_lp_id: null,
  })

  // Auto-provision Telnyx number (skip if already assigned)
  if (!customer?.telnyx_number) {
    try {
      const phoneNumber = await findAvailableIsraeliNumber()
      if (phoneNumber) {
        const orderStatus = await orderIsraeliNumber(phoneNumber, customerId)
        if (orderStatus === 'success') {
          await dbPatch('customers', `id=eq.${customerId}`, { telnyx_number: phoneNumber })
          const admin = createAdminClient()
          const { data: userRow } = await admin
            .from('users')
            .select('id, email')
            .eq('customer_id', customerId)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()
          if (userRow?.email) {
            const { data: authData } = await admin.auth.admin.getUserById(userRow.id)
            const firstName = authData?.user?.user_metadata?.first_name
            const lastName = authData?.user?.user_metadata?.last_name
            sendActivationEmail(
              userRow.email,
              customer.business_name,
              phoneNumber,
              customer.carrier ?? '',
              firstName,
              lastName,
              getVoiceName(customer.voice_id)
            ).catch(console.error)
          }
        }
        // If pending: Telnyx webhook will set telnyx_number and send activation email
      } else {
        console.error(`Auto-provision: no Israeli numbers available for customer ${customerId}`)
      }
    } catch (e) {
      console.error(`Auto-provision error for customer ${customerId}:`, e)
    }
  }

  return new NextResponse('-1', { headers: { 'Content-Type': 'text/plain' } })
}

function parseExpiry(raw: string): string | null {
  try {
    if (!raw) return null
    if (raw.includes('-')) return raw
    if (/^\d{8}$/.test(raw)) return `${raw.substring(0, 4)}-${raw.substring(4, 6)}-01`
    const [mm, yy] = raw.split('/')
    if (!mm || !yy) return null
    return `20${yy}-${mm}-01`
  } catch {
    return null
  }
}
