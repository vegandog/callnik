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

  // User already registered — send to dashboard
  const { data: existing } = await admin
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (existing) return NextResponse.redirect(`${origin}/dashboard`)

  // New user — read business data saved before OAuth redirect
  const regCookie = request.cookies.get('callnik_reg')?.value
  if (!regCookie) return NextResponse.redirect(`${origin}/register`)

  let regData: { business_name: string; category: string; whatsapp_number: string; carrier: string }
  try { regData = JSON.parse(regCookie) } catch { return NextResponse.redirect(`${origin}/register`) }

  const { data: customer, error: customerError } = await admin
    .from('customers')
    .insert({
      business_name: regData.business_name,
      category: regData.category,
      whatsapp_number: regData.whatsapp_number,
      carrier: regData.carrier,
      status: 'pending',
    })
    .select()
    .single()

  if (customerError) return NextResponse.redirect(`${origin}/register`)

  await admin.from('users').insert({
    id: user.id,
    customer_id: customer.id,
    email: user.email,
  })

  const response = NextResponse.redirect(`${origin}/setup`)
  response.cookies.delete('callnik_reg')
  return response
}
