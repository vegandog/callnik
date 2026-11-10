import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מזכירה AI בראשון לציון | Callnik',
  description: 'עסקים קטנים בראשון לציון - שרברבים, קוסמטיקאיות, מאמנים ועוד - משתמשים ב-Callnik כדי לא לפספס אף שיחה. חודש ראשון ב-₪1.',
  alternates: { canonical: 'https://callnik.com/city/rishon-lezion' },
  openGraph: {
    title: 'מזכירה AI בראשון לציון | Callnik',
    description: 'עסקים קטנים בראשון לציון לא מפספסים יותר שיחות. Callnik עונה בשמך ושולחת סיכום בוואטסאפ.',
    type: 'website',
    locale: 'he_IL',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Callnik - מזכירה AI לעסקים בראשון לציון',
  url: 'https://callnik.com/city/rishon-lezion',
  description: 'מזכירה AI לעסקים קטנים בראשון לציון. עונה לשיחות שלא נענו, שולחת סיכום בוואטסאפ, מנהלת יומן.',
  areaServed: {
    '@type': 'City',
    name: 'ראשון לציון',
    addressCountry: 'IL',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'ראשון לציון',
    addressCountry: 'IL',
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 31.9730,
      longitude: 34.7925,
    },
  },
  priceRange: '₪₪',
}

export default function RishonLezionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-20 text-right">

        <div className="mb-4">
          <Link href="/" className="text-sm text-blue-500 hover:underline">חזרה לעמוד הבית</Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Callnik מגיע לראשון לציון -<br />
          <span className="text-blue-600">מזכירה AI לעסקים מקומיים</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">
          ראשון לציון היא אחת הערים הגדולות והצומחות בישראל. שכונות חדשות, מרכזי מסחר ואוכלוסייה צעירה - כולם יוצרים ביקוש גבוה לשירותים מקומיים.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מי משתמש ב-Callnik בראשון לציון</h2>
            <p>
              ראשון לציון מאכלסת משפחות רבות שצורכות שירותים מקומיים ביומיום. שרברב שמקבל עשרות שיחות ביום, קוסמטיקאית שעסוקה בלקוחות, מאמן כושר שבאמצע שיעור - כולם זקוקים לפתרון שיענה בשמם.
            </p>
            <p className="mt-3">
              בעיר כל כך עמוסה, מי שלא עונה - מפסיד. Callnik מוודאת שזה לא יקרה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">עסקים שמרוויחים מזה בראשון לציון</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> שרברבים, חשמלאים ואנשי שיפוץ בשכונות החדשות</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> קוסמטיקאיות, ספרים ומעצבי שיער שעסוקים בלקוחות</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> מאמני כושר ומדריכות פילאטיס באזור</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> רופאי שיניים ורופאים פרטיים ברחבי העיר</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> מדריכי נהיגה שעסוקים בנסיעות</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold mt-0.5">-</span> גנים פרטיים ומטפלות ילדים</li>
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
                <p className="text-gray-600 text-sm">עד 60 שיחות. מתאים לרוב העסקים הקטנים בראשון לציון.</p>
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
          <h2 className="text-2xl font-bold mb-3">עסק בראשון לציון? תתחיל עכשיו</h2>
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
