import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Phone, Settings, Zap, AlertCircle, CheckCircle } from 'lucide-react'

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

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', userRecord.customer_id)
    .single()

  const { data: calls } = await supabase
    .from('calls')
    .select('id, caller_name, reason_summary, created_at')
    .eq('customer_id', userRecord.customer_id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { count: totalCalls } = await supabase
    .from('calls')
    .select('id', { count: 'exact', head: true })
    .eq('customer_id', userRecord.customer_id)

  // Count calls this billing month (answered calls only)
  const nextBilling = customer?.next_billing_date
  const periodStart = nextBilling
    ? (() => { const d = new Date(nextBilling + 'T00:00:00Z'); d.setMonth(d.getMonth() - 1); return d.toISOString() })()
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { count: monthCalls } = await supabase
    .from('calls')
    .select('id', { count: 'exact', head: true })
    .eq('customer_id', userRecord.customer_id)
    .not('elevenlabs_conversation_id', 'is', null)
    .gte('created_at', periodStart)

  const INCLUDED_CALLS = 60
  const excessCalls = Math.max(0, (monthCalls ?? 0) - INCLUDED_CALLS)

  const isActive = customer?.status === 'active'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">לוח בקרה</h1>
        <p className="text-gray-500 text-sm mt-1">{customer?.business_name}</p>
      </div>

      {/* Status Banner */}
      {!isActive ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">ממתין להפעלה</p>
            <p className="text-amber-700 text-sm mt-1">
              קיבלנו את הרשמתך. לאחר השלמת התשלום, מספר ייעודי יוקצה לך אוטומטית תוך כמה דקות.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex gap-4">
          <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800">השירות פעיל</p>
            <p className="text-green-700 text-sm mt-1">
              Callnik מוכנה לענות על שיחות שלא נענו.
              {!customer?.twilio_number && !customer?.telnyx_number && ' כדי להפעיל את ההפניה, לחץ על "הגדרת הפניה".'}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">סה"כ שיחות</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalCalls ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">שיחות החודש</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{monthCalls ?? 0}</p>
          {excessCalls > 0
            ? <p className="text-xs text-amber-600 mt-1">{excessCalls} שיחות עודפות × ₪0.99</p>
            : <p className="text-xs text-gray-400 mt-1">{INCLUDED_CALLS - (monthCalls ?? 0)} נותרו בחינם</p>
          }
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">שיחה אחרונה</p>
          <p className="text-base font-semibold text-gray-900 mt-1">
            {calls && calls.length > 0
              ? new Date(calls[0].created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })
              : 'אין עדיין'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500">סטטוס</p>
          <span className={`inline-block mt-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isActive ? 'פעיל' : 'ממתין'}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/setup" className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
          <Zap className="w-6 h-6 text-blue-500 mb-3 group-hover:text-blue-600" />
          <p className="font-semibold text-gray-800">הגדרת הפניה</p>
          <p className="text-sm text-gray-500 mt-1">הפעלת ההפניה הסלולרית בטלפון שלך</p>
        </Link>
        <Link href="/calls" className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
          <Phone className="w-6 h-6 text-blue-500 mb-3 group-hover:text-blue-600" />
          <p className="font-semibold text-gray-800">היסטוריית שיחות</p>
          <p className="text-sm text-gray-500 mt-1">כל השיחות שטופלו עד כה</p>
        </Link>
        <Link href="/settings" className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-sm transition-all group">
          <Settings className="w-6 h-6 text-blue-500 mb-3 group-hover:text-blue-600" />
          <p className="font-semibold text-gray-800">הגדרות</p>
          <p className="text-sm text-gray-500 mt-1">שם העסק ומספר וואטסאפ</p>
        </Link>
      </div>

      {/* Recent Calls */}
      {calls && calls.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4">שיחות אחרונות</h2>
          <div className="space-y-3">
            {calls.map(call => (
              <Link key={call.id} href={`/calls/${call.id}`} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{call.caller_name || 'לא זוהה'}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{call.reason_summary ? stripMarkdown(call.reason_summary) : ''}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0">
                  {new Date(call.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </Link>
            ))}
          </div>
          <Link href="/calls" className="block text-center text-sm text-blue-600 hover:underline mt-4">כל השיחות</Link>
        </div>
      )}
    </div>
  )
}
