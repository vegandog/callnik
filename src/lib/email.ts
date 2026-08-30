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
<body style="margin:0;padding:0;background:#f4f6f9;direction:rtl;">
<table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
  <tr><td align="center">
    <table dir="rtl" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <tr>
        <td align="center" style="padding-bottom:20px;">
          <img src="${LOGO_URL}" alt="Callnik" width="120" style="height:auto;display:block;" />
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e7ec;">
          <table dir="rtl" width="100%" cellpadding="0" cellspacing="0">
            ${cardContent}
          </table>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding-top:20px;">
          <p style="margin:0;font-size:12px;color:#9ca3af;font-family:${F};text-align:center;">Callnik - המזכירה האוטומטית לעסק שלך</p>
          <p style="margin:5px 0 0;font-size:12px;font-family:${F};text-align:center;">
            <a href="https://callnik.com" style="color:#d1d5db;text-decoration:none;">callnik.com</a>
            &nbsp;&bull;&nbsp;
            <a href="${DASHBOARD_URL}" style="color:#d1d5db;text-decoration:none;">אזור אישי</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function sendWelcomeEmail(to: string, businessName: string, firstName?: string, lastName?: string, voiceName = 'דנה') {
  const steps = [
    'שיחה שלא נענית מועברת אוטומטית ל-Callnik',
    'דנה, הנציגה הדיגיטלית, מדברת עם המתקשר ולוקחת הודעה',
    'אתם מקבלים סיכום בוואטסאפ תוך כדקה',
  ]

  const stepsHtml = steps.map((text, i) => `
    <tr>
      <td style="padding:12px 0;${i < steps.length - 1 ? 'border-bottom:1px solid #f3f4f6;' : ''}text-align:right;">
        <table dir="rtl" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td style="width:32px;vertical-align:middle;padding-left:12px;text-align:center;">
            <span style="display:inline-block;width:26px;height:26px;background:#dbeafe;border-radius:50%;color:#1e40af;font-size:13px;font-weight:700;text-align:center;line-height:26px;font-family:${F};">${i + 1}</span>
          </td>
          <td style="vertical-align:middle;text-align:right;">
            <p style="margin:0;font-size:14px;color:#374151;font-family:${F};text-align:right;">${text}</p>
          </td>
        </tr></table>
      </td>
    </tr>`).join('')

  const cardContent = `
    <tr>
      <td style="background:#2563eb;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">ברוכים הבאים ל-Callnik!</h1>
        <p style="margin:0;font-size:14px;color:#bfdbfe;font-family:${F};text-align:right;">${businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <p style="margin:0 0 6px;font-size:15px;color:#111827;font-weight:600;font-family:${F};text-align:right;">שלום${firstName ? ` ${firstName} ${lastName || ''}`.trimEnd() : ''},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.75;font-family:${F};text-align:right;">
          קיבלנו את ההרשמה של <strong>${businessName}</strong> ואנחנו שמחים שהצטרפת!<br>
          ניצור איתך קשר בהקדם - בדרך כלל תוך 24 שעות - כדי להקצות מספר ייעודי ולהפעיל את השירות.
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:10px;margin-bottom:22px;">
          <tr><td style="padding:14px 18px;text-align:right;">
            <p style="margin:0;font-size:14px;color:#1d4ed8;font-family:${F};text-align:right;">
              הנציג/ה שבחרת: <strong>${voiceName}</strong> -
              <a href="https://callnik.com/settings" style="color:#2563eb;text-decoration:underline;">שינוי בהגדרות</a>
            </p>
          </td></tr>
        </table>

        <p style="margin:0 0 12px;font-size:14px;color:#6b7280;font-family:${F};text-align:right;">ככה זה עובד:</p>
        <table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;">
          <tr><td style="padding:4px 16px;text-align:right;">
            <table dir="rtl" width="100%" cellpadding="0" cellspacing="0">
              ${stepsHtml}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 36px 30px;text-align:center;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:13px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${F};">לאזור הלקוח</a>
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

export async function sendActivationEmail(to: string, businessName: string, twilioNumber: string | null, carrier: string, firstName?: string, lastName?: string, voiceName = 'דנה') {
  const seconds = CARRIER_SECONDS[carrier] ?? 20
  const localNumber = twilioNumber?.replace(/^\+972/, '0') ?? null
  const forwardCode = localNumber ? `*61*${localNumber}**${seconds}#` : null

  const codeSection = forwardCode
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;margin-bottom:22px;">
        <tr><td style="padding:22px 20px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:#1d4ed8;font-family:${F};text-align:center;">קוד הפניית שיחות שלכם</p>
          <p style="margin:0 0 8px;font-size:28px;font-weight:700;color:#1e3a8a;letter-spacing:4px;direction:ltr;font-family:'Courier New',Courier,monospace;text-align:center;">${forwardCode}</p>
          <p style="margin:0;font-size:13px;color:#3b82f6;font-family:${F};text-align:center;">חייגו קוד זה מהטלפון שלכם פעם אחת - זה הכל</p>
        </td></tr>
      </table>`
    : `<table width="100%" cellpadding="0" cellspacing="0" style="background:#fef9c3;border-radius:10px;margin-bottom:22px;">
        <tr><td style="padding:14px 18px;text-align:right;">
          <p style="margin:0;font-size:14px;color:#854d0e;font-family:${F};text-align:right;">מספר ייעודי יוקצה לכם בקרוב - תקבלו עדכון</p>
        </td></tr>
      </table>`

  const cardContent = `
    <tr>
      <td style="background:#2563eb;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">השירות שלכם פעיל!</h1>
        <p style="margin:0;font-size:14px;color:#bfdbfe;font-family:${F};text-align:right;">${businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <p style="margin:0 0 6px;font-size:15px;color:#111827;font-weight:600;font-family:${F};text-align:right;">שלום${firstName ? ` ${firstName} ${lastName || ''}`.trimEnd() : ''},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.75;font-family:${F};text-align:right;">
          חשבון Callnik של <strong>${businessName}</strong> פעיל ומוכן לקלוט שיחות.<br>
          מעכשיו כל שיחה שלא תענה תועבר ל<strong>${voiceName}</strong>, שתלקח הודעה ותשלח לך סיכום בוואטסאפ תוך כדקה.
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:10px;margin-bottom:20px;">
          <tr><td style="padding:14px 18px;text-align:right;">
            <p style="margin:0;font-size:14px;color:#1d4ed8;font-family:${F};text-align:right;">
              הנציג/ה שבחרת: <strong>${voiceName}</strong> -
              <a href="https://callnik.com/settings" style="color:#2563eb;text-decoration:underline;">רוצה לשנות? לחץ כאן</a>
            </p>
          </td></tr>
        </table>
        <p style="margin:0 0 14px;font-size:15px;color:#374151;font-family:${F};text-align:right;">
          כדי להפעיל את הפניית השיחות, חייג את הקוד הבא מהטלפון שלך:
        </p>
        ${codeSection}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 36px 30px;text-align:center;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:13px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${F};">לאזור האישי</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `🔵 Callnik פעיל - ${businessName}`,
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
  const displayName = callerName || 'מתקשר לא מזוהה'
  const callUrl = `https://callnik.com/calls/${callId}`
  const callerLine = callerNumber ? `${callerNumber} - ${callTime}` : callTime

  const summaryLines = summary
    ? summary.split('\n').filter(Boolean).map(line =>
        `<tr><td style="padding:4px 0;font-size:14px;color:#374151;line-height:1.75;font-family:${F};text-align:right;">${line}</td></tr>`
      ).join('')
    : `<tr><td style="padding:4px 0;font-size:14px;color:#9ca3af;font-family:${F};text-align:right;">לא נרשם סיכום לשיחה זו</td></tr>`

  const cardContent = `
    <tr>
      <td style="background:#2563eb;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">שיחה מ-${displayName}</h1>
        <p style="margin:0;font-size:14px;color:#bfdbfe;font-family:${F};text-align:right;">${callerLine}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.75;font-family:${F};text-align:right;">
          הגיעה שיחה מ-<strong>${displayName}</strong>${callerNumber ? ` (${callerNumber})` : ''} ב-${callTime} - לא נענתה.
        </p>

        <p style="margin:0 0 10px;font-size:14px;color:#6b7280;font-family:${F};text-align:right;">מה ביקש/ה:</p>
        <table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-right:3px solid #2563eb;border-radius:0 8px 8px 0;margin-bottom:4px;">
          <tr><td style="padding:16px 20px;text-align:right;">
            <table dir="rtl" width="100%" cellpadding="0" cellspacing="0">
              ${summaryLines}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 36px 30px;text-align:center;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#2563eb;border-radius:8px;">
              <a href="${callUrl}" style="display:inline-block;padding:13px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${F};">האזן להקלטה</a>
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

export async function sendWhatsAppLeadNotification(phone: string, firstMessage: string) {
  const cardContent = `
    <tr>
      <td style="background:#25D366;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">ליד חדש ב-WhatsApp!</h1>
        <p style="margin:0;font-size:14px;color:#dcfce7;font-family:${F};text-align:right;">${phone}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <p style="margin:0 0 12px;font-size:14px;color:#6b7280;font-family:${F};text-align:right;">ההודעה הראשונה:</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-right:3px solid #25D366;border-radius:0 8px 8px 0;margin-bottom:20px;">
          <tr><td style="padding:16px 20px;text-align:right;">
            <p style="margin:0;font-size:15px;color:#374151;font-family:${F};text-align:right;">${firstMessage}</p>
          </td></tr>
        </table>
        <p style="margin:0;font-size:14px;color:#6b7280;font-family:${F};text-align:right;">
          הבוט כבר ענה. אם הליד איכותי - צור קשר ישירות ב-WhatsApp.
        </p>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to: 'vegandog@gmail.com',
    subject: `ליד WhatsApp חדש: ${phone}`,
    html: baseTemplate(cardContent),
  })
}

