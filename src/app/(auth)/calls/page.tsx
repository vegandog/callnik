import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Phone } from 'lucide-react'

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

export default async function CallsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  const { data: calls } = await supabase
    .from('calls')
    .select('id, caller_name, caller_number, reason_summary, duration_seconds, created_at')
    .eq('customer_id', userRecord.customer_id)
    .not('reason_summary', 'is', null)
    .neq('reason_summary', '')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">היסטוריית שיחות</h1>
        <p className="text-gray-500 text-sm mt-1">כל השיחות שטופלו על ידי Callnik</p>
      </div>

      {!calls || calls.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Phone className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">אין שיחות עדיין</p>
          <p className="text-gray-400 text-sm mt-1">כשלקוח יתקשר ולא תענה, הוא יופיע כאן</p>
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
                    <Link href={`/calls/${call.id}`} className="block w-full h-full">{call.caller_name || '-'}</Link>
                  </td>
                  <td className="px-5 py-3 text-gray-600 font-mono text-xs">
                    <Link href={`/calls/${call.id}`} className="block w-full h-full">{call.caller_number || '-'}</Link>
                  </td>
                  <td className="px-5 py-3 text-gray-600 max-w-xs truncate">
                    <Link href={`/calls/${call.id}`} className="block w-full h-full">{call.reason_summary ? stripMarkdown(call.reason_summary) : '-'}</Link>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    <Link href={`/calls/${call.id}`} className="block w-full h-full">
                      {call.duration_seconds ? `${Math.floor(call.duration_seconds / 60)}:${String(call.duration_seconds % 60).padStart(2, '0')}` : '-'}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                    <Link href={`/calls/${call.id}`} className="block w-full h-full">
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
  )
}
