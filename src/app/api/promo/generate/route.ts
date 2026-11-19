import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const PROMO_SECRET = process.env.PROMO_API_SECRET

function randomCode(): string {
  return String(Math.floor(10000 + Math.random() * 90000))
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-promo-secret')
  if (!PROMO_SECRET || secret !== PROMO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const source = body.source || 'manual'
  const discount_type = 'amount' in body ? String(body.amount) : (body.discount_type || 'first_month_1nis')
  const max_uses = typeof body.max_uses === 'number' ? body.max_uses : 1
  const expires_days = typeof body.expires_days === 'number' && body.expires_days > 0 ? body.expires_days : null
  const expires_at = expires_days ? new Date(Date.now() + expires_days * 86400000).toISOString() : null

  const supabase = createAdminClient()

  let code = ''
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = randomCode()
    const { error } = await supabase.from('promo_codes').insert({
      code: candidate, source, discount_type, max_uses, expires_at,
    })
    if (!error) { code = candidate; break }
  }

  if (!code) return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })

  return NextResponse.json({ code })
}
