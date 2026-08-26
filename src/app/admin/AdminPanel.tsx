'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Pencil, Check, X } from 'lucide-react'

interface Customer {
  id: string
  business_name: string
  category: string
  whatsapp_number: string
  carrier: string
  twilio_number: string | null
  status: string
  created_at: string
  call_count: number
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'ממתין',
  active: 'פעיל',
  trial: 'ניסיון',
  cancelled: 'בוטל',
}

const STATUS_NEXT: Record<string, string> = {
  pending: 'active',
  active: 'pending',
  trial: 'active',
  cancelled: 'active',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  active: 'bg-green-100 text-green-700',
  trial: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

export default function AdminPanel() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [editingNumber, setEditingNumber] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/customers')
    if (res.ok) {
      const data = await res.json()
      setCustomers(data.customers || [])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const saveTwilioNumber = async (customerId: string, number: string) => {
    await fetch('/api/admin/customers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customerId, twilio_number: number }),
    })
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, twilio_number: number } : c))
    setEditingNumber(null)
  }

  const toggle = async (customer: Customer) => {
    const newStatus = STATUS_NEXT[customer.status] || 'active'
    setToggling(customer.id)
    const res = await fetch('/api/admin/customers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id: customer.id, status: newStatus }),
    })
    if (res.ok) {
      setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, status: newStatus } : c))
    }
    setToggling(null)
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-400">טוען...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{customers.length} לקוחות</p>
        <button onClick={load} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <RefreshCw className="w-4 h-4" />
          רענון
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {customers.length === 0 ? (
          <p className="text-center py-12 text-gray-400">אין לקוחות עדיין</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right font-medium text-gray-500 px-4 py-3">עסק</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">תחום</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">וואטסאפ</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">חברה</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">מספר Twilio</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">שיחות</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">סטטוס</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">פעולה</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{customer.business_name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(customer.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{customer.category || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">{customer.whatsapp_number}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.carrier || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                    {editingNumber === customer.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          autoFocus
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          placeholder="+97293764692"
                          className="border border-blue-300 rounded px-2 py-0.5 text-xs w-32 font-mono"
                          dir="ltr"
                          onKeyDown={e => { if (e.key === 'Enter') saveTwilioNumber(customer.id, editValue); if (e.key === 'Escape') setEditingNumber(null) }}
                        />
                        <button onClick={() => saveTwilioNumber(customer.id, editValue)} className="text-green-600"><Check className="w-3 h-3" /></button>
                        <button onClick={() => setEditingNumber(null)} className="text-gray-400"><X className="w-3 h-3" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 group">
                        <span>{customer.twilio_number || <span className="text-gray-300">-</span>}</span>
                        <button
                          onClick={() => { setEditingNumber(customer.id); setEditValue(customer.twilio_number || '') }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600 transition-all"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-gray-700">{customer.call_count}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[customer.status] || 'bg-gray-100 text-gray-500'}`}>
                      {STATUS_LABELS[customer.status] || customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(customer)}
                      disabled={toggling === customer.id}
                      className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-40"
                    >
                      {toggling === customer.id ? '...' : customer.status === 'active' ? 'השהה' : 'הפעל'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
