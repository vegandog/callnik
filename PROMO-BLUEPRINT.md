# Blueprint: מערכת קופונים בין מוצרים (Cross-Product Promo)

**נבנה 10-11/9/2026 | ג'ינגלפון → Callnik**
**מטרה:** שכפל לכל זוג מוצרים של MediaUp

---

## הקונספט בשורה אחת

לקוח שרכש מוצר A מקבל קוד חד-פעמי לחודש התנסות ב-1₪ במוצר B, ישירות במייל המסירה.

---

## ארכיטקטורה מלאה

```
מוצר A (ג'ינגלפון / PHP + Hostinger FTP)
    ↓  בזמן שליחת מייל מסירה
    POST /api/promo/generate  →  מוצר B (Callnik / Next.js + Vercel)
    ←  קוד 5 ספרות (e.g. 47382)
    ↓
    מייל HTML עם בלוק מתנה + קוד + כפתור → callnik.com/register?promo=47382
                                                    ↓
                                            לקוח נרשם ← sessionStorage שומר קוד
                                                    ↓
                                            onboarding
                                                    ↓
                                            /payment?promo=47382
                                                    ↓
                                    validate קוד → iframe Cardcom 1₪
                                    לקוח מסמן "סבבה?" ← checkbox
                                                    ↓
                                            תשלום + טוקן נשמר
                                                    ↓
                                    webhook: קוד מסומן used, plan=monthly
                                                    ↓
                                    cron יומי: מחודש 2 = 116.82₪/חודש כולל מע"מ
```

---

## מה נבנה במוצר B (Callnik / Next.js)

### 1. Supabase - טבלה
```sql
CREATE TABLE promo_codes (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  code        TEXT        UNIQUE NOT NULL,
  source      TEXT        NOT NULL DEFAULT 'jinglephone',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  used_by     UUID        REFERENCES auth.users(id),
  used_at     TIMESTAMPTZ
);
CREATE INDEX ON promo_codes (code);
CREATE INDEX ON promo_codes (used_by);

-- חשוב: GRANT אחרי יצירה (ב-SQL Editor של Supabase):
GRANT ALL ON promo_codes TO service_role;
```

### 2. API: Generate (`src/app/api/promo/generate/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const PROMO_SECRET = process.env.PROMO_API_SECRET

function randomCode(): string {
  return String(Math.floor(10000 + Math.random() * 90000))  // 5 ספרות
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-promo-secret')
  if (!PROMO_SECRET || secret !== PROMO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { source = 'jinglephone' } = await req.json().catch(() => ({}))
  const supabase = createAdminClient()

  let code = ''
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = randomCode()
    const { error } = await supabase.from('promo_codes').insert({ code: candidate, source })
    if (!error) { code = candidate; break }
  }

  if (!code) return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 })
  return NextResponse.json({ code })
}
```

### 3. API: Validate (`src/app/api/promo/validate/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ valid: false })

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('promo_codes')
    .select('id, used_at, expires_at')
    .eq('code', code.toUpperCase().trim())
    .single()

  if (!data) return NextResponse.json({ valid: false, reason: 'not_found' })
  if (data.used_at) return NextResponse.json({ valid: false, reason: 'used' })
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ valid: false, reason: 'expired' })
  }

  return NextResponse.json({ valid: true, discount: 'first_month_1nis' })
}
```

### 4. create-session - שינויים קריטיים
```typescript
// לפני: const amount = isTest ? 1 : isAnnual ? 1118.64 : 116.82
// אחרי:
const { plan, coupon } = await req.json()
const isAnnual = plan === 'annual'
const isTest = plan === 'test'

let couponValid = false
let couponId: string | null = null
if (coupon && !isTest && !isAnnual) {
  const adminSupabase = (await import('@/lib/supabase/admin')).createAdminClient()
  const { data: promoRow } = await adminSupabase
    .from('promo_codes')
    .select('id, used_at, expires_at')
    .eq('code', (coupon as string).toUpperCase().trim())
    .single()
  if (promoRow && !promoRow.used_at && (!promoRow.expires_at || new Date(promoRow.expires_at) > new Date())) {
    couponValid = true
    couponId = promoRow.id
  }
}

// All amounts include 18% VAT
const amount = isTest ? 1 : couponValid ? 1 : isAnnual ? 1118.64 : 116.82

// ReturnValue מכיל את ה-promoCodeId לסימון בwebhook:
ReturnValue: `${userRecord.customer_id}:${plan}${couponId ? `:promo:${couponId}` : ''}`,
```

### 5. webhook - סימון קוד כמשומש
```typescript
const parts = (data.ReturnValue || '').split(':')
const customerId = parts[0]
const plan = parts[1]
const promoCodeId = parts[2] === 'promo' ? parts[3] : null

if (promoCodeId) {
  const promoUser = await dbGet('users', `customer_id=eq.${customerId}`, 'id')
  await dbPatch('promo_codes', `id=eq.${promoCodeId}`, {
    used_at: new Date().toISOString(),
    used_by: promoUser?.id || null,
  })
}

