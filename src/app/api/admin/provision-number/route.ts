import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'
import { findAvailableIsraeliNumber, orderIsraeliNumber, TELNYX_CONNECTION_ID, TELNYX_REQUIREMENT_GROUP_ID } from '@/lib/telnyx'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vegandog@gmail.com'

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

  const phoneNumber = await findAvailableIsraeliNumber()
  if (!phoneNumber) {
    return NextResponse.json({ error: 'אין מספרים ישראליים זמינים כרגע - נסה שוב מאוחר יותר' }, { status: 404 })
  }

  const orderStatus = await orderIsraeliNumber(phoneNumber, customer_id)

  if (orderStatus === 'failure') {
    return NextResponse.json({
      error: 'ההזמנה נכשלה ב-Telnyx',
      details: { phone_number: phoneNumber, requirement_group_id: TELNYX_REQUIREMENT_GROUP_ID, connection_id: TELNYX_CONNECTION_ID },
    }, { status: 502 })
  }

  const update: Record<string, unknown> = { telnyx_number: phoneNumber }
  if (orderStatus === 'success') update.status = 'active'
  await admin.from('customers').update(update).eq('id', customer_id)

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
