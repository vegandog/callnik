import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לשיפוצניק: לא לפספס הצעות מחיר – Callnik',
  description: 'שיפוצניק בעבודה לא עונה. Callnik לוקחת פרטי הפרויקט, שטח ומועד ושולחת לך סיכום בוואטסאפ.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-shiputznik' },
  openGraph: {
    title: 'מזכירה AI לשיפוצניק: לא לפספס הצעות מחיר',
    description: 'שיפוצניק בעבודה לא עונה. Callnik לוקחת פרטי הפרויקט, שטח ומועד ושולחת לך סיכום בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לשיפוצניק: לא לפספס הצעות מחיר',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-shiputznik',
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
          מזכירה AI לשיפוצניק:<br />
          <span className="text-blue-600">לא לפספס הצעות מחיר</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          שיפוצניק עסוק בריצוף או טיח - לא יכול לענות. לקוח שרוצה הצעת מחיר לא ימתין שעות. Callnik לוקחת את הפרטים ואתה חוזר כשנוח.
        </p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik שואלת לקוח שיפוצים?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>סוג העבודה - ריצוף, צבע, גבס, חדרי שירותים, מטבח</li>
              <li>שטח משוער ומיקום</li>
              <li>לוח זמנים - מתי רוצים להתחיל</li>
              <li>תקציב כללי אם יש</li>
              <li>מספר טלפון לחזרה</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">למה לידים שיפוצים צריכים מענה מהיר?</h2>
            <p>
              לקוח שמחפש שיפוצניק מתקשר ל-3-5 קבלנים במקביל. מי שחוזר ראשון - מקבל את העבודה. Callnik מבטיחה שפרטי הלקוח אצלך תוך דקה, כדי שתוכל לחזור לפני המתחרים.
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
