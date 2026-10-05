import { createAdminClient } from '@/lib/supabase/admin'
import { bookAppointment } from '@/lib/google-calendar'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { call_record_id, date, time, caller_name, reason } = body

  if (!call_record_id || !date || !time) {
    return NextResponse.json({ success: false, message: 'חסרים פרטים לקביעת הפגישה' })
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ success: false, message: 'פורמט תאריך או שעה שגוי' })
  }

  const supabase = createAdminClient()
  const { data: callRecord } = await supabase
    .from('calls')
    .select('customer_id, caller_number')
    .eq('id', call_record_id)
    .single()

  if (!callRecord) {
    return NextResponse.json({ success: false, message: 'שגיאה פנימית' })
  }

  const { data: customer } = await supabase
    .from('customers')
    .select('gcal_refresh_token, business_name')
    .eq('id', callRecord.customer_id)
    .single()

  if (!customer?.gcal_refresh_token) {
    return NextResponse.json({ success: false, message: 'קביעת פגישות לא מופעלת' })
  }

  const success = await bookAppointment(
    callRecord.customer_id,
    date,
    time,
    caller_name || 'לקוח',
    reason || 'פגישה',
    callRecord.caller_number || '',
    customer.business_name,
  )

  if (success) {
    return NextResponse.json({
      success: true,
      message: `הפגישה נקבעה ל-${date} בשעה ${time}`,
    })
  }

  return NextResponse.json({ success: false, message: 'שגיאה בקביעת הפגישה, נסה שנית' })
}
