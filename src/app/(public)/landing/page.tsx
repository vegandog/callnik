'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Check, ChevronDown, Phone, MessageSquare, Headset } from 'lucide-react'
import Footer from '@/components/Footer'

const faqs = [
  { q: 'מי מגדיר את השירות על הקו שלי?', a: 'אתה, דרך הפאנל שלנו. זה פשוט בצורה שתפתיע אותך - ברוב המקרים גומרים בפחות מ-10 דקות. ואם נתקעת איפשהו, תכתוב לנו ונעבור על זה ביחד :)' },
  { q: 'האם אני צריך להחליף מספר טלפון?', a: 'לא. המספר שלך נשאר בדיוק כמו שהוא. Callnik נכנסת לתמונה רק כשאתה לא עונה - הלקוח ידע שדיבר עם מישהו, לאו דווקא שזה היה AI.' },
  { q: 'כמה זמן לוקחת ההגדרה?', a: 'בין 5 ל-10 דקות בפעם הראשונה. בוחרים קול, כותבים כמה מילים על העסק - ומוכנים. לא צריך טכנאי, לא צריך לתאם עם בזק, כלום.' },
  { q: 'מה קורה אחרי 60 שיחות?', a: 'ממשיכים לענות כמו תמיד, בלי שום הפרעה. בסוף החודש מוסיפים 99 אגורות על כל שיחה מעל 60. עסק עם 80 שיחות ישלם בסך הכל ₪118.80. לרוב העסקים הקטנים זה בכלל לא מגיע לזה.' },
  { q: 'האם אפשר לבטל?', a: 'כן, בכל עת. מייל אחד, ביטול בלי שאלות ובלי קנסות. אנחנו לא מאמינים בחוזים שמחזיקים אנשים בכוח. שים לב: מחיר ההיכרות ₪1 ניתן פעם אחת בלבד - חזרה לאחר ביטול מתבצעת במחיר המלא ₪99/חודש.' },
  { q: 'האם המזכירה יכולה לקבוע פגישות?', a: 'כן. מחברים את יומן Google מהפאנל - ואז המזכירה תציע ללקוח לקבוע פגישה ישירות. הפגישה נרשמת ביומן אוטומטית, וסיכום מגיע לוואטסאפ כרגיל.' },
  { q: 'באיזה קול דנה מדברת עם הלקוחות שלי?', a: 'יש 6 קולות עבריים לבחירה - 4 נשיים ו-2 גבריים, שונים בצביון ובאופי. לפני שמחליטים, שומעים כל אחד בפועל. מה שנשמע הכי טבעי לעסק שלך - זה מה שלוקחים.' },
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
  { name: 'עלמה', gender: 'f' },
  { name: 'נועה', gender: 'f' },
  { name: 'עדן',  gender: 'f' },
  { name: 'קובי', gender: 'm' },
  { name: 'יואב', gender: 'm' },
]

