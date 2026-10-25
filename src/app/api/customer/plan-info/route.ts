import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
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
    .select('id, tier')
    .eq('id', userRecord.customer_id)
    .single()

  const israelNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }))
  const monthStart = new Date(israelNow.getFullYear(), israelNow.getMonth(), 1).toISOString()

  const [{ count }, { data: history }] = await Promise.all([
    admin
      .from('calls')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', userRecord.customer_id)
      .gte('created_at', monthStart),
    admin
      .from('billing_history')
      .select('*')
      .eq('customer_id', userRecord.customer_id)
      .order('created_at', { ascending: false }),
  ])

  return NextResponse.json({
    tier: customer?.tier || 'basic',
    monthlyCallCount: count ?? 0,
    history: history || [],
  })
}
