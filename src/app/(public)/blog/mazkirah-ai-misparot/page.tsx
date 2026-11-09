import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למספרה וסלון: תיאום תורים אוטומטי – Callnik',
  description: 'ספר/ת בתספורת - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים ומתאמת תורים אוטומטית. ללא הפסקת שירות ללקוח הנוכחי.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-misparot' },
  openGraph: {
    title: 'מזכירה AI למספרה וסלון: תיאום תורים אוטומטי',
    description: 'ספר/ת בתספורת - הטלפון מצלצל. Callnik עונה בשמך ומתאמת תורים אוטומטית.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למספרה וסלון: תיאום תורים אוטומטי',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-misparot',
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
          מזכירה AI למספרה וסלון:<br />
          <span className="text-blue-600">תיאום תורים אוטומטי</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          ספר או ספרית עובד עם הידיים כל היום - אי אפשר לענות לטלפון בין כל לקוח. Callnik פותרת את זה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מספרה - כל היום בידיים</h2>
            <p>
              ספר עובד 8-10 שעות ביום עם לקוחות רצופים. לענות לטלפון בין תספורת לתספורת - אפשרי, אבל לא נוח. ולפעמים פשוט אי אפשר. לקוח שלא מקבל מענה מתקשר למספרה הבאה.
            </p>
            <p className="mt-3">
              מספרות רבות מפסידות תורים כי הן לא מגיבות מהיר מספיק. Callnik פותרת את הפינה הזאת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מענה אוטומטי למספרה</h2>
            <p>
              Callnik עונה כשאתה לא יכול - שואלת את שם המתקשר, מה הוא מחפש (תור, שאלה על מחיר, שעות פעילות), ומספר ליצירת קשר. סיכום בוואטסאפ תוך דקה.
            </p>
            <p className="mt-3">
              בין לקוח ללקוח אתה רואה מי צריך תור - ומתקשר חזרה בחצי דקה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום תורים ישיר (Pro)</h2>
            <p>
              בתוכנית Pro, לקוח שמתקשר לקבוע תור - הנציגה בודקת את היומן שלך ומציעה שעה פנויה. הלקוח מאשר - והתור נרשם אוטומטית ב-Google Calendar. בלי שתיגע בטלפון.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. לוקחת הודעות ושולחת לך סיכום בוואטסאפ.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום תורים אוטומטי עם Google Calendar.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתחילים תוך 5 דקות</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים את שם המספרה והנציגה</li>
              <li>הפניה מהמספר הקיים - Callnik מסבירה כיצד</li>
              <li>14 יום ניסיון חינמי - ורואים כמה תורים פספסת</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס תורים חדשים</h2>
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
