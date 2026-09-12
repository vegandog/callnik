import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { sendCancellationEmail } from '@/lib/email'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id, email')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 })

  const adminSupabase = createAdminClient()

  const { data: customer } = await adminSupabase
    .from('customers')
    .select('business_name, next_billing_date, status')
    .eq('id', userRecord.customer_id)
    .single()

  if (customer?.status !== 'active') {
    return NextResponse.json({ error: 'המנוי אינו פעיל' }, { status: 400 })
  }

  const { error } = await adminSupabase
    .from('customers')
    .update({ status: 'cancelling' })
    .eq('id', userRecord.customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const untilDate = customer.next_billing_date
    ? new Date(customer.next_billing_date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'סוף החודש'

  sendCancellationEmail({
    businessName: customer.business_name || userRecord.customer_id,
    email: userRecord.email || '',
    untilDate,
  }).catch(e => console.error('cancel email error:', e))

  return NextResponse.json({ ok: true, until: customer.next_billing_date })
}
