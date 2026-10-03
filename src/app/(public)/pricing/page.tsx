import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Check, ChevronLeft } from 'lucide-react'

const features = [
  '60 שיחות לחודש כלולות',
  'מזכירה AI בעברית',
  '6 קולות לבחירה',
  'תמלול והקלטה של כל שיחה',
  'הודעת וואטסאפ אחרי כל שיחה',
  'היסטוריית שיחות מלאה',
  'מספר טלפון ייעודי כלול',
  'תמיכה בכל חברות הסלולר',
  'פאנל ניהול',
]

const faqs = [
  {
    q: 'מה זה 60 שיחות כלולות?',
    a: 'כל שיחה שה-AI שלנו עונה עליה נספרת אחת - לא משנה אם היא 20 שניות או 2 דקות. שרברב ממוצע מקבל 20-40 שיחות שלא נענות בחודש, כך שרוב העסקים לא יחרגו בכלל.',
  },
  {
    q: 'מה קורה אם עברתי 60 שיחות?',
    a: 'ממשיכים לענות על כל השיחות ללא הפרעה. בסוף החודש תקבל חשבון נוסף של 99 אג׳ לכל שיחה מעל 60. עסק עם 80 שיחות ישלם ₪99 + 20×₪0.99 = ₪119 בלבד.',
  },
  {
    q: 'האם ניתן לבטל? יש קנסות?',
    a: 'ביטול בכל עת, ללא קנס. מנוי חודשי - הביטול נכנס לתוקף בסוף החודש. מנוי שנתי - מחשבים כמה חודשים השתמשת לפי מחיר חודשי רגיל (₪99), ומחזירים את השאר. לדוגמה: שילמת ₪948 לשנה וביטלת אחרי 6 חודשים - תקבל בחזרה ₪948 פחות 6×₪99 = ₪354. אין קאטצ\'.',
  },
  {
    q: 'האם צריך להחליף מספר טלפון?',
    a: 'לא. המספר שלך לא משתנה. מגדירים הפניית שיחה דרך חברת הסלולר (תהליך של 2 דקות) - וזהו. Callnik מקבלת את השיחות שלא נענו.',
  },
  {
    q: 'כמה זמן לוקח להתחיל?',
    a: 'ממלאים טופס רישום, ניצור איתך קשר תוך 24 שעות, תגדיר הפניה בחברת הסלולר - וה-AI מתחיל לענות.',
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">מחירים</h1>
            <p className="text-gray-500">כולל הכל. ללא הפתעות.</p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">

            {/* Annual */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 shadow-xl shadow-blue-50 flex flex-col">
              <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-6 self-center">
                הכי משתלם - חסכון 20%
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">תשלום שנתי מראש</p>
              <div className="text-5xl font-bold text-gray-900 mb-1">
                ₪79
                <span className="text-xl font-normal text-gray-400">/חודש</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">₪948 לשנה + מע&quot;מ</p>
              <p className="text-blue-600 text-sm font-medium mb-8">חסכון של ₪240 לשנה</p>
              <ul className="text-right space-y-3 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                מתחילים
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">הפעלה אוטומטית תוך כמה דקות לאחר תשלום.</p>
            </div>

            {/* Monthly */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col">
              <div className="h-7 mb-6" />
              <p className="text-gray-500 text-sm font-medium mb-1">תשלום חודשי</p>
              <div className="text-5xl font-bold text-gray-900 mb-1">
                ₪99
                <span className="text-xl font-normal text-gray-400">/חודש</span>
              </div>
              <p className="text-gray-400 text-sm mb-8">+ מע&quot;מ</p>
              <ul className="text-right space-y-3 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700">
                    <div className="w-5 h-5 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-gray-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                מתחילים
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <p className="text-xs text-gray-400 mt-3 text-center">הפעלה אוטומטית תוך כמה דקות לאחר תשלום.</p>
            </div>

          </div>

          {/* Overage note */}
          <div className="max-w-2xl mx-auto mb-14">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 text-sm text-amber-800 text-center">
              מעל 60 שיחות בחודש? כל שיחה נוספת עולה <strong>99 אג׳</strong> בלבד.
              <span className="text-amber-600 block mt-1 text-xs">רוב העסקים הקטנים לא יגיעו לזה בכלל.</span>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">שאלות נפוצות</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-gray-100 px-6 py-5">
                  <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
