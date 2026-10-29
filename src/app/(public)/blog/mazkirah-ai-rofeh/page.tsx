import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מענה אוטומטי לרופא ומרפאה: המדריך המלא – Callnik',
  description: 'כיצד רופאה עצמאית או קליניקה קטנה יכולה להפסיק לפספס שיחות ולנהל תורים בלי להוסיף כוח אדם.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-rofeh' },
  openGraph: {
    title: 'מענה אוטומטי לרופא ומרפאה: המדריך המלא',
    description: 'כיצד רופאה עצמאית או קליניקה קטנה יכולה להפסיק לפספס שיחות ולנהל תורים בלי להוסיף כוח אדם.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מענה אוטומטי לרופא ומרפאה: המדריך המלא',
  datePublished: '2026-10-29',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-rofeh',
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
          מענה אוטומטי לרופא ומרפאה:<br />
          <span className="text-blue-600">המדריך המלא</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          כשרופא בטיפול - הטלפון מצלצל ואין מי שיענה. כל שיחה שלא נענתה עלולה להיות מטופל חדש שעבר לקליניקה אחרת.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר הייחודי של קליניקה קטנה</h2>
            <p>
              רופאה עצמאית, פיזיותרפיסט, נטורופת, פסיכולוג - כולם עוסקים בטיפול בזמן שהטלפון מצלצל. אי אפשר לצאת מהחדר כל שיחה. ואי אפשר להרשות לעצמך מזכירה יושבת בגלל 20 שיחות ביום.
            </p>
            <p className="mt-3">
              הפתרון הקלאסי - "השאר הודעה אחרי הצפצוף" - כמעט לא עובד ב-2026. מטופלים לא משאירים הודעות. הם מנסים עוד פעם, ואז עוברים הלאה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik עושה לקליניקה</h2>
            <p>
              כשאתה בטיפול ולא עונה בתוך 15-20 שניות, Callnik עונה בשמך. הנציגה מציגה את עצמה כ"מזכירה האוטומטית של [שם הקליניקה]", שואלת את שם המטופל, מה הסיבה לפנייה, ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              בתוך דקה מסתיימת השיחה - אתה מקבל סיכום בוואטסאפ. אחרי שהטיפול מסתיים, אתה יודע בדיוק מי חיפש אותך ולמה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול תורים אוטומטי (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתחברת ל-Google Calendar שלך. כשמטופל מתקשר ושואל על תור - הנציגה בודקת את הזמינות ומציעה שעות פנויות ישירות. הזמנת תור נרשמת ביומן אוטומטית.
            </p>
            <p className="mt-3">
              מגדירים מראש: ימי עבודה, שעות, אורך ממוצע של טיפול, ואיך קוראים לאירוע ("טיפול", "ייעוץ", "ביקור"). מהרגע הזה - ניהול תורים בסיסי פועל מעצמו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik לא עושה</h2>
            <p>
              Callnik לא נותנת ייעוץ רפואי ולא מבטיחה לדעת תשובות מקצועיות. אם מטופל שואל שאלה רפואית - הנציגה אומרת בבירור: "אני רושמת את הפרטים, הרופאה תחזור אליך." היא לא מחליפה אותך - היא מוודאת שאף מטופל לא יישאר ללא מענה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">כמה זה עולה?</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לקליניקה קטנה עם 3-5 מטופלים ביום.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪149/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול תורים אוטומטי. מתאים לקליניקה עמוסה יותר.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך מתחילים?</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ב-5 דקות</li>
              <li>מגדירים הפניה סלולרית (Callnik מסבירה צעד אחר צעד)</li>
              <li>לאחר 14 ימי ניסיון - בוחרים תוכנית</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס מטופלים</h2>
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
