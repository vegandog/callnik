'use client'

export default function CouponBanner({ code }: { code: string }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 text-center max-w-2xl mx-auto mb-8">
      <p className="text-xs text-amber-700 mb-1">קוד הקופון שלך לחודש ראשון ב-₪1:</p>
      <div className="flex items-center justify-center gap-2 my-1">
        <p className="text-2xl font-black tracking-widest text-amber-900 font-mono">{code}</p>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs bg-amber-200 hover:bg-amber-300 text-amber-800 font-medium px-2 py-1 rounded-lg transition-colors"
        >
          העתק
        </button>
      </div>
      <p className="text-xs text-amber-600">הכנס אותו בדף התשלום</p>
    </div>
  )
}
