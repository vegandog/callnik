import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'הצהרת נגישות – Callnik',
}

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">הצהרת נגישות</h1>
        <p className="text-sm text-gray-400 mb-8">עודכן לאחרונה: אוגוסט 2026</p>

        <Section title="מחויבות לנגישות">
          <p className="text-gray-600">
            callnik.com מחויב להבטיח נגישות דיגיטלית לכל המשתמשים, ללא קשר ליכולותיהם. האתר פועל בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע&quot;ג-2013, ולתקן הישראלי SI 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA.
          </p>
          <p className="text-gray-600 mt-3">
            לנוחות המשתמשים, האתר כולל סרגל נגישות הפועל באמצעות שירות TabNav, הנגיש דרך כפתור הנגישות בצד שמאל של המסך.
          </p>
        </Section>

        <Section title="תכונות הנגישות הזמינות בסרגל">
          <p className="text-gray-600 mb-4">לחיצה על כפתור הנגישות פותחת תפריט המציע את האפשרויות הבאות:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>ניגודיות</strong> - שינוי רמת הניגודיות בין טקסט לרקע לשיפור הקריאות.</li>
            <li><strong>קורא טקסט</strong> - קריאת תכני הדף בקול רם בלחיצה על הטקסט הרצוי.</li>
            <li><strong>שחור-לבן</strong> - הצגת האתר במצב גווני אפור, ללא צבעים.</li>
            <li><strong>הדגשת קישורים</strong> - הבלטה ויזואלית של כל הקישורים בדף לאיתורם בקלות.</li>
            <li><strong>גופנים קריאים</strong> - מעבר לגופן ידידותי לדיסלקציה ולקריאה נוחה.</li>
            <li><strong>הדגשת כותרות</strong> - הבלטה ויזואלית של כותרות הדף לניווט מהיר.</li>
            <li><strong>עצירת אנימציות</strong> - ביטול כל האנימציות בדף להפחתת הסחות דעת.</li>
            <li><strong>סמן גדול</strong> - הגדלת סמן העכבר לשיפור הנראות.</li>
            <li><strong>הסתר תמונות</strong> - הסרת תמונות מהתצוגה להתמקדות בתוכן הטקסטואלי.</li>
            <li><strong>עזר קריאה</strong> - שימוש במדריך קריאה להתמקדות בשורות הטקסט.</li>
          </ul>
          <p className="text-gray-600 mt-4">בנוסף, האתר כולל קישורי דילוג לתוכן הראשי ואפשרות הפעלת תאימות לקוראי מסך חיצוניים.</p>
        </Section>

        <Section title="רכיבים שאינם נגישים במלואם">
          <ul className="space-y-2 text-gray-600">
            <li>שיחות ה-AI אינן כוללות כתוביות בשלב זה - אנו פועלים לפתרון בגרסאות עתידיות.</li>
            <li>הודעות הוואטסאפ הנשלחות לבעל העסק - נגישותן כפופה לנגישות אפליקציית WhatsApp.</li>
          </ul>
        </Section>

        <Section title="נגישות פיזית">
          <p className="text-gray-600">
            Callnik היא שירות דיגיטלי המופעל באופן מקוון בלבד. אין קבלת קהל במשרדי החברה ולא מתקיימת כל פעילות המחייבת נוכחות פיזית. לפיכך, נגישות פיזית למקום עסק אינה רלוונטית לשירות זה.
          </p>
        </Section>

        <Section title="פניות בנושא נגישות">
          <p className="text-gray-600 mb-4">אם נתקלת בקשיים בגישה לתוכן כלשהו באתר, או אם יש לך הצעות לשיפור הנגישות:</p>
          <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-gray-700">
            <p><strong>רכז נגישות:</strong> ד. ארליך</p>
            <p><strong>דוא&quot;ל:</strong> <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a></p>
            <p><strong>טלפון / וואטסאפ:</strong> 052-468-0164</p>
          </div>
          <p className="text-gray-600 mt-4">
            לא קיבלת מענה מספק? ניתן לפנות לנציבות שוויון זכויות לאנשים עם מוגבלות:{' '}
            <a href="https://www.gov.il" target="_blank" rel="noopener noreferrer" className="text-blue-600">gov.il</a>
          </p>
        </Section>

        <Section title="הצהרת אחריות" last>
          <p className="text-gray-600">
            אנו פועלים באופן מתמיד לשיפור נגישות האתר ומקבלים בברכה כל משוב. ייתכן שחלק מהתוכן של צדדים שלישיים לא יעמוד במלואו בהנחיות הנגישות, ואיננו אחראים לנגישות אתרים חיצוניים.
          </p>
          <p className="text-gray-500 text-sm mt-4">תאריך הכנת ההצהרה: אוגוסט 2026. ההצהרה תתעדכן אחת לשנה לפחות.</p>
        </Section>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section className={`${last ? '' : 'border-b border-gray-100'} py-8`}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  )
}
