import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const GOOGLE_CLIENT_ID = '419201388686-k83ee8pifckjjkqbvc8c416c4rn0taqn.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const origin = 'https://callnik.com'

  if (!code) return NextResponse.redirect(`${origin}/login`)

  // Exchange code directly with Google
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${origin}/auth/callback`,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) return NextResponse.redirect(`${origin}/login`)
  const tokens = await tokenRes.json()

  // Sign in to Supabase using the Google ID token
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: tokens.id_token,
  })

  if (error || !user) return NextResponse.redirect(`${origin}/login`)

  const admin = createAdminClient()
  const { data: existing } = await admin.from('users').select('id').eq('id', user.id).single()

  return NextResponse.redirect(`${origin}${existing ? '/dashboard' : '/onboarding'}`)
}
