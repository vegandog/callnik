import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('promo_codes')
    .select('id, code, source, discount_type, max_uses, use_count, expires_at, used_at, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ codes: data || [] })
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const supabase = createAdminClient()
  const { error } = await supabase.from('promo_codes').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
