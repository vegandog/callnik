import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">מחירים</h1>
        <p className="text-gray-500 mb-12">מחיר אחד, כולל הכל. ללא הפתעות.</p>

        <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 shadow-lg max-w-sm mx-auto">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            ₪149
            <span className="text-lg font-normal text-gray-400">/חודש</span>
          </div>
          <p className="text-gray-500 text-sm mb-8">עד 500 שיחות בחודש</p>

          <ul className="text-right space-y-3 mb-8">
            {[
              'מזכירה AI בעברית',
              'הודעת וואטסאפ אחרי כל שיחה',
              'היסטוריית שיחות מלאה',
              'מספר טלפון ייעודי כלול',
              'תמיכה בכל חברות הסלולר',
              'פאנל ניהול',
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-gray-700">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/register"
            className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            מתחילים
          </Link>
          <p className="text-xs text-gray-400 mt-3">הפעלה ידנית לאחר רישום. ניצור איתך קשר.</p>
        </div>

        <p className="text-gray-400 text-sm mt-12">
          שיחות מעל 500? נסו אותנו קודם - נתאים מחיר בהמשך.
        </p>
      </main>
      <Footer />
    </>
  )
}
