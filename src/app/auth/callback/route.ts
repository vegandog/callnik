import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const origin = request.headers.get('origin') || 'https://callnik.com'

  if (!code) return NextResponse.redirect(`${origin}/login`)

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !user) return NextResponse.redirect(`${origin}/login`)

  const admin = createAdminClient()
  const { data: existing } = await admin.from('users').select('id').eq('id', user.id).single()

  return NextResponse.redirect(`${origin}${existing ? '/dashboard' : '/onboarding'}`)
}
