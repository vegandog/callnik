import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'
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
    .select('id, business_name, category, whatsapp_number, carrier, twilio_number, telnyx_number, status, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: callCounts } = await supabase
    .from('calls')
    .select('customer_id')

  const countMap: Record<string, number> = {}
  callCounts?.forEach(c => {
    countMap[c.customer_id] = (countMap[c.customer_id] || 0) + 1
  })

  // Fetch primary email per customer
  const { data: users } = await supabase
    .from('users')
    .select('customer_id, email')
    .order('created_at', { ascending: false })

  const emailMap: Record<string, string> = {}
  users?.forEach(u => {
    if (!emailMap[u.customer_id]) emailMap[u.customer_id] = u.email
  })

  return NextResponse.json({
    customers: customers?.map(c => ({
      ...c,
      call_count: countMap[c.id] || 0,
      email: emailMap[c.id] || null,
    }))
  })
}

export async function DELETE(req: NextRequest) {
  if (!await assertAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const customer_id = searchParams.get('customer_id')
  if (!customer_id) return NextResponse.json({ error: 'Missing customer_id' }, { status: 400 })

  const supabase = createAdminClient()

  await supabase.from('calls').delete().eq('customer_id', customer_id)
  await supabase.from('users').delete().eq('customer_id', customer_id)
  const { error } = await supabase.from('customers').delete().eq('id', customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: NextRequest) {
  if (!await assertAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { customer_id, status, twilio_number, telnyx_number } = body
  const supabase = createAdminClient()

  // Fetch current customer state before updating
  const { data: current } = await supabase
    .from('customers')
    .select('status, business_name, whatsapp_number, carrier, twilio_number, telnyx_number, voice_id')
    .eq('id', customer_id)
    .single()

  const update: Record<string, string> = {}
  if (status) update.status = status
  if (twilio_number !== undefined) update.twilio_number = twilio_number
  if (telnyx_number !== undefined) update.telnyx_number = telnyx_number

  const { error } = await supabase
    .from('customers')
    .update(update)
    .eq('id', customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send activation email when status changes to 'active'
  if (status === 'active' && current && current.status !== 'active') {
    try {
      const { data: userRow } = await supabase
        .from('users')
        .select('id, email')
        .eq('customer_id', customer_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (userRow?.email) {
        const finalTwilioNumber = twilio_number ?? current.twilio_number
        let firstName: string | undefined
        let lastName: string | undefined
        if (userRow.id) {
          const { data: authData } = await supabase.auth.admin.getUserById(userRow.id)
          firstName = authData?.user?.user_metadata?.first_name || undefined
          lastName = authData?.user?.user_metadata?.last_name || undefined
        }
        const voiceName = getVoiceName(current.voice_id)
        await sendActivationEmail(
          userRow.email,
          current.business_name,
          finalTwilioNumber ?? null,
          current.carrier ?? '',
          firstName,
          lastName,
          voiceName
        )
      }
    } catch (e) {
      console.error('Activation email failed:', e)
    }
  }

  return NextResponse.json({ ok: true })
}
