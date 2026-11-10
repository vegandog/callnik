import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לגנן: ניהול הזמנות בזמן עבודה בשדה – Callnik',
  description: 'גנן עסוק בגינה - Callnik עונה, שואלת על שטח ותדירות וקובעת ביקור הערכה ביומן שלך.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-ganan' },
  openGraph: {
    title: 'מזכירה AI לגנן: ניהול הזמנות בזמן עבודה בשדה',
    description: 'גנן עסוק בגינה - Callnik עונה, שואלת על שטח ותדירות וקובעת ביקור הערכה ביומן שלך.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לגנן: ניהול הזמנות בזמן עבודה בשדה',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-ganan',
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
          מזכירה AI לגנן:<br />
          <span className="text-blue-600">הזמנות חדשות ללא הפסקת עבודה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          גנן בגינה - ידיים עם אדמה, כלים רועשים. כל שיחה שלא נענתה היא גינה חדשה שהלכה למתחרה. Callnik מנהלת את הפניות.
        </p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik שואלת לקוח גינון?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>גודל הגינה וסוג הנכס - פרטי, בניין, עסק</li>
              <li>שירות מבוקש - תחזוקה שוטפת, עיצוב חדש, עצים, דשא</li>
              <li>תדירות רצויה - שבועי, דו-שבועי, חד-פעמי</li>
              <li>עיר ורחוב</li>
              <li>מספר ליצירת קשר</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ביקורי הערכה (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתאמת ביקור הערכה ישירות מהיומן שלך. לקוח יכול לבחור יום ושעה שנוחים לו - ואתה מגיע מוכן עם כל הפרטים.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Basic</span>
                <span className="text-blue-600 font-bold">99 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 60 שיחות חודשיות. מענה אוטומטי וסיכומים בוואטסאפ.</p>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-semibold">Pro</span>
                <span className="text-blue-600 font-bold">149 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 150 שיחות + ניהול יומן Google Calendar.</p>
            </div>
          </section>
          <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס לקוחות?</h3>
            <p className="text-gray-400 mb-6">חודש ראשון ב-1 &#8362; בלבד. ביטול בכל עת.</p>
            <Link href="/#signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              התחל עכשיו
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
