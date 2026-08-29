'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
        aria-label="תפריט"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg md:hidden z-40">
          <nav className="flex flex-col py-2 px-4">
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 hover:text-gray-900 font-medium text-sm">איך זה עובד</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 hover:text-gray-900 font-medium text-sm">מחירים</Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 hover:text-gray-900 font-medium text-sm">שאלות</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 hover:text-gray-900 font-medium text-sm">אודות</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 hover:text-gray-900 font-medium text-sm">כניסה</Link>
            <div className="py-3">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 font-semibold text-center text-sm transition-colors"
              >
                הצטרפות
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
