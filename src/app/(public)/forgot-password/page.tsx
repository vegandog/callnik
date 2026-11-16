'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://callnik.com/reset-password',
    })
    if (err) {
      setError('אירעה שגיאה, נסה שנית')
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-sm mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">שכחתי סיסמה</h1>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-5 mt-6">
            <p className="text-green-800 font-medium mb-1">נשלח מייל לאיפוס</p>
            <p className="text-green-700 text-sm">בדוק את תיבת הדואר שלך ולחץ על הלינק לאיפוס הסיסמה.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-8">נשלח לך לינק לאיפוס סיסמה למייל.</p>
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                <input
                  required type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'שולח...' : 'שלח לינק לאיפוס'}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-sm text-gray-400">
          <a href="/login" className="text-blue-600 hover:underline">חזרה לכניסה</a>
        </p>
      </main>
      <Footer />
    </>
  )
}
