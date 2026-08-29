import { createAdminClient } from '@/lib/supabase/admin'
import twilio from 'twilio'
import { NextRequest, NextResponse } from 'next/server'

const ERI_WHATSAPP = 'whatsapp:+972524680164'
const FROM_WHATSAPP = 'whatsapp:+12674607274'

async function alertEri(message: string) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
  await client.messages.create({ body: message, from: FROM_WHATSAPP, to: ERI_WHATSAPP })
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Window: calls created 10–20 min ago with no caller_name
  // Cron runs every 10 min → each failed call appears in exactly one window
  const windowEnd = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const windowStart = new Date(Date.now() - 20 * 60 * 1000).toISOString()

  const { data: failed } = await supabase
    .from('calls')
    .select('id, caller_number, customer_id, created_at')
    .gte('created_at', windowStart)
    .lt('created_at', windowEnd)
    .is('caller_name', null)

  if (!failed || failed.length === 0) {
    return NextResponse.json({ ok: true, checked: 0 })
  }

  const customerIds = [...new Set(failed.map(c => c.customer_id))]
  const { data: customers } = await supabase
    .from('customers')
    .select('id, business_name')
    .in('id', customerIds)

  const customerMap = Object.fromEntries((customers || []).map(c => [c.id, c.business_name]))

  for (const call of failed) {
    const biz = customerMap[call.customer_id] || 'לא ידוע'
    const time = new Date(call.created_at).toLocaleTimeString('he-IL', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem',
    })
    try {
      await alertEri(`⚠️ Callnik - שיחה נכשלה\nלקוח: ${biz}\nמספר: ${call.caller_number}\nשעה: ${time}\ncallnik.com/calls/${call.id}`)
    } catch (e) {
      console.error('Alert failed:', e)
    }
  }

  return NextResponse.json({ ok: true, alerted: failed.length })
}
