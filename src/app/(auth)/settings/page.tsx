import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SettingsForm from './SettingsForm'

interface Props {
  searchParams: Promise<{ gcal?: string }>
}

export default async function SettingsPage({ searchParams }: Props) {
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
    .select('business_name, whatsapp_number, carrier, voice_id, gcal_refresh_token, gcal_appointment_type, gcal_hours_start, gcal_hours_end')
    .eq('id', userRecord.customer_id)
    .single()

  const { gcal: gcalParam } = await searchParams

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
        gcalConnected={!!customer?.gcal_refresh_token}
        gcalParam={gcalParam || null}
        appointmentType={customer?.gcal_appointment_type || 'פגישה'}
        hoursStart={customer?.gcal_hours_start || '09:00'}
        hoursEnd={customer?.gcal_hours_end || '18:00'}
      />
    </div>
  )
}
