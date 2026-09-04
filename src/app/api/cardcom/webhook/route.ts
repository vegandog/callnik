import { NextRequest, NextResponse } from 'next/server'

const CARDCOM_TERMINAL = 190666
const CARDCOM_API_NAME = 'sAwPXwN5jjRPhSKn5NRn'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function dbGet(table: string, filter: string, columns: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}&select=${columns}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  const data = await res.json()
  return Array.isArray(data) ? data[0] : null
}

async function dbPatch(table: string, filter: string, body: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  const rawText = await req.text()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = {}
  try {
    data = JSON.parse(rawText)
  } catch {
    const params = new URLSearchParams(rawText)
    params.forEach((v, k) => { data[k] = v })
  }

  if (data.ResponseCode !== 0) {
    return new NextResponse('-1', { headers: { 'Content-Type': 'text/plain' } })
  }

  const parts = (data.ReturnValue || '').split(':')
  const customerId = parts[0]
  const plan = parts[1]

  if (!customerId) return NextResponse.json({ ok: false })

  // LowProfileId was saved at session creation — use it to fetch the token
  const customer = await dbGet('customers', `id=eq.${customerId}`, 'pending_lp_id')
  const lowProfileId = customer?.pending_lp_id

  let token: string | null = null
  let cardMonth: string | null = null
  let cardYear: string | null = null
  let tokenExDate: string | null = null

  if (lowProfileId) {
    try {
      const lpRes = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/GetLpResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TerminalNumber: CARDCOM_TERMINAL, ApiName: CARDCOM_API_NAME, LowProfileId: lowProfileId }),
      })
      const lpData = await lpRes.json()
      if (lpData.ResponseCode === 0 && lpData.TokenInfo?.Token) {
        token = lpData.TokenInfo.Token
        cardMonth = String(lpData.TokenInfo.CardMonth || lpData.UIValues?.CardMonth || '')
        cardYear = String(lpData.TokenInfo.CardYear || lpData.UIValues?.CardYear || '')
        tokenExDate = lpData.TokenInfo.TokenExDate || null
      }
    } catch (e) {
      console.error('GetLpResult error:', e)
    }
  }

  const now = new Date()
  const nextBilling = plan === 'annual'
    ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())

  await dbPatch('customers', `id=eq.${customerId}`, {
    status: 'active',
    cardcom_token: token || null,
    card_month: cardMonth || null,
    card_year: cardYear || null,
    token_expiry: tokenExDate ? parseExpiry(tokenExDate) : null,
    plan: (plan === 'test' ? 'monthly' : plan) || 'monthly',
    next_billing_date: token ? nextBilling.toISOString().split('T')[0] : null,
    billing_failures: 0,
    pending_lp_id: null,
  })

  return new NextResponse('-1', { headers: { 'Content-Type': 'text/plain' } })
}

function parseExpiry(raw: string): string | null {
  try {
    if (!raw) return null
    if (raw.includes('-')) return raw
    if (/^\d{8}$/.test(raw)) return `${raw.substring(0, 4)}-${raw.substring(4, 6)}-01`
    const [mm, yy] = raw.split('/')
    if (!mm || !yy) return null
    return `20${yy}-${mm}-01`
  } catch {
    return null
  }
}
