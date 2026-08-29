import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Phone, Clock, User } from 'lucide-react'

function stripMarkdown(text: string): string {
  return text
    .replace(/^(?:#\s*)?תמצית[^\n]*[\n:]\s*/m, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .trim()
}

export default async function CallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/login')

  const { data: call } = await supabase
    .from('calls')
    .select('id, caller_name, caller_number, reason_summary, transcript_full, duration_seconds, created_at, elevenlabs_conversation_id')
    .eq('id', id)
    .eq('customer_id', userRecord.customer_id)
    .single()

  if (!call) notFound()

  const recordingUrl = call.elevenlabs_conversation_id
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recordings/${call.elevenlabs_conversation_id}.mp3`
    : null

  const duration = call.duration_seconds
    ? `${Math.floor(call.duration_seconds / 60)}:${String(call.duration_seconds % 60).padStart(2, '0')}`
    : null

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">פרטי שיחה</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date(call.created_at).toLocaleDateString('he-IL', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        <div className="flex items-center gap-3 px-5 py-4">
          <User className="w-4 h-4 text-gray-400 shrink-0" />
          <div>
            <p className="text-xs text-gray-400">מתקשר</p>
            <p className="font-medium text-gray-800">{call.caller_name || 'לא זוהה'}</p>
            <p className="text-sm text-gray-500 font-mono">{call.caller_number || '-'}</p>
          </div>
        </div>
        {duration && (
          <div className="flex items-center gap-3 px-5 py-4">
            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">משך השיחה</p>
              <p className="font-medium text-gray-800">{duration}</p>
            </div>
          </div>
        )}
      </div>

      {call.reason_summary && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 mb-2">סיכום</p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{stripMarkdown(call.reason_summary)}</p>
        </div>
      )}

      {recordingUrl && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">הקלטת השיחה</p>
          </div>
          <audio controls className="w-full" src={recordingUrl}>
            הדפדפן שלך לא תומך בנגן שמע.
          </audio>
        </div>
      )}

      {call.transcript_full && (
        <div className="bg-white rounded-xl border border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400 mb-3">תמלול מלא</p>
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-mono bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
            {call.transcript_full}
          </div>
        </div>
      )}
    </div>
  )
}
