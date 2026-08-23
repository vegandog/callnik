import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">איך זה עובד</h1>
        <p className="text-gray-500 text-center mb-12">
          בלי ציוד, בלי אפליקציה מיוחדת. עובד ברמת הרשת הסלולרית.
        </p>
        <div className="space-y-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {s.num}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-800 mb-2">מה Callnik לא עושה</h3>
          <ul className="text-amber-700 text-sm space-y-1">
            <li>- לא מתחזה לבעל העסק. תמיד מציגה את עצמה כמזכירה אוטומטית.</li>
            <li>- לא נותנת ייעוץ מקצועי. אם שואלים שאלה, היא אומרת "אני רק רושמת, יחזרו אליך."</li>
            <li>- לא משנה את המספר שלך אצל הלקוחות.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
