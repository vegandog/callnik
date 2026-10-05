import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await createAdminClient().from('customers').update({
    gcal_refresh_token: null,
    gcal_access_token: null,
    gcal_token_expiry: null,
  }).eq('id', userRecord.customer_id)

  return NextResponse.json({ ok: true })
}
