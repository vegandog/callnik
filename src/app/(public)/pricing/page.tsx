import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Check, ChevronLeft } from 'lucide-react'

const features = [
  'מזכירה AI בעברית',
  'הודעת וואטסאפ אחרי כל שיחה',
  'היסטוריית שיחות מלאה',
  'מספר טלפון ייעודי כלול',
  'תמיכה בכל חברות הסלולר',
  'פאנל ניהול',
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">מחירים</h1>
          <p className="text-gray-500 mb-14">מחיר אחד, כולל הכל. ללא הפתעות.</p>

          <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 shadow-xl shadow-blue-50 max-w-sm mx-auto">
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-6">
              הכי פופולרי
            </div>
            <div className="text-5xl font-bold text-gray-900 mb-1">
              ₪149
              <span className="text-xl font-normal text-gray-400">/חודש</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">עד 500 שיחות בחודש</p>

            <ul className="text-right space-y-3.5 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-700">
                  <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              מתחילים
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">הפעלה ידנית לאחר רישום. ניצור איתך קשר.</p>
          </div>

          <p className="text-gray-400 text-sm mt-12">
            שיחות מעל 500? נסו אותנו קודם - נתאים מחיר בהמשך.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