// סכום נכון להיסטוריה:
const firstPaymentAmount = plan === 'annual' ? 1118.64 : plan === 'test' ? 1 : promoCodeId ? 1 : 116.82
```

### 6. payment page - checkbox + coupon flow
```typescript
const [couponAcknowledged, setCouponAcknowledged] = useState(false)

const checkCoupon = async (code: string) => {
  // ... validate ...
  if (data.valid) {
    if (plan === 'annual') setPlan('monthly')
    // לא טוענים iframe - ממתינים לchecbox
  } else {
    createSession(plan)
  }
}

const handleAcknowledge = (checked: boolean) => {
  setCouponAcknowledged(checked)
  if (checked) createSession('monthly', coupon.trim())
}

// UI - הצג אחרי קוד תקין:
{couponStatus === 'valid' && (
  <div className="mt-3 bg-amber-50 border border-amber-300 rounded-xl px-4 py-3">
    <div className="text-green-700 text-sm font-bold mb-2">✓ הקוד אושר - חודש התנסות ב-1 ₪ בלבד!</div>
    <div className="text-gray-600 text-xs leading-relaxed mb-3">
      שימו ♥️ מהחודש השני החיוב עובר למחיר המלא: 99₪ +מע"מ /חודש.<br />
      <strong>אפשר לבטל בכל עת, ללא קנס.</strong>
    </div>
    <label className="flex items-start gap-2 cursor-pointer">
      <input type="checkbox" checked={couponAcknowledged} onChange={e => handleAcknowledge(e.target.checked)} className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0" />
      <span className="text-xs text-gray-700 font-medium">סבבה?</span>
    </label>
  </div>
)}

// שמירה דרך OAuth flow - register.tsx:
const promo = new URLSearchParams(window.location.search).get('promo')
if (promo) sessionStorage.setItem('callnik_promo', promo)

// login.tsx:
const promoInRedirect = new URLSearchParams(redirectTo.split('?')[1] || '').get('promo')
if (promoInRedirect) sessionStorage.setItem('callnik_promo', promoInRedirect)

// onboarding/page.tsx:
const savedPromo = sessionStorage.getItem('callnik_promo')
router.push(savedPromo ? `/payment?promo=${encodeURIComponent(savedPromo)}` : '/payment')

