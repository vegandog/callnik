import { NextRequest, NextResponse } from 'next/server'

const VERIFY_TOKEN = process.env.FACEBOOK_LEAD_VERIFY_TOKEN!
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const SALES_AGENT_ID = process.env.ELEVENLABS_SALES_AGENT_ID!
const SALES_PHONE_NUMBER_ID = process.env.ELEVENLABS_SALES_PHONE_NUMBER_ID!

// Facebook Lead Ads webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// Receive new leads and call them
export async function POST(req: NextRequest) {
  const body = await req.json()

  // Facebook sends changes array
  const changes = body.entry?.[0]?.changes
  if (!changes?.length) return NextResponse.json({ ok: true })

  for (const change of changes) {
    if (change.field !== 'leadgen') continue

    const leadgenId = change.value?.leadgen_id
    const formId = change.value?.form_id
    const pageId = change.value?.page_id
    if (!leadgenId || !formId || !pageId) continue

    // Fetch lead details from Facebook Graph API
    const lead = await fetchLeadData(leadgenId)
    if (!lead?.phone) continue

    // Call the lead with the sales agent
    await makeOutboundSalesCall(lead.phone, lead.name)
  }

  return NextResponse.json({ ok: true })
}

async function fetchLeadData(leadgenId: string): Promise<{ phone: string; name: string } | null> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  if (!token) return null

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${token}`
    )
    if (!res.ok) return null
    const data = await res.json()

    const fields: { name: string; values: string[] }[] = data.field_data || []
    const phone = fields.find(f => f.name === 'phone_number')?.values[0] || ''
    const name = fields.find(f => f.name === 'full_name')?.values[0] || ''

    if (!phone) return null
    return { phone: normalizePhone(phone), name }
  } catch {
    return null
  }
}

function normalizePhone(phone: string): string {
  // Convert Israeli local format (05x) to international (+9725x)
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('972')) return `+${digits}`
  if (digits.startsWith('0')) return `+972${digits.slice(1)}`
  return `+${digits}`
}

async function makeOutboundSalesCall(toNumber: string, leadName: string): Promise<void> {
  if (!SALES_PHONE_NUMBER_ID) {
    console.error('ELEVENLABS_SALES_PHONE_NUMBER_ID not set - skipping outbound call')
    return
  }

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/convai/sip-trunk/outbound-call', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: SALES_AGENT_ID,
        agent_phone_number_id: SALES_PHONE_NUMBER_ID,
        to_number: toNumber,
        conversation_initiation_client_data: {
          dynamic_variables: {
            lead_name: leadName || 'שלום',
          },
        },
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('Outbound call failed:', data)
    } else {
      console.log(`Outbound call initiated to ${toNumber}:`, data.conversation_id)
    }
  } catch (e) {
    console.error('makeOutboundSalesCall error:', e)
  }
}
