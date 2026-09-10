import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const PROMO_SECRET = process.env.PROMO_API_SECRET

function randomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)]
  return `JINGLE-${s}`
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-promo-secret')
  if (!PROMO_SECRET || secret !== PROMO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { source = 'jinglephone' } = await req.json().catch(() => ({}))
  const supabase = createAdminClient()

  let code = ''
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = randomCode()
    const { error } = await supabase.from('promo_codes').insert({ code: candidate, source })
    if (!error) { code = candidate; break }
  }

  if (!code) return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })

  return NextResponse.json({ code })
}
