import Anthropic from '@anthropic-ai/sdk'
import { sendWhatsAppLeadNotification, sendHumanRequestedNotification } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const SYSTEM_PROMPT = `אתה נציג מכירות של Callnik - שירות AI לניהול שיחות טלפון לעסקים בישראל.

מה זה Callnik?
Callnik הוא בוט AI שעונה על שיחות שלא נענו לעסק שלך.
הבוט מזהה את המתקשר, מבין מה הוא צריך, ושולח לך סיכום ב-WhatsApp תוך דקה.
מחיר: ₪149 לחודש בלבד. ביטול בכל עת.
מתאים לכל עסק שמפסיד לקוחות בגלל שיחות שלא נענות.

הדרך להתחיל: callnik.com/register

תפקידך:
1. ענה על שאלות בצורה קצרה וידידותית
2. הסבר את היתרונות - נקודות קצרות, לא מאמר
3. כשמישהו מתעניין ברצינות - שאל לשם ומספר טלפון ותגיד שצוות Callnik יחזור אליו
4. אם רוצה להירשם לבד - כוון ל callnik.com/register

חוקים:
- תגובות קצרות! צ'אט באתר, לא מאמר. מקסימום 3-4 שורות
- בעברית בלבד
- ידידותי, לא מכירתי מדי
- אל תמציא מידע שאין לך

אם המשתמש מבקש לדבר עם נציג אנושי / אדם אמיתי / בן אדם - ענה בצורה חמה שהצוות יחזור אליו בהקדם, ובסוף התגובה הוסף בדיוק את המחרוזת: [HUMAN_REQUESTED]`

export async function POST(req: NextRequest) {
  const { messages, sessionId } = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
    sessionId: string
  }

  if (!messages?.length) {
    return NextResponse.json({ error: 'No messages' }, { status: 400 })
  }

  const isFirst = messages.length === 1

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-20),
    })

    let reply = (response.content[0] as { text: string }).text
    const humanRequested = reply.includes('[HUMAN_REQUESTED]')
    reply = reply.replace('[HUMAN_REQUESTED]', '').trim()

    // Email on first message
    if (isFirst) {
      sendWhatsAppLeadNotification(`אתר (session: ${sessionId})`, messages[0].content).catch(console.error)
    }

    // Email when human agent is requested
    if (humanRequested) {
      const fullConversation = [...messages, { role: 'assistant' as const, content: reply }]
      sendHumanRequestedNotification(`אתר (session: ${sessionId})`, fullConversation).catch(console.error)
    }

    return NextResponse.json({ reply })
  } catch (e) {
    console.error('Claude error:', e)
    return NextResponse.json({ reply: 'שגיאה זמנית, נסה שוב.' })
  }
}
