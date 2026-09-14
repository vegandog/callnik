import twilio from 'twilio'

const client = () => twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'
const SMS_FROM = (process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886').replace('whatsapp:', '')
const TEMPLATE_SID = process.env.TWILIO_WHATSAPP_TEMPLATE_SID

export async function sendCallNotification(
  to: string,
  callerName: string,
  callTime: string,
  summary: string,
  callerNumber: string,
  callId: string
) {
  const displayName = callerName || callerNumber || 'לא ידוע'

  // Extract just the reason/request line from summary for WhatsApp template
  const reasonMatch = summary?.match(/(?:בקשה|מה ביקש)[^:]*:\s*([^\n]+)/i)
  const templateSummary = reasonMatch?.[1]?.trim() || summary || 'שיחה נכנסת'

  const smsBody = `Callnik - הודעה חדשה מ-${displayName} ב-${callTime}.\n${templateSummary}\nלחזרה: Callnik — ${callerNumber || 'לא ידוע'}\ncallnik.com/calls/${callId}`

  // WhatsApp primary
  let whatsappOk = false
  try {
    if (TEMPLATE_SID) {
      await client().messages.create({
        from: WHATSAPP_FROM,
        to: `whatsapp:${to}`,
        contentSid: TEMPLATE_SID,
        contentVariables: JSON.stringify({
          '1': displayName,
          '2': callTime,
          '3': templateSummary,
          '4': callerNumber || 'לא ידוע',
          '5': callId,
        }),
      })
    } else {
      await client().messages.create({
        from: WHATSAPP_FROM,
        to: `whatsapp:${to}`,
        body: smsBody,
      })
    }
    whatsappOk = true
  } catch (e) {
    console.error('WhatsApp failed:', e)
  }

  // SMS fallback - only if WhatsApp threw an exception
  if (!whatsappOk) {
    try {
      await client().messages.create({
        from: SMS_FROM,
        to,
        body: smsBody,
      })
    } catch (e) {
      console.error('SMS fallback failed:', e)
    }
  }
}
