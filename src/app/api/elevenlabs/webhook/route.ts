import { createAdminClient } from '@/lib/supabase/admin'
import { sendCallNotification, sendWhatsApp } from '@/lib/notify'
import { sendCallNotificationEmail } from '@/lib/email'
import { getVoiceName } from '@/lib/constants'
import { sendSMS } from '@/lib/telnyx'
import { NextRequest, NextResponse } from 'next/server'

const ERI_WHATSAPP = '0524680164'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY!
const DEMO_AGENT_ID = process.env.ELEVENLABS_DEMO_AGENT_ID || 'agent_9301m82vkd99ehrs261xhzrxgea1'
const DEMO_NUMBER = '+97283762282'

async function summarizeWithClaude(transcript: string, businessName: string, callerNumber?: string): Promise<string> {
  const callerHint = callerNumber
    ? `\nשים לב: המתקשר התקשר מהמספר ${callerNumber}. אם הוא/היא הסכים/ה שיחזרו אליו/ה לאותו מספר, כתוב מספר זה בשורת "מספר לחזרה".`
    : ''
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
${callerHint}
תמלול השיחה:
${transcript}

ענה בעברית בלבד, שלוש שורות בלבד, טקסט רגיל בלי עיצוב.`,
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
  const agentNameFromInit = dynVars.agent_name as string | undefined

  // Identify demo call: dynVars (SDK flow) OR agent_id OR called_number (SIP flow)
  const webhookAgentId = data.data?.agent_id || data.agent_id || ''
  const metadataCalledNumber = data.data?.metadata?.called_number || data.metadata?.called_number || ''
  const normalizedCalledNumber = metadataCalledNumber.startsWith('+') ? metadataCalledNumber : `+${metadataCalledNumber}`

  if (!conversationId) {
    return NextResponse.json({ ok: true })
  }

  // Demo call handling (08-3762282)
  if (
    dynVars.is_demo_call === 'true' ||
    webhookAgentId === DEMO_AGENT_ID ||
    normalizedCalledNumber === DEMO_NUMBER
  ) {
    const demoCallerNumber = (dynVars.demo_caller_number as string)
      || data.data?.metadata?.caller_id
      || data.metadata?.caller_id
      || ''
    const transcriptText = Array.isArray(transcript)
      ? transcript
          .filter((t: { role: string; message: string }) => t.message)
          .map((t: { role: string; message: string }) =>
            `${t.role === 'agent' ? 'דנה' : 'מתקשר'}: ${t.message}`
          ).join('\n')
      : String(transcript)
    const summary = transcriptText ? await summarizeWithClaude(transcriptText, 'הדגמה', demoCallerNumber) : ''
    const callTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' })
    const nameMatch = summary.match(/שם המתקשר[^:\n]*:\s*\*?\*?\s*([^\n*]+)/i)
    const callerName = nameMatch?.[1]?.trim() || ''

    // Download and store recording
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
        const fileName = `demo_${conversationId}.mp3`
        await storage.storage.from('recordings').upload(fileName, audioBuffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        })
        const { data: urlData } = storage.storage.from('recordings').getPublicUrl(fileName)
        recordingUrl = urlData.publicUrl
      }
    } catch (e) {
      console.error('Demo recording upload failed:', e)
    }

    const recordingLine = recordingUrl ? `\nהקלטה: ${recordingUrl}` : ''

    // Send summary to Eri
    await sendWhatsApp(
      ERI_WHATSAPP,
      `Callnik הדגמה - שיחה מ-${callerName || demoCallerNumber} ב-${callTime}\n\n${summary}${recordingLine}`
    )

    // Send summary + promo to caller via SMS (no WhatsApp opt-in required)
    if (demoCallerNumber) {
      await sendSMS(
        demoCallerNumber,
        `Callnik - כך נראה הסיכום שתקבל אחרי כל שיחה עם דנה:\n\n${summary}${recordingLine}`
      )
      await sendSMS(
        demoCallerNumber,
        'נהנית מהשיחה? ככה בדיוק ירגישו הלקוחות שלך. להרשמה, החודש הראשון בשקל אחד: https://callnik.com/landing'
      )
    }

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
    .select('business_name, whatsapp_number, voice_id')
    .eq('id', callRecord.customer_id)
    .single()

  if (!customer) return NextResponse.json({ ok: true })

  // Build transcript string
  const agentName = agentNameFromInit || getVoiceName(customer?.voice_id)
  const transcriptText = Array.isArray(transcript)
    ? transcript
        .filter((t: { role: string; message: string }) => t.message != null && t.message !== '')
        .map((t: { role: string; message: string }) =>
          `${t.role === 'agent' ? agentName : 'מתקשר'}: ${t.message}`
        ).join('\n')
    : String(transcript)

  // Summarize
  const summary = transcriptText ? await summarizeWithClaude(transcriptText, customer.business_name, callerNumber || callRecord.caller_number || '') : ''

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

  const callTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' })
  const notifyCallerNumber = callerNumber || callRecord.caller_number || ''

  if (customer.whatsapp_number) {
    try {
      await sendCallNotification(
        customer.whatsapp_number,
        callerName || '',
        callTime,
        summary,
        notifyCallerNumber,
        callRecord.id
      )
    } catch (e) {
      console.error('WhatsApp send failed:', e)
    }
  }

  // Also send email - fetch the primary user email for this customer
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
        notifyCallerNumber,
        callRecord.id
      )
    }
  } catch (e) {
    console.error('Email send failed:', e)
  }

  return NextResponse.json({ ok: true })
}
