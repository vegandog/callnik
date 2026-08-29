'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Pencil, Check, X, Trash2 } from 'lucide-react'

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
  email: string | null
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

interface HealthCheck { name: string; ok: boolean; message: string }
interface HealthStatus { ok: boolean; checks: HealthCheck[] }

export default function AdminPanel() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Customer | null>(null)
  const [editingNumber, setEditingNumber] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [search, setSearch] = useState('')
  const [health, setHealth] = useState<HealthStatus | null>(null)

  const load = async () => {
    setLoading(true)
    const [customersRes, healthRes] = await Promise.all([
      fetch('/api/admin/customers'),
      fetch('/api/health'),
    ])
    if (customersRes.ok) {
      const data = await customersRes.json()
      setCustomers(data.customers || [])
    }
    if (healthRes.ok || healthRes.status === 503) {
      setHealth(await healthRes.json())
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

  const deleteCustomer = async (customer: Customer) => {
    setDeleting(customer.id)
    const res = await fetch(`/api/admin/customers?customer_id=${customer.id}`, { method: 'DELETE' })
    if (res.ok) {
      setCustomers(prev => prev.filter(c => c.id !== customer.id))
    }
    setDeleting(null)
    setConfirmDelete(null)
  }

  const filtered = customers.filter(c => {
    const q = search.toLowerCase()
    return !q ||
      c.business_name.toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.whatsapp_number || '').includes(q) ||
      (c.category || '').toLowerCase().includes(q)
  })

  if (loading) {
    return <div className="text-center py-12 text-gray-400">טוען...</div>
  }

  return (
    <div className="space-y-4">
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center space-y-4" dir="rtl">
            <p className="text-gray-800 font-medium">למחוק את <span className="text-red-600">{confirmDelete.business_name}</span>?</p>
            <p className="text-xs text-gray-400">פעולה זו תמחק את הלקוח, המשתמשים והשיחות שלו לצמיתות.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => deleteCustomer(confirmDelete)}
                disabled={deleting === confirmDelete.id}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {deleting === confirmDelete.id ? 'מוחק...' : 'מחק'}
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
      {health && (
        <div className={`rounded-lg border px-4 py-3 text-sm ${health.ok ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center gap-2 font-medium mb-1">
            <span className={`w-2 h-2 rounded-full ${health.ok ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={health.ok ? 'text-green-800' : 'text-red-800'}>
              {health.ok ? 'המערכת תקינה' : 'יש בעיה במערכת'}
            </span>
          </div>
          {!health.ok && (
            <ul className="mt-1 space-y-0.5 text-red-700">
              {health.checks.filter(c => !c.ok).map(c => (
                <li key={c.name}>· {c.name}: {c.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500">{customers.length} לקוחות</p>
          <input
            type="text"
            placeholder="חיפוש לפי שם, מייל, וואטסאפ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            dir="rtl"
          />
        </div>
        <button onClick={load} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <RefreshCw className="w-4 h-4" />
          רענון
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-gray-400">{search ? 'אין תוצאות' : 'אין לקוחות עדיין'}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right font-medium text-gray-500 px-4 py-3">עסק</th>
                <th className="text-right font-medium text-gray-500 px-4 py-3">מייל</th>
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
              {filtered.map(customer => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{customer.business_name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(customer.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {customer.email
                      ? <a href={`mailto:${customer.email}`} className="hover:text-blue-600 transition-colors">{customer.email}</a>
                      : <span className="text-gray-300">-</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{customer.category || '-'}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">{customer.whatsapp_number}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{customer.carrier || '-'}</td>
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
                    {customer.call_count > 0 ? (
                      <a
                        href={`/admin/calls?customer=${customer.id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {customer.call_count}
                      </a>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[customer.status] || 'bg-gray-100 text-gray-500'}`}>
                      {STATUS_LABELS[customer.status] || customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggle(customer)}
                        disabled={toggling === customer.id}
                        className="text-xs font-medium text-blue-600 hover:underline disabled:opacity-40"
                      >
                        {toggling === customer.id ? '...' : customer.status === 'active' ? 'השהה' : 'הפעל'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(customer)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        title="מחק לקוח"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
