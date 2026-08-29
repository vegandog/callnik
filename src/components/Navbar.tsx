import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/callnik-logo.png" alt="Callnik" height={28} width={120} style={{ objectFit: 'contain' }} priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/how-it-works" className="hover:text-gray-900 transition-colors">איך זה עובד</Link>
          <Link href="/pricing" className="hover:text-gray-900 transition-colors">מחירים</Link>
          <Link href="/faq" className="hover:text-gray-900 transition-colors">שאלות</Link>
          <Link href="/about" className="hover:text-gray-900 transition-colors">אודות</Link>
          <Link href="/login" className="hover:text-gray-900 transition-colors">כניסה</Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            הצטרפות
          </Link>
        </div>

        {/* Mobile hamburger */}
        <MobileNav />
      </div>
    </nav>
  )
}
