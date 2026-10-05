import { createAdminClient } from './supabase/admin'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3'

function getIsraelUTCOffset(): number {
  const now = new Date()
  const israelHour = parseInt(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem', hour: 'numeric', hour12: false }))
  const utcHour = parseInt(now.toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', hour12: false }))
  return (israelHour - utcHour + 24) % 24
}

function israelToDate(dateStr: string, timeStr: string): Date {
  const offset = getIsraelUTCOffset()
  const sign = '+'
  const offsetStr = `${sign}${String(offset).padStart(2, '0')}:00`
  return new Date(`${dateStr}T${timeStr}:00${offsetStr}`)
}

async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string; expiry: Date }> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CAL_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CAL_CLIENT_SECRET!,
    }),
  })
  if (!res.ok) throw new Error('Failed to refresh Google token')
  const data = await res.json()
  return {
    access_token: data.access_token,
    expiry: new Date(Date.now() + data.expires_in * 1000),
  }
}

export async function getAccessToken(customerId: string): Promise<string | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('customers')
    .select('gcal_refresh_token, gcal_access_token, gcal_token_expiry')
    .eq('id', customerId)
    .single()

  if (!data?.gcal_refresh_token) return null

  if (data.gcal_access_token && data.gcal_token_expiry) {
    if (new Date(data.gcal_token_expiry) > new Date(Date.now() + 5 * 60 * 1000)) {
      return data.gcal_access_token
    }
  }

  const tokenInfo = await refreshAccessToken(data.gcal_refresh_token)
  await supabase.from('customers').update({
    gcal_access_token: tokenInfo.access_token,
    gcal_token_expiry: tokenInfo.expiry.toISOString(),
  }).eq('id', customerId)

  return tokenInfo.access_token
}

export async function getAvailableSlots(customerId: string, dateStr: string): Promise<string[]> {
  const accessToken = await getAccessToken(customerId)
  if (!accessToken) return []

  const timeMin = israelToDate(dateStr, '09:00').toISOString()
  const timeMax = israelToDate(dateStr, '18:00').toISOString()

  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
  })

  const res = await fetch(`${CALENDAR_API}/calendars/primary/events?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) return []
  const data = await res.json()
  const events: Array<{ start: { dateTime?: string }; end: { dateTime?: string } }> = data.items || []

  const allSlots: string[] = []
  for (let h = 9; h < 18; h++) {
    allSlots.push(`${String(h).padStart(2, '0')}:00`)
    allSlots.push(`${String(h).padStart(2, '0')}:30`)
  }

  const now = new Date()

  return allSlots.filter(slot => {
    const slotStart = israelToDate(dateStr, slot)
    const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000)
    if (slotStart <= now) return false
    for (const event of events) {
      if (!event.start.dateTime) continue
      const evStart = new Date(event.start.dateTime)
      const evEnd = new Date(event.end!.dateTime!)
      if (slotStart < evEnd && slotEnd > evStart) return false
    }
    return true
  })
}

export async function bookAppointment(
  customerId: string,
  dateStr: string,
  timeStr: string,
  callerName: string,
  reason: string,
  callerPhone: string,
  businessName: string,
): Promise<boolean> {
  const accessToken = await getAccessToken(customerId)
  if (!accessToken) return false

  const startDate = israelToDate(dateStr, timeStr)
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)

  const res = await fetch(`${CALENDAR_API}/calendars/primary/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: `פגישה - ${callerName}`,
      description: `סיבה: ${reason}\nטלפון: ${callerPhone}\nנקבע ע"י ${businessName} AI`,
      start: { dateTime: startDate.toISOString(), timeZone: 'Asia/Jerusalem' },
      end: { dateTime: endDate.toISOString(), timeZone: 'Asia/Jerusalem' },
    }),
  })

  return res.ok
}
