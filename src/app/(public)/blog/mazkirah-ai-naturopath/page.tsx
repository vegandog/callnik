import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לנטורופת ותזונאי: מענה מקצועי בין מטופלים – Callnik',
  description: 'נטורופת או תזונאי בייעוץ - הטלפון מצלצל. Callnik עונה בשמך בצורה מקצועית, לוקחת פרטים ומטרת הפנייה, ושולחת לך סיכום בוואטסאפ.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-naturopath' },
  openGraph: {
    title: 'מזכירה AI לנטורופת ותזונאי: מענה מקצועי בין מטופלים',
    description: 'נטורופת או תזונאי בייעוץ - הטלפון מצלצל. Callnik עונה בשמך בצורה מקצועית.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לנטורופת ותזונאי: מענה מקצועי בין מטופלים',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-naturopath',
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
          מזכירה AI לנטורופת ותזונאי:<br />
          <span className="text-blue-600">מענה מקצועי בין מטופלים</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          ייעוץ תזונה או נטורופתיה אורך 45-90 דקות. בזמן הזה הטלפון יכול לצלצל מספר פעמים. כל פנייה שלא מטופלת היא מטופל פוטנציאלי שעבר הלאה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר של מטפל ברפואה טבעית</h2>
            <p>
              נטורופת ותזונאי עובדים לרוב לבד, בלי צוות תמיכה. הייעוץ דורש ריכוז מלא - לא ניתן לצאת מהחדר כל פעם שמצלצל הטלפון. ואנשים שמחפשים ייעוץ טבעי נוטים לנסות כמה מטפלים לפני שמחליטים.
            </p>
            <p className="mt-3">
              קצב הפנייה עולה עם המודעות לרפואה טבעית - אחת לא מספיקה לענות לכל פנייה ביד.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מענה מקצועי ואנושי</h2>
            <p>
              Callnik עונה בשמך עם נציגה שמציגה את עצמה כ"מזכירה של קליניקת [שמך]". שואלת שם, מטרת הפנייה (ייעוץ ראשון, שאלה, מעקב), ומספר ליצירת קשר. לא שואלת שאלות רפואיות - רק אוספת פרטים לחזרה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום ייעוצים (Pro)</h2>
            <p>
              תוכנית Pro מתחברת ל-Google Calendar - מטופל שמבקש ייעוץ ראשון מקבל שעה פנויה מהיומן שלך. הייעוץ נרשם אוטומטית. לא צריך לחזור בשיחה רק לתיאום.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. לוקחת הודעות ושולחת סיכום בוואטסאפ.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום ייעוצים אוטומטי.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתחילים מהר</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים את שם הקליניקה</li>
              <li>הפניה מהמספר הקיים שלך</li>
              <li>14 יום ניסיון חינמי ללא התחייבות</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס מטופלים חדשים</h2>
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
