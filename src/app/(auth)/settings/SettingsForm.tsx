'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { VOICES } from '@/lib/constants'

interface Props {
  businessName: string
  whatsappNumber: string
  carrier: string
  voiceId: string
  gcalConnected: boolean
  gcalParam: string | null
}

export default function SettingsForm({ businessName, whatsappNumber, carrier, voiceId, gcalConnected, gcalParam }: Props) {
  const [form, setForm] = useState({
    business_name: businessName,
    whatsapp_number: whatsappNumber,
    voice_id: voiceId,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [playing, setPlaying] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showCancel, setShowCancel] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const [cancelUntil, setCancelUntil] = useState('')
  const [gcalStatus, setGcalStatus] = useState<'connected' | 'disconnected'>(gcalConnected ? 'connected' : 'disconnected')
  const [gcalMessage, setGcalMessage] = useState<string | null>(
    gcalParam === 'connected' ? 'היומן חובר בהצלחה' :
    gcalParam === 'error' ? 'שגיאה בחיבור היומן, נסה שוב' : null
  )
  const [disconnecting, setDisconnecting] = useState(false)

  useEffect(() => {
    if (gcalMessage) {
      const t = setTimeout(() => setGcalMessage(null), 4000)
      return () => clearTimeout(t)
    }
  }, [gcalMessage])

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

  const playVoice = (name: string) => {
    if (playing === name) {
      audioRef.current?.pause()
      setPlaying(null)
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
    }
    const audio = new Audio(`/voices/${name}.mp3`)
    audioRef.current = audio
    audio.play()
    setPlaying(name)
    audio.onended = () => setPlaying(null)
  }

  const handleGcalDisconnect = async () => {
    setDisconnecting(true)
    const res = await fetch('/api/google-calendar/disconnect', { method: 'POST' })
    if (res.ok) {
      setGcalStatus('disconnected')
      setGcalMessage('היומן נותק')
    } else {
      setGcalMessage('שגיאה בניתוק')
    }
    setDisconnecting(false)
  }

  const handleCancel = async () => {
    setCancelling(true)
    const res = await fetch('/api/customer/cancel', { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      const until = data.until
        ? new Date(data.until).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'סוף החודש'
      setCancelUntil(until)
      setCancelled(true)
    } else {
      setError('שגיאה בביטול, נסה שוב או פנה אלינו')
    }
    setCancelling(false)
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">קול העוזר/ת הדיגיטלי/ת</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {VOICES.map(v => {
              const selected = form.voice_id === v.id
              return (
                <div
                  key={v.id}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    selected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setForm(f => ({ ...f, voice_id: v.id }))}
                >
                  <img
                    src={`/voices/photo-${v.name}.jpg`}
                    alt={v.name}
                    className="w-20 h-20 rounded-full object-cover shadow-sm"
                  />
                  <span className={`text-sm font-semibold ${selected ? 'text-blue-700' : 'text-gray-800'}`}>
                    {v.name}
                  </span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); playVoice(v.name) }}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full transition-colors ${
                      playing === v.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {playing === v.name
                      ? <><Pause className="w-3 h-3" /> עצור</>
                      : <><Play className="w-3 h-3" /> שמע</>
                    }
                  </button>
                  {selected && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              )
            })}
          </div>
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

      {/* Google Calendar */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none">
            <rect x="3" y="4" width="18" height="17" rx="2" stroke="#4285F4" strokeWidth="1.5"/>
            <path d="M16 2v4M8 2v4M3 9h18" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 13h2v2H8zM11 13h2v2h-2zM14 13h2v2h-2zM8 16h2v2H8zM11 16h2v2h-2z" fill="#4285F4"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900">Google Calendar</p>
            <p className="text-xs text-gray-400">המזכירה תוכל לקבוע פגישות ישירות ביומן</p>
          </div>
        </div>

        {gcalMessage && (
          <p className={`text-xs mb-2 ${gcalMessage.includes('שגיאה') ? 'text-red-500' : 'text-green-600'}`}>
            {gcalMessage}
          </p>
        )}

        {gcalStatus === 'connected' ? (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              מחובר
            </span>
            <button
              type="button"
              onClick={handleGcalDisconnect}
              disabled={disconnecting}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              {disconnecting ? 'מנתק...' : 'נתק'}
            </button>
          </div>
        ) : (
          <a
            href="/api/google-calendar/auth"
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            חבר את Google Calendar
          </a>
        )}
      </div>

      {/* ביטול מנוי */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        {cancelled ? (
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            המנוי בוטל. השירות ימשיך לפעול עד <strong>{cancelUntil}</strong> ולא תחויב שוב.
          </div>
        ) : !showCancel ? (
          <button
            type="button"
            onClick={() => setShowCancel(true)}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            ביטול מנוי
          </button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-5 space-y-4">
            <p className="font-semibold text-gray-800">לפני שמבטלים</p>
            <p className="text-sm text-gray-600">
              הביטול ייכנס לתוקף בתום תקופת החיוב הנוכחית - השירות ימשיך לפעול עד אז וללא חיוב נוסף.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
              <p className="font-medium text-blue-800 mb-1">אם הבעיה היא המענה הקולי</p>
              <p className="text-blue-700">
                <a href="https://bizme.chat" target="_blank" rel="noopener" className="underline">BizMe</a> עושה אותו דבר - אבל בוואטסאפ. הלקוח כותב, הבוט עונה, הסיכום מגיע אליך. אולי מתאים יותר.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
              >
                {cancelling ? 'מבטל...' : 'כן, בטל את המנוי'}
              </button>
              <button
                type="button"
                onClick={() => setShowCancel(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                השאר פעיל
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
