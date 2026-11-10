import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI בחיפה | Callnik',
  description: 'עסקים קטנים בחיפה - רופאים, שרברבים, מאמנים ועוד - משתמשים ב-Callnik כדי לא לפספס אף שיחה. חודש ראשון ב-₪1.',
  alternates: { canonical: 'https://callnik.com/city/haifa' },
  openGraph: {
    title: 'מזכירה AI בחיפה | Callnik',
    description: 'עסקים קטנים בחיפה לא מפספסים יותר שיחות. Callnik עונה בשמך ושולחת סיכום בוואטסאפ.',
    type: 'website',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Callnik - מזכירה AI לעסקים בחיפה',
  url: 'https://callnik.com/city/haifa',
  description: 'מזכירה AI לעסקים קטנים בחיפה. עונה לשיחות שלא נענו, שולחת סיכום בוואטסאפ, מנהלת יומן.',
  areaServed: {
    '@type': 'City',
    name: 'חיפה',
    addressCountry: 'IL',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'חיפה',
    addressCountry: 'IL',
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 32.7940,
      longitude: 34.9896,
    },
  },
  priceRange: '₪₪',
}

export default function HaifaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-20 text-right">

        <div className="mb-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">חזרה לעמוד הבית</Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Callnik מגיע לחיפה -<br />
          <span className="text-blue-600">מזכירה AI לעסקים מקומיים</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          חיפה - עיר הכרמל - משלבת שכונות מגוונות: מנמל חיפה עד הכרמל הירוק. בעלי עסקים קטנים בכל השכונות צריכים מענה מהיר כשהם עסוקים בעבודה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מי משתמש ב-Callnik בחיפה</h2>
            <p>
              חיפה מתאפיינת בעסקים מקצועיים ותעשייתיים לצד שירותים אישיים. טכנאי מזגנים שעסוק בהתקנות, שרברב בנמל, רופא שיניים בנווה שאנן - כולם מפספסים שיחות בזמן שהם עובדים.
            </p>
            <p className="mt-3">
              עם Callnik, כל שיחה שלא נענית מקבלת מענה מקצועי בשמך. הפרטים מגיעים לוואטסאפ ואתה מחזיר כשנוח לך - בלי לחץ ובלי לאבד לקוחות.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">עסקים שמרוויחים מזה בחיפה</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> טכנאי מזגנים ורפריג'רציה שעסוקים בהתקנות</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> רופאי שיניים ורופאים פרטיים בנווה שאנן ובכרמל</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> שרברבים, חשמלאים ואנשי בניין בהדר ובנמל</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> מאמני כושר ופיזיותרפיסטים בשכונות הכרמל</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> עורכי דין ורואי חשבון במרכז חיפה</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> גנים פרטיים ומספרות שעסוקות בלקוחות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך זה עובד</h2>
            <p>
              מגדירים הפניה סלולרית מהטלפון - פעולה של שתי דקות. מאותו רגע, כל שיחה שלא ענית לה מגיעה ל-Callnik. המזכירה עונה בשם העסק שלך, לוקחת את הפרטים, ומשלחת לך סיכום בוואטסאפ.
            </p>
            <p className="mt-3">
              בתוכנית Pro מתחברים גם ל-Google Calendar - המזכירה קובעת פגישות ישירות ביומן.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Basic - ₪99/חודש</p>
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לרוב העסקים הקטנים בחיפה.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Pro - ₪199/חודש</p>
                <p className="text-gray-600 text-sm">עד 150 שיחות + ניהול תורים ופגישות ביומן Google.</p>
              </div>
              <p className="text-blue-700 text-sm font-medium">חודש ראשון ב-₪1 בלבד.</p>
            </div>
          </section>

        </div>

        <div className="mt-14 bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">עסק בחיפה? תתחיל עכשיו</h2>
          <p className="text-blue-100 mb-5">הרשמה ב-5 דקות. ללא התחייבות. חודש ראשון ב-₪1.</p>
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
          <Link href="/how-it-works" className="hover:underline">איך זה עובד</Link>
        </p>
      </main>
      <Footer />
    </>
  )
}
