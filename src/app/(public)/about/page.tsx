import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'אודות – Callnik',
  description: 'הצוות מאחורי Callnik - ניסיון של שנים בשירות טלפוני לעסקים קטנים.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-20 text-right">

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          אנחנו מכירים את הטלפון העסקי<br />
          <span className="text-blue-600">מבפנים.</span>
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Callnik לא קמה מתוך ריק. הצוות מאחורינו עוסק שנים בשירותי תקשורת לעסקים קטנים - קריינות IVR, מערכות מענה, הפנייה סלולרית, חווית הלקוח הזאת שמתחילה שנייה אחרי שמרימים טלפון.
        </p>

        <div className="grid gap-8 mb-14">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">מאיפה באנו</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              אותו צוות שמפעיל את Callnik מפעיל גם את <strong>Jinglephone</strong> - שירות קריינות IVR לעסקים קטנים, שמשרת מאות לקוחות ברחבי הארץ. שנים של ניסיון בהפקת מסרי מענה, הפנייה חכמה, ותפריטים קוליים לימדו אותנו דבר אחד ברור: הטלפון הוא קו החזית של העסק.
            </p>
            <p className="text-gray-600 leading-relaxed">
              ממשלם שמחכה 40 שניות עד לאות תפוס, ועד ללקוח שמשאיר הודעה שלא נשמעת - ראינו את כל הפספוסים. Callnik היא התשובה שרצינו שתהיה קיימת כבר מזמן.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">מה עוד אנחנו עושים</h2>
            <p className="text-gray-600 leading-relaxed">
              דרך <strong>Web-AI</strong> אנחנו גם מוציאים כלים מבוססי AI לעסקים קטנים - מוצרים שפותחו מתוך אותה תפיסה: טכנולוגיה שמישה, בלי הבטחות גדולות ובלי למידה מסובכת. כלי שעובד מהיום הראשון.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">למה זה חשוב לנו</h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              עסק קטן לא יכול להרשות לעצמו מזכירה בשביל שעה שתיים שהוא לא זמין. הוא גם לא רוצה לספר ללקוח &quot;ניסיתי להתקשר אליך וראיתי שחייגת&quot; - כי הלקוח כבר עבר הלאה.
            </p>
            <p>
              Callnik נועדה לפתור בדיוק את זה - לתת לכל עסק קטן את המענה שמגיע לו, בלי להוסיף עומס ניהולי, ובלי לשנות מספר.
            </p>
            <p>
              אנחנו לא חברת ענק. אנחנו אנשים שמכירים עסקים קטנים, שמדברים עם בעלי עסקים, ושמבינים שכל שיחה שלא נענתה היא לקוח שהלך.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">רוצים לדבר?</h2>
          <p className="text-blue-100 mb-5">שאלה, הצעה, או סתם רוצים לדעת עוד - אנחנו כאן.</p>
          <a
            href="mailto:mail@callnik.com"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            mail@callnik.com
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
