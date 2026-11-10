import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI לאופטיקאי: תיאום תורים ומענה אוטומטי – Callnik',
  description: 'אופטיקאי עסוק בבדיקת ראייה - Callnik עונה, מתאמת תורים ביומן ומודיעה לך בוואטסאפ. ללא מזכירה.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-optika' },
  openGraph: {
    title: 'מזכירה AI לאופטיקאי: תיאום תורים ומענה אוטומטי',
    description: 'אופטיקאי עסוק בבדיקת ראייה - Callnik עונה, מתאמת תורים ביומן ומודיעה לך בוואטסאפ. ללא מזכירה.',
    type: 'article',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מזכירה AI לאופטיקאי: תיאום תורים ומענה אוטומטי',
  datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-optika',
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
          מזכירה AI לאופטיקאי:<br />
          <span className="text-blue-600">תיאום תורים אוטומטי</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          בבדיקת ראייה אי אפשר לענות לטלפון. לקוח שמנסה לקבוע תור ולא מקבל מענה - עובר למתחרה. Callnik פותרת את הבעיה.
        </p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">האתגר של חנות אופטיקה עצמאית</h2>
            <p>
              אופטיקאי שעובד לבד עסוק כל הזמן - בדיקת ראייה לוקחת 20-30 דקות ולא ניתן להפסיק באמצע. לקוח שמתקשר לקבוע תור בשעה כזו לא ימתין. 
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך Callnik עובדת לאופטיקאי</h2>
            <p>
              Callnik עונה, שואלת לאיזה שירות מתקשרים (בדיקת ראייה, הזמנת משקפיים, תיקון), ומתאמת תור ישירות מהיומן שלך אם מחברים Google Calendar (Pro). אחרת לוקחת שם ומספר ומדווחת בוואטסאפ.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מה כלול בתיאום תור אוטומטי?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>הצגת שעות פנויות לפי היומן שלך</li>
              <li>קביעת הפגישה ישירות ב-Google Calendar</li>
              <li>שליחת אישור ללקוח</li>
              <li>תזכורת אוטומטית ב-WhatsApp לפני התור</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Basic</span>
                <span className="text-blue-600 font-bold">99 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 60 שיחות חודשיות. מענה אוטומטי וסיכומים בוואטסאפ.</p>
              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-semibold">Pro</span>
                <span className="text-blue-600 font-bold">149 &#8362;/חודש</span>
              </div>
              <p className="text-sm text-gray-600">עד 150 שיחות + ניהול יומן Google Calendar.</p>
            </div>
          </section>
          <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס לקוחות?</h3>
            <p className="text-gray-400 mb-6">חודש ראשון ב-1 &#8362; בלבד. ביטול בכל עת.</p>
            <Link href="/#signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              התחל עכשיו
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
