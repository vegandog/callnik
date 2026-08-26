'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

const carriers = ['פלאפון', 'פרטנר', 'סלקום', 'הוט מובייל', '012', 'אחר']

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    business_name: '',
    category: '',
    whatsapp_number: '',
    carrier: '',
  })

  const handleGoogleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.carrier) { setError('יש לבחור חברה סלולרית'); return }
    setError('')
    setLoading(true)

    document.cookie = `callnik_reg=${encodeURIComponent(JSON.stringify(form))}; path=/; max-age=600; SameSite=Lax`

    const supabase = createClient()
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })

    if (oauthError) {
      setError('שגיאה בחיבור לגוגל, נסה שנית')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">הצטרפות ל-Callnik</h1>
        <p className="text-gray-500 text-center mb-8 text-sm">ממלאים, ואנחנו מפעילים אצלך תוך 24 שעות</p>

        <form onSubmit={handleGoogleSignup} className="space-y-4">
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

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 mt-2 shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            {loading ? 'מתחבר לגוגל...' : 'הרשמה עם Google'}
          </button>

          <p className="text-center text-xs text-gray-400 pt-1">
            כבר רשום?{' '}
            <a href="/login" className="text-blue-600 hover:underline">כניסה לאזור הלקוח</a>
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}
