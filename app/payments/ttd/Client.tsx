'use client'
import { useState } from 'react'

export default function TTDClient(){
  const [amount, setAmount] = useState(3000)

  const gatewayUrl = process.env.NEXT_PUBLIC_TTD_GATEWAY_URL || ''
  const merchant   = process.env.NEXT_PUBLIC_TTD_MERCHANT_ID || ''
  const returnUrl  = process.env.NEXT_PUBLIC_TTD_RETURN_URL || ''

  function submit(e: React.FormEvent<HTMLFormElement>){
    if (!gatewayUrl) {
      e.preventDefault()
      alert('TTD gateway not configured')
    }
  }

  return (
    <form className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-lg"
          method="POST" action={gatewayUrl} onSubmit={submit}>
      <label className="text-sm font-medium">Amount (TTD)</label>
      <input
        type="number"
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        value={amount}
        onChange={e=>setAmount(parseInt(e.target.value || '0', 10))}
        min={1}
      />
      <input type="hidden" name="merchant_id" value={merchant} />
      <input type="hidden" name="return_url"  value={returnUrl} />
      <input type="hidden" name="amount"      value={amount} />
      <button className="mt-4 rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800" type="submit">
        Continue to Secure Payment
      </button>
    </form>
  )
}
