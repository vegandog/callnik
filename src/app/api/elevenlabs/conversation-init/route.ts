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
    .select('id, business_name, voice_id, gcal_refresh_token, gcal_appointment_type, gcal_hours_start, gcal_hours_end, gcal_working_days')
    .or(`twilio_number.eq.${calledNumber},telnyx_number.eq.${calledNumber}`)
    .single()

  const businessName = customer?.business_name || 'העסק'
  const agentName = getVoiceName(customer?.voice_id)

  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Jerusalem' })
  const apptWord = customer?.gcal_appointment_type || 'פגישה'
  const hoursStart = customer?.gcal_hours_start || '09:00'
  const hoursEnd = customer?.gcal_hours_end || '18:00'
  const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  const workingDaysArr: number[] = JSON.parse(customer?.gcal_working_days || '[0,1,2,3,4]')
  const workingDaysText = workingDaysArr.map(d => dayNames[d]).join(', ')

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

  const schedulingSection = customer?.gcal_refresh_token && callRecordId
    ? `\n[יכולת קביעת ${apptWord}]\nתאריך היום: ${today}. ימי פעילות: ${workingDaysText}. שעות פעילות: ${hoursStart}-${hoursEnd}, כל 30 דקות.\nה-call_record_id לשיחה זו: ${callRecordId}\n\n**שנה את פתיחת השיחה:** לאחר ברכת הפתיחה, שאל: "אשמח לעזור — עדיף לך להשאיר הודעה, או לקבוע ${apptWord}?"\n- אם הודעה → תהליך רגיל (שם, הודעה, מספר לחזרה)\n- אם ${apptWord}:\n  1. שאל לאיזה תאריך מועדף (המר ל-YYYY-MM-DD, לדוגמה: מחר = ${new Date(Date.now() + 86400000).toLocaleDateString('sv-SE', { timeZone: 'Asia/Jerusalem' })})\n  2. קרא ל-check_availability עם call_record_id="${callRecordId}" ו-date=YYYY-MM-DD\n  3. הצג עד 4 זמנים פנויים\n  4. שאל שם מלא וסיבת ה${apptWord}\n  5. קרא ל-book_appointment עם call_record_id="${callRecordId}", date, time, caller_name, reason\n  6. אשר: "ה${apptWord} נקבעה ל-[תאריך] בשעה [שעה]!"`
    : ''

  const firstQuestion = customer?.gcal_refresh_token && callRecordId
    ? `תרצה להשאיר הודעה, או לקבוע ${apptWord}?`
    : 'אז, מה השם, בבקשה?'

  return NextResponse.json({
    dynamic_variables: {
      business_name: businessName,
      call_record_id: callRecordId,
      agent_name: agentName,
      scheduling_section: schedulingSection,
      first_question: firstQuestion,
    },
  })
}
