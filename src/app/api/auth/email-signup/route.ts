import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'חסרים פרטים' }, { status: 400 })

  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists')) {
      return NextResponse.json({ error: 'אימייל זה כבר רשום. נסה להיכנס.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'שגיאה - נסה שנית' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, userId: data.user.id })
}
