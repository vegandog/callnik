import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לעסק קטן: כמה עולה ומה מקבלים – Callnik',
  description: 'בעל עסק קטן לא צריך לשכור מזכירה כדי לא לפספס שיחות. מזכירה AI עולה פחות מ-₪100 בחודש ועובדת 24/7.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-asak-katan' },
  openGraph: {
    title: 'מזכירה AI לעסק קטן: כמה עולה ומה מקבלים',
    description: 'בעל עסק קטן לא צריך לשכור מזכירה כדי לא לפספס שיחות. מזכירה AI עולה פחות מ-₪100 בחודש ועובדת 24/7.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לעסק קטן: כמה עולה ומה מקבלים',
  description: 'בעל עסק קטן לא צריך לשכור מזכירה כדי לא לפספס שיחות. מזכירה AI עולה פחות מ-₪100 בחודש ועובדת 24/7.',
  datePublished: '2026-10-29',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-asak-katan',
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
          מזכירה AI לעסק קטן:<br />
          <span className="text-blue-600">כמה עולה ומה מקבלים</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          בעל עסק קטן לא צריך לשכור מזכירה כדי לא לפספס שיחות. מזכירה AI עולה פחות מ-₪100 בחודש ועובדת 24/7 - כולל שבתות וחגים.
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה זו מזכירה AI?</h2>
            <p>
              מזכירה AI היא מערכת שעונה לשיחות הנכנסות שלך כשאתה לא זמין. אם לא ענית בתוך כמה שניות, השיחה עוברת אוטומטית לנציגה הדיגיטלית - שמדברת עם הלקוח בעברית טבעית, רושמת את שמו ובקשתו, ושולחת לך סיכום בוואטסאפ תוך דקה.
            </p>
            <p className="mt-3">
              המספר שלך לא משתנה. הלקוח חייג לאותו מספר. הוא לא יודע שמדובר בנציגה אוטומטית - הוא רק יודע שמישהו ענה לו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">כמה עולה מזכירה AI?</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
              <div>
                <p className="font-semibold text-gray-900">תוכנית Basic - ₪99 לחודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לרופא, עורך דין, יועץ.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">תוכנית Pro - ₪149 לחודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול יומן אוטומטי. מתאים לעסקים עם מחזור שיחות גבוה.</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              לצורך השוואה: שכר מינימום למזכירה חלקית (4 שעות ביום) הוא כ-₪4,000-5,000 בחודש - ולא כוללת שבתות, חגים או שעות מחוץ לשעות העבודה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה מקבלים?</h2>
            <ul className="space-y-3">
              {[
                'נציגת AI שעונה בעברית טבעית',
                'סיכום השיחה בוואטסאפ ומייל תוך דקה',
                'היסטוריית שיחות מלאה בפאנל',
                '6 קולות לבחירה (3 נשיים, 2 גבריים)',
                'ניהול תורים ב-Google Calendar (Pro)',
                'ביטול בכל עת ללא קנסות',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-right">
                  <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">לאיזה עסקים זה מתאים?</h2>
            <p>
              כל עסק שיש לו שיחות נכנסות ובעל העסק לא תמיד זמין. הדוגמאות הנפוצות:
            </p>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>- רופאים, פיזיותרפיסטים, נטורופתים</li>
              <li>- עורכי דין, רואי חשבון, יועצים</li>
              <li>- קוסמטיקאיות, ספרים, נהגי מונית</li>
              <li>- בעלי מקצוע (אינסטלטורים, חשמלאים, שרברבים)</li>
              <li>- סוכני ביטוח, מתווכי נדל"ן</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך מתחילים?</h2>
            <p>
              ההרשמה לוקחת 5 דקות. לאחר מכן מגדירים הפניה סלולרית אחת מהטלפון (Callnik מסבירה איך), ומהרגע הזה המזכירה פעילה.
            </p>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס שיחות?</h2>
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
