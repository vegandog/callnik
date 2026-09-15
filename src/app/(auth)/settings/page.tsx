import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  const { data: customer } = await supabase
    .from('customers')
    .select('business_name, whatsapp_number, carrier, voice_id')
    .eq('id', userRecord.customer_id)
    .single()

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">הגדרות</h1>
        <p className="text-gray-500 text-sm mt-1">פרטי העסק שלך ב-Callnik</p>
      </div>
      <SettingsForm
        businessName={customer?.business_name || ''}
        whatsappNumber={customer?.whatsapp_number || ''}
        carrier={customer?.carrier || ''}
        voiceId={customer?.voice_id || 'FA7xLUuWpSuAX9pUCVmy'}
      />
    </div>
  )
}
