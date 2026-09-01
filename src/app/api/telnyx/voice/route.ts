import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

// ElevenLabs SIP trunk endpoint for Telnyx
const ELEVENLABS_SIP_DOMAIN = 'sip.rtc.elevenlabs.io'

function texml(xml: string) {
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}

function texmlSipDial(toNumber: string) {
  // Route call directly to ElevenLabs via SIP trunk
  return texml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Sip>${toNumber}@${ELEVENLABS_SIP_DOMAIN}</Sip>
  </Dial>
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

  return texmlSipDial(to)
}
