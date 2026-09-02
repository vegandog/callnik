import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const CARDCOM_TERMINAL = 190666
const CARDCOM_API_NAME = 'sAwPXwN5jjRPhSKn5NRn'
const CRON_SECRET = process.env.CRON_SECRET || ''

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: customers, error } = await supabase
    .from('customers')
    .select('id, business_name, plan, cardcom_token, card_month, card_year, billing_failures')
    .eq('status', 'active')
    .lte('next_billing_date', today)
    .not('cardcom_token', 'is', null)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!customers?.length) return NextResponse.json({ ok: true, charged: 0 })

  const results = []

  for (const customer of customers) {
    const amount = customer.plan === 'annual' ? 948 : customer.plan === 'daily_test' ? 1 : 99
    const mm = String(customer.card_month || '').padStart(2, '0')
    const yy = String(customer.card_year || '').slice(-2)

    // Get customer email from users table
    const { data: userRecord } = await supabase
      .from('users')
      .select('email')
      .eq('customer_id', customer.id)
      .single()

    try {
      const res = await fetch('https://secure.cardcom.solutions/api/v11/Transactions/Transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TerminalNumber: CARDCOM_TERMINAL,
          ApiName: CARDCOM_API_NAME,
          Amount: amount,
          Token: customer.cardcom_token,
          CardExpirationMMYY: `${mm}${yy}`,
        }),
      })

      const data = await res.json()

      if (data.ResponseCode === 0) {
        const next = new Date()
        if (customer.plan === 'annual') next.setFullYear(next.getFullYear() + 1)
        else if (customer.plan === 'daily_test') next.setDate(next.getDate() + 1)
        else next.setMonth(next.getMonth() + 1)

        await supabase
          .from('customers')
          .update({ next_billing_date: next.toISOString().split('T')[0], billing_failures: 0 })
          .eq('id', customer.id)

        // Send invoice via Cardcom CreateDocument
        if (data.TranzactionId && userRecord?.email) {
          const planLabel = customer.plan === 'annual'
            ? 'מנוי Callnik שנתי - callnik.com | ₪948 + מע"מ לשנה'
            : customer.plan === 'daily_test'
            ? 'טסט Callnik - callnik.com'
            : 'מנוי Callnik חודשי - callnik.com | ₪99 + מע"מ לחודש'

          await fetch('https://secure.cardcom.solutions/api/v11/Documents/CreateDocument', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              TerminalNumber: CARDCOM_TERMINAL,
              ApiName: CARDCOM_API_NAME,
              DealNumbers: [{ DealNumber: data.TranzactionId }],
              Document: {
                DocumentTypeToCreate: 'TaxInvoiceAndReceipt',
                Name: customer.business_name || '',
                Email: userRecord.email,
                IsSendByEmail: true,
                Products: [{ Description: planLabel, UnitCost: amount, Quantity: 1 }],
              },
            }),
          }).catch(e => console.error('CreateDocument error:', e))
        }

        results.push({ id: customer.id, status: 'charged', amount })
      } else {
        const failures = (customer.billing_failures || 0) + 1
        const update: Record<string, unknown> = { billing_failures: failures }
        if (failures >= 3) update.status = 'cancelled'

        await supabase.from('customers').update(update).eq('id', customer.id)
        results.push({ id: customer.id, status: 'failed', error: data.Description, failures })
      }
    } catch (e) {
      console.error(`Billing error for ${customer.id}:`, e)
      results.push({ id: customer.id, status: 'error' })
    }
  }

  return NextResponse.json({ ok: true, charged: results.filter(r => r.status === 'charged').length, results })
}
