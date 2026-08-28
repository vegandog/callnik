import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AlertCircle, CheckCircle, Phone } from 'lucide-react'
import ForwardingCode from './ForwardingCode'
import { CARRIER_SECONDS } from '@/lib/constants'

export default async function SetupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, carrier, twilio_number, status')
    .eq('id', userRecord.customer_id)
    .single()

  const isPending = customer?.status === 'pending'
  const twilioNumber = customer?.twilio_number
  const carrier = customer?.carrier || 'אחר'
  const seconds = CARRIER_SECONDS[carrier] ?? 20

  const localNumber = twilioNumber?.replace(/^\+972/, '0') ?? null
  const activateCode = localNumber
    ? `*61*${localNumber}**${seconds}#`
    : null
  const cancelCode = `##61#`

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">הגדרת הפניית שיחות</h1>
        <p className="text-gray-500 text-sm mt-1">הפעל את ההפניה מהטלפון שלך בחיוג אחד</p>
      </div>

      {isPending && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">ממתין להפעלת חשבון</p>
            <p className="text-amber-700 text-sm mt-1">
              לאחר שנפעיל את חשבונך ונקצה לך מספר ייעודי, קוד ההפניה יופיע כאן ותוכל להפעיל אותו בלחיצה אחת.
            </p>
          </div>
        </div>
      )}

      {!isPending && !twilioNumber && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">מספר ייעודי בהקצאה</p>
            <p className="text-amber-700 text-sm mt-1">
              הצוות מקצה לך מספר ייעודי. הקוד יופיע כאן בקרוב.
            </p>
          </div>
        </div>
      )}

      {activateCode && (
        <>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex gap-4">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">הכל מוכן</p>
              <p className="text-green-700 text-sm mt-1">
                לחץ על כפתור ההפעלה מטה כדי לחייג את קוד ההפניה ישירות מהטלפון שלך.
              </p>
            </div>
          </div>
          <ForwardingCode
            activateCode={activateCode}
            cancelCode={cancelCode}
            carrier={carrier}
            seconds={seconds}
          />
        </>
      )}

      {/* Explanation */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">איך זה עובד</h2>
        <div className="space-y-3">
          {[
            { icon: '1', text: 'לוחצים "הפעלת הפניה" - הטלפון מחייג קוד GSM אחד' },
            { icon: '2', text: `שיחה שלא נענית תוך ${seconds} שניות עוברת אוטומטית ל-Callnik` },
            { icon: '3', text: 'Callnik לוקחת הודעה ושולחת לך סיכום בוואטסאפ תוך דקה' },
            { icon: '4', text: 'המספר שלך לא משתנה - הלקוחות ממשיכים לחייג אותך כרגיל' },
          ].map(step => (
            <div key={step.icon} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                {step.icon}
              </span>
              <p className="text-gray-600 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            קוד GSM תקני - עובד על פלאפון, פרטנר, סלקום, הוט מובייל ו-012
          </p>
        </div>
      </div>
    </div>
  )
}
