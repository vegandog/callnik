import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI למאמן ספורט: ניהול תלמידים אוטומטי – Callnik',
  description: 'מאמן כושר, יוגה, פילאטיס - כשאתה בשיעור, Callnik עונה, מתאמת שיעורים ביומן ומודיעה לך בוואטסאפ.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-morekh-sport' },
  openGraph: {
    title: 'מזכירה AI למאמן ספורט: ניהול תלמידים אוטומטי',
    description: 'מאמן כושר, יוגה, פילאטיס - כשאתה בשיעור, Callnik עונה, מתאמת שיעורים ביומן ומודיעה לך בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI למאמן ספורט: ניהול תלמידים אוטומטי',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-morekh-sport',
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
          מזכירה AI למאמן ספורט:<br />
          <span className="text-blue-600">ניהול תלמידים ללא הפסקת שיעור</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          מאמן כושר באמצע שיעור לא עונה לטלפון. תלמיד שרוצה להצטרף או לשנות שיעור לא ימתין. Callnik מנהלת את הלוגיסטיקה בזמן שאתה מאמן.
        </p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מדוע מאמן ספורט צריך מזכירה AI?</h2>
            <p>
              שעות השיעורים הן בדיוק הזמן שבו לקוחות מתקשרים - כי הם רואים שאתה פעיל ברשתות. מאמן שלא עונה באמצע שיעור מפסיד תלמידים חדשים ומעצבן תלמידים קיימים שרוצים לשנות מועד.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik עושה עבור מאמן ספורט?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>עונה לשיחות נכנסות בזמן שיעור</li>
              <li>מסבירה על סוגי השיעורים ומחירים</li>
              <li>מתאמת שיעור ניסיון מהיומן (Pro)</li>
              <li>מנהלת שינויי מועד</li>
              <li>שולחת לך סיכום כל פנייה בוואטסאפ</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">חיבור ל-Google Calendar (Pro)</h2>
            <p>
              בתוכנית Pro, Callnik רואה את לוח השיעורים שלך ב-Google Calendar ומציעה מקומות פנויים בזמן אמת. תלמיד חדש יכול לקבוע שיעור ניסיון ישירות - בלי שתצטרך לצאת מהשיעור.
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
