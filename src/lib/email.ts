import { Resend } from 'resend'
import { CARRIER_SECONDS } from '@/lib/constants'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

const LOGO_URL = 'https://callnik.com/callnik-logo.png'
const DASHBOARD_URL = 'https://callnik.com/dashboard'

function baseTemplate(cardContent: string) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,'Helvetica Neue',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Logo -->
      <tr>
        <td align="center" style="padding-bottom:24px;">
          <img src="${LOGO_URL}" alt="Callnik" width="130" style="height:auto;display:block;" />
        </td>
      </tr>

      <!-- Card -->
      <tr>
        <td style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${cardContent}
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">🔵 Callnik &mdash; המזכירה האוטומטית לעסק שלך</p>
          <p style="margin:4px 0 0;font-size:12px;color:#c4c9d4;">
            <a href="https://callnik.com" style="color:#c4c9d4;text-decoration:none;">callnik.com</a>
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

  const codeSection = forwardCode ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#1e40af;" dir="rtl">קוד הפניית שיחות שלך</p>
        <p style="margin:0;font-size:22px;font-weight:700;color:#1d4ed8;letter-spacing:1px;direction:ltr;text-align:center;font-family:monospace;">${forwardCode}</p>
        <p style="margin:8px 0 0;font-size:12px;color:#3b82f6;text-align:center;" dir="rtl">חייג את הקוד הזה מהטלפון שלך פעם אחת להפעלה</p>
      </td></tr>
    </table>` : `
    <div style="background:#fef3c7;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:14px;color:#92400e;" dir="rtl">מספר ייעודי יוקצה לך בקרוב - תקבל עדכון נוסף</p>
    </div>`

  const cardContent = `
    <tr>
      <td style="background:#2563eb;padding:28px 32px;text-align:right;">
        <p style="margin:0;font-size:12px;color:#bfdbfe;font-weight:500;" dir="rtl">🔵 Callnik - השירות שלך פעיל</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;" dir="rtl">מוכנים לעבודה!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;" dir="rtl">
          שלום, חשבון Callnik של <strong style="color:#1d4ed8;">${businessName}</strong> הופעל.
        </p>
        ${codeSection}
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="background:#2563eb;border-radius:10px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:13px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;" dir="rtl">
                כניסה לאזור האישי &larr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `Callnik - השירות שלך פעיל! ${businessName}`,
    html: baseTemplate(cardContent),
  })
}

export async function sendWelcomeEmail(to: string, businessName: string) {
  const steps = [
    ['1', 'שיחה שלא נענית עוברת אוטומטית ל-Callnik'],
    ['2', 'Callnik לוקחת הודעה מהמתקשר'],
    ['3', 'אתה מקבל סיכום בוואטסאפ תוך דקה'],
  ]

  const stepsHtml = steps.map(([num, text]) => `
    <tr>
      <td style="padding:5px 0;" dir="rtl">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-left:10px;vertical-align:middle;">
            <span style="display:inline-block;width:24px;height:24px;background:#2563eb;border-radius:50%;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${num}</span>
          </td>
          <td style="vertical-align:middle;font-size:14px;color:#374151;padding-right:8px;">${text}</td>
        </tr></table>
      </td>
    </tr>`).join('')

  const cardContent = `
    <!-- Blue header -->
    <tr>
      <td style="background:#2563eb;padding:32px;text-align:right;">
        <p style="margin:0;font-size:13px;color:#bfdbfe;font-weight:500;" dir="rtl">🔵 ברוכים הבאים ל-Callnik</p>
        <h1 style="margin:8px 0 0;font-size:24px;color:#ffffff;font-weight:700;" dir="rtl">ההרשמה הושלמה בהצלחה!</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:32px;">
        <p style="margin:0 0 8px;font-size:16px;color:#111827;font-weight:600;" dir="rtl">שלום,</p>
        <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.7;" dir="rtl">
          קיבלנו את הרשמת <strong style="color:#1d4ed8;">${businessName}</strong> ל-Callnik.
          ניצור איתך קשר תוך 24 שעות כדי להפעיל את השירות ולהקצות לך מספר ייעודי.
        </p>

        <!-- How it works box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:12px;margin-bottom:28px;">
          <tr>
            <td style="padding:20px 20px 12px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#1e40af;letter-spacing:0.5px;" dir="rtl">איך זה עובד</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${stepsHtml}
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr>
            <td align="center" style="background:#2563eb;border-radius:10px;">
              <a href="${DASHBOARD_URL}" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;" dir="rtl">
                כניסה לאזור הלקוח &larr;
              </a>
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
  const displayName = callerName || callerNumber || 'לא ידוע'
  const callUrl = `https://callnik.com/calls/${callId}`

  const summaryLines = summary
    ? summary.split('\n').filter(Boolean).map(line =>
        `<tr><td style="padding:5px 0;font-size:14px;color:#374151;line-height:1.6;" dir="rtl">${line}</td></tr>`
      ).join('')
    : `<tr><td style="padding:5px 0;font-size:14px;color:#374151;" dir="rtl">שיחה נכנסת ללא סיכום</td></tr>`

  const cardContent = `
    <!-- Blue header -->
    <tr>
      <td style="background:#2563eb;padding:28px 32px;text-align:right;">
        <p style="margin:0;font-size:12px;color:#bfdbfe;font-weight:500;letter-spacing:0.5px;" dir="rtl">CALLNIK - שיחה חדשה</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;" dir="rtl">📞 ${displayName} התקשר בשעה ${callTime}</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:0.5px;" dir="rtl">מספר מתקשר</p>
        <p style="margin:0 0 20px;font-size:15px;color:#111827;" dir="ltr">${callerNumber || 'לא ידוע'}</p>

        <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:0.5px;" dir="rtl">סיכום השיחה</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:10px;margin-bottom:24px;">
          <tr><td style="padding:16px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${summaryLines}
            </table>
          </td></tr>
        </table>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="background:#2563eb;border-radius:10px;">
              <a href="${callUrl}" style="display:inline-block;padding:13px 32px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;" dir="rtl">
                האזן להקלטה &larr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `

  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: `🔵 Callnik - שיחה מ-${displayName} ב-${businessName}`,
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

  const rowsHtml = rows.map(([label, value], i) => `
    <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#ffffff'};">
      <td style="padding:11px 16px;font-size:13px;color:#6b7280;font-weight:600;border-bottom:1px solid #f3f4f6;white-space:nowrap;" dir="rtl">${label}</td>
      <td style="padding:11px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6;" dir="auto">${value}</td>
    </tr>`).join('')

  const cardContent = `
    <!-- Green header -->
    <tr>
      <td style="background:#059669;padding:28px 32px;text-align:right;">
        <p style="margin:0;font-size:12px;color:#a7f3d0;font-weight:500;letter-spacing:0.5px;" dir="rtl">CALLNIK ADMIN</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-weight:700;" dir="rtl">לקוח חדש נרשם</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0 0 20px;font-size:15px;color:#374151;" dir="rtl">
          <strong style="color:#059669;">${customer.businessName}</strong> השלים הרשמה ל-Callnik.
        </p>

        <!-- Details table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:28px;">
          ${rowsHtml}
        </table>

        <!-- Action buttons -->
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-left:10px;">
              <a href="https://callnik.com/admin" style="display:inline-block;background:#059669;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700;" dir="rtl">
                פתח פאנל ניהול
              </a>
            </td>
            <td>
              <a href="https://callnik.com/admin" style="display:inline-block;background:#f3f4f6;color:#374151;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;" dir="rtl">
                הקצה מספר
              </a>
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
