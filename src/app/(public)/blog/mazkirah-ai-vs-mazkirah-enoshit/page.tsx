import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI מול מזכירה אנושית: מה נכון לעסק שלך – Callnik',
  description: 'השוואה ישירה בין מזכירה בשכר לבין מזכירה AI - עלויות, שעות זמינות, ואיזה עסקים צריכים מה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-vs-mazkirah-enoshit' },
  openGraph: {
    title: 'מזכירה AI מול מזכירה אנושית: מה נכון לעסק שלך',
    description: 'השוואה ישירה בין מזכירה בשכר לבין מזכירה AI - עלויות, שעות זמינות, ואיזה עסקים צריכים מה.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI מול מזכירה אנושית: מה נכון לעסק שלך',
  datePublished: '2026-10-29',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-vs-mazkirah-enoshit',
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
          מזכירה AI מול מזכירה אנושית:<br />
          <span className="text-blue-600">מה נכון לעסק שלך</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          לא כל עסק צריך את אותו פתרון. השוואה ישירה שתעזור לך להחליט.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-5">השוואה מהירה</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-right p-3 font-semibold text-gray-700 border border-gray-200">קריטריון</th>
                    <th className="text-center p-3 font-semibold text-gray-700 border border-gray-200">מזכירה אנושית</th>
                    <th className="text-center p-3 font-semibold text-blue-700 border border-gray-200 bg-blue-50">Callnik AI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['עלות חודשית', '₪4,000–₪8,000', '₪99–₪149'],
                    ['שעות זמינות', 'א\'–ה\' 9:00–17:00', '24/7 כולל שבת'],
                    ['זמן תגובה לשיחה', 'מיידי (אם זמינה)', 'תוך 15–20 שניות'],
                    ['גמישות בעומס', 'מוגבלת', 'ללא מגבלה'],
                    ['ייעוץ מקצועי', 'כן (לפי הכשרה)', 'לא – רושמת ומעבירה'],
                    ['קביעת תורים', 'כן', 'כן (Pro בלבד)'],
                    ['שפות', 'עברית/ערבית/רוסית', 'עברית'],
                    ['הגדרה', 'ימי גיוס + הדרכה', '5 דקות'],
                  ].map(([criterion, human, ai], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{criterion}</td>
                      <td className="p-3 border border-gray-200 text-center text-gray-600">{human}</td>
                      <td className="p-3 border border-gray-200 text-center text-blue-700 font-medium bg-blue-50/30">{ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתי מזכירה אנושית עדיפה?</h2>
            <p>יש מקרים שבהם מזכירה אנושית עדיפה:</p>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li className="flex gap-2"><span className="text-gray-400">-</span> <span>עסק עם שיחות מורכבות שדורשות שיקול דעת מיידי</span></li>
              <li className="flex gap-2"><span className="text-gray-400">-</span> <span>לקוחות שדורשים קשר אישי עמוק עם אותו אדם</span></li>
              <li className="flex gap-2"><span className="text-gray-400">-</span> <span>שפות שונות מעברית (ערבית, רוסית, אנגלית)</span></li>
              <li className="flex gap-2"><span className="text-gray-400">-</span> <span>עסקים עם 100+ שיחות ביום שדורשות טיפול מלא</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתי Callnik מתאימה יותר?</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span>עצמאי או עסק קטן עם 5–50 שיחות ביום</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span>שיחות בשעות לא סטנדרטיות (ערב, שבת, חגים)</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span>תקציב מוגבל שלא מצדיק שכר מזכירה</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span>רוצים פתרון מיידי ללא תהליך גיוס</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold">✓</span> <span>צריכים ניהול תורים בסיסי אוטומטי</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האפשרות השלישית: גם וגם</h2>
            <p>
              חלק מהעסקים משתמשים בשניהם. מזכירה אנושית בשעות הפעילות - ו-Callnik בשעות שהמזכירה לא זמינה. כך לא נופל אף לקוח בין הכסאות.
            </p>
            <p className="mt-3">
              Callnik מגיבה רק לשיחות שלא נענות - אז אם המזכירה ענתה, Callnik לא מתערבת כלל. ההפניה הסלולרית מופעלת רק אחרי X שניות ללא מענה.
            </p>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">נסה 14 יום ללא התחייבות</h2>
          <p className="text-blue-100 mb-5">הרשמה ב-5 דקות. ביטול בכל עת.</p>
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
