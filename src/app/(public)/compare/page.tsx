import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Callnik מול מזכירה אנושית - מה עדיף לעסק שלך?',
  description: 'השוואה ישירה: Callnik מול מזכירה אנושית מול מענה טלפוני ידני. מחיר, זמינות, שפות, זמן תגובה - כל הנתונים על שולחן אחד.',
  alternates: { canonical: 'https://callnik.com/compare' },
  openGraph: {
    title: 'Callnik מול מזכירה אנושית - מה עדיף לעסק שלך?',
    description: 'השוואה מלאה: Callnik AI מול מזכירה בשכר מול לענות לבד. מחיר, זמינות, יכולות - כל הנתונים.',
    type: 'website',
    locale: 'he_IL',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'מה ההבדל בין Callnik למזכירה אנושית?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'מזכירה אנושית עולה 5,000-8,000 ₪ לחודש ועובדת בשעות מוגבלות. Callnik עולה 99-199 ₪ לחודש ועובדת 24/7 כולל שבתות וחגים. לעסקים קטנים שמקבלים עד 150 שיחות בחודש - Callnik היא הפתרון הכלכלי בהרבה.',
      },
    },
    {
      '@type': 'Question',
      name: 'האם Callnik יכולה לקבוע פגישות כמו מזכירה אנושית?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן. בתוכנית Pro, Callnik מתחברת ל-Google Calendar ויכולה לקבוע פגישות ישירות ביומן. המתקשר בוחר שעה מהאפשרויות הפנויות והפגישה נרשמת אוטומטית.',
      },
    },
    {
      '@type': 'Question',
      name: 'מה החיסרון של Callnik לעומת מזכירה אנושית?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'מזכירה אנושית יכולה לנהל שיחות מורכבות, לטפל בחריגים ולהחליט מה דחוף. Callnik מצטיינת במענה סטנדרטי - קבלת פרטים, קביעת פגישות, הפניות בסיסיות. לעסק שמקבל בעיקר שיחות של "רוצה תור" או "רוצה מידע" - Callnik מספיקה לחלוטין.',
      },
    },
    {
      '@type': 'Question',
      name: 'האם Callnik עובדת בשבת ובחגים?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן. Callnik פועלת 24/7, 365 ימים בשנה. מזכירה אנושית בדרך כלל לא עובדת בשבת, חגים או חופשות.',
      },
    },
  ],
}

const rows = [
  {
    feature: 'מחיר חודשי',
    callnik: '₪99-149 + מע״מ',
    human: '₪5,000-8,000',
    manual: 'אין עלות ישירה',
  },
  {
    feature: 'זמינות',
    callnik: '24/7, כולל שבת וחגים',
    human: 'שעות עבודה בלבד',
    manual: 'רק כשאתה פנוי',
  },
  {
    feature: 'זמן תגובה',
    callnik: 'מיידי - עונה תוך 15 שניות',
    human: 'תלוי בעומס',
    manual: 'לא עונים',
  },
  {
    feature: 'שפות',
    callnik: 'עברית + אנגלית',
    human: 'תלוי בעובד',
    manual: 'רק מה שאתה מדבר',
  },
  {
    feature: 'קביעת פגישות',
    callnik: 'כן (Pro) - Google Calendar',
    human: 'כן',
    manual: 'לא',
  },
  {
    feature: 'סיכום בוואטסאפ',
    callnik: 'כן - אחרי כל שיחה',
    human: 'תלוי',
    manual: 'לא',
  },
  {
    feature: 'הקלטה ותמלול',
    callnik: 'כן - כל שיחה',
    human: 'לרוב לא',
    manual: 'לא',
  },
  {
    feature: 'שיחות שלא נענות',
    callnik: 'אפס - כולן מקבלות מענה',
    human: 'תלוי בזמינות',
    manual: 'הרבה',
  },
  {
    feature: 'זמן הפעלה',
    callnik: '5 דקות',
    human: 'שבועות (גיוס + הכשרה)',
    manual: 'אין',
  },
  {
    feature: 'ביטול',
    callnik: 'בכל עת, ללא קנס',
    human: 'הודעה מוקדמת + פיצויים',
    manual: 'אין',
  },
]

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20 text-right">

        <div className="mb-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">חזרה לעמוד הבית</Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Callnik מול מזכירה אנושית -<br />
          <span className="text-blue-600">מה עדיף לעסק שלך?</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-14">
          כל הנתונים על שולחן אחד. בלי שיווק, בלי עיגולים. תחליט לבד.
        </p>

        {/* Comparison table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 text-right font-semibold text-gray-500 w-1/4">תכונה</th>
                <th className="py-4 px-4 text-center font-semibold text-blue-600 w-1/4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Callnik AI</span>
                </th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 w-1/4">מזכירה אנושית</th>
                <th className="py-4 px-4 text-center font-semibold text-gray-700 w-1/4">מענה ידני</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-4 font-medium text-gray-900">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-blue-700 font-medium">{row.callnik}</td>
                  <td className="py-4 px-4 text-center text-gray-500">{row.human}</td>
                  <td className="py-4 px-4 text-center text-gray-400">{row.manual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed mb-16">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתי Callnik היא הבחירה הנכונה</h2>
            <p>
              Callnik מתאימה לעסק שמקבל בעיקר שיחות של "רוצה לקבוע תור", "רוצה לשאול על המחיר", "רוצה להשאיר פרטים". שרברב, רופא, עורך דין, קוסמטיקאית, מאמן כושר - כל מי שעסוק בעבודה בזמן שהטלפון מצלצל.
            </p>
            <p className="mt-3">
              אם אתה מקבל עד 150 שיחות בחודש ואין לך צורך בניהול שוטף מורכב - Callnik חוסכת לך 4,800 ₪ לפחות כל חודש לעומת מזכירה אנושית.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מתי מזכירה אנושית עדיפה</h2>
            <p>
              משרד עם מאות שיחות ביום, ניהול תיקים מורכב, טיפול בלקוחות כועסים, תיאום בין גורמים רבים - כאן מזכירה אנושית מתוחכמת עדיפה. Callnik לא מחליפה מזכירה מלאה בעסק שזה ליבת הפעילות שלו.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ומה עם "אני פשוט עונה לבד"</h2>
            <p>
              זה עובד - כשאתה פנוי. הבעיה היא שעסק קטן ממוצע מפספס 20-40 שיחות בחודש. כל שיחה כזו היא לקוח פוטנציאלי שעבר לאחד. בחישוב פשוט, שיחה אחת שנענתה יכולה לכסות את עלות Callnik לחודש שלם.
            </p>
          </section>

        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">שאלות נפוצות</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="bg-white rounded-xl border border-gray-100 px-6 py-5">
                <p className="font-semibold text-gray-900 mb-2">{faq.name}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">מוכן לנסות?</h2>
          <p className="text-blue-100 mb-5">חודש ראשון ב-₪1. ביטול בכל עת. בלי התחייבות.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            התחל עכשיו
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-8 text-center">
          <Link href="/" className="hover:underline">Callnik</Link>
          {' | '}
          <Link href="/pricing" className="hover:underline">מחירים</Link>
          {' | '}
          <Link href="/blog/mazkirah-ai-vs-mazkirah-enoshit" className="hover:underline">מאמר מורחב: מזכירה AI מול מזכירה אנושית</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
