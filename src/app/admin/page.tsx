import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminPanel from './AdminPanel'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vegandog@gmail.com'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) redirect('/')

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-blue-600">Callnik</span>
            <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Admin</span>
          </div>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-6">לקוחות</h1>
        <AdminPanel />
      </div>
    </div>
  )
}
