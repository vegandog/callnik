'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase puts the token in the URL hash as access_token
    // signInWithOtp/resetPassword puts user in session automatically on load
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('הסיסמאות אינן תואמות'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password })
    if (err) {
      setError('שגיאה באיפוס - נסה לשלוח מחדש מדף "שכחתי סיסמה"')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  if (!ready) {
    return (
      <p className="text-gray-500 text-sm mt-8">
        אם הגעת לכאן מהמייל - המתן רגע...
        <br />
        אם העמוד לא נטען,{' '}
        <a href="/forgot-password" className="text-blue-600 hover:underline">שלח לינק חדש</a>.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right mt-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה חדשה</label>
        <input
          required type="password" value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="ltr" autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">אימות סיסמה</label>
        <input
          required type="password" value={confirm}
          onChange={e => setConfirm(e.target.value)}
          minLength={6}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir="ltr"
        />
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <button
        type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'שומר...' : 'שמור סיסמה חדשה'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-sm mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">איפוס סיסמה</h1>
        <Suspense fallback={<p className="text-gray-400 text-sm mt-4">טוען...</p>}>
          <ResetForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
