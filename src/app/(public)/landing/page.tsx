'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Check, ChevronDown, Phone, MessageSquare, Headset } from 'lucide-react'
import Footer from '@/components/Footer'

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
    <div className="border-b border-gray-200 last:border-0" dir="rtl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex flex-row-reverse items-center justify-between py-4 font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        <span className="text-right flex-1">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-4 text-gray-600 leading-relaxed text-right">{a}</p>}
    </div>
  )
}

const voices = [
  { name: 'דנה',  gender: 'f' },
  { name: 'נועה', gender: 'f' },
  { name: 'עלמה', gender: 'f' },
  { name: 'עדן',  gender: 'f' },
  { name: 'קובי', gender: 'm' },
  { name: 'יואב', gender: 'm' },
]

export default function LandingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans">

      {/* HERO */}
      <section className="bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Banner - absolute, left of center text, not affecting layout */}
        <div
          className="absolute hidden md:block"
          style={{
            left: 'calc(50% - 520px)',
            top: '50%',
            transform: 'translateY(-50%) rotate(-10deg)',
            filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.22))',
          }}
        >
          <Image src="/banner-70.png" alt="70% הנחה לחודש הראשון" width={250} height={250} style={{ objectFit: 'contain' }} priority />
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          {/* Mobile banner */}
          <div className="flex justify-center mb-4 md:hidden" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.18))' }}>
            <div style={{ transform: 'rotate(-8deg)' }}>
              <Image src="/banner-70.png" alt="70% הנחה לחודש הראשון" width={150} height={150} style={{ objectFit: 'contain' }} />
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <Image src="/callnik-logo.png" alt="Callnik" width={160} height={55} style={{ objectFit: 'contain' }} priority />
          </div>
          <p className="text-[#06B6D4] text-sm font-medium tracking-wide mb-4 uppercase">דנה המזכירה שלך</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            פספסת שיחה?<br />
            <span className="text-[#22C55E]">הלקוח כבר אצל המתחרה.</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Callnik עונה לכל שיחה שלא הצלחת לקחת, לוקחת הודעה,<br className="hidden md:block" />
            ושולחת לך סיכום מיידי בוואטסאפ.
          </p>
          <Link href="/register?intro=1" className="inline-block bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg px-8 py-4 rounded-full transition-colors shadow-lg">
            התחל עכשיו - ₪29 + מע&quot;מ לחודש הראשון
          </Link>
          <p className="text-gray-400 text-sm mt-3">כל המחירים לפני מע&quot;מ · אחר כך ₪99/חודש · ביטול בכל עת</p>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1232669320?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Callnik demo"
            />
          </div>
        </div>
      </section>

      {/* WHATSAPP MOCKUP */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ככה אתה לא מפספס שום לקוח</h2>
          <p className="text-gray-500 mb-8">תוך שניות מהשיחה - תקבל את זה בוואטסאפ:</p>

          <div className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="px-4 py-6" style={{ backgroundColor: '#EFE7DD', backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b89a' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
              <div className="bg-white rounded-2xl rounded-tr-sm px-5 py-4 shadow-sm text-right">
                <div className="flex items-center justify-end gap-2 mb-3">
                  <span className="font-bold text-gray-900 text-base">Callnik</span>
                  <span className="text-2xl leading-none">🔵</span>
                </div>
                <p className="text-gray-800 text-[15px] leading-relaxed mb-3">
                  הודעה חדשה מ-<strong>דניאל</strong> ב 11:13.<br />
                  ביקש הצעת מחיר למטבח קומפלט ולחזור<br />
                  אליו בהקדם האפשרי
                </p>
                <p className="text-gray-700 text-[14px] mb-4">
                  לחזרה: <span className="text-blue-600 font-medium">055-3092131</span> — Callnik
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <p className="text-gray-400 text-xs">11:13</p>
                  <a href="#" className="flex items-center gap-1 text-[#25D366] font-medium text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    האזן להקלטה
                  </a>
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
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-10 h-10 text-[#0A0E2A]" />
              </div>
              <div className="text-[#22C55E] font-bold text-sm mb-1">שלב 1</div>
              <h3 className="font-bold text-gray-900 mb-2">לקוח מתקשר</h3>
              <p className="text-gray-500 text-sm leading-relaxed">כשאתה לא זמין, Callnik עונה תוך שנייה</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headset className="w-10 h-10 text-[#0A0E2A]" />
              </div>
              <div className="text-[#22C55E] font-bold text-sm mb-1">שלב 2</div>
              <h3 className="font-bold text-gray-900 mb-2">דנה מנהלת שיחה</h3>
              <p className="text-gray-500 text-sm leading-relaxed">שואלת שם, סיבת שיחה ומספר לחזרה - בעברית טבעית</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-[#0A0E2A]" />
              </div>
              <div className="text-[#22C55E] font-bold text-sm mb-1">שלב 3</div>
              <h3 className="font-bold text-gray-900 mb-2">אתה מקבל סיכום</h3>
              <p className="text-gray-500 text-sm leading-relaxed">הודעת וואטסאפ עם כל הפרטים - תוך שניות</p>
            </div>
          </div>
        </div>
      </section>

      {/* VOICES - real photos */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">תבחר קול שמתאים לעסק שלך</h2>
          <p className="text-gray-500 mb-10">6 קולות עבריים טבעיים - תשמע כל אחד לפני שתחליט</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {voices.map(({ name, gender }) => (
              <div key={name} className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white ring-2 ring-gray-100">
                  <Image
                    src={`/voices/photo-${name}.jpg`}
                    alt={name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{gender === 'f' ? 'קול נשי' : 'קול גברי'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">מחיר פשוט, ברור</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">חודש ניסיון</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-5xl font-bold text-gray-900">₪29</span>
              <span className="text-gray-400 text-lg"> + מע&quot;מ לחודש הראשון</span>
            </div>
            <p className="text-center text-gray-400 text-sm mb-6">מחודש שני: ₪99/חודש + מע&quot;מ</p>
            <ul className="space-y-3 mb-8">
              {['60 שיחות כלולות', '6 קולות AI לבחירה', 'תמלול + הקלטה', 'וואטסאפ + מייל מיידי', 'ביטול בכל עת'].map(f => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            <Link href="/register?intro=1" className="block w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg py-4 rounded-xl text-center transition-colors">
              התחל עכשיו
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">שאלות נפוצות</h2>
          <div className="bg-white rounded-2xl px-6 shadow-sm border border-gray-100">
            {faqs.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-16 px-6 text-center border-t border-gray-200">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">מוכן לא לפספס אף לקוח?</h2>
          <p className="text-gray-500 mb-8">הגדרה תוך 5 דקות. ביטול בכל עת.</p>
          <Link href="/register?intro=1" className="inline-block bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-lg">
            התחל עכשיו - ₪29 + מע&quot;מ לחודש הראשון
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
