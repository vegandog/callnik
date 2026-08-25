import { createAdminClient } from '@/lib/supabase/admin'
import { sendCallNotification } from '@/lib/notify'
import { NextRequest, NextResponse } from 'next/server'

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
        content: `תמצת את השיחה הבאה לבעל העסק "${businessName}" בשלוש שורות בלבד:
- שם המתקשר
- מה ביקש
- מספר ליצירת קשר (אם ניתן)

תמלול השיחה:
${transcript}

ענה בעברית בלבד, תמציתי.`,
      }],
    }),
  })
  const data = await res.json()
  return data.content?.[0]?.text || ''
}


export async function POST(req: NextRequest) {
  const data = await req.json()

  // ElevenLabs sends conversation data when done
  const conversationId = data.conversation_id || data.data?.conversation_id
  const transcript = data.transcript || data.data?.transcript || []
  const dynVars = data.data?.conversation_initiation_client_data?.dynamic_variables
    || data.conversation_initiation_client_data?.dynamic_variables
    || {}
  const callRecordId = dynVars.call_record_id
  const callerNumber = dynVars.system__caller_id

  if (!conversationId) {
    return NextResponse.json({ ok: true })
  }

  const supabase = createAdminClient()

  // Find call record: prefer call_record_id (exact), fall back to caller_number (heuristic)
  let callRecord: { id: string; customer_id: string; caller_number: string } | null = null
  if (callRecordId) {
    const { data } = await supabase
      .from('calls')
      .select('id, customer_id, caller_number')
      .eq('id', callRecordId)
      .single()
    callRecord = data
  } else if (callerNumber) {
    const { data } = await supabase
      .from('calls')
      .select('id, customer_id, caller_number')
      .eq('caller_number', callerNumber)
      .is('elevenlabs_conversation_id', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    callRecord = data
  }

  if (!callRecord) return NextResponse.json({ ok: true })

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, whatsapp_number')
    .eq('id', callRecord.customer_id)
    .single()

  if (!customer?.whatsapp_number) return NextResponse.json({ ok: true })

  // Build transcript string
  const transcriptText = Array.isArray(transcript)
    ? transcript.map((t: { role: string; message: string }) =>
        `${t.role === 'agent' ? 'דנה' : 'מתקשר'}: ${t.message}`
      ).join('\n')
    : String(transcript)

  // Summarize
  const summary = transcriptText ? await summarizeWithClaude(transcriptText, customer.business_name) : ''

  // Extract caller name from Claude summary (e.g. "שם המתקשר: דניאל")
  const nameMatch = summary.match(/שם המתקשר[^:\n]*:\s*\*?\*?\s*([^\n*]+)/i)
  const callerName = nameMatch?.[1]?.trim() || null

  await supabase.from('calls').update({
    elevenlabs_conversation_id: conversationId,
    caller_name: callerName,
    reason_summary: summary,
    transcript_full: transcriptText,
  }).eq('id', callRecord.id)

  // Download recording and upload to Supabase Storage
  let recordingUrl = ''
  try {
    const audioRes = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`,
      { headers: { 'xi-api-key': ELEVENLABS_API_KEY } }
    )
    if (audioRes.ok) {
      const audioBuffer = await audioRes.arrayBuffer()
      const { createClient } = await import('@supabase/supabase-js')
      const storage = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const fileName = `${conversationId}.mp3`
      await storage.storage.from('recordings').upload(fileName, audioBuffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })
      const { data: urlData } = storage.storage.from('recordings').getPublicUrl(fileName)
      recordingUrl = urlData.publicUrl
    }
  } catch (e) {
    console.error('Recording upload failed:', e)
  }

  try {
    await sendCallNotification(
      customer.whatsapp_number,
      customer.business_name,
      summary,
      callerNumber || callRecord.caller_number || '',
      callRecord.id
    )
  } catch (e) {
    console.error('WhatsApp send failed:', e)
  }

  return NextResponse.json({ ok: true })
}
