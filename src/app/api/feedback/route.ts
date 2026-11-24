import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const F = "Arial,'Helvetica Neue',Helvetica,sans-serif"
const LOGO_URL = 'https://callnik.com/callnik-logo.png'

function template(cardContent: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6f9;direction:rtl;">
<table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
  <tr><td align="center">
    <table dir="rtl" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr><td align="center" style="padding-bottom:20px;">
        <img src="${LOGO_URL}" alt="Callnik" width="120" style="height:auto;display:block;" />
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e7ec;">
        <table dir="rtl" width="100%" cellpadding="0" cellspacing="0">${cardContent}</table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

export async function POST(req: NextRequest) {
  const { name, business, rating, what_worked, what_didnt, notes } = await req.json()

  if (!rating) return NextResponse.json({ ok: false, error: 'missing_rating' }, { status: 400 })

  const stars = '★'.repeat(Number(rating)) + '☆'.repeat(5 - Number(rating))

  const rows = [
    ['שם', name || '-'],
    ['עסק', business || '-'],
    ['דירוג', `${stars} (${rating}/5)`],
    ['מה עבד טוב', what_worked || '-'],
    ['מה פחות', what_didnt || '-'],
    ['הערות נוספות', notes || '-'],
  ]

  const rowsHtml = rows.map(([lbl, val], i) => `
    <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#ffffff'};">
      <td style="padding:11px 16px;font-size:13px;color:#6b7280;font-weight:600;border-bottom:1px solid #f3f4f6;white-space:nowrap;text-align:right;font-family:${F};width:140px;">${lbl}</td>
      <td style="padding:11px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;text-align:right;font-family:${F};white-space:pre-wrap;">${val}</td>
    </tr>`).join('')

  const cardContent = `
    <tr><td style="background:#2563eb;padding:30px 36px;text-align:right;">
      <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};">משוב מהפיילוט</h1>
      <p style="margin:0;font-size:14px;color:#bfdbfe;font-family:${F};">${name || 'אנונימי'} - ${business || 'לא צוין'}</p>
    </td></tr>
    <tr><td style="padding:30px 36px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">${rowsHtml}</table>
    </td></tr>`

  const resend = new Resend(process.env.RESEND_API_KEY ?? '')
  await resend.emails.send({
    from: 'Callnik <mail@callnik.com>',
    to: 'vegandog@gmail.com',
    subject: `משוב פיילוט: ${name || 'אנונימי'} - ${stars}`,
    html: template(cardContent),
  })

  return NextResponse.json({ ok: true })
}
