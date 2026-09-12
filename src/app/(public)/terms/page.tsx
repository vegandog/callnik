import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'תנאי שימוש – Callnik',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 text-right">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">תנאי שימוש</h1>
        <p className="text-sm text-gray-400 mb-8">עודכן לאחרונה: אוגוסט 2026</p>

        <p className="text-gray-600 leading-relaxed mb-10">
          ברוכים הבאים ל-Callnik. מסמך זה מגדיר את תנאי השימוש (&quot;התנאים&quot;) החלים על כל אדם או גוף המשתמש בשירותים שמציעה Callnik (להלן: &quot;החברה&quot; או &quot;Callnik&quot;), בכתובת <a href="https://callnik.com" className="text-blue-600 underline">callnik.com</a>. גלישה באתר, הרשמה לשירות או שימוש בו מהווים הסכמה מלאה לתנאים אלה. אם אינך מסכים לתנאים - אנא הימנע משימוש בשירות.
        </p>

        <Section title="1. הגדרות">
          <p className="text-gray-600 mb-3">במסמך זה המונחים הבאים יפורשו כך:</p>
          <ul className="space-y-2 text-gray-600">
            <li><strong>&quot;השירות&quot;</strong> - פלטפורמת Callnik המאפשרת לעסקים לקבל מענה אוטומטי לשיחות טלפון שלא נענו, באמצעות מזכירה מבוססת AI, ולקבל סיכום השיחה בוואטסאפ.</li>
            <li><strong>&quot;מזכירה AI&quot;</strong> - סוכן שיחה מבוסס בינה מלאכותית המדבר בעברית, עונה לשיחות שלא נענו, אוסף פרטי המתקשר ומסכם את השיחה.</li>
            <li><strong>&quot;הלקוח&quot;</strong> - כל אדם פרטי, עוסק, חברה או גוף אחר הרשום לשירות.</li>
            <li><strong>&quot;מנוי&quot;</strong> - מסלול תשלום חודשי המקנה גישה לשירות Callnik.</li>
            <li><strong>&quot;שיחה&quot;</strong> - כל שיחה טלפונית שלא נענתה על ידי הלקוח והועברה למזכירה ה-AI לצורך מענה.</li>
            <li><strong>&quot;שירותי צד שלישי&quot;</strong> - ספקי טכנולוגיה חיצוניים שבאמצעותם מספקת Callnik את שירותיה, לרבות ספקי טלפוניה, קול AI, עיבוד שפה ואחסון נתונים.</li>
          </ul>
        </Section>

        <Section title="2. תיאור השירות">
          <p className="text-gray-600 mb-3">
            Callnik מאפשרת לעסקים לא לפספס שיחות. כאשר לקוח מתקשר לעסק ולא נענה, השיחה מועברת אוטומטית למזכירה ה-AI של Callnik. המזכירה מנהלת שיחה בעברית, אוספת את שם המתקשר, מטרת השיחה ומספר ליצירת קשר, ושולחת לבעל העסק סיכום בוואטסאפ תוך דקה מסיום השיחה.
          </p>
          <p className="text-gray-600 mb-3">
            ההפניה הסלולרית מוגדרת ברמת הרשת הסלולרית ומתבצעת על ידי הלקוח בחיוג קצר לפי הנחיית Callnik. מספר הטלפון של הלקוח אצל לקוחותיו אינו משתנה.
          </p>
          <p className="text-gray-600">
            Callnik אינה אחראית לתוצאות עסקיות שיושגו או לא יושגו באמצעות השירות. המזכירה אינה נותנת ייעוץ מקצועי ואינה מתחזה לבעל העסק - היא מציגה את עצמה תמיד כמזכירה אוטומטית.
          </p>
        </Section>

        <Section title="3. הרשמה וחשבון משתמש">
          <p className="text-gray-600 mb-3">השירות מיועד לבעלי עסקים בני 18 ומעלה בלבד.</p>
          <p className="text-gray-600 mb-3">
            השימוש בשירות מחייב יצירת חשבון עם פרטים מדויקים ועדכניים. הלקוח אחראי לשמירת פרטי הכניסה לחשבונו ולכל פעילות שתבוצע תחתיו.
          </p>
          <p className="text-gray-600">
            לאחר הרשמה, Callnik תיצור קשר עם הלקוח תוך 24 שעות להפעלת השירות, הגדרת ההפניה הסלולרית, ומסירת מספר Callnik הייעודי. Callnik שומרת את הזכות להשעות או לסגור חשבון שבו זוהה שימוש המנוגד לתנאים אלה.
          </p>
        </Section>

        <Section title="4. מחירים ותשלום">
          <p className="text-gray-600 mb-4">המחירים המפורטים להלן הם לפני מע&quot;מ ועשויים להשתנות מעת לעת. המחיר הנהוג בעת ביצוע ההזמנה הוא הקובע.</p>

          <h3 className="font-semibold text-gray-800 mb-3">4.1 מסלולי מנוי</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-3 font-semibold border-b border-gray-200">מסלול</th>
                  <th className="text-right p-3 font-semibold border-b border-gray-200">מחיר</th>
                  <th className="text-right p-3 font-semibold border-b border-gray-200">הערות</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b border-gray-100">מנוי חודשי</td>
                  <td className="p-3 border-b border-gray-100">₪99 לחודש</td>
                  <td className="p-3 border-b border-gray-100">חיוב חודשי. ביטול בכל עת.</td>
                </tr>
                <tr>
                  <td className="p-3">מנוי שנתי</td>
                  <td className="p-3">₪948 לשנה (₪79 לחודש)</td>
                  <td className="p-3">תשלום חד-פעמי מראש לשנה שלמה. חסכון של ₪240 לעומת חודשי.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-gray-800 mb-2 mt-5">4.2 אמצעי תשלום</h3>
          <p className="text-gray-600 mb-4">
            התשלום מתבצע בכרטיס אשראי דרך מערכת הסליקה המאובטחת. Callnik אינה שומרת פרטי כרטיס אשראי. חיוב המנוי השנתי מתבצע פעם בשנה.
          </p>

          <h3 className="font-semibold text-gray-800 mb-2">4.3 מעבר ממסלול חודשי לשנתי</h3>
          <p className="text-gray-600 mb-4">
            לקוח הרשום למסלול חודשי רשאי לעבור למסלול שנתי בכל עת. המעבר מחויב בתשלום מלא של שנה ממועד המעבר, ללא קיזוז תשלומים חודשיים קודמים.
          </p>

        </Section>

        <Section title="5. ביטול עסקה והחזרים כספיים">
          <h3 className="font-semibold text-gray-800 mb-2">5.1 ביטול לפני הפעלת השירות</h3>
          <p className="text-gray-600 mb-4">
            לקוח שביקש לבטל לפני שהופעל השירות בפועל (לפני קבלת מספר Callnik והגדרת ההפניה) זכאי לביטול מלא תוך 14 ימי עסקים, בהתאם לחוק הגנת הצרכן, תשמ&quot;א-1981. הביטול ייעשה בכתב בלבד אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>.
          </p>

          <h3 className="font-semibold text-gray-800 mb-2">5.2 ביטול מנוי חודשי פעיל</h3>
          <p className="text-gray-600 mb-4">
            ניתן לבטל בכל עת, ללא קנס, דרך הגדרות החשבון או בהודעה בכתב אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>. הביטול ייכנס לתוקף בסוף החודש השוטף. לא יינתן החזר על חלקי חודש.
          </p>

          <h3 className="font-semibold text-gray-800 mb-2">5.3 ביטול מנוי שנתי פעיל</h3>
          <p className="text-gray-600 mb-2">
            ניתן לבטל בכל עת, ללא קנס, בהודעה בכתב אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>. עם אישור הביטול יפסיק השירות לפעול ויבוצע החזר כספי יחסי כדלקמן:
          </p>
          <ul className="text-gray-600 space-y-1 mb-3 list-disc list-inside">
            <li>מחשבים את מספר החודשים שבהם נעשה שימוש בפועל.</li>
            <li>על חודשים אלה חל המחיר החודשי הרגיל (₪99 לחודש, לפני מע&quot;מ).</li>
            <li>ההחזר הוא: סכום ששולם בפועל פחות (מספר חודשי שימוש × ₪99).</li>
          </ul>
          <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm text-blue-800 mb-4">
            <strong>דוגמה:</strong> שילמת ₪948 לשנה וביטלת אחרי 6 חודשים — ₪948 פחות 6×₪99 (₪594) = <strong>החזר של ₪354</strong>. אין קנסות, אין עמלות.
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">5.4 ביטול על ידי Callnik</h3>
          <p className="text-gray-600">
            Callnik רשאית לבטל מנוי בהודעה מוקדמת של 14 ימים במקרים של הפרת תנאי שימוש, אי-תשלום, או שימוש לרעה. אם Callnik ביטלה מסיבה עסקית שאינה הפרת תנאים מצד הלקוח - יוחזר החלק היחסי מדמי המנוי שטרם נוצל.
          </p>
        </Section>

        <Section title="6. מגבלות שירותי צד שלישי וכוח עליון">
          <p className="text-gray-600 mb-3">
            Callnik משתמשת בשירותי טכנולוגיה חיצוניים (טלפוניה, קול AI, עיבוד שפה ואחסון). לעיתים, שירותים אלו עשויים לחוות תקלות שאינן בשליטת Callnik. Callnik אינה אחראית לעיכובים הנגרמים מגורמים אלה.
          </p>
          <p className="text-gray-600">
            Callnik לא תישא באחריות לכל עיכוב הנובע מנסיבות שאינן בשליטתה, לרבות תקלות תשתיות, הפסקות חשמל, כשלי ספקים, מגיפות, מלחמה, או מצב חירום לאומי.
          </p>
        </Section>

        <Section title="7. הגבלות שימוש">
          <p className="text-gray-600 mb-3">חל איסור על שימוש בשירות לצורך:</p>
          <ul className="space-y-1 text-gray-600 list-disc list-inside">
            <li>פרסום מידע כוזב או הטעיה של לקוחות</li>
            <li>פעילות המנוגדת לחוק ישראלי</li>
            <li>הטרדה, ספאם, או פניות לא רצויות</li>
            <li>כל שימוש שעלול לפגוע בתשתיות הטלפוניה</li>
          </ul>
          <p className="text-gray-600 mt-3">
            המזכירה אינה מאומנת ואינה מוסמכת לייעוץ רפואי, משפטי, פיננסי, או מקצועי מכל סוג. כל שיחה הדורשת מענה מקצועי תועבר לבעל העסק.
          </p>
        </Section>

        <Section title="8. קניין רוחני">
          <p className="text-gray-600 mb-3">
            הקוד, המערכת, ממשק המשתמש, מנועי ה-AI, וכל רכיב אחר של פלטפורמת Callnik הם קניינה הבלעדי של Callnik ומוגנים בזכויות יוצרים.
          </p>
          <p className="text-gray-600">
            תמלולי השיחות ונתוני הלקוח (שם, מספר, סיבת פנייה) שייכים לבעל העסק ומשמשים אותו בלבד. Callnik לא תשתמש בתכנים אלה לאימון מודלי AI או להעברה לצד שלישי שלא לצורך אספקת השירות.
          </p>
        </Section>

        <Section title="9. נגישות">
          <p className="text-gray-600">
            Callnik פועלת לשיפור נגישות הפלטפורמה. הצהרת הנגישות המלאה מפורסמת ב<a href="/accessibility" className="text-blue-600">דף הצהרת נגישות</a>.
          </p>
        </Section>

        <Section title="10. פרטיות ואבטחת מידע">
          <p className="text-gray-600 mb-3">
            השימוש בשירות כפוף ל<a href="/privacy" className="text-blue-600">מדיניות הפרטיות של Callnik</a>, המפורסמת בנפרד. Callnik נוקטת אמצעי אבטחה סבירים לאחסון המידע.
          </p>
          <h3 className="font-semibold text-gray-800 mb-2">10.1 הקלטות ותמלול שיחות</h3>
          <p className="text-gray-600 mb-3">
            כל שיחה המועברת למזכירה ה-AI של Callnik <strong>מוקלטת ומתומללת באופן אוטומטי</strong>. ההקלטה והתמלול מהווים חלק בלתי נפרד מהשירות ואינם ניתנים להשבתה.
          </p>
          <p className="text-gray-600 mb-3">
            ההקלטה והתמלול נועדו אך ורק ליצירת הסיכום שנשלח לבעל העסק ולצפייה בפאנל הניהול. Callnik לא תשתמש בתכנים אלה לאימון מודלי AI ולא תעביר אותם לצד שלישי, למעט ספקי הטכנולוגיה הנדרשים לאספקת השירות.
          </p>
          <p className="text-gray-600 mb-3">
            <strong>חובת הודעה למתקשרים:</strong> הלקוח אחראי להודיע למתקשרים לעסקו כי שיחות עשויות להיות מוקלטות ומתומללות. מזכירת ה-AI של Callnik מציגה את עצמה כמזכירה אוטומטית בתחילת כל שיחה.
          </p>
          <p className="text-gray-600">
            ההקלטות נשמרות לכל משך ההתקשרות ונמחקות תוך 90 ימים מסיום המנוי. לקוח המבקש למחוק הקלטות לפני כן יפנה אל <a href="mailto:mail@callnik.com" className="text-blue-600">mail@callnik.com</a>.
          </p>
        </Section>

        <Section title="11. הגבלת אחריות">
          <p className="text-gray-600 mb-3">
            Callnik אינה ולא תהא אחראית לנזקים ישירים, עקיפים, מיוחדים, תוצאתיים, או אקראיים הנובעים משימוש בשירות, לרבות אובדן הכנסות, אובדן לקוחות, או שיחות שלא נקלטו בשל תקלה טכנית.
          </p>
          <p className="text-gray-600">
            אחריות Callnik בכל מקרה לא תעלה על הסכום ששילם הלקוח בפועל בשלושת החודשים שקדמו לאירוע.
          </p>
        </Section>

        <Section title="12. שינויים בתנאי השימוש">
          <p className="text-gray-600 mb-3">
            Callnik רשאית לעדכן תנאים אלה מעת לעת. לקוחות פעילים יקבלו הודעה בדוא&quot;ל לפחות 14 ימים לפני כניסת שינויים מהותיים לתוקף. המשך שימוש בשירות מהווה הסכמה לתנאים המעודכנים.
          </p>
          <p className="text-gray-600">
            שינוי מחיר שיחול על חידוש מנוי קיים ייודע ללקוח לפחות 30 ימים מראש. ביטול המנוי לפני מועד החידוש יתאפשר ללא קנס.
          </p>
        </Section>

        <Section title="13. ברירת דין וסמכות שיפוט">
          <p className="text-gray-600">
            על ההתקשרות בין הלקוח ל-Callnik יחול הדין הישראלי בלבד. סמכות השיפוט הבלעדית תהא לבתי המשפט המוסמכים במחוז תל אביב-יפו.
          </p>
        </Section>

        <Section title="14. יצירת קשר" last>
          <p className="text-gray-600">
            לכל שאלה, בקשת ביטול, או פנייה הנוגעת לתנאים אלה יש לפנות בדוא&quot;ל:
          </p>
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
