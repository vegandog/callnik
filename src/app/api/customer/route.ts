import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { normalizePhone } from '@/lib/phone'

export async function PATCH(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { business_name, whatsapp_number, voice_id } = await req.json()
  const normalizedWhatsapp = whatsapp_number ? normalizePhone(whatsapp_number) : whatsapp_number

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) return NextResponse.json({ error: 'לא נמצא' }, { status: 404 })

  const update: Record<string, string> = {}
  if (business_name !== undefined) update.business_name = business_name
  if (whatsapp_number !== undefined) update.whatsapp_number = normalizedWhatsapp
  if (voice_id !== undefined) update.voice_id = voice_id

  const { error } = await supabase
    .from('customers')
    .update(update)
    .eq('id', userRecord.customer_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
