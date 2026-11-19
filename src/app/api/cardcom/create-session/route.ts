import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

  const { plan, coupon, tier: tierParam } = await req.json()
  const isAnnual = plan === 'annual'
  const isTest = plan === 'test'
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
      .select('id, used_at, expires_at, discount_type, max_uses, use_count')
      .eq('code', (coupon as string).toUpperCase().trim())
      .single()
    if (promoRow && (!promoRow.expires_at || new Date(promoRow.expires_at) > new Date())) {
      const maxUses = promoRow.max_uses ?? 1
      const useCount = promoRow.use_count ?? 0
      const usedUp = maxUses !== 0 && useCount >= maxUses
      const singleUsedAt = maxUses === 1 && promoRow.used_at
      if (!usedUp && !singleUsedAt) {
        couponValid = true
        couponId = promoRow.id
        couponDiscountType = promoRow.discount_type || 'first_month_1nis'
      }
    }
  }

  // Parse coupon amount (0 = free, >0 = charge via Cardcom)
  const couponAmount = couponDiscountType === 'free_month' ? 0
    : couponDiscountType === 'first_month_1nis' ? 1
    : parseFloat(couponDiscountType) || 1

  // Amounts include 18% VAT: Basic ₪99→116.82, Pro ₪199→234.82, Annual Basic ₪948→1118.64, Annual Pro ₪1990→2348.20
  const monthlyBase = tierVal === 'pro' ? 234.82 : 116.82
  const annualBase  = tierVal === 'pro' ? 2348.20 : 1118.64
  const amount = isTest ? 1 : couponValid ? couponAmount : isAnnual ? annualBase : monthlyBase
  const productName = isTest ? 'טסט Callnik' : isAnnual ? `מנוי Callnik ${tierLabel} שנתי` : `מנוי Callnik ${tierLabel} חודשי`
  const couponAmountDisplay = couponAmount === 0 ? 'חינם' : `₪${couponAmount}`
  const productDescription = isTest
    ? 'טסט Callnik - callnik.com'
    : couponValid
    ? `מנוי Callnik ${tierLabel} חודשי - callnik.com | חודש ראשון ${couponAmountDisplay} (קופון) | מחודש 2: ₪${tierVal === 'pro' ? 199 : 99} + מע"מ לחודש`
    : isAnnual
    ? `מנוי Callnik ${tierLabel} שנתי - callnik.com | ₪${tierVal === 'pro' ? 1990 : 948} + מע"מ לשנה`
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
  if (couponValid && couponAmount === 0) {
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
      const { data: pr } = await (await import('@/lib/supabase/admin')).createAdminClient()
        .from('promo_codes').select('max_uses, use_count').eq('id', couponId).single()
      const isSingle = !pr || (pr.max_uses ?? 1) === 1
      await dbPatch('promo_codes', `id=eq.${couponId}`, {
        use_count: (pr?.use_count ?? 0) + 1,
        ...(isSingle ? { used_at: new Date().toISOString(), used_by: user.id } : {}),
      })
    }

    // No auto-provisioning for free accounts — number assigned manually via admin
    return NextResponse.json({ free: true })
  }

  const res = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      TerminalNumber: CARDCOM_TERMINAL,
      ApiName: CARDCOM_API_NAME,
      Operation: 'ChargeAndCreateToken',
      ReturnValue: `${userRecord.customer_id}:${plan}:${tierVal}${couponId ? `:promo:${couponId}` : ''}`,
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
