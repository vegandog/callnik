import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CAL_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/google-calendar/callback`,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
    state: user.id,
  })

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
}
