'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Check, ChevronDown, Phone, MessageSquare, Zap } from 'lucide-react'

const faqs = [
  { q: 'האם אני צריך להחליף מספר טלפון?', a: 'לא. Callnik מקבל את השיחות שלא ענית - המספר שלך נשאר אותו דבר. הלקוח לא ידע שדיבר עם AI.' },
  { q: 'כמה זמן לוקחת ההגדרה?', a: 'כ-5 דקות. בוחר קול, כותב מה Callnik יגיד, ומקבל מספר. זהו.' },
  { q: 'מה קורה אחרי 60 שיחות?', a: 'ממשיכים לענות בלי הפרעה. בסוף החודש 99 אגורות לכל שיחה נוספת. עסק עם 80 שיחות ישלם ₪99 + ₪19.80 = ₪118.80 בלבד.' },
  { q: 'האם אפשר לבטל?', a: 'כן, בכל עת, ללא קנסות. הביטול נכנס לתוקף בסוף החודש.' },
  { q: 'באיזה קול Callnik מדבר עם הלקוחות שלי?', a: 'יש 6 קולות עבריים לבחירה - גבר ואישה, קול רשמי וקול חמים. תשמע כל אחד לפני שתבחר.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-right font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        <span>{q}</span>
      </button>
      {open && <p className="pb-4 text-gray-600 leading-relaxed text-right">{a}</p>}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans">

      {/* HERO */}
      <section className="bg-[#0A0E2A] text-white px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#06B6D4] text-sm font-medium tracking-wide mb-4 uppercase">Callnik · המזכירה הדיגיטלית שלך</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            פספסת שיחה?<br />
            <span className="text-[#22C55E]">הלקוח כבר אצל המתחרה.</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Callnik עונה לכל שיחה שלא הצלחת לקחת, לוקחת הודעה,<br className="hidden md:block" />
            ושולחת לך סיכום מיידי בוואטסאפ.
          </p>
          <Link
            href="/register"
            className="inline-block bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors shadow-lg"
          >
            התחל עכשיו - ₪29 לחודש הראשון
          </Link>
          <p className="text-gray-400 text-sm mt-3">אחר כך ₪99/חודש + מע&quot;מ · ביטול בכל עת</p>
        </div>
      </section>

      {/* WHATSAPP MOCKUP */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ככה אתה לא מפספס שום לקוח</h2>
          <p className="text-gray-500 mb-8">תוך שניות מהשיחה - תקבל זה בוואטסאפ:</p>

          {/* Phone mockup */}
          <div className="bg-[#0A0E2A] rounded-3xl p-4 shadow-2xl max-w-xs mx-auto">
            <div className="bg-[#111827] rounded-2xl overflow-hidden">
              {/* WhatsApp header */}
              <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center text-white text-xs font-bold">C</div>
                <div className="text-right flex-1">
                  <p className="text-white text-sm font-medium">Callnik Bot</p>
                  <p className="text-green-200 text-xs">מזכירה דיגיטלית</p>
                </div>
              </div>
              {/* Chat bubble */}
              <div className="bg-[#ECE5DD] px-4 py-5">
                <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                  <p className="text-gray-800 text-sm leading-relaxed text-right">
                    📞 <strong>שיחה שהוחמצה</strong><br />
                    <br />
                    👤 שם: דניאל כהן<br />
                    📱 טלפון: 050-1234567<br />
                    💬 נושא: רוצה לברר על מחירים<br />
                    ⏰ שעה: 14:32
                  </p>
                  <p className="text-gray-400 text-xs mt-2 text-left">14:32 ✓✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">איך זה עובד?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Phone className="w-7 h-7" />, n: '1', title: 'לקוח מתקשר', desc: 'כשאתה לא זמין, Callnik עונה תוך שנייה' },
              { icon: <Zap className="w-7 h-7" />, n: '2', title: 'AI מנהל שיחה', desc: 'שואל שם, סיבת שיחה ומספר לחזרה - בעברית טבעית' },
              { icon: <MessageSquare className="w-7 h-7" />, n: '3', title: 'אתה מקבל סיכום', desc: 'הודעת וואטסאפ עם כל הפרטים - תוך שניות' },
            ].map(({ icon, n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-16 h-16 bg-[#0A0E2A] text-[#06B6D4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  {icon}
                </div>
                <div className="text-[#22C55E] font-bold text-sm mb-1">שלב {n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">מחיר פשוט, ברור</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">חודש ניסיון</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-5xl font-bold text-gray-900">₪29</span>
              <span className="text-gray-400 text-lg"> לחודש הראשון</span>
            </div>
            <p className="text-center text-gray-400 text-sm mb-6">מחודש שני: ₪99/חודש + מע&quot;מ</p>
            <ul className="space-y-3 mb-8">
              {[
                '60 שיחות כלולות',
                '6 קולות AI לבחירה',
                'תמלול + הקלטה',
                'וואטסאפ + מייל מיידי',
                'ביטול בכל עת',
              ].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="block w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg py-4 rounded-xl text-center transition-colors"
            >
              התחל עכשיו
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">שאלות נפוצות</h2>
          <div className="bg-gray-50 rounded-2xl px-6">
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0A0E2A] text-white py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">מוכן לא לפספס אף לקוח?</h2>
          <p className="text-gray-400 mb-8">הגדרה תוך 5 דקות. ביטול בכל עת.</p>
          <Link
            href="/register"
            className="inline-block bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            התחל עכשיו - ₪29 לחודש הראשון
          </Link>
          <p className="text-gray-500 text-sm mt-4">callnik.com</p>
        </div>
      </section>

    </div>
  )
}
