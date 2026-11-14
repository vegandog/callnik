'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const isIntro = searchParams.get('intro') === '1'
  const isTestMode = searchParams.get('test') === '1'

  const [tier] = useState<'basic' | 'pro'>(() => {
    if (typeof window !== 'undefined') {
      return (sessionStorage.getItem('callnik_tier') === 'pro' ? 'pro' : 'basic') as 'basic' | 'pro'
    }
    return 'basic'
  })

  const [iframeUrl, setIframeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(error ? 'התשלום נכשל. אנא נסה שנית.' : '')

  const [consented, setConsented] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [couponStatus, setCouponStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle')
  const [couponAcknowledged, setCouponAcknowledged] = useState(false)

  const price = tier === 'pro' ? '₪199' : '₪99'
  const tierLabel = tier === 'pro' ? 'Pro' : 'Basic'
  const tierDesc = tier === 'pro' ? 'מזכירה + פגישות ביומן Google' : 'מזכירה + וואטסאפ'

  const createSession = async (plan: 'monthly' | 'test', appliedCoupon?: string) => {
    setLoading(true)
    setErr('')
    setIframeUrl(null)
    try {
      const res = await fetch('/api/cardcom/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, coupon: appliedCoupon, intro: isIntro, tier }),
      })
      if (res.ok) {
        const { url } = await res.json()
        setIframeUrl(url)
      } else {
        const data = await res.json().catch(() => ({}))
        setErr(data.error === 'המנוי כבר פעיל' ? 'המנוי שלך כבר פעיל. עבור לאזור האישי.' : 'שגיאה בטעינת דף התשלום. אנא נסה שנית.')
      }
    } catch {
      setErr('בעיית רשת - בדוק חיבור אינטרנט ונסה שנית.')
    }
    setLoading(false)
  }

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
    if (!data.valid) createSession('monthly')
  }

  const handleAcknowledge = (checked: boolean) => {
    setCouponAcknowledged(checked)
    if (checked) createSession('monthly', coupon.trim())
  }

  useEffect(() => {
    const urlCoupon = searchParams.get('promo') || sessionStorage.getItem('callnik_promo')
    if (urlCoupon) {
      sessionStorage.removeItem('callnik_promo')
      setCoupon(urlCoupon)
      setShowCoupon(true)
      checkCoupon(urlCoupon)
    } else {
      createSession(isTestMode ? 'test' : 'monthly')
    }
  }, []) // eslint-disable-line

  return (
    <div className="py-8 max-w-lg mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-blue-600" />
        <div className="h-1.5 flex-1 rounded-full bg-blue-600" />
        <span className="text-xs text-gray-400 mr-1">שלב 2 מתוך 2</span>
      </div>

      <h1 className="text-xl font-bold text-gray-900 mb-6">תשלום</h1>

      {/* Order summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="font-bold text-gray-900">Callnik {tierLabel}</span>
            <span className="text-xs text-gray-500 mr-2">— {tierDesc}</span>
          </div>
          {tier === 'pro' && (
            <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Pro</span>
          )}
        </div>
        {isIntro ? (
          <>
            <div className="text-2xl font-black text-blue-600">₪1 <span className="text-sm font-normal text-gray-500">חודש ראשון בלבד</span></div>
            <div className="text-xs text-gray-500 mt-1">מחודש שני: {price} + מע&quot;מ לחודש · ביטול בכל עת</div>
          </>
        ) : (
          <div className="text-2xl font-black text-blue-600">{price} <span className="text-sm font-normal text-gray-500">+ מע&quot;מ לחודש</span></div>
        )}
      </div>

      {/* Coupon - collapsed by default */}
      {!showCoupon ? (
        <button
          onClick={() => setShowCoupon(true)}
          className="text-xs text-gray-400 hover:text-gray-600 underline mb-5 block"
        >
          יש לך קוד קופון?
        </button>
      ) : (
        <div className="mb-5">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="קוד קופון"
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
              <div className="text-green-700 text-sm font-bold mb-2">✓ הקוד אושר - חודש התנסות ב-1 ₪ בלבד!</div>
              <div className="text-gray-600 text-xs leading-relaxed mb-3">מהחודש השני החיוב עובר ל-{price} + מע&quot;מ לחודש. <strong>ביטול בכל עת.</strong></div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={couponAcknowledged}
                  onChange={e => handleAcknowledge(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
                />
                <span className="text-xs text-gray-700 font-medium">הבנתי, מתחיל</span>
              </label>
            </div>
          )}
          {couponStatus === 'invalid' && (
            <div className="mt-2 text-red-500 text-xs">קוד לא תקין או כבר שומש</div>
          )}
        </div>
      )}

      {err && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {err}
          {err.includes('כבר פעיל') && (
            <a href="/dashboard" className="block mt-2 text-blue-600 font-medium underline">לאזור האישי →</a>
          )}
        </div>
      )}

      {/* Consent checkbox — must accept before payment form appears */}
      {!consented && (
        <div className="mb-5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              onChange={e => setConsented(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              קראתי ואני מסכים/ה ל
              <a href="/terms" target="_blank" className="text-blue-600 underline hover:text-blue-700">תנאי השימוש</a>
              {' '}ול
              <a href="/privacy" target="_blank" className="text-blue-600 underline hover:text-blue-700">מדיניות הפרטיות</a>.
              {' '}השירות מסופק as-is; תגובות הנציגה הווירטואלית עשויות להכיל שגיאות ואינן מהוות ייעוץ מקצועי.
              {' '}החיוב מחודש שני: {price} + מע&quot;מ לחודש. ניתן לבטל בכל עת.
            </span>
          </label>
        </div>
      )}

      {loading && (
        <div className="text-center py-16 text-gray-400 text-sm">טוען דף תשלום...</div>
      )}

      {iframeUrl && !loading && consented && (
        <>
          <p className="text-center text-xs text-gray-500 mb-2">
            החיוב מתבצע על ידי קבוצת MediaUp, המפעילה את שירות Callnik.
          </p>
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <iframe
              src={iframeUrl}
              width="100%"
              height="600"
              style={{ border: 'none', display: 'block' }}
              title="תשלום מאובטח"
            />
          </div>
        </>
      )}

      <p className="text-center text-xs text-gray-400 mt-4">
        תשלום מאובטח דרך קארדקום. פרטי הכרטיס לא נשמרים אצלנו.
      </p>
    </div>
  )
}
