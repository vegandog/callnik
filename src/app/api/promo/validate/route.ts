import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ valid: false })

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('promo_codes')
    .select('id, used_at, expires_at')
    .eq('code', code.toUpperCase().trim())
    .single()

  if (!data) return NextResponse.json({ valid: false, reason: 'not_found' })
  if (data.used_at) return NextResponse.json({ valid: false, reason: 'used' })
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, reason: 'expired' })
  }

  return NextResponse.json({ valid: true, discount: 'first_month_1nis' })
}
