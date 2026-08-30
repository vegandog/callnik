import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { normalizePhone } from '@/lib/phone'
import { getAgentIdForVoice } from '@/lib/constants'

const ELEVENLABS_API = 'https://api.us.elevenlabs.io'
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!

async function syncElevenLabsAgent(phoneNumber: string, agentId: string) {
  const headers = { 'xi-api-key': process.env.ELEVENLABS_API_KEY! }

  // מחיקת הרישום הקיים
  const listRes = await fetch(`${ELEVENLABS_API}/v1/convai/phone-numbers`, { headers })
  if (listRes.ok) {
    const registrations = await listRes.json()
    for (const reg of registrations) {
      if (reg.phone_number === phoneNumber) {
        await fetch(`${ELEVENLABS_API}/v1/convai/phone-numbers/${reg.phone_number_id}`, {
          method: 'DELETE', headers,
        })
        break
      }
    }
  }

  // רישום חדש עם הסוכן הנכון
  await fetch(`${ELEVENLABS_API}/v1/convai/phone-numbers`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: phoneNumber,
      label: 'Callnik Israel',
      provider: 'twilio',
      agent_id: agentId,
      sid: TWILIO_ACCOUNT_SID,
      token: TWILIO_AUTH_TOKEN,
    }),
  })

  // שחזור webhook של Twilio לשרת שלנו
  const twilioAuth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
  const numbersRes = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/IncomingPhoneNumbers.json`,
    { headers: { Authorization: `Basic ${twilioAuth}` } }
  )
  if (numbersRes.ok) {
    const data = await numbersRes.json()
    const match = data.incoming_phone_numbers?.find((n: { phone_number: string; sid: string }) =>
      n.phone_number === phoneNumber
    )
    if (match) {
      const body = new URLSearchParams({
        VoiceUrl: 'https://callnik.com/api/twilio/voice',
        VoiceMethod: 'POST',
      })
      await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/IncomingPhoneNumbers/${match.sid}.json`,
        { method: 'POST', headers: { Authorization: `Basic ${twilioAuth}` }, body }
      )
    }
  }
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { business_name, whatsapp_number, voice_id } = await req.json()
  const normalizedWhatsapp = whatsapp_number ? normalizePhone(whatsapp_number) : whatsapp_number

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 })

  const update: Record<string, string> = {}
  if (business_name !== undefined) update.business_name = business_name
  if (whatsapp_number !== undefined) update.whatsapp_number = normalizedWhatsapp
  if (voice_id !== undefined) update.voice_id = voice_id

  const { error } = await supabase
    .from('customers')
    .update(update)
    .eq('id', userRecord.customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // אם הקול השתנה — עדכן ElevenLabs אוטומטית
  if (voice_id !== undefined) {
    const adminSupabase = createAdminClient()
    const { data: customer } = await adminSupabase
      .from('customers')
      .select('twilio_number, telnyx_number')
      .eq('id', userRecord.customer_id)
      .single()

    const phoneNumber = customer?.twilio_number || customer?.telnyx_number
    if (phoneNumber) {
      const agentId = getAgentIdForVoice(voice_id)
      await syncElevenLabsAgent(phoneNumber, agentId).catch(console.error)
    }
  }

  return NextResponse.json({ ok: true })
}
