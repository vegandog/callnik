import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לחשמלאי: מענה אוטומטי בזמן עבודה – Callnik',
  description: 'חשמלאי עסוק בהתקנה - הטלפון מצלצל ואין מי שיענה. Callnik עונה בשמך, לוקחת פרטים ושולחת לך סיכום בוואטסאפ. ללא מזכירה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-hashmal' },
  openGraph: {
    title: 'מזכירה AI לחשמלאי: מענה אוטומטי בזמן עבודה',
    description: 'חשמלאי עסוק בהתקנה - הטלפון מצלצל ואין מי שיענה. Callnik עונה בשמך, לוקחת פרטים ושולחת לך סיכום בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לחשמלאי: מענה אוטומטי בזמן עבודה',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-hashmal',
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
          מזכירה AI לחשמלאי:<br />
          <span className="text-blue-600">מענה אוטומטי בזמן עבודה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          חשמלאי עסוק בלוח חשמל, על סולם, או בהתקנה - והטלפון מצלצל. כשיש פנייה דחופה, הלקוח לא ימתין. הוא יעבור לחשמלאי הבא ברשימה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר של חשמלאי עצמאי</h2>
            <p>
              חשמלאי עובד לעיתים קרובות באזורים שאי אפשר להוציא טלפון - תוך כדי עבודה על לוח, בגובה, או בזמן שהידיים עסוקות בחיווט. כל שיחה שלא נענתה היא הזדמנות עבודה שעברה לאחר.
            </p>
            <p className="mt-3">
              עבודות חשמל רבות הן דחופות - תקלה, חוסר חשמל, בטיחות. כשאדם לא מקבל מענה מיידי, הוא מתקשר לחשמלאי אחר מיד.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך Callnik עובדת לחשמלאי</h2>
            <p>
              כשהטלפון שלך מצלצל ואתה לא עונה, Callnik עונה אחרי 15-20 שניות. הנציגה מציגה את עצמה כ"מזכירה האוטומטית של [שמך]", שואלת את שם הלקוח, מה הבעיה, איזה סוג עבודה (תקלה/התקנה/בדיקה) ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              בתוך דקה אתה מקבל סיכום בוואטסאפ. ברגע שמסיים את העבודה הנוכחית - אתה יודע מי חיפש אותך ומה הוא צריך.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול פגישות ביקור (Pro)</h2>
            <p>
              תוכנית Pro מתחברת ל-Google Calendar. לקוח שמתקשר לקבוע ביקור - הנציגה מציעה שעות פנויות מהיומן שלך ומזמינה אותו ישירות. לא צריך להתקשר חזרה כדי לאשר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לחשמלאי עם לקוחות קבועים שרוצה לאסוף פניות חדשות.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול ביקורים אוטומטי עם Google Calendar.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתחילים תוך 5 דקות</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים את שם הנציגה והסגנון</li>
              <li>מגדירים הפניה מהמספר הסלולרי שלך (Callnik מסבירה צעד אחר צעד)</li>
              <li>14 יום ניסיון חינמי - ורואים את השיחות שפספסת</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס עבודות חדשות</h2>
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
