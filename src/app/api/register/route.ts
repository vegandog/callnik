import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  const { business_name, category, whatsapp_number, carrier, email, password } = await req.json()

  if (!business_name || !whatsapp_number || !email || !password) {
    return NextResponse.json({ error: 'חסרים פרטים' }, { status: 400 })
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    if (authError.message.includes('already registered')) {
      return NextResponse.json({ error: 'אימייל זה כבר רשום' }, { status: 409 })
    }
    return NextResponse.json({ error: authError.message }, { status: 500 })
  }

  // Create customer record
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert({ business_name, category, whatsapp_number, carrier, status: 'pending' })
    .select()
    .single()

  if (customerError) {
    return NextResponse.json({ error: customerError.message }, { status: 500 })
  }

  // Link user to customer
  await supabase.from('users').insert({
    id: authData.user.id,
    customer_id: customer.id,
    email,
  })

  return NextResponse.json({ ok: true })
}
