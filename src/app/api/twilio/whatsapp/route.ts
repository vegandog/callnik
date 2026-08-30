import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// In-memory conversation store (per Vercel instance — good enough for MVP)
const conversations = new Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>()

const SYSTEM_PROMPT = `אתה נציג מכירות של Callnik - שירות AI לניהול שיחות טלפון לעסקים בישראל.

מה זה Callnik?
Callnik הוא בוט AI שעונה על שיחות שלא נענו לעסק שלך.
הבוט מזהה את המתקשר, מבין מה הוא צריך, ושולח לך סיכום ב-WhatsApp תוך דקה.
מחיר: ₪149 לחודש בלבד.
מתאים לכל עסק שמפסיד לקוחות בגלל שיחות שלא נענות.

הדרך להתחיל: callnik.com/register

תפקידך:
1. ענה על שאלות בצורה קצרה וידידותית
2. הסבר את היתרונות - לא להאריך, נקודות קצרות
3. כשמישהו מתעניין - תשאל לשם ומספר טלפון ותגיד שצוות Callnik יחזור אליו
4. אם רוצה להירשם לבד - כוון ל callnik.com/register

חוקים:
- תגובות קצרות! WhatsApp, לא מאמר. מקסימום 3-4 שורות
- בעברית בלבד
- ידידותי, לא מכירתי מדי
- אל תמציא מידע שאין לך`

function twiml(body: string) {
  const safe = body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${safe}</Message></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  )
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const from = form.get('From') as string  // e.g. "whatsapp:+972521234567"
  const body = form.get('Body') as string

  if (!from || !body) return twiml('שלום! אפשר לעזור?')

  const phone = from.replace('whatsapp:', '')

  // Get or init conversation history
  const history = conversations.get(phone) ?? []
  history.push({ role: 'user', content: body })

  // Keep last 20 messages to avoid token overflow
  const trimmed = history.slice(-20)

  let reply = 'שגיאה זמנית, נסה שוב בעוד רגע.'
  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    })
    reply = (response.content[0] as { text: string }).text
  } catch (e) {
    console.error('Claude error:', e)
  }

  history.push({ role: 'assistant', content: reply })
  conversations.set(phone, history.slice(-20))

  return twiml(reply)
}
