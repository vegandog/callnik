import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI בתל אביב | Callnik',
  description: 'עסקים קטנים בתל אביב - שרברבים, עורכי דין, קוסמטיקאיות ועוד - משתמשים ב-Callnik כדי לא לפספס אף שיחה. חודש ראשון ב-₪1.',
  alternates: { canonical: 'https://callnik.com/city/tel-aviv' },
  openGraph: {
    title: 'מזכירה AI בתל אביב | Callnik',
    description: 'עסקים קטנים בתל אביב לא מפספסים יותר שיחות. Callnik עונה בשמך ושולחת סיכום בוואטסאפ.',
    type: 'website',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Callnik - מזכירה AI לעסקים בתל אביב',
  url: 'https://callnik.com/city/tel-aviv',
  description: 'מזכירה AI לעסקים קטנים בתל אביב. עונה לשיחות שלא נענו, שולחת סיכום בוואטסאפ, מנהלת יומן.',
  areaServed: {
    '@type': 'City',
    name: 'תל אביב',
    addressCountry: 'IL',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'תל אביב',
    addressCountry: 'IL',
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 32.0853,
      longitude: 34.7818,
    },
  },
  priceRange: '₪₪',
}

export default function TelAvivPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-20 text-right">

        <div className="mb-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">חזרה לעמוד הבית</Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Callnik מגיע לתל אביב -<br />
          <span className="text-blue-600">מזכירה AI לעסקים מקומיים</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          תל אביב היא עיר שרצה. עסקים קטנים - משרברב ברמת אביב עד עורך דין בצפון - לא יכולים להרשות לעצמם לפספס שיחה.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מי משתמש ב-Callnik בתל אביב</h2>
            <p>
              בתל אביב הצפופה, התחרות על כל לקוח קשה. שרברב שלא עונה בזמן - הלקוח כבר מתקשר לאחד. קוסמטיקאית שבטיפול - אבדה הזמנת תור. עורך דין בישיבה - פספס לקוח פוטנציאלי.
            </p>
            <p className="mt-3">
              Callnik פועלת ברקע: כל שיחה שלא נענתה מקבלת מענה אנושי-ודאי, הפרטים מגיעים אליך בוואטסאפ, ואתה חוזר כשנוח לך.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">עסקים שמרוויחים מזה בתל אביב</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> שרברבים ואנשי אחזקה בשכונות פלורנטין, נווה צדק, הצפון הישן</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> קוסמטיקאיות ומטפלות ביופי בבן גוריון ודיזנגוף</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> עורכי דין ורואי חשבון ברחוב הארבעה וסביבתו</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> מאמני כושר ופילאטיס בשכונות צפוניות</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> גנים פרטיים ומטפלות בחינוך</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> נגרים, חשמלאים ואנשי שיפוץ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">איך זה עובד</h2>
            <p>
              מגדירים הפניה סלולרית מהטלפון שלך - פעולה של שתי דקות. מאותו רגע, כל שיחה שלא ענית לה מגיעה ל-Callnik. המזכירה עונה בשם העסק שלך, לוקחת את הפרטים, ומשלחת לך סיכום.
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
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לרוב העסקים הקטנים בתל אביב.</p>
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
          <h2 className="text-2xl font-bold mb-3">עסק בתל אביב? תתחיל עכשיו</h2>
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
