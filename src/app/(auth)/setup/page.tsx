import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Settings, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react'
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

  const isPending = !customer?.twilio_number
  const twilioNumber = customer?.twilio_number
  const carrier = customer?.carrier || 'אחר'
  const seconds = CARRIER_SECONDS[carrier] ?? 20

  const localNumber = twilioNumber?.replace(/^\+972/, '0') ?? null
  const activateCode = localNumber ? `*61*${localNumber}**${seconds}#` : null
  const cancelCode = `##61#`

  return (
    <div className="max-w-lg mx-auto">

      {/* Hero */}
      <div className="text-center py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          ברוכים הבאים למשפחת Callnik!
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          מעכשיו, כל לקוח שיתקשר ולא תענה - <strong>לא יאבד לעולם.</strong><br />
          Callnik תקבל את השיחה, תיקח הודעה, ותשלח לך סיכום בוואטסאפ תוך דקה.
        </p>
      </div>

      {isPending ? (
        <div className="space-y-5 px-4 pb-10">

          <div className="bg-blue-600 rounded-2xl p-7 text-white text-center shadow-lg">
            <Settings className="w-10 h-10 mx-auto mb-4 text-blue-200" />
            <h2 className="text-xl font-bold mb-2">אנחנו מכינים הכל בשבילך</h2>
            <p className="text-blue-100 leading-relaxed text-sm">
              הצוות שלנו מגדיר את הנציג/ה האישי/ת שלך ומקצה לך מספר ייעודי.
              זה לוקח בדרך כלל עד 24 שעות - ותקבל מייל כשהכל מוכן.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-center">מה קורה עכשיו?</h3>
            <div className="space-y-4">
              {[
                { icon: Mail, title: 'תקבל מייל', desc: 'כשהכל מוכן נשלח לך מייל עם הוראות הפעלה פשוטות' },
                { icon: Phone, title: 'חיוג אחד ואתה חי', desc: 'תחייג קוד אחד מהטלפון שלך - ו-Callnik מתחילה לעבוד' },
                { icon: MessageSquare, title: 'מיד מתחיל לקבל הודעות', desc: 'כל שיחה שלא נענית תגיע אליך כסיכום בוואטסאפ תוך דקה' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
            <p className="text-green-800 text-sm font-medium">
              המספר שלך לא משתנה. הלקוחות ממשיכים להתקשר אליך בדיוק אותו דבר.
            </p>
          </div>

          <div className="text-center pt-2">
            <p className="text-gray-400 text-sm mb-3">בינתיים, אפשר להכיר את המקום</p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              לאזור האישי
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-5 px-4 pb-10">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="font-bold text-green-800 text-lg">הכל מוכן! צעד אחד ואתה פעיל</p>
            <p className="text-green-700 text-sm mt-1">
              לחץ על הכפתור הכחול למטה - הטלפון שלך יחייג אוטומטית ו-Callnik תתחיל לעבוד.
            </p>
          </div>

          <ForwardingCode
            activateCode={activateCode!}
            cancelCode={cancelCode}
            carrier={carrier}
            seconds={seconds}
          />
        </div>
      )}
    </div>
  )
}
