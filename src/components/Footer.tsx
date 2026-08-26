import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 px-4 text-sm text-gray-400">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-semibold text-gray-600">Callnik</span>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/how-it-works" className="hover:text-gray-600 transition-colors">איך זה עובד</Link>
          <Link href="/pricing" className="hover:text-gray-600 transition-colors">מחירים</Link>
          <Link href="/faq" className="hover:text-gray-600 transition-colors">שאלות נפוצות</Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">אודות</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">תקנון</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">פרטיות</Link>
          <Link href="/accessibility" className="hover:text-gray-600 transition-colors">נגישות</Link>
        </div>
        <span className="text-center">© 2026 Callnik. כל הזכויות שמורות.</span>
      </div>
    </footer>
  )
}
