import { createAdminClient } from '@/lib/supabase/admin'
import { getAgentIdForVoice } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

// Telnyx TeXML is Twilio-compatible, so we use the same ElevenLabs inbound URL
const ELEVENLABS_INBOUND_URL = 'https://api.us.elevenlabs.io/twilio/inbound_call'

function texml(xml: string) {
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}

function texmlRedirect(url: string) {
  const safe = url.replace(/&/g, '&amp;')
  return texml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Redirect method="POST">${safe}</Redirect>
</Response>`)
}

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const to = body.get('To') as string
  const from = body.get('From') as string
  const callSid = body.get('CallSid') as string

  const supabase = createAdminClient()
  const { data: customer } = await supabase
    .from('customers')
    .select('id, business_name, status, voice_id')
    .eq('telnyx_number', to)
    .single()

  if (!customer || customer.status !== 'active') {
    return texml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="he-IL">מצטערים, השירות אינו זמין כרגע.</Say>
  <Hangup/>
</Response>`)
  }

  await supabase.from('calls').insert({
    customer_id: customer.id,
    caller_number: from,
    call_sid: callSid,
    created_at: new Date().toISOString(),
  })

  const agentId = getAgentIdForVoice(customer.voice_id)
  return texmlRedirect(`${ELEVENLABS_INBOUND_URL}?agent_id=${agentId}`)
}
