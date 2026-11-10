import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לאחזקה: כל תקלה מקבלת מענה – Callnik',
  description: 'איש אחזקה עסוק בתיקון - הטלפון לא נענה. Callnik מקבלת את הפניה, לוקחת פרטי התקלה ומשלחת לך סיכום בוואטסאפ.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-achazan' },
  openGraph: {
    title: 'מזכירה AI לאחזקה: כל תקלה מקבלת מענה',
    description: 'איש אחזקה עסוק בתיקון - הטלפון לא נענה. Callnik מקבלת את הפניה, לוקחת פרטי התקלה ומשלחת לך סיכום בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לאחזקה: כל תקלה מקבלת מענה',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-achazan',
  inLanguage: 'he',
}

export default function Article() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-20 text-right">
        <div className="mb-4">
          <Link href="/blog" className="text-sm text-blue-500 hover:underline">חזרה לבלוג</Link>
        </div>
        <p className="text-sm text-gray-400 mb-3">10 בנובמבר 2026</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          מזכירה AI לאחזקה:<br />
          <span className="text-blue-600">כל תקלה מקבלת מענה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          איש אחזקה עובד לבד - מתקן, מחפש חלק, טיפס על גג. כל שיחה שלא נענתה היא דייר מתוסכל שיחפש פתרון אחר. Callnik מכסה אותך.
        </p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מדוע אחזקה צריכה מזכירה AI?</h2>
            <p>
              פניות אחזקה הן לרוב דחופות - נזילה, תקר, מזגן שבור. דייר שלא מקבל מענה מיידי מתקשר לחברת אחזקה אחרת. כל פניה שלא נלכדת היא הפסד ישיר.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik שואלת בפניית אחזקה?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>סוג התקלה - אינסטלציה, חשמל, נגרות, מזגן</li>
              <li>דחיפות - האם זה דלף פעיל, חוסר חשמל</li>
              <li>כתובת הנכס</li>
              <li>שם ומספר של הדייר</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול תורים (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתחברת ל-Google Calendar ומציעה ללקוח שעת ביקור פנויה ישירות מהיומן שלך. לא צריך להתקשר חזרה כדי לתאם.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Basic</span>
                <span className="text-blue-600 font-bold">99 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 60 שיחות חודשיות. מענה אוטומטי וסיכומים בוואטסאפ.</p>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-semibold">Pro</span>
                <span className="text-blue-600 font-bold">149 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 150 שיחות + ניהול יומן Google Calendar.</p>
            </div>
          </section>
          <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס לקוחות?</h3>
            <p className="text-gray-400 mb-6">חודש ראשון ב-1 &#8362; בלבד. ביטול בכל עת.</p>
            <Link href="/#signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              התחל עכשיו
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