// payment/page.tsx - useEffect:
const urlCoupon = searchParams.get('promo') || sessionStorage.getItem('callnik_promo')
if (urlCoupon) {
  sessionStorage.removeItem('callnik_promo')
  setCoupon(urlCoupon)
  checkCoupon(urlCoupon)
} else {
  createSession(plan)
}
```

### 7. middleware.ts - חשוב!
```typescript
// להוסיף /payment לרשימת isAuthRoute כדי שה-middleware ישמר promo בredirect:
request.nextUrl.pathname.startsWith('/payment') ||
```

### 8. Vercel env vars נדרשים
```
PROMO_API_SECRET=jp2callnik_X7mK9qR3   # ← secret משותף בין שני המוצרים
```

---

## מה נבנה במוצר A (ג'ינגלפון / PHP)

### 1. config.php - הוסף secret
```php
define('CALLNIK_PROMO_SECRET', 'jp2callnik_X7mK9qR3');
```

### 2. send-client-email.php - יצירת קוד לפני if/else
```php
// ← לפני ה-if ($emailType === 'self') block:
$callnikPromoCode = null;
try {
    $promoRes = @file_get_contents('https://callnik.com/api/promo/generate', false, stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\nx-promo-secret: " . CALLNIK_PROMO_SECRET . "\r\n",
            'content' => json_encode(['source' => 'jinglephone']),
            'timeout' => 5,
        ]
    ]));
    if ($promoRes) {
        $promoData = json_decode($promoRes, true);
        $callnikPromoCode = $promoData['code'] ?? null;
    }
} catch (\Throwable $e) { /* fail silently - email still sends */ }
```

### 3. מערך מגדר - הוסף copy
```php
$g = [
    // ... existing keys ...
    'copy' => $f ? 'העתיקי' : 'העתק',
];
```

### 4. בלוק HTML למייל (PHP - הכנס לפני HR)
```php
$promoBlock = '';
if ($promoCode) {
    $callnikUrl = 'https://callnik.com/register?promo=' . urlencode($promoCode);
    $promoBlock = '<div style="background:#aeeaf5;border:4px solid #ff0303;border-radius:12px;padding:20px 22px;margin:0 0 20px;direction:rtl;text-align:right">'
        . '<p style="margin:0 0 10px;font-weight:800;font-size:16px;color:#000000">אה, ויש גם&nbsp;מתנה... 🥳</p>'
        . '<p style="margin:0 0 10px;font-size:13px;color:#1a1a1a;line-height:1.75">כי אנחנו אוהבים לצ׳פר את הלקוחות שלנו!<br>'
        . 'החלטנו לתת לך את המוצר החדש שלנו <strong>Callnik</strong> לחודש שלם להתנסות ב-<strong>1 ש&quot;ח בלבד</strong> לחודש הראשון.<br>'
        . '<strong>Callnik</strong> - זה שירות חדש שלנו - עוזרת דיגיטלית, מבוססת AI שעונה לשיחות טלפון שלך שפיספסת.<br>'
        . 'הנציגה שלנו תדבר עם הלקוחות שלך, ותשלח לך סיכום של השיחה ישר לוואטסאפ. ממש כמו מזכירה אישית.<br>'
        . 'וככה סגרנו את הפינה - אין יותר שיחות שלא נענו!<br>'
        . 'אז אם בא לך, ' . $g['copy'] . ' את הקוד, ו' . $g['click'] . ' על הכפתור למטה.</p>'
        . '<p style="margin:0 0 4px;font-size:12px;color:#64748b">הקוד שלך:</p>'
        . '<p style="margin:0 0 12px;font-size:22px;font-weight:800;letter-spacing:3px;color:#0f172a">' . htmlspecialchars($promoCode) . '</p>'
        . '<p style="margin:0 0 14px;font-size:11px;color:#000080;font-weight:700">הקוד הוא חד-פעמי &nbsp;|&nbsp; תקף ל-30 יום &nbsp;|&nbsp; אם ' . $g['want'] . ' להמשיך - התשלום מהחודש השני: 99+מע&quot;מ &nbsp;|&nbsp; ביטול בכל עת</p>'
        . '<a href="' . htmlspecialchars($callnikUrl) . '" style="display:inline-block;background:#0077b6;color:#fff;text-decoration:none;padding:11px 26px;border-radius:8px;font-size:14px;font-weight:700">רוצה לנסות? ' . $g['click'] . ' כאן</a>'
        . '</div>';
}
```

---

## מחירים (כולל 18% מע"מ)

| תוכנית | לפני מע"מ | כולל מע"מ |
|--------|-----------|-----------|
| חודשי רגיל | 99₪ | 116.82₪ |
| שנתי | 948₪ | 1,118.64₪ |
| קופון חודש 1 | - | 1₪ (flat, ללא מע"מ) |
| שיחה עודפת | 0.99₪ | 1.17₪ |

---

## לוגיקה עסקית - כללים

1. **קופון לא חל על שנתי** (חסימה ב-API + UI)
2. **קוד חד-פעמי** - נסגר לאחר תשלום ב-webhook
3. **תוקף 30 יום** - מוגדר ב-Supabase default
4. **חיוב חודש 2** - cron יומי 5:00 UTC, לא דורש קוד נוסף
5. **iframe לא נטען** עד שלקוח מסמן checkbox "סבבה?"
6. **fail silently** - אם generate נכשל, המייל נשלח בלי הבלוק

---

## שכפול למוצר חדש - צ'קליסט

### במוצר B (שמקבל את הלקוח):
- [ ] צור טבלת promo_codes בSupabase (SQL למעלה)
- [ ] הוסף GRANT לservice_role בSQL Editor
- [ ] צור `/api/promo/generate` ו-`/api/promo/validate`
- [ ] עדכן `create-session` לקבל coupon + כפתור annual disabled
- [ ] עדכן `webhook` לסמן קוד כמשומש
- [ ] עדכן `payment/page.tsx` עם checkbox logic
- [ ] עדכן `register.tsx` + `login.tsx` + `onboarding/page.tsx` לשמר promo בsessionStorage
- [ ] עדכן `middleware.ts` להוסיף /payment לisAuthRoute
- [ ] הוסף `PROMO_API_SECRET` ל-Vercel env vars
- [ ] הפעל `vercel --prod`
- [ ] הרץ SQL migration בSupabase dashboard

### במוצר A (שמפיק את הקוד):
- [ ] הוסף `define('TARGET_PROMO_SECRET', '...')` לconfig.php
- [ ] הוסף קוד generate לפני if/else במייל מסירה
- [ ] הוסף 'copy' למערך $g
- [ ] הוסף $promoBlock ל-HTML של המייל (לפני HR)
- [ ] העלה ב-FTP + בדוק php -l לפני העלאה

---

## סודות נוכחיים (ג'ינגלפון → Callnik)
- `PROMO_API_SECRET` = `jp2callnik_X7mK9qR3`
- שנה לסוד חדש לכל זוג מוצרים חדש

---

## בדיקות שחובה לבצע לפני Go-Live
1. generate קוד → validate תקין → validate שוב (עדיין תקין לפני תשלום) ✓
2. validate קוד שומש → returns valid:false ✓
3. annual + קופון → API מחייב 1118.64, לא 1 ✓
4. קוד פג תוקף → iframe נטען במחיר רגיל (לא נתקע) ✓
5. קוד לא קיים → iframe נטען במחיר רגיל ✓
6. Cron מחודש 2 → 116.82₪ (לא 1₪) ✓