function VoiceCard({ name, gender, playing, onPlay }: { name: string; gender: string; playing: boolean; onPlay: (name: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white ring-2 ring-gray-100 cursor-pointer select-none"
        style={{ transition: 'transform 0.2s, box-shadow 0.2s', transform: hovered ? 'scale(1.08)' : 'scale(1)', boxShadow: playing ? '0 0 0 3px #22C55E' : '' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onPlay(name)}
      >
        <Image src={`/voices/photo-${name}.jpg`} alt={name} width={96} height={96} className="object-cover w-full h-full" />
        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.45)', opacity: hovered || playing ? 1 : 0 }}
        >
          {playing
            ? <span className="text-white text-xs font-bold animate-pulse">▶ מנגן</span>
            : <span className="text-white text-xs font-bold">להאזנה</span>
          }
        </div>
      </div>
      <div>
        <p className="text-gray-900 font-semibold text-sm">{name}</p>
        <p className="text-gray-400 text-xs">{gender === 'f' ? 'קול נשי' : 'קול גברי'}</p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = (name: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (playingVoice === name) {
      setPlayingVoice(null)
      return
    }
    const audio = new Audio(`/voices/${name}.mp3`)
    audio.play()
    audio.onended = () => setPlayingVoice(null)
    audioRef.current = audio
    setPlayingVoice(name)
  }

  return (
    <div dir="rtl" className="min-h-screen bg-white font-sans">

      {/* HERO */}
      <style>{`
        @keyframes bannerPop {
          0%   { opacity: 0; transform: translateY(-50%) rotate(-18deg) scale(0.2); }
          100% { opacity: 1; transform: translateY(-50%) rotate(-10deg) scale(1); }
        }
        @keyframes bannerPopMobile {
          0%   { opacity: 0; transform: rotate(-14deg) scale(0.2); }
          100% { opacity: 1; transform: rotate(-6deg) scale(1); }
        }
        @keyframes bannerGlow {
          0%, 100% { filter: drop-shadow(0 8px 24px rgba(236,72,153,0.5)) drop-shadow(0 0 40px rgba(250,204,21,0.3)); }
          50%       { filter: drop-shadow(0 8px 32px rgba(236,72,153,0.9)) drop-shadow(0 0 60px rgba(250,204,21,0.6)); }
        }
      `}</style>
      <section className="bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Desktop BF banner - absolute left of center */}
        <div
          className="absolute hidden md:block pointer-events-none"
          style={{
            left: 'calc(50% - 520px)',
            top: '50%',
            opacity: 0,
            animation: 'bannerPop 0.9s cubic-bezier(0.16,1,0.3,1) 1s forwards, bannerGlow 2.5s ease-in-out 1.9s infinite',
          }}
        >
          <Image src="/banner-bf.png" alt="Black Friday - חודש ראשון ב-₪1" width={270} height={270} style={{ objectFit: 'contain' }} priority />
        </div>

        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          {/* Mobile BF banner */}
          <div
            className="flex justify-center mb-4 md:hidden"
            style={{
              opacity: 0,
              animation: 'bannerPopMobile 0.7s cubic-bezier(0.34,1.56,0.64,1) 1s forwards, bannerGlow 2.5s ease-in-out 1.7s infinite',
            }}
          >
            <Image src="/banner-bf.png" alt="Black Friday - חודש ראשון ב-₪1" width={170} height={170} style={{ objectFit: 'contain' }} />
          </div>

          <div className="flex justify-center mb-6">
            <Image src="/callnik-logo.png" alt="Callnik" width={160} height={55} style={{ objectFit: 'contain' }} priority />
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5 text-gray-900 tracking-tight">
            פספסת שיחה?<br />
            <span className="text-[#22C55E]">הלקוח כבר אצל המתחרה.</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Callnik עונה לכל שיחה שלא הצלחת לקחת, לוקחת הודעה,<br className="hidden md:block" />
            ושולחת לך סיכום מיידי בוואטסאפ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link
              href="#pricing"
              className="flex flex-col items-center bg-[#22C55E] hover:bg-[#16A34A] text-white px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(34,197,94,0.6)] shadow-md"
            >
              <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-2">Basic</span>
              <span className="font-black text-2xl leading-none mb-1">חודש ראשון ב-₪1</span>
              <span className="text-sm opacity-70 line-through font-normal">₪99 + מע&quot;מ לחודש</span>
            </Link>
            <Link
              href="#pricing"
              className="flex flex-col items-center text-white px-9 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(236,72,153,0.6)] shadow-md bg-gradient-to-br from-[#ec4899] to-[#a855f7] hover:from-[#db2777] hover:to-[#9333ea]"
            >
              <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full mb-2">Pro + פגישות</span>
              <span className="font-black text-2xl leading-none mb-1">חודש ראשון ב-₪1</span>
              <span className="text-sm opacity-70 line-through font-normal">₪199 + מע&quot;מ לחודש</span>
            </Link>
          </div>
          <p className="text-orange-500 text-sm font-bold mt-1">⚡ מחיר ₪1 בתוקף לנובמבר 2026 בלבד</p>
          <p className="text-gray-400 text-sm mt-2">ביטול בכל עת | המחיר החודשי לפני מע&quot;מ</p>
          <p className="text-gray-300 text-xs mt-1">* מחיר הניסיון ₪1 חל פעם אחת בלבד</p>
        </div>
      </section>

      {/* VIDEO - landscape */}
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

      {/* VIDEO - vertical (founder) */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-xs mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1243516887?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Callnik"
            />
          </div>
        </div>
        <script src="https://player.vimeo.com/api/player.js" async />
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-14 tracking-tight">איך זה עובד?</h2>
          <div className="relative">
            <div className="absolute right-[1.4rem] top-10 bottom-10 w-px bg-gradient-to-b from-[#22C55E] via-[#22C55E]/40 to-transparent hidden sm:block" />
            {[
              { Icon: Phone,        num: '01', title: 'לקוח מתקשר',      desc: 'לא ענית? Callnik עולה על הקו תוך שנייה, לפני שהלקוח מתנתק.' },
              { Icon: Headset,      num: '02', title: 'דנה מנהלת שיחה',  desc: 'שואלת שם, סיבת שיחה ומספר לחזרה - בעברית שנשמעת אנושית לגמרי.' },
              { Icon: MessageSquare, num: '03', title: 'אתה מקבל סיכום', desc: 'תוך שניות מסוף השיחה - הודעת וואטסאפ עם כל הפרטים ולינק להקשבה.' },
            ].map(({ Icon, num, title, desc }) => (
              <div key={num} className="flex items-start gap-5 mb-10 last:mb-0">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-[#22C55E] flex items-center justify-center relative z-10 shadow-sm">
                  <Icon className="w-5 h-5 text-[#22C55E]" />
                </div>
                <div className="flex-1 pt-1.5">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-[#22C55E] font-black text-sm">{num}</span>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
                <span className="hidden md:block text-[5rem] font-black text-gray-100 leading-none select-none flex-shrink-0 -mt-3">{num}</span>
              </div>
            ))}
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
              <VoiceCard key={name} name={name} gender={gender} playing={playingVoice === name} onPlay={handlePlay} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16 px-6 bg-white scroll-mt-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-2 tracking-tight">בחר תוכנית</h2>
          <p className="text-center text-orange-500 font-bold text-sm mb-10">⚡ חודש ראשון ב-₪1 לנובמבר 2026 בלבד</p>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Basic */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col">
              <div className="mb-5">
                <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">Basic</span>
              </div>
              <div className="mb-1">
                <span className="text-5xl font-black text-gray-900">₪1</span>
                <span className="text-gray-400"> בלבד</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">לחודש הראשון, כולל מע&quot;מ</p>
              <p className="text-gray-500 text-sm mb-1">מחודש שני: <span className="font-bold text-gray-700">₪116.82</span> לחודש (₪99 + מע&quot;מ)</p>
              <p className="text-gray-300 text-xs mb-6">* מחיר ₪1 ניתן פעם אחת בלבד</p>
              <ul className="space-y-3 mb-8 flex-1">
                {['60 שיחות כלולות', '6 קולות AI לבחירה', 'תמלול + הקלטה', 'וואטסאפ + מייל מיידי', 'ביטול בכל עת'].map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register?intro=1"
                className="block w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-lg py-4 rounded-xl text-center transition-all"
              >
                הצטרף ל-Basic
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#ec4899] flex flex-col relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-[#ec4899] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">מומלץ</div>
              <div className="mb-5">
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7)' }}>Pro</span>
              </div>
              <div className="mb-1">
                <span className="text-5xl font-black text-gray-900">₪1</span>
                <span className="text-gray-400"> בלבד</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">לחודש הראשון, כולל מע&quot;מ</p>
              <p className="text-gray-500 text-sm mb-1">מחודש שני: <span className="font-bold text-gray-700">₪234.82</span> לחודש (₪199 + מע&quot;מ)</p>
              <p className="text-gray-300 text-xs mb-6">* מחיר ₪1 ניתן פעם אחת בלבד</p>
              <ul className="space-y-3 mb-8 flex-1">
                {['60 שיחות כלולות', '6 קולות AI לבחירה', 'תמלול + הקלטה', 'וואטסאפ + מייל מיידי', 'ביטול בכל עת', 'קביעת פגישות ב-Google Calendar', 'סיכום פגישה בוואטסאפ'].map((f, i) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${i >= 5 ? 'text-[#ec4899]' : 'text-[#22C55E]'}`} />
                    <span className={`text-sm ${i >= 5 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register?intro=1&tier=pro"
                className="block w-full text-white font-bold text-lg py-4 rounded-xl text-center transition-all"
                style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7)' }}
              >
                הצטרף ל-Pro
              </Link>
            </div>

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
          <Link
            href="/register?intro=1"
            className="inline-block text-white font-bold text-lg px-10 py-4 rounded-full transition-all"
            style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 0 32px rgba(34,197,94,0.5), 0 4px 20px rgba(0,0,0,0.15)' }}
          >
            התחל עכשיו - ₪1 לחודש הראשון
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
