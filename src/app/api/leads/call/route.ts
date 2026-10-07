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

  // Accept multiple phone field names from Make/Facebook
  const phone = body.phone || body.phone_number || body.PHONE_NUMBER || ''
  const name = body.name || body.full_name || body.FULL_NAME || ''
  const email = body.email || body.EMAIL || ''

  if (!phone) {
    // No phone - still notify Eri so the lead isn't lost
    await notifyEri('', name, { success: false, error: 'no phone' }, email)
    return NextResponse.json({ success: false, error: 'phone required - lead saved' }, { status: 200 })
  }

  const normalizedPhone = normalizePhone(phone)
  const result = await makeOutboundSalesCall(normalizedPhone, name || 'שלום')

  await notifyEri(normalizedPhone, name, result, email)

  return NextResponse.json(result)
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('972')) return `+${digits}`
  if (digits.startsWith('0')) return `+972${digits.slice(1)}`
  return `+${digits}`
}

async function notifyEri(phone: string, name: string, callResult: { success: boolean; conversation_id?: string; error?: unknown }, email = '') {
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) return

  const status = !phone ? '⚠️ אין טלפון - לא בוצעה שיחה' : callResult.success ? '✅ דנה מתקשרת עכשיו' : '❌ שיחה נכשלה'

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Callnik <leads@callnik.com>',
      to: 'vegandog@gmail.com',
      subject: `ליד חדש: ${name || phone || email || 'לא ידוע'}`,
      html: `<h2>ליד חדש מפייסבוק</h2>
<p><b>שם:</b> ${name || 'לא צוין'}</p>
<p><b>טלפון:</b> ${phone || 'לא צוין'}</p>
<p><b>אימייל:</b> ${email || 'לא צוין'}</p>
<p><b>שיחה:</b> ${status}</p>`,
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