export async function sendHumanRequestedNotification(
  source: string,
  conversation: Array<{ role: string; content: string }>
) {
  const chatHtml = conversation.map(m => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;text-align:right;">
        <span style="font-size:12px;font-weight:700;color:${m.role === 'user' ? '#2563eb' : '#6b7280'};font-family:${F};">
          ${m.role === 'user' ? '👤 לקוח' : '🤖 בוט'}:
        </span>
        <p style="margin:4px 0 0;font-size:14px;color:#374151;font-family:${F};text-align:right;white-space:pre-wrap;">${m.content}</p>
      </td>
    </tr>`).join('')

  const cardContent = `
    <tr>
      <td style="background:#dc2626;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">🔴 מישהו רוצה נציג אנושי!</h1>
        <p style="margin:0;font-size:14px;color:#fecaca;font-family:${F};text-align:right;">${source}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <p style="margin:0 0 16px;font-size:15px;color:#111827;font-weight:600;font-family:${F};text-align:right;">כל השיחה:</p>
        <table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
          <tr><td style="padding:8px 16px;text-align:right;">
            <table dir="rtl" width="100%" cellpadding="0" cellspacing="0">
              ${chatHtml}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to: 'vegandog@gmail.com',
    subject: `🔴 נציג אנושי התבקש - ${source}`,
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
    <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#ffffff'};">
      <td style="padding:11px 16px;font-size:13px;color:#6b7280;font-weight:600;border-bottom:1px solid #f3f4f6;white-space:nowrap;text-align:right;font-family:${F};">${lbl}</td>
      <td style="padding:11px 16px;font-size:14px;color:#111827;border-bottom:${i < rows.length - 1 ? '1px solid #f3f4f6' : 'none'};text-align:right;font-family:${F};" dir="auto">${value}</td>
    </tr>`).join('')

  const cardContent = `
    <tr>
      <td style="background:#059669;padding:30px 36px;text-align:right;">
        <h1 style="margin:0 0 5px;font-size:22px;color:#ffffff;font-weight:700;font-family:${F};text-align:right;">לקוח חדש נרשם</h1>
        <p style="margin:0;font-size:14px;color:#a7f3d0;font-family:${F};text-align:right;">${customer.businessName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px 36px 24px;text-align:right;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:0 36px 30px;text-align:center;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#059669;border-radius:8px;">
              <a href="https://callnik.com/admin" style="display:inline-block;padding:13px 36px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${F};">פאנל ניהול</a>
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
