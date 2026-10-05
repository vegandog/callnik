import { createAdminClient } from '@/lib/supabase/admin'
import { getAvailableSlots } from '@/lib/google-calendar'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { call_record_id, date } = body

  if (!call_record_id || !date) {
    return NextResponse.json({ available: false, message: 'חסרים פרטים' })
  }

  // Validate YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ available: false, message: 'פורמט תאריך שגוי, השתמש ב-YYYY-MM-DD' })
  }

  const supabase = createAdminClient()
  const { data: callRecord } = await supabase
    .from('calls')
    .select('customer_id')
    .eq('id', call_record_id)
    .single()

  if (!callRecord) {
    return NextResponse.json({ available: false, message: 'שגיאה פנימית' })
  }

  const { data: customer } = await supabase
    .from('customers')
    .select('gcal_refresh_token')
    .eq('id', callRecord.customer_id)
    .single()

  if (!customer?.gcal_refresh_token) {
    return NextResponse.json({ available: false, message: 'קביעת פגישות לא מופעלת' })
  }

  const slots = await getAvailableSlots(callRecord.customer_id, date)

  if (slots.length === 0) {
    return NextResponse.json({ available: false, message: 'אין זמנים פנויים בתאריך זה' })
  }

  return NextResponse.json({
    available: true,
    date,
    slots: slots.slice(0, 6),
    message: `נמצאו ${slots.length} זמנים פנויים`,
  })
}
