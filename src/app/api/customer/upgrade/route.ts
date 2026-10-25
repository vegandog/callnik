import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendWhatsApp } from '@/lib/notify'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const admin = createAdminClient()
  const { data: customer } = await admin
    .from('customers')
    .select('id, business_name, tier, whatsapp_number')
    .eq('id', userRecord.customer_id)
    .single()

  if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (customer.tier === 'pro') return NextResponse.json({ ok: true, already: true })

  await admin
    .from('customers')
    .update({ tier: 'pro' })
    .eq('id', customer.id)

  if (customer.whatsapp_number) {
    await sendWhatsApp(
      customer.whatsapp_number,
      `שדרגת ל-Pro! מעכשיו 150 שיחות/חודש. החיוב הבא יהיה ₪149 כולל מע"מ. תודה שבחרת ב-Callnik!`
    )
  }

  await sendWhatsApp(
    '0524680164',
    `לקוח שדרג ל-Pro: ${customer.business_name}`
  )

  return NextResponse.json({ ok: true })
}
