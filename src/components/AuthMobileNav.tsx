'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function AuthMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-label="תפריט"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg md:hidden z-40">
          <nav className="flex flex-col py-2 px-4">
            <Link href="/dashboard" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 font-medium text-sm">לוח בקרה</Link>
            <Link href="/calls" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 font-medium text-sm">שיחות</Link>
            <Link href="/setup" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 border-b border-gray-50 font-medium text-sm">הגדרת הפניה</Link>
            <Link href="/settings" onClick={() => setOpen(false)} className="py-3.5 text-gray-700 font-medium text-sm">הגדרות</Link>
          </nav>
        </div>
      )}
    </>
  )
}
