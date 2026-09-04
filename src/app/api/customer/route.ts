import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { normalizePhone } from '@/lib/phone'
import { getAgentIdForVoice } from '@/lib/constants'

const ELEVENLABS_API = 'https://api.us.elevenlabs.io'

async function syncElevenLabsAgent(phoneNumber: string, agentId: string) {
  const headers = { 'xi-api-key': process.env.ELEVENLABS_API_KEY! }

  const listRes = await fetch(`${ELEVENLABS_API}/v1/convai/phone-numbers`, { headers })
  if (!listRes.ok) return

  const registrations = await listRes.json()
  const normalized = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
  const match = registrations.find((reg: { phone_number: string; phone_number_id: string }) =>
    reg.phone_number === normalized || reg.phone_number === normalized.replace('+', '')
  )
  if (!match) return

  await fetch(`${ELEVENLABS_API}/v1/convai/phone-numbers/${match.phone_number_id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_id: agentId }),
  })
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
