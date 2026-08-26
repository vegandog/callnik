import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

export async function sendWelcomeEmail(to: string, businessName: string) {
  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to,
    subject: 'ברוכים הבאים ל-Callnik',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #2563eb;">שלום!</h2>
        <p>ההרשמה של <strong>${businessName}</strong> ל-Callnik התקבלה בהצלחה.</p>
        <p>ניצור איתך קשר תוך 24 שעות כדי להפעיל את השירות ולהקצות לך מספר ייעודי.</p>
        <p>בינתיים אפשר להיכנס לאזור הלקוח ולראות את הסטטוס:</p>
        <a href="https://callnik.com/dashboard"
           style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin:16px 0;">
          כניסה לאזור הלקוח
        </a>
        <p style="color:#666; font-size:13px; margin-top:32px;">Callnik — המזכירה האוטומטית לעסק שלך</p>
      </div>
    `,
  })
}

export async function sendAdminNotification(customer: {
  businessName: string
  category: string
  whatsappNumber: string
  carrier: string
  email: string
}) {
  await getResend().emails.send({
    from: 'Callnik <mail@callnik.com>',
    to: 'vegandog@gmail.com',
    subject: `לקוח חדש: ${customer.businessName}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #2563eb;">לקוח חדש נרשם 🎉</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; color:#666;">עסק</td><td style="padding:8px 0; font-weight:bold;">${customer.businessName}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">תחום</td><td style="padding:8px 0;">${customer.category}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">וואטסאפ</td><td style="padding:8px 0; direction:ltr;">${customer.whatsappNumber}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">חברה סלולרית</td><td style="padding:8px 0;">${customer.carrier}</td></tr>
          <tr><td style="padding:8px 0; color:#666;">מייל</td><td style="padding:8px 0; direction:ltr;">${customer.email}</td></tr>
        </table>
        <a href="https://callnik.com/admin"
           style="display:inline-block; background:#2563eb; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin:16px 0;">
          פתח פאנל ניהול
        </a>
      </div>
    `,
  })
}
