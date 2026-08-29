import { Resend } from 'resend'
import { CARRIER_SECONDS } from '@/lib/constants'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

const LOGO_URL = 'https://callnik.com/callnik-logo.png'
const DASHBOARD_URL = 'https://callnik.com/dashboard'
const F = "Arial,'Helvetica Neue',Helvetica,sans-serif"

function baseTemplate(cardContent: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
</head>
<body style="margin:0;padding:0;background:#f1f5f9;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:36px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <tr>
        <td align="center" style="padding-bottom:18px;">
          <img src="${LOGO_URL}" alt="Callnik" width="110" style="height:auto;display:block;" />
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${cardContent}
          </table>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#94a3b8;font-family:${F};">Callnik - המזכירה האוטומטית לעסק שלך</p>
          <p style="margin:5px 0 0;font-size:12px;font-family:${F};">
            <a href="https://callnik.com" style="color:#cbd5e1;text-decoration:none;">callnik.com</a>
            &nbsp;&bull;&nbsp;
            <a href="${DASHBOARD_URL}" style="color:#cbd5e1;text-decoration:none;">אזור אישי</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function sendActivationEmail(to: string, businessName: string, twilioNumber: string | null, carrier: string) {
  const seconds = CARRIER_SECONDS[carrier] ?? 20
  const localNumber = twilioNumber?.replace(/^\+972/, '0') ?? null
  const forwardCode = localNumber ? `*61*${localNumber}**${seconds}#` : null

  const codeSection = forwardCode
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;margin-bottom:28px;">
        <tr><td style="padding:24px;text-align:center;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#0369a1;letter-spacing:1px;text-transform:uppercase;font-family:${F};">קוד ההפניה שלך</p>
          <p style="margin:0 0 10px;font-size:32px;font-weight:700;color:#1e3a8a;letter-spacing:3px;direction:ltr;font-family:'Courier New',Courier,monospace;">${forwardCode}</p>
          <p style="margin:0;font-size:13px;color:#0369a1;font-family:${F};">חייג קוד זה מהטלפון שלך פעם אחת להפעלה</p>
        </td></tr>
      </table>`
    : `<table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3c7;border-radius:12px;margin-bottom:28px;">
        <tr><td style="padding:16px 20px;">
          <p style="margin:0;font-size:14px;color:#92400e;font-family:${F};">מספר ייעודי יוקצה לך בקרוב - תקבל עדכון</p>
        </td></tr>
      </table>`

  const cardContent = `
    <tr>
      <td style="background:#1e3a8a;padding:36px 40px;text-align:right;">
        <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-family:${F};">Callnik</p>
        <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:700;font-family:${F};">השירות שלך פעיל!</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.65);font-family:${F};">${businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 40px 24px;">
        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;font-family:${F};">
          חשבון Callnik של <strong style="color:#1e3a8a;">${businessName}</strong> הופעל. להפעלת הפניית שיחות, חייג את הקוד הבא מהטלפון שלך:
        </p>
        ${codeSection}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 40px 36px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:14px 40px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${F};">כניסה לאזור האישי</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `✅ Callnik פעיל - ${businessName}`,
    html: baseTemplate(cardContent),
  })
}

