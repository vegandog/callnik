import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'שיחות שלא נענו: כמה כסף עסק קטן מפסיד ביום – Callnik',
  description: 'כל שיחה שלא נענתה היא לקוח פוטנציאלי שעבר לאחר. חישוב פשוט שמראה את הנזק האמיתי לעסק קטן.',
  alternates: { canonical: 'https://callnik.com/blog/shiot-shelo-naanu' },
  openGraph: {
    title: 'שיחות שלא נענו: כמה כסף עסק קטן מפסיד ביום',
    description: 'כל שיחה שלא נענתה היא לקוח פוטנציאלי שעבר לאחר. חישוב פשוט שמראה את הנזק האמיתי לעסק קטן.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'שיחות שלא נענו: כמה כסף עסק קטן מפסיד ביום',
  datePublished: '2026-10-29',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/shiot-shelo-naanu',
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
          שיחות שלא נענו:<br />
          <span className="text-blue-600">כמה כסף עסק קטן מפסיד ביום</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          רוב בעלי עסקים לא עוצרים לחשב כמה עולה להם כל שיחה שהם פספסו. הנה החישוב.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">המציאות בשטח</h2>
            <p>
              עסק קטן ממוצע מקבל 10-30 שיחות ביום. חלק מהן לקוחות קיימים, חלק פניות חדשות. אבל כמה מהן לא נענות? כשאתה בפגישה, מטפל בלקוח, נוהג, או פשוט לא שומע - הטלפון מצלצל לחינם.
            </p>
            <p className="mt-3">
              על פי נתוני ענף שירות הלקוחות, כ-62% מהמתקשרים שלא ענו להם לא יחזרו לנסות. הם פשוט עוברים לאחר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">החישוב הפשוט</h2>
            <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">שיחות שלא נענות ביום</span>
                <span className="text-gray-500">5 שיחות (ממוצע)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">שיחות שלא יחזרו לנסות</span>
                <span className="text-gray-500">3 (62%)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">מתוכן - פניות חדשות פוטנציאליות</span>
                <span className="text-gray-500">1-2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">שווי ממוצע של לקוח חדש</span>
                <span className="text-gray-500">₪300-₪2,000</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                <span>הפסד יומי אפשרי</span>
                <span className="text-red-500">₪300 - ₪4,000</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              כמובן שלא כל שיחה שלא נענית היא לקוח חדש. אבל גם אם רק אחת ביום היא - זה ₪6,000-₪80,000 בשנה שנופלים על הרצפה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה קורה לאחר שמתקשרים ולא עונים?</h2>
            <p>מחקרי UX של חברות טלקום מראים שלושה תסריטים עיקריים:</p>
            <ul className="mt-3 space-y-2">
              <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> <span>62% לא יחזרו לנסות</span></li>
              <li className="flex gap-2"><span className="text-yellow-500 font-bold">~</span> <span>28% ינסו פעם אחת נוספת</span></li>
              <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> <span>10% בלבד ישאירו הודעה בדואל אם יש טופס</span></li>
            </ul>
            <p className="mt-4">
              לקוח שלא ענית לו לא יחכה לך. הוא פתח גוגל, חיפש שנית, ומצא מתחרה שענה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הפתרון שלא דורש שינוי הרגלים</h2>
            <p>
              Callnik לא מבקשת ממך לשנות שום דבר. אותו מספר, אותן הרגלים. רק: כשאתה לא עונה, מישהו אחר עונה בשבילך.
            </p>
            <p className="mt-3">
              תוך דקה מסתיימת השיחה - אתה מקבל סיכום בוואטסאפ: שם, מספר, ומה הלקוח ביקש. אתה מחזיר שיחה כשנוח לך, ויודע בדיוק במה מדובר.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">כמה זה עולה לעומת ההפסד?</h2>
            <p>
              Callnik Basic עולה ₪99 לחודש. אם המערכת שמרה לך לקוח אחד בחודש שעשוי היה לעבור לאחר - אתה כבר בפלוס.
            </p>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">תפסיק לפספס שיחות</h2>
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
