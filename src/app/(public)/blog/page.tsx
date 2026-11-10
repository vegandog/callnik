import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'בלוג – Callnik | מזכירה AI לעסקים קטנים',
  description: 'מדריכים, טיפים וידע על מענה אוטומטי, שיחות שלא נענו, ומזכירה AI לעסקים קטנים בישראל.',
  alternates: { canonical: 'https://callnik.com/blog' },
}

const articles = [
  {
    slug: 'mazkirah-ai-asak-katan',
    title: 'מזכירה AI לעסק קטן: כמה עולה ומה מקבלים',
    description: 'בעל עסק קטן לא צריך לשכור מזכירה כדי לא לפספס שיחות. מזכירה AI עולה פחות מ-₪100 בחודש ועובדת 24/7.',
    date: '2026-10-29',
  },
  {
    slug: 'shiot-shelo-naanu',
    title: 'שיחות שלא נענו: כמה כסף עסק קטן מפסיד ביום',
    description: 'כל שיחה שלא נענתה היא לקוח פוטנציאלי שעבר לאחר. חישוב פשוט שמראה את הנזק האמיתי.',
    date: '2026-10-29',
  },
  {
    slug: 'mazkirah-ai-rofeh',
    title: 'מענה אוטומטי לרופא ומרפאה: המדריך המלא',
    description: 'כיצד רופאה עצמאית או קליניקה קטנה יכולה להפסיק לפספס שיחות ולנהל תורים בלי להוסיף כוח אדם.',
    date: '2026-10-29',
  },
  {
    slug: 'mazkirah-ai-orekh-din',
    title: 'מזכירה AI לעורך דין: לא עונה בפגישה? Callnik עונה',
    description: 'עורך דין שלא עונה לטלפון מפסיד לקוחות. כיצד מענה אוטומטי חכם שומר על המוניטין המקצועי.',
    date: '2026-10-29',
  },
  {
    slug: 'mazkirah-ai-vs-mazkirah-enoshit',
    title: 'מזכירה AI מול מזכירה אנושית: מה נכון לעסק שלך',
    description: 'השוואה ישירה בין מזכירה בשכר לבין מזכירה AI - עלויות, שעות זמינות, ואיזה עסקים צריכים מה.',
    date: '2026-10-29',
  },
  {
    slug: 'mazkirah-ai-hashmal',
    title: 'מזכירה AI לחשמלאי: מענה אוטומטי בזמן עבודה',
    description: 'חשמלאי עסוק בהתקנה - הטלפון מצלצל ואין מי שיענה. Callnik עונה בשמך ושולחת סיכום בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-nagar',
    title: 'מזכירה AI לנגר: לא לפספס הזמנות בזמן עבודה',
    description: 'נגר עסוק במסור - הטלפון מצלצל. Callnik עונה, לוקחת פרטים ושולחת לך סיכום בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-achazan',
    title: 'מזכירה AI לאחזקה: כל תקלה מקבלת מענה',
    description: 'איש אחזקה עסוק בתיקון - Callnik מקבלת פניות, לוקחת פרטי התקלה ומשלחת סיכום בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-optika',
    title: 'מזכירה AI לאופטיקאי: תיאום תורים אוטומטי',
    description: 'אופטיקאי בבדיקת ראייה לא יכול לענות. Callnik מתאמת תורים ביומן ומודיעה לך בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-tzalam',
    title: 'מזכירה AI לצלם: לא לפספס הזמנה בזמן צילום',
    description: 'צלם בחתונה לא יכול לענות. Callnik שואלת על האירוע, מועד ותקציב ושולחת לך פרטים בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-morekh-sport',
    title: 'מזכירה AI למאמן ספורט: ניהול תלמידים אוטומטי',
    description: 'מאמן כושר באמצע שיעור לא עונה לטלפון. Callnik מתאמת שיעורים ביומן ומנהלת לוגיסטיקה.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-moran-nehiga',
    title: 'מזכירה AI למורה נהיגה: תלמידים חדשים ללא מאמץ',
    description: 'מורה נהיגה בנסיעה לא יכול לענות. Callnik עונה, מסבירה על המחירים ומתאמת שיעור ניסיון ביומן.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-kosmait',
    title: 'מזכירה AI לקוסמטיקאית: ניהול תורים אוטומטי',
    description: 'קוסמטיקאית בטיפול לא יכולה לענות. Callnik עונה, מסבירה על הטיפולים ומתאמת תור ביומן.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-shiputznik',
    title: 'מזכירה AI לשיפוצניק: לא לפספס הצעות מחיר',
    description: 'שיפוצניק בעבודה לא עונה. Callnik לוקחת פרטי הפרויקט ושולחת לך סיכום בוואטסאפ.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-ganan',
    title: 'מזכירה AI לגנן: ניהול הזמנות בזמן עבודה בשדה',
    description: 'גנן עסוק בגינה - Callnik עונה, שואלת על שטח ותדירות וקובעת ביקור הערכה ביומן.',
    date: '2026-11-10',
  },
  {
    slug: 'mazkirah-ai-madrich-tiyulim',
    title: 'מזכירה AI למדריך טיולים: פניות מקבוצות ב-24/7',
    description: 'מדריך טיולים שעסוק בטיול לא עונה. Callnik מנהלת פניות מקבוצות ומדווחת בוואטסאפ.',
    date: '2026-11-10',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20 text-right">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">בלוג Callnik</h1>
        <p className="text-lg text-gray-500 mb-14">מדריכים ורעיונות לבעלי עסקים קטנים</p>

        <div className="space-y-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <p className="text-xs text-gray-400 mb-2">{a.date}</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {a.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">{a.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">רוצים לנסות?</h2>
          <p className="text-gray-600 mb-5">הרשמה ב-5 דקות. ללא התחייבות.</p>
          <Link
            href="/register"
            className="inline-block bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            התחל עכשיו – 14 יום חינם
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
