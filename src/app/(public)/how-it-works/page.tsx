import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const steps = [
  {
    num: '1',
    title: 'נרשמים ומצרפים את העסק',
    desc: 'ממלאים שם עסק, תחום עיסוק, מספר וואטסאפ שיקבל הודעות, ואיזה חברה סלולרית יש לך.',
  },
  {
    num: '2',
    title: 'Callnik מקצה מספר ייעודי',
    desc: 'המערכת מקצה מספר טלפון ייעודי עבורך. המספר שלך אצל הלקוחות לא משתנה כלל.',
  },
  {
    num: '3',
    title: 'מפעילים הפניה סלולרית',
    desc: 'עושים חיוג אחד מהטלפון (נשמח לעזור), שמגדיר: אם לא ענית תוך X שניות - עבור ל-Callnik.',
  },
  {
    num: '4',
    title: 'Callnik עונה לכל שיחה שלא נענתה',
    desc: 'המזכירה מציגה את עצמה כמזכירה אוטומטית של העסק שלך, לוקחת שם, מספר וסיבת הפנייה.',
  },
  {
    num: '5',
    title: 'סיכום בוואטסאפ תוך דקה',
    desc: 'אחרי שהשיחה מסתיימת, מגיעה הודעת וואטסאפ עם כל הפרטים. אתה חוזר רק למי שרלוונטי.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">איך זה עובד</h1>
          <p className="text-gray-500 text-center mb-14">
            בלי ציוד, בלי אפליקציה מיוחדת. עובד ברמת הרשת הסלולרית.
          </p>

          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-5 items-start bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-100 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md shadow-blue-100">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="font-semibold text-amber-800 mb-3">מה Callnik לא עושה</h3>
            <ul className="text-amber-700 text-sm space-y-2">
              <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">-</span> לא מתחזה לבעל העסק. תמיד מציגה את עצמה כמזכירה אוטומטית.</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">-</span> לא נותנת ייעוץ מקצועי. אם שואלים שאלה, היא אומרת "אני רק רושמת, יחזרו אליך."</li>
              <li className="flex gap-2"><span className="text-amber-400 shrink-0 mt-0.5">-</span> לא משנה את המספר שלך אצל הלקוחות.</li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
            >
              מתחילים עכשיו
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
