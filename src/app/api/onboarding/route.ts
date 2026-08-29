import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email'
import { normalizePhone } from '@/lib/phone'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })

  const admin = createAdminClient()

  const { data: existing } = await admin.from('users').select('id').eq('id', user.id).single()
  if (existing) return NextResponse.json({ error: 'כבר נרשמת' }, { status: 409 })

  const { business_name, category, whatsapp_number, carrier } = await req.json()
  if (!business_name || !whatsapp_number || !carrier) {
    return NextResponse.json({ error: 'חסרים פרטים' }, { status: 400 })
  }

  const normalizedWhatsapp = normalizePhone(whatsapp_number)
  const fullName: string = user.user_metadata?.full_name || user.user_metadata?.name || ''
  const firstName = fullName.split(' ')[0] || ''

  const { data: customer, error: customerError } = await admin
    .from('customers')
    .insert({ business_name, category, whatsapp_number: normalizedWhatsapp, carrier, status: 'pending' })
    .select()
    .single()

  if (customerError) return NextResponse.json({ error: customerError.message }, { status: 500 })

  await admin.from('users').insert({ id: user.id, customer_id: customer.id, email: user.email, full_name: fullName || null })

  await Promise.allSettled([
    sendWelcomeEmail(user.email!, business_name, firstName),
    sendAdminNotification({
      businessName: business_name,
      category,
      whatsappNumber: whatsapp_number,
      carrier,
      email: user.email!,
    }),
  ])

  return NextResponse.json({ ok: true })
}
