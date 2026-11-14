import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Callnik - חודש ראשון ב-₪1 | בלק פריידי',
  description: 'מזכירה AI שעונה לשיחות שלא נענית להן ושולחת סיכום בוואטסאפ. חודש ראשון ב-₪1 בלבד.',
  openGraph: {
    title: 'Callnik - חודש ראשון ב-₪1 | בלק פריידי',
    description: 'מזכירה AI שעונה לשיחות שלא נענית להן ושולחת סיכום בוואטסאפ. חודש ראשון ב-₪1 בלבד.',
    url: 'https://callnik.com/landing',
    siteName: 'Callnik',
    locale: 'he_IL',
    type: 'website',
    images: [{ url: '/banner-bf.png', width: 1200, height: 630, alt: 'Callnik Black Friday - חודש ראשון ב-₪1' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/banner-bf.png'],
  },
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return children
}
