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
        background: 'rgba(15,23,42,0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: 'rgba(255,255,255,.92)',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        textAlign: 'center',
        boxShadow: '0 -4px 24px rgba(0,0,0,.2)',
      }}
    >
      <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 720 }}>
        על ידי המשך השימוש באתר שלנו, אתה מאשר כי אתה מקבל את{' '}
        <Link href="/privacy" style={{ color: '#67e8f9', textDecoration: 'underline' }}>
          מדיניות הפרטיות
        </Link>{' '}
        שלנו עבור האתר ואת{' '}
        <Link href="/terms" style={{ color: '#67e8f9', textDecoration: 'underline' }}>
          תנאי השימוש
        </Link>
        . אנו גם משתמשים בעוגיות כדי לספק לך את החוויה הטובה ביותר האפשרית.
      </p>
      <button
        onClick={accept}
        style={{
          background: '#0077b6',
          color: '#fff',
          border: 'none',
          padding: '10px 28px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        הבנתי, אני מאשר
      </button>
    </div>
  )
}
