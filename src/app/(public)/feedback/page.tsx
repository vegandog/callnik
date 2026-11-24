'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [whatWorked, setWhatWorked] = useState('')
  const [whatDidnt, setWhatDidnt] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const submit = async () => {
    if (!rating) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, business, rating, what_worked: whatWorked, what_didnt: whatDidnt, notes }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🙏</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 12 }}>תודה רבה!</h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7 }}>
              המשוב שלך עוזר לנו לשפר את השירות.<br />
              ניצור איתך קשר בקרוב.
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const label = { input: { display: 'block', width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, fontFamily: 'inherit', boxSizing: 'border-box' as const, direction: 'rtl' as const } }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: '48px 20px 80px', direction: 'rtl' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 8 }}>משוב על הפיילוט</h1>
        <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 36, lineHeight: 1.7 }}>
          שבוע-שבועיים עם המזכירה - מה עלה מהשטח? הכל עוזר לנו לשפר.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>שם</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי" style={label.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>שם העסק</label>
              <input value={business} onChange={e => setBusiness(e.target.value)} placeholder="סוכנות נדל&quot;ן XYZ" style={label.input} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>דירוג כללי</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  style={{
                    fontSize: 36,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 2px',
                    color: n <= (hovered || rating) ? '#f59e0b' : '#d1d5db',
                    transition: 'color 0.1s',
                  }}
                >★</button>
              ))}
            </div>
            {!rating && status === 'error' && (
              <p style={{ fontSize: 13, color: '#dc2626', marginTop: 4 }}>נא לבחור דירוג</p>
            )}
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>מה עבד טוב?</label>
            <textarea
              value={whatWorked}
              onChange={e => setWhatWorked(e.target.value)}
              placeholder="למשל: הודעות ה-WhatsApp מגיעות מהר, הנציגה נשמעת טבעי..."
              rows={3}
              style={{ ...label.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>מה פחות עבד / מה היה חסר?</label>
            <textarea
              value={whatDidnt}
              onChange={e => setWhatDidnt(e.target.value)}
              placeholder="למשל: פספסה שם לקוח, לא הבינה מה ביקשו, לא קיבלתי וואטסאפ פעם..."
              rows={3}
              style={{ ...label.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>הערות נוספות (אופציונלי)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="כל מה שבא לך לשתף..."
              rows={2}
              style={{ ...label.input, resize: 'vertical' }}
            />
          </div>

          <button
            onClick={submit}
            disabled={status === 'sending' || !rating}
            style={{
              background: rating ? '#2563eb' : '#93c5fd',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 16,
              fontWeight: 600,
              cursor: rating ? 'pointer' : 'default',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
          >
            {status === 'sending' ? 'שולח...' : 'שליחת משוב'}
          </button>

          {status === 'error' && (
            <p style={{ fontSize: 14, color: '#dc2626' }}>משהו השתבש. נסה שוב או שלח מייל ל-mail@callnik.com</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
