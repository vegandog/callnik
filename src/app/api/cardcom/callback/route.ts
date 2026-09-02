import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://callnik.com'

// Cardcom redirects the iframe here after payment.
// Token saving happens in the webhook route (which has the LowProfileId via pending_lp_id).
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const responseCode = searchParams.get('ResponseCode')

  if (responseCode && responseCode !== '0') {
    return new NextResponse(
      `<!DOCTYPE html><html><body><script>window.top.location.href="${BASE_URL}/payment?error=1";</script></body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new NextResponse(
    `<!DOCTYPE html><html><body><script>window.top.location.href="${BASE_URL}/setup";</script></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
