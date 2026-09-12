import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendActivationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'

const TELNYX_PUBLIC_KEY = 'QJHXQYxeNOBvYW29es8IAdrSNfDIGlJPrxOp8CqWM8A='

async function verifySignature(rawBody: string, signature: string, timestamp: string): Promise<boolean> {
  try {
    const keyBytes = Uint8Array.from(Buffer.from(TELNYX_PUBLIC_KEY, 'base64'))
    const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'Ed25519' }, false, ['verify'])
    const message = new TextEncoder().encode(`${timestamp}|${rawBody}`)
    const sig = Uint8Array.from(Buffer.from(signature, 'base64'))
    return await crypto.subtle.verify('Ed25519', key, sig, message)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('telnyx-signature-ed25519') ?? ''
  const timestamp = req.headers.get('telnyx-timestamp') ?? ''

  // Verify signature (log warning if invalid but still process in dev)
  if (signature && timestamp) {
    const valid = await verifySignature(rawBody, signature, timestamp)
    if (!valid) {
      console.warn('Telnyx webhook: invalid signature')
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  let event: Record<string, unknown>
  try {
    event = JSON.parse(rawBody)
  } catch {
    return new NextResponse('Bad Request', { status: 400 })
  }

  const eventType = (event.data as Record<string, unknown>)?.event_type as string
  if (eventType !== 'number_order.complete') {
    return NextResponse.json({ ok: true })
  }

  const payload = (event.data as Record<string, unknown>)?.payload as Record<string, unknown>
  const orderStatus = payload?.status as string
  const customerRef = payload?.customer_reference as string | undefined
  const phoneNumbers = payload?.phone_numbers as Array<{ phone_number: string; status: string }> | undefined

  // Extract customer_id from customer_reference "callnik-{uuid}"
  const customerId = customerRef?.startsWith('callnik-') ? customerRef.slice('callnik-'.length) : null
  if (!customerId || orderStatus !== 'success' || !phoneNumbers?.length) {
    return NextResponse.json({ ok: true })
  }

  const phoneNumber = phoneNumbers.find(p => p.status === 'success')?.phone_number
  if (!phoneNumber) return NextResponse.json({ ok: true })

  const admin = createAdminClient()

  // Activate customer
  const { data: customer } = await admin
    .from('customers')
    .select('id, business_name, carrier, voice_id, status, telnyx_number')
    .eq('id', customerId)
    .single()

  if (!customer) return NextResponse.json({ ok: true })

  await admin
    .from('customers')
    .update({ telnyx_number: phoneNumber, status: 'active' })
    .eq('id', customerId)

  // Send activation email only for pending→complete transitions (number not previously set)
  if (!customer.telnyx_number) {
    const { data: userRow } = await admin
      .from('users')
      .select('id, email')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (userRow?.email) {
      const { data: authData } = await admin.auth.admin.getUserById(userRow.id)
      const firstName = authData?.user?.user_metadata?.first_name
      const lastName = authData?.user?.user_metadata?.last_name
      sendActivationEmail(
        userRow.email,
        customer.business_name,
        phoneNumber,
        customer.carrier ?? '',
        firstName,
        lastName,
        getVoiceName(customer.voice_id)
      ).catch(console.error)
    }
  }

  return NextResponse.json({ ok: true })
}
