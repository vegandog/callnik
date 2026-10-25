'use client'

import { useEffect, useState } from 'react'
import { FileText, Download, TrendingUp, Zap } from 'lucide-react'

interface BillingHistory {
  id: string
  created_at: string
  description: string | null
  plan: string | null
  amount: number
  cardcom_document_number: string | null
  document_url: string | null
}

interface PlanInfo {
  tier: string
  monthlyCallCount: number
  history: BillingHistory[]
}

function planLabel(plan: string | null): string {
  if (plan === 'annual') return 'מנוי Callnik שנתי'
  return 'מנוי Callnik חודשי'
}

export default function BillingPage() {
  const [info, setInfo] = useState<PlanInfo | null>(null)
  const [upgrading, setUpgrading] = useState(false)
  const [upgraded, setUpgraded] = useState(false)

  useEffect(() => {
    fetch('/api/customer/plan-info').then(r => r.json()).then(setInfo)
  }, [])

  const limit = info?.tier === 'pro' ? 150 : 60
  const used = info?.monthlyCallCount ?? 0
  const pct = Math.min(100, Math.round(used / limit * 100))
  const isNearLimit = pct >= 80
  const isAtLimit = used >= limit

  async function upgrade() {
    setUpgrading(true)
    await fetch('/api/customer/upgrade', { method: 'POST' })
    setUpgraded(true)
    setInfo(prev => prev ? { ...prev, tier: 'pro' } : prev)
    setUpgrading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">חשבוניות</h1>
        <p className="text-gray-500 text-sm mt-1">תוכנית נוכחית והיסטוריית תשלומים</p>
      </div>

      {/* Plan card */}
      <div className={`bg-white rounded-xl border p-5 space-y-4 ${isAtLimit ? 'border-red-200' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">תוכנית נוכחית</p>
            <p className="font-semibold text-gray-900">
              {info?.tier === 'pro' ? 'Pro — ₪149/חודש' : 'Basic — ₪99/חודש'}
            </p>
          </div>
          {info?.tier === 'pro' && (
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Pro</span>
          )}
        </div>

        {/* Usage bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>שיחות החודש</span>
            <span className={`font-medium ${isAtLimit ? 'text-red-600' : isNearLimit ? 'text-orange-500' : 'text-gray-700'}`}>
              {used} / {limit}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-orange-400' : 'bg-blue-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Upgrade CTA */}
        {info?.tier !== 'pro' && (
          <div className={`rounded-lg p-4 ${isAtLimit ? 'bg-red-50' : 'bg-blue-50'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                {isAtLimit ? (
                  <>
                    <p className="text-sm font-semibold text-red-700">הגעת למכסה החודשית</p>
                    <p className="text-xs text-red-600 mt-0.5">שיחות נוספות לא יענו. שדרג ל-Pro כדי להמשיך.</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-blue-800">שדרג ל-Pro</p>
                    <p className="text-xs text-blue-600 mt-0.5">150 שיחות/חודש במקום 60 — ₪149 מהחיוב הבא</p>
                  </>
                )}
              </div>
              {upgraded ? (
                <span className="text-green-600 text-sm font-semibold whitespace-nowrap">✓ שודרג!</span>
              ) : (
                <button
                  onClick={upgrade}
                  disabled={upgrading}
                  className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isAtLimit
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {upgrading ? 'רגע...' : <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" />שדרג עכשיו</span>}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Billing history */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          היסטוריית תשלומים
        </h2>
        {!info?.history?.length ? (
          <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">אין עדיין חשבוניות</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-right font-medium text-gray-500 px-5 py-3">תאריך</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">תיאור</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">סכום</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">מסמך</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {info.history.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-gray-700">{row.description || planLabel(row.plan)}</td>
                    <td className="px-5 py-4 text-gray-900 font-semibold whitespace-nowrap">₪{row.amount}</td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {row.cardcom_document_number ? `#${row.cardcom_document_number}` : '-'}
                    </td>
                    <td className="px-5 py-4">
                      {row.document_url ? (
                        <a href={row.document_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium">
                          <Download className="w-4 h-4" />הורדה
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">נשלחה למייל</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
