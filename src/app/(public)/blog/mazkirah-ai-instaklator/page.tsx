import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לאינסטלטור: כך תפסיק לפספס שיחות בזמן עבודה – Callnik',
  description: 'אינסטלטור בתיקון - הטלפון מצלצל ואין מי שיענה. Callnik לוקחת את ההודעה ושולחת סיכום בוואטסאפ תוך דקה. ללא מזכירה, ללא פספוס.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-instaklator' },
  openGraph: {
    title: 'מזכירה AI לאינסטלטור: כך תפסיק לפספס שיחות בזמן עבודה',
    description: 'אינסטלטור בתיקון - הטלפון מצלצל ואין מי שיענה. Callnik לוקחת את ההודעה ושולחת סיכום בוואטסאפ תוך דקה.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לאינסטלטור: כך תפסיק לפספס שיחות בזמן עבודה',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-instaklator',
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
          מזכירה AI לאינסטלטור:<br />
          <span className="text-blue-600">כך תפסיק לפספס שיחות בזמן עבודה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          אתה מתחת לכיור, שתי ידיים תפוסות, והטלפון מצלצל. כשתוכל לחזור - הלקוח כבר התקשר לאינסטלטור אחר.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הבעיה של כל אינסטלטור עצמאי</h2>
            <p>
              אינסטלטור עצמאי עובד לבד. הוא גם מתקן, גם מגיע לשיחות שירות, גם מזמין חלפים - ובתוך כל זה הטלפון מצלצל. אי אפשר לענות כשידיים רטובות, כשאתה על גג, כשאתה בתוך קיר.
            </p>
            <p className="mt-3">
              רוב הלקוחות לא ישאירו הודעה. הם ינסו עוד פעם ואז יחפשו מישהו אחר. כך אינסטלטורים מאבדים עבודות חדשות בלי לדעת שהם אבדו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik עושה עבורך</h2>
            <p>
              כשאתה לא עונה תוך 15-20 שניות, Callnik עונה בשמך. הנציגה מציגה את עצמה, שואלת מה הבעיה (נזילה? חסימה? התקנה?), לאיזה כתובת, ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              אתה מקבל סיכום בוואטסאפ תוך דקה. עוד לפני שסיימת את העבודה הנוכחית - אתה כבר יודע מי מחכה לך ואיפה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול תורים ופניות (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתחברת לגוגל קלנדר שלך. לקוח שמתקשר לשאול על זמינות - הנציגה בודקת את היומן ומציעה שעות פנויות. התאריך נרשם אוטומטית.
            </p>
            <p className="mt-3">
              מגדירים פעם אחת: ימי עבודה, שעות פעילות, אזורי שירות שתרצה לאסוף - והמערכת עובדת מאחורה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">כמה זה עולה?</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לאינסטלטור עם לקוחות קבועים שרוצה לא לפספס פניות חדשות.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול תורים אוטומטי עם Google Calendar.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הגדרה בחמש דקות</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ונותנים שם לנציגה וסגנון מענה</li>
              <li>מגדירים הפניה סלולרית מהמספר הקיים שלך</li>
              <li>מנסים 14 יום בחינם - ורואים כמה שיחות פספסת עד עכשיו</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לאבד עבודות חדשות</h2>
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
