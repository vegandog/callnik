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
    .select('id, business_name, category, whatsapp_number, carrier, twilio_number, telnyx_number, voice_id, status, created_at, cardcom_token, card_month, card_year, token_expiry, plan, next_billing_date, billing_failures, tier')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const israelNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }))
  const monthStart = new Date(israelNow.getFullYear(), israelNow.getMonth(), 1).toISOString()

  const { data: callCounts } = await supabase
    .from('calls')
    .select('customer_id')

  const { data: monthCalls } = await supabase
    .from('calls')
    .select('customer_id')
    .gte('created_at', monthStart)

  const countMap: Record<string, number> = {}
  callCounts?.forEach(c => {
    countMap[c.customer_id] = (countMap[c.customer_id] || 0) + 1
  })

  const monthMap: Record<string, number> = {}
  monthCalls?.forEach(c => {
    monthMap[c.customer_id] = (monthMap[c.customer_id] || 0) + 1
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
      monthly_call_count: monthMap[c.id] || 0,
      email: emailMap[c.id] || null,
    }))
  })
}

export async function POST(req: NextRequest) {
  if (!await assertAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { business_name, whatsapp_number, carrier, category, voice_id, twilio_number, telnyx_number } = body

  if (!business_name || !whatsapp_number || !carrier) {
    return NextResponse.json({ error: 'שם עסק, וואטסאפ וחברה הם שדות חובה' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('customers')
    .insert({
      business_name,
      whatsapp_number,
      carrier,
      category: category || null,
      voice_id: voice_id || 'FA7xLUuWpSuAX9pUCVmy',
      twilio_number: twilio_number || null,
      telnyx_number: telnyx_number || null,
      status: 'pending',
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, id: data.id })
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
  const { customer_id, status, twilio_number, telnyx_number, voice_id, action, business_name, whatsapp_number, carrier, category, email, tier } = body
  const supabase = createAdminClient()

  // Resend activation email without changing status
  if (action === 'send_activation') {
    const { data: c } = await supabase
      .from('customers')
      .select('business_name, carrier, twilio_number, telnyx_number, voice_id')
      .eq('id', customer_id)
      .single()
    const { data: userRow } = await supabase
      .from('users')
      .select('id, email')
      .eq('customer_id', customer_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (!c || !userRow?.email) return NextResponse.json({ error: 'לא נמצא לקוח/מייל' }, { status: 404 })
    const number = c.telnyx_number || c.twilio_number
    let firstName: string | undefined, lastName: string | undefined
    if (userRow.id) {
      const { data: authData } = await supabase.auth.admin.getUserById(userRow.id)
      firstName = authData?.user?.user_metadata?.first_name
      lastName = authData?.user?.user_metadata?.last_name
    }
    await sendActivationEmail(userRow.email, c.business_name, number ?? null, c.carrier ?? '', firstName, lastName, getVoiceName(c.voice_id))
    return NextResponse.json({ ok: true })
  }

  // Fetch current customer state before updating
  const { data: current } = await supabase
    .from('customers')
    .select('status, business_name, whatsapp_number, carrier, twilio_number, telnyx_number, voice_id')
    .eq('id', customer_id)
    .single()

  const update: Record<string, string | null> = {}
  if (status) update.status = status
  if (twilio_number !== undefined) update.twilio_number = twilio_number || null
  if (telnyx_number !== undefined) update.telnyx_number = telnyx_number || null
  if (voice_id !== undefined) update.voice_id = voice_id
  if (business_name !== undefined) update.business_name = business_name
  if (whatsapp_number !== undefined) update.whatsapp_number = whatsapp_number
  if (carrier !== undefined) update.carrier = carrier
  if (category !== undefined) update.category = category || null
  if (tier !== undefined) update.tier = tier
  if (email !== undefined) {
    await supabase.from('users').update({ email }).eq('customer_id', customer_id)
  }

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
        const finalTwilioNumber = twilio_number ?? current.twilio_number ?? telnyx_number ?? current.telnyx_number
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
