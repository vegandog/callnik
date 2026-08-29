import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  // ElevenLabs sends the called number so we can look up the customer
  const calledNumber =
    data.called_number ||
    data.conversation_initiation_metadata_event?.called_number ||
    data.metadata?.called_number

  if (!calledNumber) {
    return NextResponse.json({ dynamic_variables: { business_name: 'העסק' } })
  }

  const supabase = createAdminClient()
  const { data: customer } = await supabase
    .from('customers')
    .select('id, business_name')
    .or(`twilio_number.eq.${calledNumber},telnyx_number.eq.${calledNumber}`)
    .single()

  const businessName = customer?.business_name || 'העסק'

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
    callRecordId = recentCall?.id || null
  }

  return NextResponse.json({
    dynamic_variables: { business_name: businessName, call_record_id: callRecordId },
  })
}
