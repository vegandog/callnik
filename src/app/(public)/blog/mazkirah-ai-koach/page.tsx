import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למאמן כושר ואישי: קבע פגישות בלי לעצור אימון – Callnik',
  description: 'מאמן כושר באימון - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים על הפנייה ומתאמת שיחת היכרות. ללא הפרעה לאימון.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-koach' },
  openGraph: {
    title: 'מזכירה AI למאמן כושר ואישי: קבע פגישות בלי לעצור אימון',
    description: 'מאמן כושר באימון - הטלפון מצלצל. Callnik עונה בשמך ומתאמת שיחות היכרות אוטומטית.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למאמן כושר ואישי: קבע פגישות בלי לעצור אימון',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-koach',
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
          מזכירה AI למאמן כושר ואישי:<br />
          <span className="text-blue-600">קבע פגישות בלי לעצור אימון</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          מאמן כושר עובד עם הגוף שלו - במגרש, בחדר כושר, בבריכה. לענות לטלפון באמצע אימון זה לא מקצועי ולא אפשרי. Callnik פותרת את זה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מאמן כושר ואישי - כמה שיחות מפספסים</h2>
            <p>
              מאמן כושר עצמאי מנהל 5-15 מתאמנים ביום. בזמן כל אימון - שעה עד שעה וחצי - הטלפון יכול לצלצל עם פנייה חדשה. מתאמן פוטנציאלי שמתקשר ולא מקבל מענה, ינסה אצל מאמן אחר שיגיב מהר יותר.
            </p>
            <p className="mt-3">
              גם לידים ממודעות ורשתות חברתיות מגיעים לטלפון - ואם לא עונים תוך כמה שעות, ה-lead מתקרר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Callnik כמזכירה של המאמן</h2>
            <p>
              Callnik עונה בשמך - שואלת מה מחפש המתקשר (מידע על אימונים, מחירים, שיחת היכרות), ואת מספרו. סיכום בוואטסאפ תוך דקה.
            </p>
            <p className="mt-3">
              אחרי האימון - ברור לך מי חיפש אותך ומה הוא צריך. חוזר בשיחה ממוקדת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום שיחות היכרות ואימונים (Pro)</h2>
            <p>
              בתוכנית Pro, מתאמן פוטנציאלי שרוצה שיחת היכרות - הנציגה בודקת את היומן שלך ומציעה שעה פנויה. נרשמת ב-Google Calendar - אתה מגיע מוכן.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. לוקחת הודעות ושולחת סיכום בוואטסאפ.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום שיחות היכרות ואימונים אוטומטי.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתחילים תוך 5 דקות</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים שם ונציגה</li>
              <li>הגדרת הפניה מהמספר הקיים שלך</li>
              <li>14 יום ניסיון חינמי ללא התחייבות</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס מתאמנים חדשים</h2>
          <p className="text-blue-100 mb-5">14 יום ניסיון ללא תשלום. ביטול בכל עת.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            התחל עכשיו
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
