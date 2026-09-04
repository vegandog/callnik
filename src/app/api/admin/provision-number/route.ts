import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vegandog@gmail.com'
const TELNYX_API_KEY = process.env.TELNYX_API_KEY!
const TELNYX_CONNECTION_ID = '3039393467886208749'
const TELNYX_REQUIREMENT_GROUP_ID = 'd56cf61a-80c3-45c9-978e-5486e972d13f'

async function telnyx(path: string, options?: RequestInit) {
  return fetch(`https://api.telnyx.com/v2${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TELNYX_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { customer_id } = await req.json()
  if (!customer_id) return NextResponse.json({ error: 'Missing customer_id' }, { status: 400 })

  const admin = createAdminClient()

  const { data: customer } = await admin
    .from('customers')
    .select('id, business_name, carrier, voice_id, telnyx_number')
    .eq('id', customer_id)
    .single()

  if (!customer) return NextResponse.json({ error: 'לקוח לא נמצא' }, { status: 404 })
  if (customer.telnyx_number) return NextResponse.json({ error: 'ללקוח כבר יש מספר Telnyx' }, { status: 400 })

  // 1. Search available Israeli local numbers
  const searchRes = await telnyx('/available_phone_numbers?filter%5Bcountry_code%5D=IL&filter%5Bphone_number_type%5D=local&filter%5Blimit%5D=5')
  if (!searchRes.ok) {
    return NextResponse.json({ error: 'חיפוש מספרים נכשל', details: await searchRes.text() }, { status: 502 })
  }
  const searchData = await searchRes.json()
  const available = searchData.data as { phone_number: string }[]
  if (!available?.length) {
    return NextResponse.json({ error: 'אין מספרים ישראליים זמינים כרגע - נסה שוב מאוחר יותר' }, { status: 404 })
  }

  const phoneNumber = available[0].phone_number

  // 2. Place the order — assign to SIP connection + requirement group
  const orderRes = await telnyx('/number_orders', {
    method: 'POST',
    body: JSON.stringify({
      phone_numbers: [{
        phone_number: phoneNumber,
        requirement_group_id: TELNYX_REQUIREMENT_GROUP_ID,
      }],
      connection_id: TELNYX_CONNECTION_ID,
      customer_reference: `callnik-${customer_id}`,
    }),
  })

  const orderData = await orderRes.json()
  const order = orderData.data
  const orderStatus: string = order?.status ?? 'failure'

  if (orderStatus === 'failure') {
    return NextResponse.json({ error: 'ההזמנה נכשלה ב-Telnyx', details: order }, { status: 502 })
  }

  // 3. Save number to customer (always — number is reserved even when pending)
  const update: Record<string, unknown> = { telnyx_number: phoneNumber }
  if (orderStatus === 'success') update.status = 'active'
  await admin.from('customers').update(update).eq('id', customer_id)

  // 4. Send activation email on instant success
  if (orderStatus === 'success') {
    const { data: userRow } = await admin
      .from('users')
      .select('id, email')
      .eq('customer_id', customer_id)
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

  return NextResponse.json({
    ok: true,
    phone_number: phoneNumber,
    order_status: orderStatus,
    instant: orderStatus === 'success',
  })
}
