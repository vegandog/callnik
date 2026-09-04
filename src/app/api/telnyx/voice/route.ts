import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

const TELNYX_AI_ASSISTANT_ID = 'assistant-7c76ae16-b91e-49f7-80ed-8b80805161d1'

function texml(xml: string) {
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

  const dynamicVariables = JSON.stringify({ business_name: customer.business_name })

  return texml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <AI assistantId="${TELNYX_AI_ASSISTANT_ID}" dynamicVariables='${dynamicVariables}'/>
  </Connect>
</Response>`)
}
