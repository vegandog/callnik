import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LatestCallPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const admin = createAdminClient()
  const { data: userRow } = await admin
    .from('users')
    .select('customer_id')
    .eq('email', user.email)
    .single()

  if (!userRow?.customer_id) redirect('/calls')

  const { data: call } = await admin
    .from('calls')
    .select('id')
    .eq('customer_id', userRow.customer_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (call?.id) redirect(`/calls/${call.id}`)
  redirect('/calls')
}
