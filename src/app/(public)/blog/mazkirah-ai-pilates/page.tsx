import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לסטודיו פילאטיס ויוגה: תיאום שיעורים אוטומטי – Callnik',
  description: 'מדריכת פילאטיס בשיעור - הטלפון מצלצל. Callnik עונה בשמך, לוקחת פרטים ומתאמת שיעורים. ללא הפרעה לסטודנטים.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-pilates' },
  openGraph: {
    title: 'מזכירה AI לסטודיו פילאטיס ויוגה: תיאום שיעורים אוטומטי',
    description: 'מדריכת פילאטיס בשיעור - הטלפון מצלצל. Callnik עונה בשמך ומתאמת שיעורים אוטומטית.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לסטודיו פילאטיס ויוגה: תיאום שיעורים אוטומטי',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-pilates',
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
          מזכירה AI לסטודיו פילאטיס ויוגה:<br />
          <span className="text-blue-600">תיאום שיעורים אוטומטי</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          מדריכת פילאטיס, יוגה, או סטודיו גוף-נפש - כל השיעורים מנוהלים מהיומן, אבל מישהו עדיין צריך לענות לטלפון. Callnik מטפלת בזה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">סטודיו קטן - ניהול גדול</h2>
            <p>
              סטודיו פילאטיס עצמאי מנהל לרוב 10-30 תלמידים שבועיים. שיעור אורך שעה - בזמן הזה מגיעות פניות מאנשים שרוצים להצטרף לשיעור ניסיון, לשאול על מחירים, לקבל מידע.
            </p>
            <p className="mt-3">
              סטודנטים חדשים שלא מקבלים מענה - ינסו סטודיו אחר. לא מתוך חוסר עניין, פשוט כי הם לא רצו להמתין.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מענה אוטומטי לסטודיו</h2>
            <p>
              Callnik עונה בשמך - שואלת שם, מה מעניין (שיעור יחידני/קבוצתי, מחיר, שיעור ניסיון), ומספר ליצירת קשר. סיכום בוואטסאפ תוך דקה. אחרי השיעור - אתה יודע מי מחכה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">תיאום שיעורי ניסיון (Pro)</h2>
            <p>
              בתוכנית Pro, סטודנט שמתקשר לקבוע שיעור ניסיון - הנציגה מציעה מועד פנוי מהיומן שלך. נרשם אוטומטית ב-Google Calendar. לא צריך לחזור בשיחה לכל תיאום.
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
                <p className="text-gray-600 text-sm">עד 150 שיחות + תיאום שיעורי ניסיון אוטומטי.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">הגדרה מהירה</h2>
            <ol className="space-y-2 list-decimal list-inside text-gray-600">
              <li>נרשמים ומגדירים את שם הסטודיו ונציגה</li>
              <li>הפניה מהמספר הקיים שלך</li>
              <li>14 יום ניסיון חינמי ללא התחייבות</li>
            </ol>
          </section>
        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">הפסק לפספס סטודנטים חדשים</h2>
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
