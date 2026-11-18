import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'
import { findAvailableIsraeliNumber, orderIsraeliNumber } from '@/lib/telnyx'

const CARDCOM_TERMINAL = 190666
const CARDCOM_API_NAME = 'sAwPXwN5jjRPhSKn5NRn'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://callnik.com'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function dbPatch(table: string, filter: string, body: Record<string, unknown>) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function dbPost(table: string, body: Record<string, unknown>) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, coupon, intro, tier: tierParam } = await req.json()
  const isAnnual = plan === 'annual'
  const isTest = plan === 'test'
  let isIntro = !!intro && !isAnnual && !isTest
  const tierVal: 'basic' | 'pro' = tierParam === 'pro' ? 'pro' : 'basic'
  const tierLabel = tierVal === 'pro' ? 'Pro' : 'Basic'

  // Validate coupon if provided
  let couponValid = false
  let couponId: string | null = null
  let couponDiscountType = 'first_month_1nis'
  if (coupon && !isTest && !isAnnual) {
    const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()
    const { data: promoRow } = await adminSupabase
      .from('promo_codes')
      .select('id, used_at, expires_at, discount_type')
      .eq('code', (coupon as string).toUpperCase().trim())
      .single()
    if (promoRow && !promoRow.used_at && (!promoRow.expires_at || new Date(promoRow.expires_at) > new Date())) {
      couponValid = true
      couponId = promoRow.id
      couponDiscountType = promoRow.discount_type || 'first_month_1nis'
    }
  }

  // Amounts include 18% VAT: Basic ₪99→116.82, Pro ₪199→234.82, Annual Basic ₪948→1118.64, Annual Pro ₪1990→2348.20
  const monthlyBase = tierVal === 'pro' ? 234.82 : 116.82
  const annualBase  = tierVal === 'pro' ? 2348.20 : 1118.64
  const amount = isTest ? 1 : couponValid ? 1 : isAnnual ? annualBase : isIntro ? 1 : monthlyBase
  const productName = isTest ? 'טסט Callnik' : isAnnual ? `מנוי Callnik ${tierLabel} שנתי` : `מנוי Callnik ${tierLabel} חודשי`
  const productDescription = isTest
    ? 'טסט Callnik - callnik.com'
    : couponValid
    ? `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון ב-₪1 בלבד | מחודש 2: ₪${tierVal === 'pro' ? 199 : 99} + מע"מ לחודש`
    : isAnnual
    ? `מנוי Callnik ${tierLabel} שנתי - callnik.com | ₪${tierVal === 'pro' ? 1428 : 948} + מע"מ לשנה`
    : isIntro
    ? `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון ₪1 | מחודש שני: ₪${tierVal === 'pro' ? 199 : 99} + מע"מ לחודש`
    : `מנוי Callnik ${tierLabel} חודשי - callnik.com | ₪${tierVal === 'pro' ? 199 : 99} + מע"מ לחודש`

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id, email')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'No customer' }, { status: 400 })

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, status')
    .eq('id', userRecord.customer_id)
    .single()

  if (customer?.status === 'active' || customer?.status === 'cancelling') {
    return NextResponse.json({ error: 'המנוי כבר פעיל' }, { status: 409 })
  }

  // Free coupon: skip Cardcom, activate directly
  if (couponValid && couponDiscountType === 'free_month') {
    const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()

    await dbPatch('customers', `id=eq.${userRecord.customer_id}`, {
      status: 'active',
      plan: 'monthly',
      tier: tierVal,
      next_billing_date: null,
      billing_failures: 0,
      pending_lp_id: null,
    })

    await dbPost('billing_history', {
      customer_id: userRecord.customer_id,
      amount: 0,
      plan: 'monthly',
      description: `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון חינם (קופון פיילוט)`,
    })

    if (couponId) {
      await dbPatch('promo_codes', `id=eq.${couponId}`, {
        used_at: new Date().toISOString(),
        used_by: user.id,
      })
    }

    // Provision Telnyx number if needed
    const { data: freshCustomer } = await adminSupabase
      .from('customers')
      .select('business_name, carrier, voice_id, telnyx_number')
      .eq('id', userRecord.customer_id)
      .single()

    if (freshCustomer && !freshCustomer.telnyx_number) {
      try {
        const phoneNumber = await findAvailableIsraeliNumber()
        if (phoneNumber) {
          const orderStatus = await orderIsraeliNumber(phoneNumber, userRecord.customer_id)
          if (orderStatus === 'success') {
            await dbPatch('customers', `id=eq.${userRecord.customer_id}`, { telnyx_number: phoneNumber })
            const { data: authData } = await adminSupabase.auth.admin.getUserById(user.id)
            const firstName = authData?.user?.user_metadata?.first_name
            const lastName = authData?.user?.user_metadata?.last_name
            sendActivationEmail(
              user.email!,
              freshCustomer.business_name,
              phoneNumber,
              freshCustomer.carrier ?? '',
              firstName,
              lastName,
              getVoiceName(freshCustomer.voice_id)
            ).catch(console.error)
          }
        }
      } catch (e) {
        console.error('Free activation: Telnyx provision error:', e)
      }
    }

    return NextResponse.json({ free: true })
  }

  // Block re-use of intro pricing for returning customers
  if (isIntro) {
    const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()
    const { data: priorIntro } = await adminSupabase
      .from('billing_history')
      .select('id')
      .eq('customer_id', userRecord.customer_id)
      .limit(1)
      .maybeSingle()
    if (priorIntro) {
      // Customer already paid before — charge full price, no intro
      isIntro = false
    }
  }

  const res = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      TerminalNumber: CARDCOM_TERMINAL,
      ApiName: CARDCOM_API_NAME,
      Operation: 'ChargeAndCreateToken',
      ReturnValue: `${userRecord.customer_id}:${plan}:${tierVal}${couponId ? `:promo:${couponId}` : isIntro ? ':intro' : ''}`,
      Amount: amount,
      SuccessRedirectUrl: `${BASE_URL}/api/cardcom/callback`,
      FailedRedirectUrl: `${BASE_URL}/payment?error=1`,
      WebHookUrl: `${BASE_URL}/api/cardcom/webhook`,
      ProductName: productName,
      Language: 'he',
      ISOCoinId: 1,
      Document: {
        To: customer?.business_name || '',
        Email: userRecord.email,
        Products: [{ Description: productDescription, UnitCost: amount, Quantity: 1 }],
      },
    }),
  })

  const data = await res.json()

  if (data.ResponseCode !== 0) {
    console.error('Cardcom create-session error:', data)
    return NextResponse.json({ error: data.Description || 'Cardcom error' }, { status: 500 })
  }

  // Save LowProfileId so webhook can call GetLpResult to retrieve the token
  if (data.LowProfileId) {
    const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()
    await adminSupabase
      .from('customers')
      .update({ pending_lp_id: data.LowProfileId })
      .eq('id', userRecord.customer_id)
  }

  return NextResponse.json({ url: data.Url })
}
