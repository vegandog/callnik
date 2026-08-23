import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 px-4 text-center text-sm text-gray-400">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-semibold text-gray-600">Callnik</span>
        <div className="flex gap-6">
          <Link href="/how-it-works" className="hover:text-gray-600 transition-colors">איך זה עובד</Link>
          <Link href="/pricing" className="hover:text-gray-600 transition-colors">מחירים</Link>
          <Link href="/faq" className="hover:text-gray-600 transition-colors">שאלות נפוצות</Link>
        </div>
        <span>© 2026 Callnik. כל הזכויות שמורות.</span>
      </div>
    </footer>
  )
}
