import Link from 'next/link'
import { Phone, MessageCircle, Clock, ChevronLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
              חדש לישראל
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              לא ענית לטלפון?
              <br />
              <span className="text-blue-600">Callnik ענתה בשבילך.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
              כשלקוח מתקשר ולא נענה, Callnik לוקחת את ההודעה ושולחת לך סיכום בוואטסאפ תוך דקה.
              המספר שלך לא משתנה.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              מתחילים בחינם
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-3">ללא כרטיס אשראי. הפעלה תוך 5 דקות.</p>
          </div>
        </section>

        {/* WhatsApp example */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              זה מה שתקבל בוואטסאפ
            </h2>
            <div className="bg-[#ECE5DD] rounded-2xl p-4 shadow-lg">
              <div className="bg-white rounded-xl p-4 shadow-sm max-w-xs mr-auto">
                <p className="text-xs text-gray-400 mb-2">Callnik - הודעה חדשה</p>
                <p className="text-gray-800 text-sm leading-relaxed">
                  📞 <strong>דוד כהן</strong> התקשר ב-14:32<br />
                  📝 רוצה לקבל הצעת מחיר לשיפוץ מטבח<br />
                  📱 050-1234567
                </p>
                <p className="text-xs text-gray-400 text-left mt-2">14:33 ✓✓</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works - 3 steps */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">איך זה עובד</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">לקוח מתקשר</h3>
                <p className="text-gray-500 text-sm">אם לא ענית תוך כמה שניות, השיחה עוברת אוטומטית ל-Callnik</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Callnik לוקחת הודעה</h3>
                <p className="text-gray-500 text-sm">מזכירה אוטומטית מציגה את עצמה, לוקחת שם, סיבת הפנייה, ומספר טלפון</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">סיכום בוואטסאפ</h3>
                <p className="text-gray-500 text-sm">תוך דקה מקבל סיכום ישירות לוואטסאפ שלך. שום שיחה לא תיפול בין הכסאות.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-blue-600 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">מוכן להפסיק לפספס לקוחות?</h2>
            <p className="text-blue-100 mb-8 text-lg">הצטרף לעסקים שכבר עובדים עם Callnik</p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 text-lg font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              רישום חינם
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
