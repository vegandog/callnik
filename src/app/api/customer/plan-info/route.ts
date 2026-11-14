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
    .select('id, tier, next_billing_date')
    .eq('id', userRecord.customer_id)
    .single()

  // Use actual billing period (matches what the billing cron charges)
  const periodStart = customer?.next_billing_date
    ? (() => { const d = new Date(customer.next_billing_date + 'T00:00:00Z'); d.setMonth(d.getMonth() - 1); return d.toISOString() })()
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [{ count }, { data: history }] = await Promise.all([
    admin
      .from('calls')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', userRecord.customer_id)
      .not('elevenlabs_conversation_id', 'is', null)
      .gte('created_at', periodStart),
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
