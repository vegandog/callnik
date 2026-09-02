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

  const createSession = async (selectedPlan: 'monthly' | 'annual' | 'test') => {
    setLoading(true)
    setErr('')
    setIframeUrl(null)
    const res = await fetch('/api/cardcom/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: selectedPlan }),
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
    createSession(plan)
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
          onClick={() => switchPlan('annual')}
          className={`rounded-xl border-2 p-4 text-right transition-all relative ${plan === 'annual' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
        >
          <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">חסכון 20%</div>
          <div className="font-bold text-gray-900 text-lg">₪948</div>
          <div className="text-gray-500 text-xs">לשנה + מע"מ</div>
          <div className="text-gray-400 text-xs mt-1">₪79 לחודש</div>
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
