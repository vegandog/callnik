'use client'

import { useState } from 'react'
import { Zap, X, Copy, Check } from 'lucide-react'

interface Props {
  activateCode: string
  cancelCode: string
  carrier: string
  seconds: number
}

export default function ForwardingCode({ activateCode, cancelCode, carrier, seconds }: Props) {
  const [copied, setCopied] = useState<'activate' | 'cancel' | null>(null)

  const copy = async (text: string, type: 'activate' | 'cancel') => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const activateTel = `tel:${activateCode.replace('#', '%23')}`
  const cancelTel = `tel:${cancelCode.replace(/##/g, '%23%23').replace(/#$/, '%23')}`

  return (
    <div className="space-y-4">
      {/* Activate */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-800">הפעלת הפניה</p>
            <p className="text-xs text-gray-500 mt-0.5">{carrier} - {seconds} שניות המתנה</p>
          </div>
          <Zap className="w-5 h-5 text-blue-500" />
        </div>
        <div className="bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 flex items-center justify-between">
          <span dir="ltr">{activateCode}</span>
          <button onClick={() => copy(activateCode, 'activate')} className="text-gray-400 hover:text-gray-600 ml-2">
            {copied === 'activate' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <a
          href={activateTel}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <Zap className="w-4 h-4" />
          הפעלת הפניה
        </a>
        <p className="text-xs text-gray-400 text-center mt-2">
          לחיצה תפתח את הטלפון עם הקוד מוכן לחיוג
        </p>
      </div>

      {/* Cancel */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-800">ביטול הפניה</p>
            <p className="text-xs text-gray-500 mt-0.5">לביטול זמני של השירות</p>
          </div>
          <X className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 mb-3 flex items-center justify-between">
          <span dir="ltr">{cancelCode}</span>
          <button onClick={() => copy(cancelCode, 'cancel')} className="text-gray-400 hover:text-gray-600 ml-2">
            {copied === 'cancel' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <a
          href={cancelTel}
          className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
          ביטול הפניה
        </a>
      </div>
    </div>
  )
}
