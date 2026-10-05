import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const userId = searchParams.get('state')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

  if (!code || !userId) {
    return NextResponse.redirect(`${baseUrl}/settings?gcal=error`)
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CAL_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CAL_CLIENT_SECRET!,
      redirect_uri: `${baseUrl}/api/google-calendar/callback`,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${baseUrl}/settings?gcal=error`)
  }

  const tokens = await tokenRes.json()
  const supabase = createAdminClient()

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', userId)
    .single()

  if (!userRecord) {
    return NextResponse.redirect(`${baseUrl}/settings?gcal=error`)
  }

  await supabase.from('customers').update({
    gcal_refresh_token: tokens.refresh_token,
    gcal_access_token: tokens.access_token,
    gcal_token_expiry: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
  }).eq('id', userRecord.customer_id)

  return NextResponse.redirect(`${baseUrl}/settings?gcal=connected`)
}
