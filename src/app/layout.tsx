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
      </body>
    </html>
  );
}
