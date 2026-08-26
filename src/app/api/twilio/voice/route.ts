import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

const ELEVENLABS_INBOUND_URL = 'https://api.us.elevenlabs.io/twilio/inbound_call'

function twiml(xml: string) {
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const to = body.get('To') as string
  const from = body.get('From') as string
  const callSid = body.get('CallSid') as string

  const supabase = createAdminClient()
  const { data: customer } = await supabase
    .from('customers')
    .select('id, business_name, status')
    .eq('twilio_number', to)
    .single()

  if (!customer || customer.status !== 'active') {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="he-IL">מצטערים, השירות אינו זמין כרגע.</Say>
  <Hangup/>
</Response>`)
  }

  const { data: callRow } = await supabase.from('calls').insert({
    customer_id: customer.id,
    caller_number: from,
    call_sid: callSid,
    created_at: new Date().toISOString(),
  }).select('id').single()

  // Proxy to ElevenLabs native Twilio handler with business_name + call_record_id injected
  const vars = encodeURIComponent(JSON.stringify({
    business_name: customer.business_name,
    call_record_id: callRow?.id ?? '',
  }))
  const redirectUrl = `${ELEVENLABS_INBOUND_URL}?dynamic_variables=${vars}`

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Redirect method="POST">${redirectUrl}</Redirect>
</Response>`)
}
