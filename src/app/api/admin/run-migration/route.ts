import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const CRON_SECRET = process.env.CRON_SECRET || ''

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if column exists
  const check = await fetch(`${SUPABASE_URL}/rest/v1/customers?select=tier&limit=1`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (check.ok) return NextResponse.json({ message: 'already exists' })

  // Use Supabase's built-in SQL execution via service_role
  const sql = `ALTER TABLE customers ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'basic'`
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/query`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql }),
  })
  const data = await res.json()
  return NextResponse.json({ status: res.status, data })
}
