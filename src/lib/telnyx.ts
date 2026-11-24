const TELNYX_API_KEY = process.env.TELNYX_API_KEY!
export const TELNYX_CONNECTION_ID = '3039393467886208749'
export const TELNYX_REQUIREMENT_GROUP_ID = '9af611a3-efaa-4f4e-b960-1504c172666b'

function apiFetch(path: string, options?: RequestInit) {
  return fetch(`https://api.telnyx.com/v2${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TELNYX_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })
}

export async function findAvailableIsraeliNumber(): Promise<string | null> {
  const res = await apiFetch('/available_phone_numbers?filter%5Bcountry_code%5D=IL&filter%5Bphone_number_type%5D=local&filter%5Blimit%5D=5')
  if (!res.ok) return null
  const data = await res.json()
  return (data.data as { phone_number: string }[])?.[0]?.phone_number ?? null
}

export async function orderIsraeliNumber(phoneNumber: string, customerId: string): Promise<'success' | 'pending' | 'failure'> {
  const res = await apiFetch('/number_orders', {
    method: 'POST',
    body: JSON.stringify({
      phone_numbers: [{ phone_number: phoneNumber, requirement_group_id: TELNYX_REQUIREMENT_GROUP_ID }],
      connection_id: TELNYX_CONNECTION_ID,
      customer_reference: `callnik-${customerId}`,
    }),
  })
  if (!res.ok) return 'failure'
  const data = await res.json()
  const status = data.data?.status as string
  if (status === 'success') return 'success'
  if (status === 'pending') return 'pending'
  return 'failure'
}

export async function releaseNumber(phoneNumber: string): Promise<boolean> {
  const res = await apiFetch(`/phone_numbers/${encodeURIComponent(phoneNumber)}`, { method: 'DELETE' })
  return res.ok || res.status === 404
}
