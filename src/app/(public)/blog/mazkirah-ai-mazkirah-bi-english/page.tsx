import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Secretary for Small Business Israel - 24/7 Answering – Callnik',
  description: 'Small business in Israel? Callnik AI secretary answers missed calls, takes messages and sends you a WhatsApp summary. No staff needed.',
  alternates: { canonical: 'https://callnik.com/blog/mazkirah-ai-mazkirah-bi-english' },
  openGraph: { title: 'AI Secretary for Small Business Israel - 24/7 Answering', description: 'Small business in Israel? Callnik AI secretary answers missed calls, takes messages and sends you a WhatsApp summary. No staff needed.', type: 'article', locale: 'he_IL' },
}

const schema = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'AI Secretary for Small Business Israel - 24/7 Answering', datePublished: '2026-11-10',
  author: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  publisher: { '@type': 'Organization', name: 'Callnik', url: 'https://callnik.com' },
  mainEntityOfPage: 'https://callnik.com/blog/mazkirah-ai-mazkirah-bi-english', inLanguage: 'he',
}

export default function Article() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-20 text-right">
        <div className="mb-4"><Link href="/blog" className="text-sm text-blue-500 hover:underline">חזרה לבלוג</Link></div>
        <p className="text-sm text-gray-400 mb-3">10 בנובמבר 2026</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">AI Secretary for Small Business:<br /><span className="text-blue-600">24/7 Call Answering in Israel</span></h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-12">Every missed call is a potential customer lost. Callnik AI secretary answers your missed calls automatically, asks the right questions, and sends you a summary on WhatsApp within a minute.</p>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Callnik Works</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Set up call forwarding from your phone (1 minute setup)</li>
              <li>When you don't answer within 15 seconds, Callnik picks up</li>
              <li>She introduces herself as your automatic secretary</li>
              <li>Asks the caller's name, what they need, and best callback number</li>
              <li>You get a WhatsApp summary within 1 minute</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who Uses Callnik?</h2>
            <p>Doctors, lawyers, tradespeople, coaches, tutors, photographers, designers - any solo professional or small business that cannot always answer the phone. Works with all Israeli mobile carriers.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p>Basic plan: 99 ILS/month (up to 60 calls). Pro plan: 149 ILS/month (up to 150 calls + Google Calendar scheduling). First month: 1 ILS only.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">מחיר</h2>
            <div className="bg-blue-50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between"><span className="font-semibold">Basic</span><span className="text-blue-600 font-bold">99 &#8362;/חודש</span></div>
              <p className="text-sm text-gray-600">עד 60 שיחות חודשיות.</p>
              <div className="flex justify-between border-t pt-3"><span className="font-semibold">Pro + יומן</span><span className="text-blue-600 font-bold">149 &#8362;/חודש</span></div>
            </div>
          </section>
          <div className="bg-gray-900 text-white rounded-2xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-3">מוכן להפסיק לפספס לקוחות?</h3>
            <p className="text-gray-400 mb-6">חודש ראשון ב-1 &#8362; בלבד.</p>
            <Link href="/#signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">התחל עכשיו</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
