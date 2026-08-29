// Normalize Israeli phone number to E.164 international format
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-().]/g, '')
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('00972')) return '+' + digits.slice(2)
  if (digits.startsWith('972')) return '+' + digits
  if (digits.startsWith('0')) return '+972' + digits.slice(1)
  return digits
}
