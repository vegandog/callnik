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
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: 'rgba(15,23,42,0.92)',
        color: 'rgba(255,255,255,.8)',
        padding: '10px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px 16px',
        textAlign: 'center',
        boxShadow: '0 -2px 12px rgba(0,0,0,.3)',
      }}
    >
      <p style={{ fontSize: 12, lineHeight: 1.4, margin: 0 }}>
        אנו משתמשים בעוגיות.{' '}
        <Link href="/privacy" style={{ color: '#67e8f9', textDecoration: 'underline' }}>מדיניות פרטיות</Link>
        {' '}|{' '}
        <Link href="/terms" style={{ color: '#67e8f9', textDecoration: 'underline' }}>תנאי שימוש</Link>
      </p>
      <button
        onClick={accept}
        style={{
          background: '#0077b6',
          color: '#fff',
          border: 'none',
          padding: '5px 16px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        הבנתי
      </button>
    </div>
  )
}
