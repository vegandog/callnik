import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendBillingFailureEmail } from '@/lib/email'

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
    .select('id, business_name, plan, cardcom_token, card_month, card_year, billing_failures, next_billing_date')
    .eq('status', 'active')
    .lte('next_billing_date', today)
    .not('cardcom_token', 'is', null)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!customers?.length) return NextResponse.json({ ok: true, charged: 0 })

  const results = []

  const INCLUDED_CALLS = 60
  const EXCESS_RATE = 0.99 // ₪ per call above 60

  for (const customer of customers) {
    const baseAmount = customer.plan === 'annual' ? 948 : customer.plan === 'daily_test' ? 1 : 99
    const mm = String(customer.card_month || '').padStart(2, '0')
    const yy = String(customer.card_year || '').slice(-2)

    // Get customer email from users table
    const { data: userRecord } = await supabase
      .from('users')
      .select('email')
      .eq('customer_id', customer.id)
      .single()

    // Count answered calls in the current billing period
    const periodEnd = new Date(customer.next_billing_date + 'T00:00:00Z')
    const periodStart = new Date(periodEnd)
    if (customer.plan === 'annual') periodStart.setFullYear(periodStart.getFullYear() - 1)
    else periodStart.setMonth(periodStart.getMonth() - 1)

    const { count: callCount } = await supabase
      .from('calls')
      .select('id', { count: 'exact', head: true })
      .eq('customer_id', customer.id)
      .not('elevenlabs_conversation_id', 'is', null)
      .gte('created_at', periodStart.toISOString())
      .lt('created_at', periodEnd.toISOString())

    const excessCalls = Math.max(0, (callCount ?? 0) - INCLUDED_CALLS)
    const excessAmount = Math.round(excessCalls * EXCESS_RATE * 100) / 100
    const amount = Math.round((baseAmount + excessAmount) * 100) / 100

    try {
      const planLabel = customer.plan === 'annual'
        ? 'מנוי Callnik שנתי - callnik.com | ₪948 + מע"מ לשנה'
        : customer.plan === 'daily_test'
        ? 'טסט Callnik - callnik.com'
        : 'מנוי Callnik חודשי - callnik.com | ₪99 + מע"מ לחודש'

      const transactionBody: Record<string, unknown> = {
        TerminalNumber: CARDCOM_TERMINAL,
        ApiName: CARDCOM_API_NAME,
        Amount: amount,
        Token: customer.cardcom_token,
        CardExpirationMMYY: `${mm}${yy}`,
      }

      if (userRecord?.email) {
        const products: { Description: string; UnitCost: number; Quantity: number }[] = [
          { Description: planLabel, UnitCost: baseAmount, Quantity: 1 },
        ]
        if (excessCalls > 0) {
          products.push({
            Description: `שיחות עודפות Callnik - ${excessCalls} שיחות × ₪${EXCESS_RATE}`,
            UnitCost: EXCESS_RATE,
            Quantity: excessCalls,
          })
        }
        transactionBody.Document = {
          Name: customer.business_name || userRecord.email,
          Email: userRecord.email,
          Products: products,
        }
      }

      const res = await fetch('https://secure.cardcom.solutions/api/v11/Transactions/Transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionBody),
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

        await supabase.from('billing_history').insert({
          customer_id: customer.id,
          amount,
          cardcom_transaction_id: data.TranzactionId || null,
          cardcom_document_number: data.DocumentNumber || null,
          document_url: data.DocumentUrl || null,
          plan: customer.plan,
          description: planLabel,
        })

        results.push({ id: customer.id, status: 'charged', amount, calls: callCount ?? 0, excessCalls, invoice: data.DocumentNumber > 0 ? data.DocumentNumber : null })
      } else {
        const failures = (customer.billing_failures || 0) + 1
        const update: Record<string, unknown> = { billing_failures: failures }
        if (failures >= 3) update.status = 'cancelled'

        await supabase.from('customers').update(update).eq('id', customer.id)
        results.push({ id: customer.id, status: 'failed', error: data.Description, failures })

        sendBillingFailureEmail({
          businessName: customer.business_name || customer.id,
          email: userRecord?.email || '',
          amount,
          failures,
          error: data.Description || 'שגיאה לא ידועה',
          customerId: customer.id,
        }).catch(e => console.error('billing failure email error:', e))
      }
    } catch (e) {
      console.error(`Billing error for ${customer.id}:`, e)
      results.push({ id: customer.id, status: 'error' })
    }
  }

  return NextResponse.json({ ok: true, charged: results.filter(r => r.status === 'charged').length, results })
}
