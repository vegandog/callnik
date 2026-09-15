'use client'

import { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { VOICES } from '@/lib/constants'

interface Props {
  businessName: string
  whatsappNumber: string
  carrier: string
  voiceId: string
  openingMessage: string
}

export default function SettingsForm({ businessName, whatsappNumber, carrier, voiceId, openingMessage }: Props) {
  const [form, setForm] = useState({
    business_name: businessName,
    whatsapp_number: whatsappNumber,
    voice_id: voiceId,
    opening_message: openingMessage,
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">הודעת פתיחה</label>
          <textarea
            rows={3}
            placeholder={`שלום! הגעת ל{{business_name}}, אני {{agent_name}}. איך אפשר לעזור?`}
            value={form.opening_message}
            onChange={e => setForm(f => ({ ...f, opening_message: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            ניתן להשתמש ב-{'{{business_name}}'} ו-{'{{agent_name}}'}. ריק = ברירת המחדל של הנציג.
          </p>
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
