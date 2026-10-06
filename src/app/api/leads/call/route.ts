import { NextRequest, NextResponse } from 'next/server'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const SALES_AGENT_ID = process.env.ELEVENLABS_SALES_AGENT_ID!
const SALES_PHONE_NUMBER_ID = process.env.ELEVENLABS_SALES_PHONE_NUMBER_ID!
const CRON_SECRET = process.env.CRON_SECRET!

// Manual trigger: POST /api/leads/call
// Body: { phone: "0521234567", name: "ישראל ישראלי", secret: "..." }
export async function POST(req: NextRequest) {
  const body = await req.json()

  if (body.secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { phone, name } = body
  if (!phone) {
    return NextResponse.json({ error: 'phone required' }, { status: 400 })
  }

  const normalizedPhone = normalizePhone(phone)
  const result = await makeOutboundSalesCall(normalizedPhone, name || 'שלום')

  // WhatsApp notification to Eri
  await notifyEri(normalizedPhone, name || '', result)

  return NextResponse.json(result)
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('972')) return `+${digits}`
  if (digits.startsWith('0')) return `+972${digits.slice(1)}`
  return `+${digits}`
}

async function notifyEri(phone: string, name: string, callResult: { success: boolean; conversation_id?: string }) {
  const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID
  const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN
  if (!TWILIO_SID || !TWILIO_TOKEN) return

  const status = callResult.success ? 'מתחילה לצלצל' : 'נכשלה'
  const msg = `Callnik ליד חדש!\nשם: ${name}\nטלפון: ${phone}\nשיחת מכירה: ${status}`

  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: '+19405388128',
      To: '+972524680164',
      Body: msg,
    }),
  }).catch(() => null)
}

async function makeOutboundSalesCall(toNumber: string, leadName: string) {
  if (!SALES_PHONE_NUMBER_ID) {
    return { success: false, error: 'ELEVENLABS_SALES_PHONE_NUMBER_ID not configured' }
  }

  const res = await fetch('https://api.elevenlabs.io/v1/convai/sip-trunk/outbound-call', {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: SALES_AGENT_ID,
      agent_phone_number_id: SALES_PHONE_NUMBER_ID,
      to_number: toNumber,
      conversation_initiation_client_data: {
        dynamic_variables: {
          lead_name: leadName,
        },
      },
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    return { success: false, error: data }
  }
  return { success: true, conversation_id: data.conversation_id, to: toNumber }
}
