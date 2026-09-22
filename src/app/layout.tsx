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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
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
