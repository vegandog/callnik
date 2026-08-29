import { createAdminClient } from '@/lib/supabase/admin'
import { VOICES } from '@/lib/constants'
import { NextResponse } from 'next/server'

const EL_KEY = process.env.ELEVENLABS_API_KEY!

async function checkTwilioWebhook() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!
  const authToken = process.env.TWILIO_AUTH_TOKEN!
  const creds = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/IncomingPhoneNumbers.json`,
    { headers: { Authorization: `Basic ${creds}` } }
  )
  if (!res.ok) return { ok: false, message: 'Twilio API error' }

  const data = await res.json()
  const numbers: { phone_number: string; voice_url: string }[] = data.incoming_phone_numbers || []

  const hijacked = numbers.filter(n => n.voice_url && !n.voice_url.includes('callnik.com/api/twilio/voice'))
  if (hijacked.length > 0) {
    return { ok: false, message: `webhook hijacked on: ${hijacked.map(n => n.phone_number).join(', ')}` }
  }
  return { ok: true, message: `${numbers.length} number(s) OK` }
}

async function checkAgents() {
  const results = await Promise.all(
    VOICES.map(async v => {
      const res = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${v.agentId}`, {
        headers: { 'xi-api-key': EL_KEY },
      })
      if (!res.ok) return { ok: false, name: v.name }
      const d = await res.json()
      const firstMsg: string = d.conversation_config?.agent?.first_message || ''
      if (firstMsg.includes('{{business_name}}') && !firstMsg.includes('{{')) return { ok: true, name: v.name }
      const hasDynamic = firstMsg.includes('{{business_name}}')
      return { ok: hasDynamic, name: v.name, missing: !hasDynamic }
    })
  )
  const bad = results.filter(r => !r.ok)
  if (bad.length > 0) return { ok: false, message: `agents with issues: ${bad.map(r => r.name).join(', ')}` }
  return { ok: true, message: `${VOICES.length} agents OK` }
}

async function checkRecentCalls() {
  const supabase = createAdminClient()
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString()

  const { data } = await supabase
    .from('calls')
    .select('id, caller_name, created_at')
    .gte('created_at', since)
    .lt('created_at', cutoff)

  const total = data?.length ?? 0
  if (total === 0) return { ok: true, message: 'no calls in last 24h' }

  const succeeded = data!.filter(c => c.caller_name).length
  const rate = Math.round((succeeded / total) * 100)
  const ok = rate >= 50 || total < 3
  return { ok, message: `${succeeded}/${total} completed (${rate}%)` }
}

export async function GET() {
  const [twilioWebhook, agents, calls] = await Promise.all([
    checkTwilioWebhook(),
    checkAgents(),
    checkRecentCalls(),
  ])

  const checks = [
    { name: 'Twilio webhook', ...twilioWebhook },
    { name: 'ElevenLabs agents', ...agents },
    { name: 'Recent calls success rate', ...calls },
  ]

  const ok = checks.every(c => c.ok)
  return NextResponse.json({ ok, checks }, { status: ok ? 200 : 503 })
}
