import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לפסיכולוג ומטפל: מענה דיסקרטי 24/7 – Callnik',
  description: 'פסיכולוג בטיפול - הטלפון מצלצל. Callnik עונה בשמך בצורה דיסקרטית ומקצועית, לוקחת פרטים ושולחת סיכום בוואטסאפ. ללא מזכירה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-psikholog' },
  openGraph: {
    title: 'מזכירה AI לפסיכולוג ומטפל: מענה דיסקרטי 24/7',
    description: 'פסיכולוג בטיפול - הטלפון מצלצל. Callnik עונה בשמך בצורה דיסקרטית ומקצועית.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לפסיכולוג ומטפל: מענה דיסקרטי 24/7',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-psikholog',
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
          מזכירה AI לפסיכולוג ומטפל:<br />
          <span className="text-blue-600">מענה דיסקרטי ומקצועי</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          פסיכולוג, מטפל, קלינאי תקשורת - כולם בטיפול כשהטלפון מצלצל. מטופל פוטנציאלי חדש שלא מקבל מענה, לעיתים לא יתקשר שוב.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הרגישות המיוחדת של תחום הטיפול</h2>
            <p>
              פנייה לפסיכולוג או מטפל היא לרוב צעד שדורש אומץ. כשאדם מתקשר ולא מקבל מענה, הוא עלול לפרש את זה כסימן - ולא להתקשר שוב. חלון ההזדמנויות הזה קצר מאד.
            </p>
            <p className="mt-3">
              מצד שני, אתה לא יכול לצאת מחדר הטיפול כל פעם שמישהו מתקשר. זה פוגע בטיפול ובמטופל הנוכחי.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מענה מקצועי ודיסקרטי</h2>
            <p>
              Callnik עונה בשמך עם נציגה שמציגה את עצמה בשם שאתה בוחר - "מזכירה של קליניקת [שמך]". היא שואלת בעדינות את שם המתקשר, מטרת הפנייה (תור ראשון, שאלה, חזרה), ומספר ליצירת קשר.
            </p>
            <p className="mt-3">
              היא לא שואלת שאלות רגישות מיותרות ולא מביכה את המתקשר. הסיכום מגיע אליך בוואטסאפ תוך דקה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול תורים (Pro)</h2>
            <p>
              תוכנית Pro מתחברת ל-Google Calendar. פנייה לתיאום תור - הנציגה בודקת זמינות ומציעה שעות פנויות. התור נרשם ביומן.
            </p>
            <p className="mt-3">
              ניתן להגדיר: אורך ממוצע של פגישה, ימי עבודה, הפסקות - המערכת מתאמת לפי מה שקבעת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לקליניקה קטנה עם מטופלים קבועים.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום תורים אוטומטי.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה Callnik לא עושה</h2>
            <p>
              Callnik לא נותנת ייעוץ פסיכולוגי, לא מדיאגנוסטיקה, ולא מחליפה שיחת היכרות. היא מוודאת שאף פנייה לא נפסדת - ומעבירה לך את הפרטים כדי שתוכל להחזיר שיחה כשמסיים.
            </p>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">אל תפספס פנייה חדשה</h2>
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
