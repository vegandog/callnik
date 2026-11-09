import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למרפאה וטרינרית: מענה 24/7 לחיות מחמד – Callnik',
  description: 'וטרינר בטיפול - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים על החיה ומקצינת הפנייה, ושולחת לך סיכום בוואטסאפ תוך דקה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-veterninar' },
  openGraph: {
    title: 'מזכירה AI למרפאה וטרינרית: מענה 24/7 לחיות מחמד',
    description: 'וטרינר בטיפול - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים על החיה ומקצינת הפנייה.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למרפאה וטרינרית: מענה 24/7 לחיות מחמד',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-veterninar',
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
          מזכירה AI למרפאה וטרינרית:<br />
          <span className="text-blue-600">מענה 24/7 לחיות מחמד</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          פניות למרפאה וטרינרית מגיעות לא רק בשעות פעילות. בעל חיה עם בעיה דחופה מתקשר כשהוא מודאג - ומצפה למענה מיידי.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר של מרפאה וטרינרית עצמאית</h2>
            <p>
              וטרינר עצמאי עובד לבד או עם צוות קטן. בזמן הטיפול - שעה ולפעמים יותר - הטלפון מצלצל. בעלי חיים מתקשרים לשאול האם ניתן לקבל תור דחוף, מה שעות הפעילות, כמה עולה בדיקה.
            </p>
            <p className="mt-3">
              כשלא מקבלים מענה, הם מתקשרים למרפאה הבאה. מרפאות וטרינריות קטנות מפסידות לקוחות חדשים בגלל פספוס שיחות בשעות העמוסות.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מענה חכם לפניות וטרינריות</h2>
            <p>
              Callnik עונה בשמך עם נציגה שמציגה את עצמה כ"מזכירה של מרפאת [שמך]". היא שואלת את שם בעל החיה, סוג החיה, מה הסיבה לפנייה (תור שגרתי/דחוף/שאלה), ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              סיכום בוואטסאפ תוך דקה - כולל מידע שיעזור לך לתעדף: תור שגרתי לעומת בעיה דחופה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום תורים אוטומטי (Pro)</h2>
            <p>
              בתוכנית Pro, בעל חיה שמתקשר לקבוע תור שגרתי - הנציגה בודקת זמינות ביומן ומציעה מועד. הפגישה נרשמת אוטומטית. תורים דחופים - הנציגה מסמנת כ"דחוף" בסיכום.
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
              <li>הפניה סלולרית מהמספר הקיים - Callnik מסבירה צעד אחר צעד</li>
              <li>14 יום ניסיון חינמי ללא התחייבות</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס בעלי חיים חדשים</h2>
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
