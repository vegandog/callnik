import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למרפאת שיניים: תיאום תורים אוטומטי – Callnik',
  description: 'רופא שיניים בטיפול - הטלפון מצלצל ואין מי שיענה. Callnik לוקחת הודעה, מתאמת תורים ושולחת סיכום בוואטסאפ. ללא מזכירה נוספת.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-rofe-shinyaim' },
  openGraph: {
    title: 'מזכירה AI למרפאת שיניים: תיאום תורים אוטומטי',
    description: 'רופא שיניים בטיפול - הטלפון מצלצל ואין מי שיענה. Callnik לוקחת הודעה, מתאמת תורים ושולחת סיכום בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למרפאת שיניים: תיאום תורים אוטומטי',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-rofe-shinyaim',
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
          מזכירה AI למרפאת שיניים:<br />
          <span className="text-blue-600">תיאום תורים אוטומטי</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          כשאתה בטיפול, המרפאה שקטה - אבל הטלפון לא. מטופל שמנסה לקבוע תור ולא מקבל מענה, ינסה במרפאה אחרת.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר של מרפאת שיניים קטנה</h2>
            <p>
              מרפאת שיניים פרטית או קטנה לרוב עובדת בלי מזכירה מלאה. הטיפול אורך 30-60 דקות, בזמן שאתה עסוק מגיעות שיחות רבות - בקשות לתורים, שאלות על מחירים, שאלות על ביטוח.
            </p>
            <p className="mt-3">
              כל שיחה שלא נענתה עלולה להיות מטופל חדש שבחר מרפאה אחרת. במיוחד לילדים ומשפחות - ההורים לרוב מתקשרים למספר מקומות ולוקחים את מי שעונה ראשון.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik עושה למרפאת שיניים</h2>
            <p>
              כשאתה בטיפול ולא עונה, Callnik עונה בשמך. הנציגה שואלת את שם המטופל, מה מטרת הפנייה (תור ראשון, בעיה דחופה, שאלה), ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              בתוך דקה מסתיימת השיחה - אתה מקבל סיכום בוואטסאפ. בין טיפול לטיפול אתה יודע מי מחכה לחזרה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום תורים ישיר (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתחברת ל-Google Calendar שלך. לקוח שמתקשר לקבוע תור - הנציגה בודקת את הזמינות ומציעה שעות פנויות. התור נרשם ביומן אוטומטית.
            </p>
            <p className="mt-3">
              מגדירים מראש: ימי עבודה, שעות, אורך ממוצע של טיפול - ומהרגע הזה תיאום תורים בסיסי פועל מעצמו.
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
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום תורים אוטומטי עם Google Calendar.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הגדרה פשוטה</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים את שם המרפאה ונציגה</li>
              <li>מגדירים הפניה מהמספר הקיים של המרפאה</li>
              <li>14 יום ניסיון חינמי ללא התחייבות</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס מטופלים חדשים</h2>
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
