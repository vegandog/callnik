import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ valid: false })

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('promo_codes')
    .select('id, used_at, expires_at, discount_type, max_uses, use_count')
    .eq('code', code.toUpperCase().trim())
    .single()

  if (!data) return NextResponse.json({ valid: false, reason: 'not_found' })

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, reason: 'expired' })
  }

  const maxUses = data.max_uses ?? 1
  const useCount = data.use_count ?? 0
  const usedUp = maxUses !== 0 && useCount >= maxUses
  if (!usedUp && maxUses === 1 && data.used_at) return NextResponse.json({ valid: false, reason: 'used' })
  if (usedUp) return NextResponse.json({ valid: false, reason: 'used' })

  return NextResponse.json({ valid: true, discount: data.discount_type || 'first_month_1nis' })
}
