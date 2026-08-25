'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PrivacyBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('callnik_privacy_ok')) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('callnik_privacy_ok', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-white px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <p className="text-gray-300 text-center sm:text-right">
        אתר זה משתמש בעוגיות לצורך תפעול ושיפור השירות.{' '}
        <Link href="/privacy" className="underline text-white hover:text-blue-300 transition-colors">
          מדיניות פרטיות
        </Link>
      </p>
      <button
        onClick={accept}
        className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
      >
        הבנתי
      </button>
    </div>
  )
}
