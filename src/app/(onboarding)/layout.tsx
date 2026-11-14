import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Active customers go straight to dashboard
  const { data: userRecord } = await supabase.from('users').select('customer_id').eq('id', user.id).single()
  if (userRecord?.customer_id) {
    const { data: customer } = await supabase.from('customers').select('status').eq('id', userRecord.customer_id).single()
    if (customer?.status === 'active' || customer?.status === 'cancelling') redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center pt-8 pb-4">
        <Link href="/">
          <Image src="/callnik-logo.png" alt="Callnik" width={130} height={45} style={{ objectFit: 'contain' }} priority />
        </Link>
      </div>
      <div className="max-w-md mx-auto px-4 pb-16">
        {children}
      </div>
    </div>
  )
}
