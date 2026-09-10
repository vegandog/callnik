'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const carriers = ['פלאפון', 'פרטנר', 'סלקום', 'הוט מובייל', '012', 'גולן טלקום', 'רמי לוי תקשורת', 'Welcome', '019', 'אחר']

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    business_name: '',
    category: '',
    whatsapp_number: '',
    carrier: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.carrier) { setError('יש לבחור חברה סלולרית'); return }
    setError('')
    setLoading(true)

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const savedPromo = sessionStorage.getItem('callnik_promo')
      router.push(savedPromo ? `/payment?promo=${encodeURIComponent(savedPromo)}` : '/payment')
    } else {
      const data = await res.json()
      setError(data.error || 'אירעה שגיאה, נסה שנית')
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-blue-600" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <span className="text-xs text-gray-400 mr-1">שלב 1 מתוך 2</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">כמה פרטים עליך ועל העסק</h1>
      <p className="text-gray-500 text-sm mb-6">כדי שנוכל להגדיר את Callnik בשבילך</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">שם פרטי</label>
            <input
              required
              type="text"
              value={form.first_name}
              onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
              placeholder="ישראל"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">שם משפחה</label>
            <input
              required
              type="text"
              value={form.last_name}
              onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
              placeholder="ישראלי"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
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
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? 'שומר...' : 'המשך'}
        </button>
      </form>
    </div>
  )
}