export async function sendWelcomeEmail(to: string, businessName: string) {
  const steps = [
    { title: 'שיחה לא נענית', desc: 'השיחה מועברת אוטומטית ל-Callnik' },
    { title: 'לוקחת הודעה', desc: 'דנה, הנציגה הדיגיטלית, מדברת עם המתקשר' },
    { title: 'סיכום מיידי', desc: 'אתה מקבל סיכום בוואטסאפ תוך כדקה' },
  ]

  const stepsHtml = steps.map(({ title, desc }, i) => `
    <tr>
      <td style="padding:13px 0;${i < steps.length - 1 ? 'border-bottom:1px solid #f1f5f9;' : ''}">
        <table cellpadding="0" cellspacing="0" width="100%"><tr>
          <td width="40" style="vertical-align:top;padding-left:14px;">
            <span style="display:inline-block;width:28px;height:28px;background:#1e3a8a;border-radius:50%;color:#fff;font-size:13px;font-weight:700;text-align:center;line-height:28px;font-family:${F};">${i + 1}</span>
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#111827;font-family:${F};">${title}</p>
            <p style="margin:0;font-size:13px;color:#6b7280;font-family:${F};">${desc}</p>
          </td>
        </tr></table>
      </td>
    </tr>`).join('')

  const cardContent = `
    <tr>
      <td style="background:#1e3a8a;padding:36px 40px;text-align:right;">
        <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-family:${F};">ברוכים הבאים ל-Callnik</p>
        <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:700;font-family:${F};">ההרשמה הושלמה!</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.65);font-family:${F};">${businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 40px 24px;">
        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;font-family:${F};">
          תודה שנרשמת ל-Callnik. ניצור איתך קשר תוך 24 שעות כדי להפעיל את השירות ולהקצות מספר ייעודי לעסק שלך.
        </p>
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;font-family:${F};">איך זה עובד</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;margin-bottom:4px;">
          <tr><td style="padding:4px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${stepsHtml}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:24px 40px 36px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:14px 40px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${F};">כניסה לאזור הלקוח</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `ברוכים הבאים ל-Callnik - ${businessName}`,
    html: baseTemplate(cardContent),
  })
}

export async function sendCallNotificationEmail(
  to: string,
  businessName: string,
  callerName: string,
  callTime: string,
  summary: string,
  callerNumber: string,
  callId: string
) {
  const displayName = callerName || callerNumber || 'מתקשר לא מזוהה'
  const callUrl = `https://callnik.com/calls/${callId}`

  const summaryLines = summary
    ? summary.split('\n').filter(Boolean).map(line =>
        `<tr><td style="padding:4px 0;font-size:14px;color:#374151;line-height:1.7;font-family:${F};">${line}</td></tr>`
      ).join('')
    : `<tr><td style="padding:4px 0;font-size:14px;color:#6b7280;font-family:${F};">לא נרשם סיכום לשיחה זו</td></tr>`

  const cardContent = `
    <tr>
      <td style="background:#1e3a8a;padding:36px 40px;text-align:right;">
        <p style="margin:0 0 12px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-family:${F};">Callnik - שיחה נכנסת</p>
        <h1 style="margin:0 0 10px;font-size:28px;color:#ffffff;font-weight:700;font-family:${F};">${displayName}</h1>
        <p style="margin:0;display:inline-block;font-size:13px;color:#93c5fd;background:rgba(255,255,255,0.1);padding:3px 12px;border-radius:20px;font-family:${F};">${callTime}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 40px 0;">
        <p style="margin:0 0 5px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;font-family:${F};">מספר מתקשר</p>
        <p style="margin:0 0 28px;font-size:17px;font-weight:600;color:#111827;font-family:${F};" dir="ltr">${callerNumber || 'לא ידוע'}</p>
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;font-family:${F};">סיכום השיחה</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;">
          <tr><td style="padding:20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${summaryLines}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:24px 40px 36px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${callUrl}" style="display:inline-block;padding:14px 40px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${F};">האזן להקלטה</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `שיחה מ-${displayName} - ${businessName}`,
    html: baseTemplate(cardContent),
  })
}

export async function sendAdminNotification(customer: {
  businessName: string
  category: string
  whatsappNumber: string
  carrier: string
  email: string
}) {
  const rows: [string, string][] = [
    ['שם העסק', customer.businessName],
    ['תחום', customer.category],
    ['וואטסאפ', customer.whatsappNumber],
    ['חברה סלולרית', customer.carrier],
    ['מייל', customer.email],
  ]

  const rowsHtml = rows.map(([lbl, value], i) => `
    <tr>
      <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#64748b;border-bottom:1px solid #f1f5f9;white-space:nowrap;font-family:${F};">${lbl}</td>
      <td style="padding:12px 16px;font-size:14px;color:#111827;border-bottom:${i < rows.length - 1 ? '1px solid #f1f5f9' : 'none'};font-family:${F};" dir="auto">${value}</td>
    </tr>`).join('')

  const cardContent = `
    <tr>
      <td style="background:#065f46;padding:36px 40px;text-align:right;">
        <p style="margin:0 0 10px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:1px;text-transform:uppercase;font-family:${F};">Callnik Admin</p>
        <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:700;font-family:${F};">לקוח חדש נרשם</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.65);font-family:${F};">${customer.businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 40px 36px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#059669;border-radius:8px;">
              <a href="https://callnik.com/admin" style="display:inline-block;padding:14px 40px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${F};">פאנל ניהול</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to: 'vegandog@gmail.com',
    subject: `לקוח חדש: ${customer.businessName}`,
    html: baseTemplate(cardContent),
  })
}
