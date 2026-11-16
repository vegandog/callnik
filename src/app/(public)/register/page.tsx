'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

const GOOGLE_CLIENT_ID = '419201388686-k83ee8pifckjjkqbvc8c416c4rn0taqn.apps.googleusercontent.com'

function getTimeLeft() {
  const now = new Date()
  const end = new Date(now.getFullYear(), 10, 30, 23, 59, 59) // Nov 30
  if (now > end) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const diff = end.getTime() - now.getTime()
  return {
    days: Math.floor(diff / 1000 / 60 / 60 / 24),
    hours: Math.floor((diff / 1000 / 60 / 60) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [mode, setMode] = useState<'choose' | 'email'>('choose')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const saveParams = () => {
    const params = new URLSearchParams(window.location.search)
    const promo = params.get('promo')
    if (promo) sessionStorage.setItem('callnik_promo', promo)
    const intro = params.get('intro')
    if (intro) sessionStorage.setItem('callnik_intro', intro)
    const tierParam = params.get('tier')
    if (tierParam === 'pro') sessionStorage.setItem('callnik_tier', 'pro')
    else sessionStorage.removeItem('callnik_tier')
  }

  const handleGoogle = () => {
    setGoogleLoading(true)
    saveParams()
    const oauthParams = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'select_account',
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${oauthParams}`
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    saveParams()

    // Create user via admin API (bypasses rate limit + auto-confirms email)
    const res = await fetch('/api/auth/email-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'שגיאה - נסה שנית')
      setLoading(false)
      return
    }

    // Sign in to get a session
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })

    if (signInErr) {
      setError('נוצר חשבון - נסה להיכנס מדף הכניסה')
      setLoading(false)
    } else {
      window.location.href = '/onboarding'
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <Navbar />
      <main className="max-w-sm mx-auto px-4 py-10 text-center">

        {/* Banner */}
        <div className="bf-wrap mx-auto mb-5">
          <div className="bf-ring" />
          <div className="bf-img-wrap bf-entrance">
            <Image
              src="/banner-bf2.png"
              alt="Black Friday - חודש ראשון ב-₪1"
              width={260}
              height={260}
              className="relative z-10 bf-shake"
              priority
            />
            <div className="bf-shine" />
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">המחיר ₪1 פוקע בעוד:</p>
          <div className="flex justify-center gap-2 text-center" dir="ltr">
            {[
              { val: pad(timeLeft.days), label: 'ימים' },
              { val: pad(timeLeft.hours), label: 'שעות' },
              { val: pad(timeLeft.minutes), label: 'דקות' },
              { val: pad(timeLeft.seconds), label: 'שניות' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-gray-900 text-white rounded-lg px-3 py-1.5 min-w-[52px]">
                <div className="text-xl font-bold font-mono leading-none">{val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">הצטרפות ל-Callnik</h1>
        <p className="text-gray-500 text-sm mb-6">הרשמה בשתי דקות. ביטול בכל עת.</p>

        {mode === 'choose' && (
          <>
            {/* Email option */}
            <button
              onClick={() => setMode('email')}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm mb-3"
            >
              הרשמה עם אימייל וסיסמה
            </button>

            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs text-gray-400"><span className="bg-white px-3">או</span></div>
            </div>

            {/* Google option */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {googleLoading ? 'מתחבר...' : 'הרשמה עם Google'}
            </button>
          </>
        )}

        {mode === 'email' && (
          <form onSubmit={handleEmail} className="space-y-3 text-right">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סיסמה (לפחות 6 תווים)</label>
              <input
                required type="password" value={password}
                onChange={e => setPassword(e.target.value)}
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
              {loading ? 'נרשם...' : 'המשך להגדרה'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('choose'); setError('') }}
              className="w-full text-sm text-gray-400 hover:text-gray-600 py-1"
            >
              חזרה
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          כבר רשום?{' '}
          <a href="/login" className="text-blue-600 hover:underline">כניסה לאזור הלקוח</a>
          {' · '}
          <a href="/forgot-password" className="hover:underline">שכחתי סיסמה</a>
        </p>
      </main>
      <Footer />

      <style>{`
        /* Wrapper */
        .bf-wrap {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Rotating outer ring */
        .bf-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          background: conic-gradient(
            #ff2d78, #ffd700, #ff2d78, #ffd700, #ff2d78
          );
          animation: bf-spin 3s linear infinite;
          opacity: 0.7;
          filter: blur(6px);
        }
        @keyframes bf-spin {
          to { transform: rotate(360deg); }
        }

        /* Image container */
        .bf-img-wrap {
          position: relative;
          z-index: 2;
          border-radius: 50%;
          overflow: hidden;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bf-pulse 1.8s ease-in-out infinite;
        }
        @keyframes bf-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 18px #ff2d78bb) drop-shadow(0 0 40px #ffd70066);
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 36px #ff2d78ff) drop-shadow(0 0 72px #ffd700cc);
            transform: scale(1.04);
          }
        }

        /* Entrance bounce */
        .bf-entrance {
          animation: bf-bounce-in 0.7s cubic-bezier(.36,1.56,.64,1) both,
                     bf-pulse 1.8s ease-in-out 0.7s infinite;
        }
        @keyframes bf-bounce-in {
          0%   { transform: scale(0.2); opacity: 0; }
          70%  { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1);  opacity: 1; }
        }

        /* Periodic shake every ~4s */
        .bf-shake {
          animation: bf-shake-loop 4s ease-in-out infinite;
        }
        @keyframes bf-shake-loop {
          0%, 85%, 100% { transform: rotate(0deg); }
          87%  { transform: rotate(-4deg); }
          89%  { transform: rotate(4deg); }
          91%  { transform: rotate(-3deg); }
          93%  { transform: rotate(3deg); }
          95%  { transform: rotate(0deg); }
        }

        /* Shine sweep */
        .bf-shine {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,0.45) 50%,
            transparent 80%
          );
          background-size: 200% 100%;
          animation: bf-shine-sweep 3.5s ease-in-out infinite;
        }
        @keyframes bf-shine-sweep {
          0%   { background-position: -100% 0; opacity: 0; }
          20%  { opacity: 1; }
          60%  { background-position: 200% 0; opacity: 1; }
          80%, 100% { background-position: 200% 0; opacity: 0; }
        }
      `}</style>
    </>
  )
}
