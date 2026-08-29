import { createAdminClient } from '@/lib/supabase/admin'
import { sendCallNotification } from '@/lib/notify'
import { sendCallNotificationEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

// Allow up to 60s (Vercel Pro limit)
export const maxDuration = 60

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY!

async function summarizeWithClaude(transcript: string, businessName: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `תמצת את השיחה הבאה לבעל העסק "${businessName}".
כתוב בדיוק שלוש שורות טקסט רגיל, ללא markdown, ללא כוכביות, ללא כותרות:
שם המתקשר: [שם]
בקשה: [מה ביקש]
מספר לחזרה: [מספר או "לא צוין"]

תמלול השיחה:
${transcript}

ענה בעברית בלבד, שלוש שורות בלבד, טקסט רגיל בלי עיצוב.`,
      }],
    }),
  })
  const data = await res.json()
  return data.content?.[0]?.text || ''
}


async function findElevenLabsConversation(
  callRecordId: string,
  callerNumber: string,
  callCreatedAt: number,
  callDuration: number
): Promise<string | null> {
  const listRes = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${process.env.ELEVENLABS_AGENT_ID}&page_size=50`,
    { headers: { 'xi-api-key': ELEVENLABS_API_KEY } }
  )
  if (!listRes.ok) return null
  const listData = await listRes.json()
  const all = listData.conversations || []

  // Pre-filter by time window (list already has start_time_unix_secs - no extra API calls)
  // Window: call started ±60s, status done
  const candidates = all.filter((c: { status: string; start_time_unix_secs: number }) =>
    c.status === 'done' &&
    c.start_time_unix_secs >= callCreatedAt - 60 &&
    c.start_time_unix_secs <= callCreatedAt + callDuration + 60
  )

  for (const conv of candidates) {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conv.conversation_id}`,
      { headers: { 'xi-api-key': ELEVENLABS_API_KEY } }
    )
    if (!res.ok) continue
    const data = await res.json()
    const vars = data.conversation_initiation_client_data?.dynamic_variables || {}

    // Exact match by call_record_id (new calls) or fallback by caller number
    if (vars.call_record_id === callRecordId) return conv.conversation_id
    if (vars.system__caller_id === callerNumber) return conv.conversation_id
  }

  return null
}

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const callSid = body.get('CallSid') as string
  const callStatus = body.get('CallStatus') as string
  const duration = parseInt(body.get('CallDuration') as string || '0', 10)

  if (callStatus !== 'completed') return NextResponse.json({ ok: true })

  const supabase = createAdminClient()

  const { data: callRecord } = await supabase
    .from('calls')
    .select('id, customer_id, caller_number, elevenlabs_conversation_id, created_at')
    .eq('call_sid', callSid)
    .single()

  if (!callRecord) return NextResponse.json({ ok: true })

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, whatsapp_number')
    .eq('id', callRecord.customer_id)
    .single()

  if (!customer) return NextResponse.json({ ok: true })

  await supabase.from('calls').update({ duration_seconds: duration }).eq('id', callRecord.id)

  const callCreatedUnix = Math.floor(new Date(callRecord.created_at).getTime() / 1000)

  // Two attempts: wait 20s then 15s more if still not found
  let elConversationId: string | null = null

  for (let attempt = 0; attempt < 2; attempt++) {
    await new Promise(r => setTimeout(r, attempt === 0 ? 20000 : 15000))

    // If ElevenLabs webhook already fired, don't duplicate
    const { data: fresh } = await supabase
      .from('calls')
      .select('elevenlabs_conversation_id')
      .eq('id', callRecord.id)
      .single()
    if (fresh?.elevenlabs_conversation_id) return NextResponse.json({ ok: true })

    elConversationId = await findElevenLabsConversation(
      callRecord.id,
      callRecord.caller_number,
      callCreatedUnix,
      duration
    )
    if (elConversationId) break
  }

  // Fetch transcript + recording from ElevenLabs
  let summary = ''
  let callerName = ''
  let transcript = ''
  let recordingUrl = ''

  if (elConversationId) {
    try {
      const elRes = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${elConversationId}`,
        { headers: { 'xi-api-key': ELEVENLABS_API_KEY } }
      )
      const elData = await elRes.json()
      const rawTranscript = elData.transcript || []
      transcript = Array.isArray(rawTranscript)
        ? rawTranscript.map((t: { role: string; message: string }) =>
            `${t.role === 'agent' ? 'דנה' : 'מתקשר'}: ${t.message}`
          ).join('\n')
        : String(rawTranscript)

      if (transcript) summary = await summarizeWithClaude(transcript, customer.business_name)

      if (summary) {
        const nameMatch = summary.match(/שם המתקשר[^:\n]*:\s*([^\n]+)/i)
        callerName = nameMatch?.[1]?.trim() || ''
      }

      // Upload recording to Supabase Storage
      const audioRes = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversations/${elConversationId}/audio`,
        { headers: { 'xi-api-key': ELEVENLABS_API_KEY } }
      )
      if (audioRes.ok) {
        const audioBuffer = await audioRes.arrayBuffer()
        const { createClient } = await import('@supabase/supabase-js')
        const storage = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
        const fileName = `${elConversationId}.mp3`
        await storage.storage.from('recordings').upload(fileName, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        })
        const { data: urlData } = storage.storage.from('recordings').getPublicUrl(fileName)
        recordingUrl = urlData.publicUrl
      }
    } catch (e) {
      console.error('ElevenLabs fetch failed:', e)
    }
  }

  await supabase
    .from('calls')
    .update({
      ...(elConversationId ? { elevenlabs_conversation_id: elConversationId } : {}),
      caller_name: callerName || null,
      reason_summary: summary,
      transcript_full: transcript,
      duration_seconds: duration,
    })
    .eq('id', callRecord.id)

  const callTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' })

  try {
    await sendCallNotification(
      customer.whatsapp_number,
      callerName || '',
      callTime,
      summary,
      callRecord.caller_number || '',
      callRecord.id
    )
  } catch (e) {
    console.error('WhatsApp send failed:', e)
  }

  // Also send email notification
  try {
    const { data: userRow } = await supabase
      .from('users')
      .select('email')
      .eq('customer_id', callRecord.customer_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (userRow?.email) {
      await sendCallNotificationEmail(
        userRow.email,
        customer.business_name,
        callerName || '',
        callTime,
        summary,
        callRecord.caller_number || '',
        callRecord.id
      )
    }
  } catch (e) {
    console.error('Email send failed:', e)
  }

  return NextResponse.json({ ok: true })
}
