import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-10 pb-4">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">Callnik</Link>
      </div>
      <div className="max-w-md mx-auto px-4 pb-16">
        {children}
      </div>
    </div>
  )
}
