'use client'

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

interface Props {
  activateCode: string
  cancelCode: string
  carrier: string
  seconds: number
}

export default function ForwardingCode({ activateCode, cancelCode, carrier, seconds }: Props) {
  const [copied, setCopied] = useState<'activate' | 'cancel' | null>(null)
  const [isIphone, setIsIphone] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    setIsIphone(/iPhone|iPad|iPod/.test(navigator.userAgent))
  }, [])

  const copy = async (text: string, type: 'activate' | 'cancel') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const activateTel = `tel:${activateCode.replace('#', '%23')}`
  const cancelTel = `tel:${cancelCode.replace(/##/g, '%23%23').replace(/#$/, '%23')}`

  return (
    <div className="space-y-4">

      {/* Main activate card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <p className="text-center text-gray-500 text-sm mb-4">
          לחץ על הכפתור - הטלפון שלך יפתח ויחייג את הקוד אוטומטית
        </p>

        {/* Code display */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-xl text-gray-800 mb-4 flex items-center justify-between">
          <span dir="ltr">{activateCode}</span>
          <button onClick={() => copy(activateCode, 'activate')} className="text-gray-400 hover:text-gray-600 mr-2">
            {copied === 'activate' ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <a
          href={activateTel}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          הפעל את Callnik עכשיו
        </a>

        <p className="text-center text-xs text-gray-400 mt-3">
          {carrier} - {seconds} שניות צלצול לפני שדנה עונה
        </p>
      </div>

      {/* iPhone fallback */}
      {isIphone && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-semibold text-amber-800 mb-2">לא קיבלת הודעת אישור?</p>
          <p className="text-amber-700 text-sm mb-3">
            זה קורה לפעמים באייפון. פותרים בקלות:
          </p>
          <ol className="text-amber-700 text-sm space-y-1.5">
            <li><strong>1.</strong> הגדרות ← סלולרי ← קול ונתונים ← בחר 3G</li>
            <li><strong>2.</strong> לחץ שוב על כפתור ההפעלה למעלה</li>
            <li><strong>3.</strong> קיבלת אישור? החזר ל-4G או 5G</li>
          </ol>
          <p className="text-amber-700 text-sm mt-3">ההפניה נשמרת ברשת - לא במכשיר.</p>
        </div>
      )}

      {/* Cancel section - collapsed by default */}
      <div className="text-center">
        <button
          onClick={() => setShowCancel(v => !v)}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          {showCancel ? 'סגור' : 'רוצה לבטל זמנית את ההפניה?'}
        </button>
      </div>

      {showCancel && (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-gray-600 mb-3">לביטול זמני של השירות - חייג את הקוד הבא:</p>
          <div className="bg-white rounded-xl px-4 py-3 font-mono text-gray-700 mb-3 flex items-center justify-between border border-gray-100">
            <span dir="ltr">{cancelCode}</span>
            <button onClick={() => copy(cancelCode, 'cancel')} className="text-gray-400 hover:text-gray-600">
              {copied === 'cancel' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <a
            href={cancelTel}
            className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors text-sm"
          >
            ביטול הפניה
          </a>
        </div>
      )}
    </div>
  )
}
