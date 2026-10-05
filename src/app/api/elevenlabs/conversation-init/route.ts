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
    .select('id, business_name, voice_id, gcal_refresh_token')
    .or(`twilio_number.eq.${calledNumber},telnyx_number.eq.${calledNumber}`)
    .single()

  const businessName = customer?.business_name || 'העסק'
  const agentName = getVoiceName(customer?.voice_id)

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jerusalem' })
  const schedulingSection = customer?.gcal_refresh_token
    ? `\n[יכולת קביעת פגישות]\nאם המתקשר מבקש לקבוע פגישה, ייעוץ, מפגש או כל נושא שדורש תיאום - תוכל לקבוע ישירות ביומן.\nתאריך היום: ${today}. קבלת פגישות: ראשון עד שישי, 09:00-18:00, כל 30 דקות.\n\nסדר קביעת פגישה:\n1. שאל לאיזה תאריך מועדף (המר לפורמט YYYY-MM-DD).\n2. קרא ל-check_availability עם call_record_id ו-date.\n3. הצג עד 4 זמנים פנויים (אמור: "יש לי פנוי ב-09:00, 09:30, 10:00...").\n4. לאחר בחירת שעה — שאל שם מלא וסיבת הפגישה.\n5. קרא ל-book_appointment עם כל הפרטים.\n6. אשר: "הפגישה נקבעה ל-[תאריך] בשעה [שעה]. נתראה!"`
    : ''

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
    dynamic_variables: {
      business_name: businessName,
      call_record_id: callRecordId,
      agent_name: agentName,
      scheduling_section: schedulingSection,
    },
  })
}
