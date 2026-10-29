import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לעורך דין: לא עונה בפגישה? Callnik עונה – Callnik',
  description: 'עורך דין שלא עונה לטלפון מפסיד לקוחות. כיצד מענה אוטומטי חכם שומר על המוניטין המקצועי ועל כל פנייה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-orekh-din' },
  openGraph: {
    title: 'מזכירה AI לעורך דין: לא עונה בפגישה? Callnik עונה',
    description: 'עורך דין שלא עונה לטלפון מפסיד לקוחות. כיצד מענה אוטומטי חכם שומר על המוניטין המקצועי.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לעורך דין: לא עונה בפגישה? Callnik עונה',
  datePublished: '2026-10-29',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-orekh-din',
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

        <p className="text-sm text-gray-400 mb-3">29 באוקטובר 2026</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          מזכירה AI לעורך דין:<br />
          <span className="text-blue-600">לא עונה בפגישה? Callnik עונה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          לקוח שמחפש עורך דין לא ממתין. אם לא ענית - הוא חייג לבא בתור ברשימה. מענה אוטומטי מקצועי שומר על כל פנייה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">המציאות של עו"ד עצמאי</h2>
            <p>
              עורך דין עצמאי או משרד קטן נמצאים בבית משפט, בפגישות עם לקוחות, בדיונים. הטלפון לא תמיד נענה - ולא בגלל חוסר מקצועיות, אלא כי זו המציאות.
            </p>
            <p className="mt-3">
              הבעיה: לקוח שמחפש ייצוג משפטי לעיתים קרובות מתקשר לשניים-שלושה עורכי דין בו זמנית. מי שעונה ראשון - מקבל את הפגישה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik עושה עבור עורך דין</h2>
            <p>
              כשאתה בדיון ולא עונה, Callnik עונה בשמך. הנציגה מציגה את עצמה בצורה מקצועית כמזכירה של המשרד, שואלת את שם הפונה, טבע הפנייה, ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              תוך דקה - סיכום בוואטסאפ. כשהדיון מסתיים, אתה יודע מי חיכה לך ולמה.
            </p>
            <div className="bg-blue-50 rounded-xl p-5 mt-4 text-sm">
              <p className="font-semibold text-gray-800 mb-2">דוגמה לסיכום שתקבל:</p>
              <p className="text-gray-600 leading-relaxed">
                "שיחה מ-052-1234567 בשם יוסי לוי. עניין: גירושין, רוצה ייעוץ ראשוני. ביקש חזרה היום אחרי 17:00."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הגבולות שחשוב להכיר</h2>
            <p>
              Callnik לא נותנת ייעוץ משפטי ולא מבטיחה שהנציגה תדע לענות על שאלות מקצועיות. לכל שאלה משפטית - התשובה תמיד תהיה: "עורך הדין יחזור אליך ויסביר." זה לא חיסרון - זו ההתנהגות הנכונה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול פגישות אוטומטי</h2>
            <p>
              בתוכנית Pro, Callnik מתחברת ל-Google Calendar. לקוח שרוצה לקבוע פגישת ייעוץ ראשונית - יכול לקבל שעות פנויות ישירות מהנציגה ולסגור תור בלי שתצטרך להיות מעורב.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">כמה זה עולה?</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. עורך דין עם 2-5 לקוחות חדשים בחודש.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪149/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול תורים. משרד עם תנועה גבוהה יותר.</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              אם Callnik שמרה לך לקוח חדש אחד בחודש שעלה לך לאבד - היא שילמה על עצמה פי כמה.
            </p>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">אל תפסיד את הפנייה הבאה</h2>
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
