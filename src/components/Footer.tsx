import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-6 px-4 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="shrink-0">
            <Image src="/callnik-logo.png" alt="Callnik" height={24} width={100} style={{ objectFit: 'contain' }} />
            <p className="text-gray-400 text-xs mt-3 leading-relaxed max-w-[200px]">
              מזכירה AI בעברית שעונה כשאתה לא יכול.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2.5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">מוצר</p>
            <Link href="/how-it-works" className="hover:text-gray-800 transition-colors">איך זה עובד</Link>
            <Link href="/pricing" className="hover:text-gray-800 transition-colors">מחירים</Link>
            <Link href="/faq" className="hover:text-gray-800 transition-colors">שאלות נפוצות</Link>
            <Link href="/about" className="hover:text-gray-800 transition-colors">אודות</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">משפטי</p>
            <Link href="/terms" className="hover:text-gray-800 transition-colors">תקנון</Link>
            <Link href="/privacy" className="hover:text-gray-800 transition-colors">פרטיות</Link>
            <Link href="/accessibility" className="hover:text-gray-800 transition-colors">נגישות</Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-1">יצירת קשר</p>
            <a href="mailto:mail@callnik.com" className="hover:text-gray-800 transition-colors">mail@callnik.com</a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5 pb-3 text-xs text-gray-400 leading-relaxed text-right">
          <span className="font-semibold text-gray-500">הגבלת אחריות:</span> השירות מסופק כפי שהוא (as-is), ללא אחריות לשלמות המידע, לדיוקו או לזמינות רציפה. עיבוד השיחות מבוסס על בינה מלאכותית ועשוי להכיל שגיאות בתמלול, באיות שמות, במספרי טלפון, או בפרטים שנמסרו בעל-פה על ידי המתקשר. Callnik אינה מאמתת מידע שמסרו מתקשרים ואינה אחראית לכל נזק הנובע מהסתמכות על פרטים אלה. הודעה תגיע לבעל העסק בכפוף לכך שהמתקשר מסר פרטי יצירת קשר. Callnik לא תישא באחריות לשיחות שלא הגיעו ליעדן, לכשלי תשתיות טלפוניה, לשיבושים אצל ספקי צד שלישי, או לכל נזק עקיף הנובע משימוש בשירות. השירות מיועד לקליטת פניות בלבד ואין לראות בו ייעוץ מקצועי, רפואי, משפטי, פיננסי או אחר. Callnik רשאית לשנות את מחיר השירות, היקפו ותנאיו בכל עת, בהתראה מוקדמת למנויים פעילים. שימוש בשירות מהווה הסכמה לתנאי השימוש המלאים.
        </div>

        <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© 2026 Callnik. כל הזכויות שמורות.</span>
          <Link href="/admin" className="hover:text-gray-500 transition-colors">ניהול</Link>
        </div>
      </div>
    </footer>
  )
}
