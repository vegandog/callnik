import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לדיאטנית: ניהול לקוחות ופגישות – Callnik',
  description: 'דיאטנית בייעוץ לא יכולה לענות. Callnik עונה, מסבירה על השיטה ומתאמת ייעוץ ראשוני ביומן.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-dietitanit' },
  openGraph: {
    title: 'מזכירה AI לדיאטנית: ניהול לקוחות ופגישות',
    description: 'דיאטנית בייעוץ לא יכולה לענות. Callnik עונה, מסבירה על השיטה ומתאמת ייעוץ ראשוני ביומן.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לדיאטנית: ניהול לקוחות ופגישות',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-dietitanit',
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
          מזכירה AI לדיאטנית:<br />
          <span className="text-blue-600">ניהול לקוחות ופגישות</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">דיאטנית בפגישה עם לקוח לא יכולה לענות לטלפון. לקוחה חדשה שמחפשת ייעוץ תזונה לא תמתין שעה. Callnik עונה בשמך.</p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik שואלת לקוחת דיאטה חדשה?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>מה המטרה - ירידה במשקל, בריאות כללית, ספורטאים, ילדים</li>
              <li>האם יש מצבים רפואיים רלוונטיים</li>
              <li>האם מחפשת פגישות פנים אל פנים או זום</li>
              <li>מועד מועדף לפגישה ראשונה</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ייעוץ ראשוני אוטומטי (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik מתאמת את הפגישה הראשונה ישירות ביומן שלך. לקוחה מקבלת אישור מיידי - ואת לא צריכה להפסיק ייעוץ כדי לתאם.
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
