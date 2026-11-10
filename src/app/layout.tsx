import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PrivacyBanner from "@/components/PrivacyBanner";

const googleSans = Google_Sans({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Callnik - המזכירה האוטומטית לעסק שלך",
  description: "Callnik עונה על שיחות שלא נענו ושולחת לך סיכום בוואטסאפ תוך דקה. המספר שלך לא משתנה.",
  keywords: "מזכירה AI, מזכירה וירטואלית, מענה אוטומטי לעסק, שיחות שלא נענו, AI secretary, מזכירה לעסק קטן, שירות מענה טלפוני, נציג AI",
  metadataBase: new URL("https://callnik.com"),
  alternates: { canonical: "/" },
  verification: { google: "K5xNCLaDOlPgbI-Ks5QhIo2d79nbTJx9XR7lcl-rKEk", other: { "facebook-domain-verification": ["98shcp75fs0e40a7y4atqel2hgy55m"] } },
  openGraph: {
    title: "Callnik - המזכירה האוטומטית לעסק שלך",
    description: "לא ענית לטלפון? Callnik ענתה בשבילך. סיכום בוואטסאפ תוך דקה.",
    url: "https://callnik.com",
    siteName: "Callnik",
    locale: "he_IL",
    type: "website",
    images: [{ url: "/banner-70.png", width: 1200, height: 630, alt: "Callnik - מזכירה AI לעסק" }],
  },
};

const schemaOrg = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://callnik.com/#app",
    "name": "Callnik",
    "url": "https://callnik.com/",
    "description": "מזכירה AI שעונה לשיחות נכנסות, מנהלת יומן ושולחת סיכומים בוואטסאפ. עובדת 24/7.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic",
        "price": "99",
        "priceCurrency": "ILS",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "99",
          "priceCurrency": "ILS",
          "unitCode": "MON"
        }
      },
      {
        "@type": "Offer",
        "name": "Pro",
        "price": "149",
        "priceCurrency": "ILS",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "149",
          "priceCurrency": "ILS",
          "unitCode": "MON"
        }
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "MediaUp",
      "url": "https://mediaup.net"
    },
    "inLanguage": "he",
    "countriesSupported": "IL"
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://callnik.com/#organization",
    "name": "Callnik",
    "url": "https://callnik.com",
    "logo": "https://callnik.com/callnik-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "availableLanguage": "Hebrew",
      "areaServed": "IL"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "MediaUp",
      "url": "https://mediaup.net"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://callnik.com/#website",
    "url": "https://callnik.com",
    "name": "Callnik",
    "description": "מזכירה AI לעסק - עונה לשיחות שלא נענו ושולחת סיכום בוואטסאפ",
    "inLanguage": "he-IL",
    "publisher": {"@id": "https://callnik.com/#organization"}
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "האם המספר שלי אצל הלקוחות משתנה?",
        "acceptedAnswer": {"@type": "Answer", "text": "לא. המספר שלך נשאר בדיוק אותו דבר. רק שיחות שלא ענית להן בתוך X שניות מועברות ל-Callnik, ברמת הרשת הסלולרית."}
      },
      {
        "@type": "Question",
        "name": "מה Callnik אומרת ללקוח?",
        "acceptedAnswer": {"@type": "Answer", "text": "היא מציגה את עצמה כמזכירה האוטומטית של שם העסק שלך. לא מתחזה לבעל העסק. שקוף ומקצועי."}
      },
      {
        "@type": "Question",
        "name": "האם המזכירה יכולה לקבוע פגישות ביומן?",
        "acceptedAnswer": {"@type": "Answer", "text": "כן. אחרי ההרשמה, מחברים את Google Calendar מהגדרות הפאנל. מגדירים ימי עבודה, שעות ואיך קוראים לפגישה. מהרגע הזה, כשלקוח מתקשר ולא נענה, המזכירה תציע לו לקבוע פגישה ישירות - והיא תירשם ביומן אוטומטית."}
      },
      {
        "@type": "Question",
        "name": "באילו חברות סלולר זה עובד?",
        "acceptedAnswer": {"@type": "Answer", "text": "פלאפון, פרטנר, סלקום, הוט מובייל, 012, גולן טלקום, רמי לוי תקשורת, Welcome ו-019. כולן."}
      },
      {
        "@type": "Question",
        "name": "מה אם אני רוצה לבטל?",
        "acceptedAnswer": {"@type": "Answer", "text": "ביטול בכל עת. ביטול ההפניה הסלולרית נעשה בחיוג אחד מהטלפון."}
      },
      {
        "@type": "Question",
        "name": "כמה עולה Callnik?",
        "acceptedAnswer": {"@type": "Answer", "text": "תוכנית Basic עולה 99 שקל לחודש (עד 60 שיחות). תוכנית Pro עולה 149 שקל לחודש (עד 150 שיחות + ניהול יומן). חודש ראשון ב-1 שקל בלבד."}
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "איך מתחילים עם Callnik",
    "description": "הפעלת מזכירה AI לעסק תוך 5 דקות",
    "inLanguage": "he",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "נרשמים ב-Callnik",
        "text": "נרשמים לאתר callnik.com ובוחרים תוכנית Basic או Pro."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "מגדירים את המזכירה",
        "text": "ממלאים את שם העסק, תחום הפעילות וסוג הפגישות שרוצים לקבוע."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "מגדירים הפניה סלולרית",
        "text": "מחייגים קוד קצר מהסלולרי שמפנה שיחות שלא נענו למספר של Callnik."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "מקבלים סיכומים בוואטסאפ",
        "text": "מכל שיחה שהמזכירה ענתה, מגיע סיכום לוואטסאפ תוך דקה."
      }
    ]
  }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <head>
        {schemaOrg.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${googleSans.className} min-h-full`}>
        {children}
        <PrivacyBanner />
        <script src="https://widget.tabnav.com/limited-widget.min.js.gz" async />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DYGG736MTW" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DYGG736MTW');
        `}</Script>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1390411759265975');
          fbq('track','PageView');
        `}</Script>
        <noscript><img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=1390411759265975&ev=PageView&noscript=1" alt="" /></noscript>
      </body>
    </html>
  );
}
