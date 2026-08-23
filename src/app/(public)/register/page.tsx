'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const carriers = ['פלאפון', 'פרטנר', 'סלקום', 'הוט מובייל', '012', 'אחר']

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    business_name: '',
    category: '',
    whatsapp_number: '',
    carrier: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setDone(true)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <>
        <Navbar />
        <main className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">נרשמת בהצלחה!</h1>
          <p className="text-gray-500">
            קיבלנו את הפרטים שלך. ניצור איתך קשר לאישור ולהפעלה תוך 24 שעות.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">הצטרפות ל-Callnik</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">ממלאים, ואנחנו מפעילים אצלך תוך 24 שעות</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שם העסק</label>
            <input
              required
              type="text"
              value={form.business_name}
              onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))}
              placeholder="למשל: שיפוצים דוד כהן"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תחום עיסוק</label>
            <input
              required
              type="text"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              placeholder="למשל: שיפוצים, רפואה, ייעוץ..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">מספר וואטסאפ לקבלת הודעות</label>
            <input
              required
              type="tel"
              value={form.whatsapp_number}
              onChange={e => setForm(f => ({ ...f, whatsapp_number: e.target.value }))}
              placeholder="05X-XXXXXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">חברה סלולרית</label>
            <select
              required
              value={form.carrier}
              onChange={e => setForm(f => ({ ...f, carrier: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">בחר חברה סלולרית</option>
              {carriers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-3">פרטי כניסה לאזור הלקוח</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
                <input
                  required
                  type="password"
                  minLength={8}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'שולח...' : 'שליחת הרשמה'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}
