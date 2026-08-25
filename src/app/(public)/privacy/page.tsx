import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות – Callnik',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">מדיניות פרטיות</h1>
        <p className="text-sm text-gray-400 mb-8">עדכון אחרון: אוגוסט 2026</p>

        <p className="text-gray-600 leading-relaxed mb-10">
          מדיניות פרטיות זו מפרטת כיצד Callnik (&quot;החברה&quot;, &quot;אנחנו&quot;) אוספת ומעבדת מידע אישי אודות המשתמשים בשירותיה, לרבות מבקרי האתר, לקוחות רשומים, ומתקשרים שמגיעים אל מזכירת ה-AI, בקשר עם השימוש בפלטפורמת Callnik בכתובת callnik.com. החברה מכבדת את פרטיות המשתמשים בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981.
        </p>

        <Section title="1. בעל השליטה במאגר המידע">
          <p className="text-gray-600">
            Callnik היא בעלת השליטה במאגר המידע. לכל שאלה ניתן לפנות אל: <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>
          </p>
        </Section>

        <Section title="2. כיצד אנו אוספים מידע">
          <ul className="space-y-2 text-gray-600">
            <li><strong>מידע שמסרת ישירות:</strong> טופס הרשמה, יצירת חשבון, פניות בדוא&quot;ל.</li>
            <li><strong>מידע מהשיחות:</strong> הקלטות שיחות טלפון המועברות למזכירת ה-AI, תמלולים, וסיכומים שנוצרים אוטומטית.</li>
            <li><strong>מידע שנאסף אוטומטית:</strong> כתובת IP, סוג דפדפן, עמודים שנצפו, זמן שהייה - באמצעות עוגיות וכלי ניטור.</li>
            <li><strong>מידע ממתקשרים:</strong> שם, מספר טלפון, וסיבת הפנייה - כפי שנמסרו למזכירת ה-AI במהלך שיחה.</li>
          </ul>
        </Section>

        <Section title="3. המידע שנאסף">
          <p className="text-gray-600 mb-3"><strong>פרטי לקוח:</strong> שם, כתובת דוא&quot;ל, מספר טלפון, שם עסק, מספר וואטסאפ לקבלת סיכומים, וחברת הסלולר.</p>
          <p className="text-gray-600 mb-3"><strong>הקלטות ותמלולים:</strong> הקלטות שיחות המועברות ל-Callnik, תמלולים של השיחות, וסיכומי AI. מידע זה נאסף ומעובד לצורך אספקת השירות.</p>
          <p className="text-gray-600 mb-3"><strong>מידע תשלום:</strong> Callnik אינה שומרת פרטי כרטיס אשראי. פרטי התשלום מועברים ישירות לספק הסליקה המאובטח.</p>
          <p className="text-gray-600"><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, עמודים שנצפו ומועד הגישה.</p>
        </Section>

        <Section title="3א. נתוני הקלטות שיחה">
          <p className="text-gray-600 mb-3">
            הקלטות השיחות המועברות ל-Callnik מעובדות על ידי שירותי AI חיצוניים לצורך תמלול וסיכום. מדיניות הטיפול בהן:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>מטרת האיסוף:</strong> ייצור הסיכום ושליחתו לבעל העסק בלבד.</li>
            <li><strong>העברה לצד שלישי:</strong> ההקלטה מועברת לשירות ElevenLabs (המרת קול לטקסט) ול-Anthropic Claude (סיכום) - הכפופים למדיניות פרטיות משלהם.</li>
            <li><strong>אימון מודלים:</strong> Callnik אינה משתמשת בהקלטות לאימון מודלי AI.</li>
            <li><strong>שמירה ומחיקה:</strong> הקלטות ותמלולים נשמרים לכל משך ההתקשרות ונמחקים תוך 90 ימים מסיום המנוי.</li>
            <li><strong>זכות מחיקה מוקדמת:</strong> פנה אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a> - הבקשה תטופל תוך 30 ימים.</li>
          </ul>
        </Section>

        <Section title="4. מטרות האיסוף והשימוש במידע">
          <ul className="space-y-2 text-gray-600">
            <li>מתן השירות: מענה לשיחות, יצירת תמלולים וסיכומים, שליחת הודעות וואטסאפ.</li>
            <li>עיבוד תשלומים וניהול חיובים.</li>
            <li>תמיכה טכנית ושירות לקוחות.</li>
            <li>שיפור השירות: ניתוח דפוסי שימוש ואיתור תקלות.</li>
            <li>תקשורת שיווקית - בכפוף להסכמתך וניתן לביטול בכל עת.</li>
            <li>עמידה בדרישות חוק.</li>
          </ul>
          <p className="text-gray-600 mt-3">איננו מוכרים מידע אישי לצדדים שלישיים ואיננו בונים עליו פרופיל שיווקי לגורמים חיצוניים.</p>
        </Section>

        <Section title="5. מסירת מידע לצדדים שלישיים">
          <p className="text-gray-600 mb-3">Callnik לא תעביר מידע אישי לצדדים שלישיים, למעט:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>Twilio:</strong> ספק הטלפוניה - מעבד את שיחות הטלפון.</li>
            <li><strong>ElevenLabs:</strong> שירות ה-AI לשיחה ותמלול.</li>
            <li><strong>Anthropic Claude:</strong> שירות ה-AI לסיכום השיחה.</li>
            <li><strong>Supabase:</strong> אחסון מאובטח של נתוני השיחות.</li>
            <li><strong>ספק הסליקה:</strong> עיבוד תשלומים - אינו שומר פרטי כרטיס אצלנו.</li>
            <li><strong>דרישת חוק:</strong> אם נחויב למסור מידע בהתאם לצו שיפוטי או דרישה חוקית.</li>
          </ul>
        </Section>

        <Section title="6. עוגיות וכלי ניטור">
          <p className="text-gray-600 mb-3">האתר משתמש בעוגיות לצורך:</p>
          <ul className="space-y-1 text-gray-600">
            <li>תפעול: שמירת פרטי כניסה ומצב סשן.</li>
            <li>ניתוח ביצועים: הבנת אופן השימוש באתר לשיפור השירות.</li>
            <li>שיפור חוויית משתמש: זכירת העדפות.</li>
          </ul>
          <p className="text-gray-600 mt-3">ניתן לנהל, לחסום ולמחוק עוגיות באמצעות הגדרות הדפדפן.</p>
        </Section>

        <Section title="7. אבטחת מידע">
          <p className="text-gray-600 mb-3">Callnik נוקטת אמצעי אבטחה מקובלים:</p>
          <ul className="space-y-1 text-gray-600">
            <li>הצפנת SSL/TLS על כל התקשורת (HTTPS)</li>
            <li>גישה מנהלתית מוגבלת עם אימות דו-שלבי</li>
            <li>פרטי כרטיס אשראי אינם נשמרים בשרתי Callnik</li>
            <li>גיבויים מוצפנים אוטומטיים</li>
          </ul>
          <p className="text-gray-600 mt-3">אין מערכת אבטחה שמספקת הגנה מוחלטת. במקרה של פרצת אבטחה, נודיע לך בהקדם ובהתאם לחוק.</p>
        </Section>

        <Section title="8. שמירת מידע">
          <ul className="space-y-2 text-gray-600">
            <li><strong>פרטי חשבון:</strong> נשמרים לכל משך פעילות החשבון ועד שנה לאחר סגירתו.</li>
            <li><strong>הקלטות ותמלולים:</strong> נמחקים תוך 90 ימים מסיום המנוי.</li>
            <li><strong>נתוני תשלום:</strong> נשמרים עד 7 שנים לפי חוק הנהלת חשבונות.</li>
            <li><strong>פניות תמיכה:</strong> נשמרות עד 3 שנים.</li>
            <li><strong>נתוני גלישה:</strong> נשמרים עד שנה, לאחר מכן הופכים אנונימיים.</li>
          </ul>
        </Section>

        <Section title="9. העברת מידע מחוץ לישראל">
          <p className="text-gray-600">
            Callnik עשויה לאחסן ולעבד מידע מחוץ לישראל, באמצעות שרתי ספקים (ElevenLabs, Anthropic, Twilio, Supabase) הממוקמים בארצות הברית ו/או באיחוד האירופי. העברת המידע נעשית בהתאם להוראות הדין החל. השימוש בשירות מהווה הסכמה להעברה כאמור.
          </p>
        </Section>

        <Section title="10. זכויות נושאי המידע">
          <p className="text-gray-600 mb-3">בהתאם לחוק הגנת הפרטיות הישראלי, עומדות לך הזכויות:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>זכות עיון:</strong> לקבל עותק של המידע האישי שנאסף אודותיך.</li>
            <li><strong>זכות תיקון:</strong> לדרוש תיקון מידע שגוי או לא מעודכן.</li>
            <li><strong>זכות מחיקה:</strong> לבקש מחיקת מידע, בכפוף למגבלות חוקיות.</li>
            <li><strong>ביטול הסכמה לדיוור:</strong> הסרה מרשימות שיווקיות בכל עת.</li>
          </ul>
          <p className="text-gray-600 mt-3">לממש זכויות, פנה אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>. נטפל בבקשתך תוך 30 ימים.</p>
        </Section>

        <Section title="11. ילדים">
          <p className="text-gray-600">
            השירות מיועד לבעלי עסקים בגירים בני 18 ומעלה. Callnik אינה אוספת ביודעין מידע מקטינים. אם נודע לנו על כך, נמחק המידע לאלתר.
          </p>
        </Section>

        <Section title="12. שינויים במדיניות הפרטיות">
          <p className="text-gray-600">
            Callnik שומרת לעצמה את הזכות לעדכן מדיניות זו. שינויים מהותיים יישלחו בהודעה למנויים פעילים לפחות 14 ימים לפני כניסתם לתוקף. המשך השימוש בשירות מהווה הסכמה לתנאים המעודכנים.
          </p>
        </Section>

        <Section title="13. יצירת קשר" last>
          <p className="text-gray-600">לכל שאלה הנוגעת למדיניות פרטיות זו:</p>
          <a href="mailto:mail@callnik.com" className="text-blue-600 font-semibold text-lg mt-2 block">mail@callnik.com</a>
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
