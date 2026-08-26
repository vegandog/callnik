import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vegandog@gmail.com'

async function assertAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) return null
  return user
}

export async function GET() {
  if (!await assertAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabase = createAdminClient()
  const { data: customers, error } = await supabase
    .from('customers')
    .select('id, business_name, category, whatsapp_number, carrier, twilio_number, status, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: callCounts } = await supabase
    .from('calls')
    .select('customer_id')

  const countMap: Record<string, number> = {}
  callCounts?.forEach(c => {
    countMap[c.customer_id] = (countMap[c.customer_id] || 0) + 1
  })

  return NextResponse.json({ customers: customers?.map(c => ({ ...c, call_count: countMap[c.id] || 0 })) })
}

export async function PATCH(req: NextRequest) {
  if (!await assertAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { customer_id, status, twilio_number } = body
  const supabase = createAdminClient()

  const update: Record<string, string> = {}
  if (status) update.status = status
  if (twilio_number !== undefined) update.twilio_number = twilio_number

  const { error } = await supabase
    .from('customers')
    .update(update)
    .eq('id', customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
