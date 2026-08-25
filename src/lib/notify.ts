import twilio from 'twilio'

const client = () => twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'
const TEMPLATE_SID = process.env.TWILIO_WHATSAPP_TEMPLATE_SID

// Send call notification via WhatsApp template (or Body fallback for sandbox)
export async function sendCallNotification(
  to: string,
  callerName: string,
  callTime: string,
  summary: string,
  callerNumber: string,
  callId: string
) {
  const displayName = callerName || callerNumber || 'לא ידוע'
  const body = `Callnik - הודעה חדשה\n📞 ${displayName} ב-${callTime}\n📝 ${summary || 'שיחה נכנסת'}\n📱 ${callerNumber || 'לא ידוע'}\n🎙 להאזנה: callnik.vercel.app/calls/${callId} - Callnik`

  if (TEMPLATE_SID) {
    await client().messages.create({
      from: WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      contentSid: TEMPLATE_SID,
      contentVariables: JSON.stringify({
        '1': displayName,
        '2': callTime,
        '3': summary || 'שיחה נכנסת',
        '4': callerNumber || 'לא ידוע',
        '5': callId,
      }),
    })
  } else {
    await client().messages.create({
      from: WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      body,
    })
  }
}
