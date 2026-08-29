import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AuthMobileNav from '@/components/AuthMobileNav'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  let businessName = ''
  if (userRecord) {
    const { data: customer } = await supabase
      .from('customers')
      .select('business_name')
      .eq('id', userRecord.customer_id)
      .single()
    businessName = customer?.business_name || ''
  }

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight shrink-0">Callnik</Link>
            <div className="hidden md:flex items-center gap-5 text-sm text-gray-600">
              <Link href="/dashboard" className="hover:text-gray-900 transition-colors">לוח בקרה</Link>
              <Link href="/calls" className="hover:text-gray-900 transition-colors">שיחות</Link>
              <Link href="/setup" className="hover:text-gray-900 transition-colors">הגדרת הפניה</Link>
              <Link href="/settings" className="hover:text-gray-900 transition-colors">הגדרות</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {businessName && <span className="text-gray-400 hidden sm:block text-xs">{businessName}</span>}
            <form action={logout} className="hidden md:block">
              <button type="submit" className="text-gray-500 hover:text-gray-800 transition-colors text-sm">יציאה</button>
            </form>
            <AuthMobileNav />
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
