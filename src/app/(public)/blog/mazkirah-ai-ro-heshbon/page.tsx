import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לרואה חשבון: מענה מקצועי בעיצומי עונת הדוחות – Callnik',
  description: 'רואה חשבון בפגישה עם לקוח - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים ומטרת הפנייה, ושולחת לך סיכום בוואטסאפ.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-ro-heshbon' },
  openGraph: {
    title: 'מזכירה AI לרואה חשבון: מענה מקצועי בעיצומי עונת הדוחות',
    description: 'רואה חשבון בפגישה עם לקוח - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים ושולחת סיכום בוואטסאפ.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לרואה חשבון: מענה מקצועי בעיצומי עונת הדוחות',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-ro-heshbon',
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
          מזכירה AI לרואה חשבון:<br />
          <span className="text-blue-600">מענה מקצועי בעיצומי עונת הדוחות</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          עונת הדוחות - הזמן הכי עמוס של השנה לרואה חשבון. בדיוק אז מגיעות הכי הרבה פניות מלקוחות חדשים. מי שלא עונה - מפסיד.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הסתירה של רואה חשבון עצמאי</h2>
            <p>
              בזמן הכי עמוס - כשאתה בפגישות ודוחות - מגיעות הכי הרבה פניות מלקוחות פוטנציאליים חדשים שמחפשים רואה חשבון לעסק שלהם. אתה לא יכול לשוחח עכשיו. הם לא יחכו.
            </p>
            <p className="mt-3">
              מצד שני - לקוחות קיימים שמתקשרים עם שאלות דחופות גם לא מקבלים מענה. זה יוצר תסכול ופוגע באמינות.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Callnik כמזכירה וירטואלית</h2>
            <p>
              Callnik עונה כשאתה לא יכול - בשם שתבחר. הנציגה שואלת את שם המתקשר, אם הוא לקוח קיים או חדש, מה נושא הפנייה (שאלה על דוח, פנייה חדשה, בדיקת סטטוס), ומספר.
            </p>
            <p className="mt-3">
              סיכום בוואטסאפ תוך דקה. בין פגישה לפגישה אתה מחליט מה דחוף וממי להחזיר קודם.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ניהול פגישות ייעוץ (Pro)</h2>
            <p>
              בתוכנית Pro, לקוח שמבקש לקבוע פגישת ייעוץ - הנציגה בודקת את זמינותך ב-Google Calendar ומציעה מועד. הפגישה נרשמת אוטומטית.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לרואה חשבון עם לקוחות קיימים שרוצה גם לאסוף פניות חדשות.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום פגישות אוטומטי.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הגדרה מהירה</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים שם ונציגה</li>
              <li>הפניה מהמספר הקיים שלך - Callnik מסבירה צעד אחר צעד</li>
              <li>14 יום ניסיון חינמי - מה שצריך אחר כך לשלם ₪99 לחודש</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס לקוחות חדשים</h2>
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
