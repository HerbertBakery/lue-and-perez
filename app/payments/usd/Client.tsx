'use client'
import { useState } from 'react'

export default function USDClient(){
  const [amount, setAmount] = useState(500)

  async function pay(){
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ amount })
    })
    if (!res.ok) { alert('Unable to create checkout session'); return }
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm max-w-lg">
      <label className="text-sm font-medium">Amount (USD)</label>
      <input
        type="number"
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3"
        value={amount}
        onChange={e=>setAmount(parseInt(e.target.value || '0', 10))}
        min={1}
      />
      <button onClick={pay} className="mt-4 rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">
        Pay with Stripe
      </button>
    </div>
  )
}
