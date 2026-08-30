import Anthropic from '@anthropic-ai/sdk'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendWhatsAppLeadNotification, sendHumanRequestedNotification } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// Fallback in-memory store (used if Supabase table doesn't exist yet)
const memStore = new Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>()

const SYSTEM_PROMPT = `אתה נציג מכירות של Callnik - שירות AI לניהול שיחות טלפון לעסקים בישראל.

מה זה Callnik?
Callnik הוא בוט AI שעונה על שיחות שלא נענו לעסק שלך.
הבוט מזהה את המתקשר, מבין מה הוא צריך, ושולח לך סיכום ב-WhatsApp תוך דקה.
מחיר: ₪149 לחודש.
מתאים לכל עסק שמפסיד לקוחות בגלל שיחות שלא נענות.

הדרך להתחיל: callnik.com/register

תפקידך:
1. ענה על שאלות בצורה קצרה וידידותית
2. הסבר את היתרונות - נקודות קצרות, לא מאמר
3. כשמישהו מתעניין - תשאל לשם ומספר טלפון ותגיד שצוות Callnik יחזור אליו
4. אם רוצה להירשם לבד - כוון ל callnik.com/register

חוקים:
- תגובות קצרות! WhatsApp, לא מאמר. מקסימום 3-4 שורות
- בעברית בלבד
- ידידותי, לא מכירתי מדי
- אל תמציא מידע שאין לך

אם המשתמש מבקש לדבר עם נציג אנושי / אדם אמיתי / בן אדם - ענה בצורה חמה שהצוות יחזור אליו בהקדם, ובסוף התגובה הוסף בדיוק את המחרוזת: [HUMAN_REQUESTED]`

function twiml(body: string) {
  const safe = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${safe}</Message></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  )
}

async function getHistory(phone: string): Promise<Array<{ role: 'user' | 'assistant'; content: string }>> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('whatsapp_leads')
      .select('messages')
      .eq('phone', phone)
      .single()
    return (data?.messages as Array<{ role: 'user' | 'assistant'; content: string }>) ?? []
  } catch {
    return memStore.get(phone) ?? []
  }
}

async function saveHistory(phone: string, messages: Array<{ role: 'user' | 'assistant'; content: string }>, isFirst: boolean) {
  try {
    const supabase = createAdminClient()
    await supabase.from('whatsapp_leads').upsert(
      { phone, messages, interested: isFirst, updated_at: new Date().toISOString() },
      { onConflict: 'phone' }
    )
  } catch {
    memStore.set(phone, messages)
  }
}

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const from = form.get('From') as string
  const body = form.get('Body') as string

  if (!from || !body) return twiml('שלום! במה אפשר לעזור?')

  const phone = from.replace('whatsapp:', '')
  const history = await getHistory(phone)
  const isFirst = history.length === 0

  history.push({ role: 'user', content: body })
  const trimmed = history.slice(-20)

  let reply = 'שגיאה זמנית, נסה שוב בעוד רגע.'
  let humanRequested = false
  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    })
    reply = (response.content[0] as { text: string }).text
    humanRequested = reply.includes('[HUMAN_REQUESTED]')
    reply = reply.replace('[HUMAN_REQUESTED]', '').trim()
  } catch (e) {
    console.error('Claude error:', e)
  }

  history.push({ role: 'assistant', content: reply })
  await saveHistory(phone, history.slice(-20), isFirst)

  if (isFirst) {
    sendWhatsAppLeadNotification(phone, body).catch(console.error)
  }

  if (humanRequested) {
    sendHumanRequestedNotification(`WhatsApp: ${phone}`, history.slice(-10)).catch(console.error)
  }

  return twiml(reply)
}
