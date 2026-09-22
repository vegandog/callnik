import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const faqs = [
  {
    q: 'האם המספר שלי אצל הלקוחות משתנה?',
    a: 'לא. המספר שלך נשאר בדיוק אותו דבר. רק שיחות שלא ענית להן בתוך X שניות מועברות ל-Callnik, ברמת הרשת הסלולרית.',
  },
  {
    q: 'מה Callnik אומרת ללקוח?',
    a: 'היא מציגה את עצמה כמזכירה האוטומטית של [שם העסק שלך]. לא מתחזה לבעל העסק. שקוף ומקצועי.',
  },
  {
    q: 'האם היא נותנת ייעוץ מקצועי?',
    a: 'לא. אם שואלים שאלה מקצועית, התשובה תמיד: "אני רק רושמת את הפרטים, יחזרו אליך." היא לא מחליפה אותך.',
  },
  {
    q: 'איך עובדת ההפניה הסלולרית?',
    a: 'זה תקן GSM גלובלי שכל חברות הסלולר תומכות בו. חיוג קצר אחד מהטלפון מגדיר: אם לא ענית תוך X שניות, עבור למספר של Callnik. ניעזור לך לעשות את זה.',
  },
  {
    q: 'באילו חברות סלולר זה עובד?',
    a: 'פלאפון, פרטנר, סלקום, הוט מובייל, 012, גולן טלקום, רמי לוי תקשורת, Welcome ו-019. כולן.',
  },
  {
    q: 'מה אם אני רוצה לבטל?',
    a: 'ביטול בכל עת. ביטול ההפניה הסלולרית נעשה בחיוג אחד מהטלפון.',
  },
  {
    q: 'האם הנתונים שלי מוגנים?',
    a: 'כן. כל הסיכומים מאוחסנים בצורה מוצפנת. לא משתפים מידע עם צד שלישי.',
  },
  {
    q: 'ההפניה לא עובדת - כל השיחות עוברות ישירות לנציג ולא ל-Callnik',
    a: 'ייתכן שיש לך הפניה מלאה (עקוב אחריי) פעילה, שגוברת על הפניה כשאין מענה. בדוק זאת בחיוג *#21# מהטלפון שלך - אם מוצגת הפניה פעילה, בטל אותה ואז הפעל מחדש את ההפניה של Callnik.',
  },
]

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">שאלות נפוצות</h1>
          <p className="text-gray-500 text-center mb-14">הכל שרצית לדעת על Callnik</p>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 px-6 py-5 hover:border-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-gray-700 font-medium mb-2">לא מצאת תשובה?</p>
            <a
              href="mailto:mail@callnik.com"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              mail@callnik.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
