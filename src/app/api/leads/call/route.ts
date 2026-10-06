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

  return NextResponse.json(result)
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('972')) return `+${digits}`
  if (digits.startsWith('0')) return `+972${digits.slice(1)}`
  return `+${digits}`
}

async function makeOutboundSalesCall(toNumber: string, leadName: string) {
  if (!SALES_PHONE_NUMBER_ID) {
    return { success: false, error: 'ELEVENLABS_SALES_PHONE_NUMBER_ID not configured' }
  }

  const res = await fetch('https://api.elevenlabs.io/v1/convai/twilio/outbound-call', {
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
