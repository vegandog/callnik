import { createAdminClient } from '@/lib/supabase/admin'
import { getVoiceName } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

function normalizeNumber(n: string | null | undefined): string | null {
  if (!n) return null
  // Add + if missing (ElevenLabs sends "97283762282" not "+97283762282")
  return n.startsWith('+') ? n : `+${n}`
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  // ElevenLabs SIP trunk sends called number as system__called_number
  const rawCalledNumber =
    data.called_number ||
    data.conversation_initiation_metadata_event?.called_number ||
    data.metadata?.called_number ||
    data.system__called_number ||
    null

  const rawCallerNumber =
    data.caller_id ||
    data.conversation_initiation_metadata_event?.caller_id ||
    data.metadata?.caller_id ||
    data.system__caller_id ||
    null

  const calledNumber = normalizeNumber(rawCalledNumber)
  const callerNumber = rawCallerNumber
    ? rawCallerNumber.startsWith('+') ? rawCallerNumber : `+972${rawCallerNumber.replace(/^0/, '')}`
    : null

  if (!calledNumber) {
    return NextResponse.json({ dynamic_variables: { business_name: 'העסק' } })
  }

  const supabase = createAdminClient()
  const { data: customer } = await supabase
    .from('customers')
    .select('id, business_name, voice_id')
    .or(`twilio_number.eq.${calledNumber},telnyx_number.eq.${calledNumber}`)
    .single()

  const businessName = customer?.business_name || 'העסק'
  const agentName = getVoiceName(customer?.voice_id)

  let callRecordId: string | null = null
  if (customer?.id) {
    const since = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: recentCall } = await supabase
      .from('calls')
      .select('id')
      .eq('customer_id', customer.id)
      .is('elevenlabs_conversation_id', null)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (recentCall?.id) {
      callRecordId = recentCall.id
    } else {
      const { data: newCall } = await supabase
        .from('calls')
        .insert({
          customer_id: customer.id,
          caller_number: callerNumber || 'unknown',
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single()
      callRecordId = newCall?.id || null
    }
  }

  return NextResponse.json({
    dynamic_variables: { business_name: businessName, call_record_id: callRecordId, agent_name: agentName },
  })
}
