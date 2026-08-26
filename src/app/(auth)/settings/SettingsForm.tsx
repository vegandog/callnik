'use client'

import { useState } from 'react'

interface Props {
  businessName: string
  whatsappNumber: string
  carrier: string
}

export default function SettingsForm({ businessName, whatsappNumber, carrier }: Props) {
  const [form, setForm] = useState({ business_name: businessName, whatsapp_number: whatsappNumber })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    const res = await fetch('/api/customer', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      setError('שגיאה בשמירה, נסה שוב')
    }
    setSaving(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">שם העסק</label>
          <input
            type="text" required
            value={form.business_name}
            onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">מספר וואטסאפ לקבלת הודעות</label>
          <input
            type="tel" required
            value={form.whatsapp_number}
            onChange={e => setForm(f => ({ ...f, whatsapp_number: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">חברה סלולרית</label>
          <p className="text-gray-500 text-sm bg-gray-50 rounded-lg px-4 py-2.5">{carrier || '-'}</p>
          <p className="text-xs text-gray-400 mt-1">לשינוי החברה הסלולרית פנה לתמיכה</p>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {saved && <p className="text-green-600 text-sm">השינויים נשמרו</p>}

        <button
          type="submit" disabled={saving}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'שומר...' : 'שמירת שינויים'}
        </button>
      </form>
    </div>
  )
}
