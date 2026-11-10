import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למאמנת כלבים: ניהול לקוחות חדשים – Callnik',
  description: 'מאמנת כלבים בהדרכה - Callnik עונה, שואלת על הכלב ומצבו ומתאמת שיעור ניסיון ביומן.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-meamenet-klavim' },
  openGraph: {
    title: 'מזכירה AI למאמנת כלבים: ניהול לקוחות חדשים',
    description: 'מאמנת כלבים בהדרכה - Callnik עונה, שואלת על הכלב ומצבו ומתאמת שיעור ניסיון ביומן.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למאמנת כלבים: ניהול לקוחות חדשים',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-meamenet-klavim',
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
          מזכירה AI למאמנת כלבים:<br />
          <span className="text-blue-600">לקוחות חדשים ללא הפסקת הדרכה</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">מאמנת כלבים בהדרכה לא יכולה לענות לטלפון. בעל כלב שמחפש פתרון לבעיית התנהגות לא ימתין שעה. Callnik מנהלת את הפניות.</p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik שואלת בעל כלב חדש?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>גזע וגיל הכלב</li>
              <li>הבעיה הספציפית - נביחות, קפיצות, תוקפנות, חינוך בסיסי</li>
              <li>אימונים פרטיים או קבוצתיים</li>
              <li>אזור מגורים</li>
              <li>מספר ליצירת קשר</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">שיעור ניסיון (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתאמת שיעור ניסיון ישירות מהיומן שלך. בעל הכלב מקבל אישור עם כתובת ופרטים - בלי שתצטרכי לעצור הדרכה.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Basic</span>
                <span className="text-blue-600 font-bold">99 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 60 שיחות חודשיות.</p>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-semibold">Pro + יומן</span>
                <span className="text-blue-600 font-bold">149 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 150 שיחות + Google Calendar.</p>
            </div>
          </section>
          <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס לקוחות?</h3>
            <p className="text-gray-400 mb-6">חודש ראשון ב-1 &#8362; בלבד.</p>
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
