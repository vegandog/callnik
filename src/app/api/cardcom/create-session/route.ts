import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const CARDCOM_TERMINAL = 190666
const CARDCOM_API_NAME = 'sAwPXwN5jjRPhSKn5NRn'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://callnik.com'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, coupon } = await req.json()
  const isAnnual = plan === 'annual'
  const isTest = plan === 'test'

  // Validate coupon if provided
  let couponValid = false
  let couponId: string | null = null
  if (coupon && !isTest && !isAnnual) {
    const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()
    const { data: promoRow } = await adminSupabase
      .from('promo_codes')
      .select('id, used_at, expires_at')
      .eq('code', (coupon as string).toUpperCase().trim())
      .single()
    if (promoRow && !promoRow.used_at && (!promoRow.expires_at || new Date(promoRow.expires_at) > new Date())) {
      couponValid = true
      couponId = promoRow.id
    }
  }

  // All amounts include 18% VAT: monthly 99×1.18=116.82, annual 948×1.18=1118.64
  const amount = isTest ? 1 : couponValid ? 1 : isAnnual ? 1118.64 : 116.82
  const productName = isTest ? 'טסט Callnik' : isAnnual ? 'מנוי Callnik שנתי' : 'מנוי Callnik חודשי'
  const productDescription = isTest
    ? 'טסט Callnik - callnik.com'
    : couponValid
    ? 'מנוי Callnik חודשי - callnik.com | חודש ראשון ב-₪1 + מע"מ (₪1.18) | מחודש 2: ₪116.82 לחודש כולל מע"מ'
    : isAnnual
    ? 'מנוי Callnik שנתי - callnik.com | ₪1,118.64 לשנה כולל מע"מ (₪79 לחודש + מע"מ)'
    : 'מנוי Callnik חודשי - callnik.com | ₪116.82 לחודש כולל מע"מ | חיוב חוזר מדי חודש'

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id, email')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'No customer' }, { status: 400 })

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name')
    .eq('id', userRecord.customer_id)
    .single()

  const res = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      TerminalNumber: CARDCOM_TERMINAL,
      ApiName: CARDCOM_API_NAME,
      Operation: 'ChargeAndCreateToken',
      ReturnValue: `${userRecord.customer_id}:${plan}${couponId ? `:promo:${couponId}` : ''}`,
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
