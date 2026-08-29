import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { Phone } from 'lucide-react'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vegandog@gmail.com'

function stripMarkdown(text: string): string {
  return text
    .replace(/^(?:#\s*)?תמצית[^\n]*[\n:]\s*/m, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\n{2,}/g, ' ')
    .trim()
}

export default async function AdminCallsPage({ searchParams }: { searchParams: Promise<{ customer?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) redirect('/')

  const { customer: customerId } = await searchParams
  const admin = createAdminClient()

  const { data: customer } = customerId
    ? await admin.from('customers').select('business_name').eq('id', customerId).single()
    : { data: null }

  let query = admin
    .from('calls')
    .select('id, caller_name, caller_number, reason_summary, duration_seconds, created_at, customer_id')
    .order('created_at', { ascending: false })
    .limit(200)

  if (customerId) query = query.eq('customer_id', customerId)

  const { data: calls } = await query

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/admin" className="font-bold text-blue-600">Callnik</Link>
          <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Admin</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-600">
            {customer ? `שיחות - ${customer.business_name}` : 'כל השיחות'}
          </span>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">
            {customer ? `שיחות של ${customer.business_name}` : 'כל השיחות'}
          </h1>
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">חזרה לניהול</Link>
        </div>

        {!calls || calls.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Phone className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">אין שיחות</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-right font-medium text-gray-500 px-5 py-3">מתקשר</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">מספר</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">סיבת הפנייה</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">משך</th>
                  <th className="text-right font-medium text-gray-500 px-5 py-3">תאריך</th>
                </tr>
              </thead>
              <tbody>
                {calls.map(call => (
                  <tr key={call.id} className="border-b border-gray-50 hover:bg-blue-50 transition-colors cursor-pointer">
                    <td className="px-5 py-3 font-medium text-gray-800">
                      <Link href={`/calls/${call.id}`} className="block w-full">{call.caller_name || '-'}</Link>
                    </td>
                    <td className="px-5 py-3 text-gray-600 font-mono text-xs">
                      <Link href={`/calls/${call.id}`} className="block w-full">{call.caller_number || '-'}</Link>
                    </td>
                    <td className="px-5 py-3 text-gray-600 max-w-xs truncate">
                      <Link href={`/calls/${call.id}`} className="block w-full">
                        {call.reason_summary ? stripMarkdown(call.reason_summary) : '-'}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      <Link href={`/calls/${call.id}`} className="block w-full">
                        {call.duration_seconds ? `${Math.floor(call.duration_seconds / 60)}:${String(call.duration_seconds % 60).padStart(2, '0')}` : '-'}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      <Link href={`/calls/${call.id}`} className="block w-full">
                        {new Date(call.created_at).toLocaleDateString('he-IL', {
                          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </Link>
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
