export const VOICES = [
  { id: 'FA7xLUuWpSuAX9pUCVmy', name: 'דנה',  agentId: 'agent_8301m0rf4fwre8x97eyyj2hbrmce', gender: 'f' },
  { id: '0RteUqNp7NpkVr816JLD', name: 'נועה',  agentId: 'agent_7301m1583r3xfqrb9jn0z7ykrcfy', gender: 'f' },
  { id: 'gzkjOapCYjUSAYkPv26L', name: 'עלמה', agentId: 'agent_8601m15844h9e4b8g5nb7mne5shm', gender: 'f' },
  { id: 'XLCZ5ebG2l8QdmFhri54', name: 'עדן',  agentId: 'agent_7701m1584gcpessbm384g95ycdka', gender: 'f' },
  { id: '4VlcYLYCQbGuxAins3Pq', name: 'קובי', agentId: 'agent_6801m1584w34es4rc685eg420cmy', gender: 'm' },
  { id: 'oSEEaxSfMrUIysTznLhC', name: 'יואב', agentId: 'agent_2901m15857q7e85b76k5we8ybxn9', gender: 'm' },
] as const

export const DEFAULT_AGENT_ID = 'agent_8301m0rf4fwre8x97eyyj2hbrmce'

export function getAgentIdForVoice(voiceId: string | null | undefined): string {
  if (!voiceId) return DEFAULT_AGENT_ID
  return VOICES.find(v => v.id === voiceId)?.agentId ?? DEFAULT_AGENT_ID
}

export function getVoiceName(voiceId: string | null | undefined): string {
  if (!voiceId) return VOICES[0].name
  return VOICES.find(v => v.id === voiceId)?.name ?? VOICES[0].name
}

export const CARRIER_SECONDS: Record<string, number> = {
  'פלאפון': 25,
  'פרטנר': 20,
  'סלקום': 20,
  'הוט מובייל': 20,
  '012': 20,
  'גולן טלקום': 20,   // תשתית סלקום
  'רמי לוי תקשורת': 25, // תשתית פלאפון
  'Welcome': 20,        // תשתית סלקום
  '019': 20,            // תשתית הוט/פרטנר
  'אחר': 20,
}
