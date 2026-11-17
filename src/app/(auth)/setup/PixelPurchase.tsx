'use client'
import { useEffect } from 'react'

export default function PixelPurchase() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { currency: 'ILS', value: 1 })
    }
  }, [])
  return null
}
