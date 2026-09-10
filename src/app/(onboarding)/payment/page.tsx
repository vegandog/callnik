'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [plan, setPlan] = useState<'monthly' | 'annual' | 'test'>('monthly')
  const isTestMode = searchParams.get('test') === '1'
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(error ? 'התשלום נכשל. אנא נסה שנית.' : '')
  const [coupon, setCoupon] = useState('')
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle')

  const checkCoupon = async (code: string) => {
    if (!code.trim()) { setCouponStatus('idle'); return }
    setCouponStatus('checking')
    const res = await fetch('/api/promo/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim() }),
    })
    const data = await res.json()
    setCouponStatus(data.valid ? 'valid' : 'invalid')
    if (data.valid) {
      // Force monthly when coupon is applied - annual cannot be used with promo
      if (plan === 'annual') setPlan('monthly')
      createSession('monthly', code.trim())
    } else {
      createSession(plan) // Coupon invalid - still load payment form at regular price
    }
  }

  const createSession = async (selectedPlan: 'monthly' | 'annual' | 'test', appliedCoupon?: string) => {
    setLoading(true)
    setErr('')
    setIframeUrl(null)
    const res = await fetch('/api/cardcom/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: selectedPlan, coupon: appliedCoupon || (couponStatus === 'valid' ? coupon : undefined) }),
    })
    if (res.ok) {
      const { url } = await res.json()
      setIframeUrl(url)
    } else {
      setErr('שגיאה בטעינת דף התשלום. אנא נסה שנית.')
    }
    setLoading(false)
  }

  useEffect(() => {
    // Check URL param first, then sessionStorage - prevents double session creation
    const urlCoupon = searchParams.get('promo') || sessionStorage.getItem('callnik_promo')
    if (urlCoupon) {
      sessionStorage.removeItem('callnik_promo')
      setCoupon(urlCoupon)
      checkCoupon(urlCoupon) // checkCoupon calls createSession with coupon
    } else {
      createSession(plan)
    }
  }, []) // eslint-disable-line

  const switchPlan = (p: 'monthly' | 'annual' | 'test') => {
    setPlan(p)
    createSession(p)
  }

  return (
    <div className="py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-blue-600" />
        <div className="h-1.5 flex-1 rounded-full bg-blue-600" />
        <span className="text-xs text-gray-400 mr-1">שלב 2 מתוך 2</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-1">בחר תוכנית ושלם</h1>
      <p className="text-gray-500 text-sm mb-6">תוכל לבטל בכל עת. ללא קנסות.</p>

      {/* Plan selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => switchPlan('monthly')}
          className={`rounded-xl border-2 p-4 text-right transition-all ${plan === 'monthly' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
        >
          <div className="font-bold text-gray-900 text-lg">₪99</div>
          <div className="text-gray-500 text-xs">לחודש + מע"מ</div>
          <div className="text-gray-400 text-xs mt-1">חיוב חודשי</div>
        </button>
        <button
          onClick={() => { if (couponStatus === 'valid') return; switchPlan('annual') }}
          className={`rounded-xl border-2 p-4 text-right transition-all relative ${plan === 'annual' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'} ${couponStatus === 'valid' ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">חסכון 20%</div>
          <div className="font-bold text-gray-900 text-lg">₪948</div>
          <div className="text-gray-500 text-xs">לשנה + מע"מ</div>
          <div className="text-gray-400 text-xs mt-1">{couponStatus === 'valid' ? 'לא זמין עם קופון' : '₪79 לחודש'}</div>
        </button>
      </div>

      {isTestMode && (
        <button
          onClick={() => switchPlan('test')}
          className={`w-full rounded-xl border-2 p-3 text-right mb-3 text-xs transition-all ${plan === 'test' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white text-gray-400'}`}
        >
          🧪 טסט — ₪1 + מע"מ
        </button>
      )}

      {/* Coupon field */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="קוד קופון (אופציונלי)"
            value={coupon}
            onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponStatus('idle') }}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-right focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => checkCoupon(coupon)}
            disabled={!coupon.trim() || couponStatus === 'checking'}
            className="px-4 py-2.5 rounded-xl bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-40 transition-all"
          >
            {couponStatus === 'checking' ? '...' : 'החל'}
          </button>
        </div>
        {couponStatus === 'valid' && (
          <div className="mt-3 bg-amber-50 border border-amber-300 rounded-xl px-4 py-3">
            <div className="text-green-700 text-sm font-bold mb-1">✓ קוד אושר - חודש התנסות ב-1 ₪ בלבד</div>
            <div className="text-gray-600 text-xs leading-relaxed">שים ♥️ מהחודש השני החיוב עובר למחיר המלא: 99₪ +מע&quot;מ /חודש. אפשר לבטל בכל עת, ללא קנס.</div>
          </div>
        )}
        {couponStatus === 'invalid' && (
          <div className="mt-2 text-red-500 text-xs">קוד לא תקין או כבר שומש</div>
        )}
      </div>

      {err && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {err}
        </div>
      )}

      {loading && (
        <div className="text-center py-16 text-gray-400 text-sm">טוען דף תשלום...</div>
      )}

      {iframeUrl && !loading && (
        <p className="text-center text-xs text-gray-500 mb-2">
          החיוב מתבצע על ידי קבוצת MediaUp, המפעילה את שירות Callnik.
        </p>
      )}

      {iframeUrl && !loading && (
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <iframe
            src={iframeUrl}
            width="100%"
            height="600"
            style={{ border: 'none', display: 'block' }}
            title="תשלום מאובטח"
          />
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-4">
        תשלום מאובטח דרך קארדקום. פרטי הכרטיס לא נשמרים אצלנו.
      </p>
    </div>
  )
}
