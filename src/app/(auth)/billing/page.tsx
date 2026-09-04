import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { FileText, Download } from 'lucide-react'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userRecord } = await supabase
    .from('users')
    .select('customer_id')
    .eq('id', user.id)
    .single()

  if (!userRecord) redirect('/onboarding')

  const { data: history } = await supabase
    .from('billing_history')
    .select('*')
    .eq('customer_id', userRecord.customer_id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">חשבוניות</h1>
        <p className="text-gray-500 text-sm mt-1">היסטוריית תשלומים וחשבוניות</p>
      </div>

      {!history || history.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">אין עדיין חשבוניות</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-right font-medium text-gray-500 px-5 py-3">תאריך</th>
                <th className="text-right font-medium text-gray-500 px-5 py-3">תיאור</th>
                <th className="text-right font-medium text-gray-500 px-5 py-3">סכום</th>
                <th className="text-right font-medium text-gray-500 px-5 py-3">מסמך</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString('he-IL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-4 text-gray-700">{row.description || planLabel(row.plan)}</td>
                  <td className="px-5 py-4 text-gray-900 font-semibold whitespace-nowrap">₪{row.amount}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                    {row.cardcom_document_number ? `#${row.cardcom_document_number}` : '-'}
                  </td>
                  <td className="px-5 py-4">
                    {row.document_url ? (
                      <a
                        href={row.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Download className="w-4 h-4" />
                        הורדה
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">נשלחה למייל</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function planLabel(plan: string | null): string {
  if (plan === 'annual') return 'מנוי Callnik שנתי'
  return 'מנוי Callnik חודשי'
}
