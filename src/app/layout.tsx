import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PrivacyBanner from "@/components/PrivacyBanner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Callnik - המזכירה האוטומטית לעסק שלך",
  description: "Callnik עונה על שיחות שלא נענו ושולחת לך סיכום בוואטסאפ תוך דקה. המספר שלך לא משתנה.",
  metadataBase: new URL("https://callnik.com"),
  alternates: { canonical: "/" },
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
      <body className={`${geist.className} min-h-full`}>
        {children}
        <PrivacyBanner />
        <script src="https://widget.tabnav.com/limited-widget.min.js.gz" async />
      </body>
    </html>
  );
}
