import Link from 'next/link'
import Image from 'next/image'
import {
  Phone, Headset, ChevronLeft,
  Wrench, Heart, Leaf, HardHat, Scale, Scissors, PawPrint, Car,
} from 'lucide-react'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

const industries = [
  { icon: Wrench,    label: 'שרברבים ואינסטלטורים' },
  { icon: Heart,     label: 'מטפלים ותרפיסטים' },
  { icon: Leaf,      label: 'גננים ונוף' },
  { icon: HardHat,   label: 'קבלנים ושיפוצניקים' },
  { icon: Scale,     label: 'עורכי דין' },
  { icon: Scissors,  label: 'מספרות וקוסמטיקה' },
  { icon: PawPrint,  label: 'וטרינרים ורוחצי כלבים' },
  { icon: Car,       label: 'מוסכים ומכוניות' },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50/70 via-white to-white py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            {/* Text — right on desktop, bottom on mobile */}
            <div className="text-right order-2 md:order-1">
              <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                חדש בישראל
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                לא ענית לטלפון?
                <br />
                <span className="text-blue-600">Callnik ענתה בשבילך.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                כשלקוח מתקשר ולא נענה, Callnik לוקחת את ההודעה ושולחת לך סיכום בוואטסאפ תוך דקה.
                <br className="md:hidden" />
                המספר שלך לא משתנה.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                מתחילים עכשיו
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-400 mt-3">הפעלה תוך 5 דקות. ביטול בכל עת.</p>
            </div>

            {/* WhatsApp phone mockup — left on desktop, top on mobile */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative">
                {/* Decorative blur */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-100/60 rounded-full blur-2xl pointer-events-none" />

                {/* Phone card */}
                <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden w-[260px]">
                  {/* WA header */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      C
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Callnik</p>
                      <p className="text-green-300 text-[11px]">מחובר</p>
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="bg-[#ECE5DD] p-4">
                    <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm p-3 max-w-[92%] mr-auto">
                      <p className="text-[10px] text-emerald-700 font-semibold mb-1.5">Callnik</p>
                      <p className="text-gray-800 text-[12px] leading-relaxed">
                        🔵 Callnik
                      </p>
                      <p className="text-gray-800 text-[12px] leading-relaxed mt-2">
                        הודעה חדשה מ-<strong>דוד כהן</strong> ב-14:32.<br />
                        רוצה הצעת מחיר לשיפוץ<br />
                        לחזרה: 050-1234567
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-gray-100">
                        <p className="text-[11px] text-blue-500 font-medium text-center">האזן להקלטה ↗</p>
                      </div>
                      <p className="text-[10px] text-gray-400 text-left mt-1.5">14:33 ✓✓</p>
                    </div>
                  </div>
                </div>

                {/* Live badge */}
                <div className="absolute -bottom-3 -right-3 bg-green-500 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  הודעה חדשה
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">איך זה עובד</h2>
            <p className="text-gray-500 text-center mb-14 text-sm">
              בלי ציוד, בלי אפליקציה. עובד ברמת הרשת הסלולרית.
            </p>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Phone className="w-6 h-6 text-white" />,
                  title: 'לקוח מתקשר',
                  desc: 'אם לא ענית תוך כמה שניות, השיחה עוברת אוטומטית ל-Callnik',
                },
                {
                  icon: <Headset className="w-6 h-6 text-white" />,
                  title: 'Callnik לוקחת הודעה',
                  desc: 'מזכירה אוטומטית מציגה את עצמה, לוקחת שם, סיבת הפנייה ומספר טלפון',
                },
                {
                  icon: <WhatsAppIcon className="w-6 h-6 text-white" />,
                  title: 'סיכום בוואטסאפ',
                  desc: <>תוך דקה מגיע סיכום לוואטסאפ שלך.<br />שום שיחה לא תיפול בין הכסאות!</>,
                },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="text-center group">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-blue-100 group-hover:shadow-blue-200 group-hover:scale-105 transition-all">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">למי זה מתאים?</h2>
            <p className="text-gray-500 mb-12">לכל עסק שהטלפון הוא קו החזית שלו</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {industries.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-5 flex flex-col items-center gap-3 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-8">ועוד כל מי שאי-אפשר לענות לטלפון בזמן עבודה</p>
          </div>
        </section>

        {/* Voices */}
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">תבחר קול שמתאים לעסק שלך</h2>
            <p className="text-gray-500 mb-10">6 קולות עבריים טבעיים - תשמע כל אחד לפני שתחליט</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {[
                { name: 'דנה',  gender: 'f' },
                { name: 'נועה', gender: 'f' },
                { name: 'עלמה', gender: 'f' },
                { name: 'עדן',  gender: 'f' },
                { name: 'קובי', gender: 'm' },
                { name: 'יואב', gender: 'm' },
              ].map(({ name, gender }) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white ring-2 ring-gray-100">
                    <Image src={`/voices/photo-${name}.jpg`} alt={name} width={64} height={64} className="object-cover w-full h-full" />
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

        {/* Pricing anchor */}
        <section className="py-16 px-4 bg-white border-y border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-400 text-sm mb-2">מחיר פשוט, ללא הפתעות</p>
            <p className="text-5xl font-bold text-gray-900 mb-2">
              ₪99{' '}
              <span className="text-xl font-normal text-gray-400">לחודש + מע&quot;מ</span>
            </p>
            <p className="text-blue-600 text-sm font-medium mb-5">או ₪79 לחודש בתשלום שנתי מראש</p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
            >
              פרטי המחיר המלאים
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-blue-600 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">מוכן להפסיק לפספס לקוחות?</h2>
            <p className="text-blue-100 mb-10 text-lg leading-relaxed">
              הפעלה תוך 5 דקות.<br className="sm:hidden" /> שום שיחה לא תיפול בין הכסאות!
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 text-lg font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              מתחילים עכשיו
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <ChatWidget />
    </>
  )
}
