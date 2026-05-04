"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function PaymentsClient() {
  const search = useSearchParams();

  const initialAmount = (() => {
    const q = search?.get("amount");
    const n = q ? Number(q) : NaN;
    return Number.isFinite(n) ? n : 0;
  })();

  const [amount, setAmount] = useState<number>(initialAmount);
  const [link, setLink] = useState<string>(search?.get("link") || search?.get("invoice") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountCents = useMemo(
    () => Math.round((Number.isFinite(amount) ? amount : 0) * 100),
    [amount]
  );
  const canPay = amountCents > 0;

  async function handlePay() {
    setError(null);
    if (!canPay) {
      setError("Enter at least $0.50");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/paypal/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.message || data?.error || "Failed to create PayPal checkout.");
      }
      window.location.href = data.url as string;
    } catch (e: any) {
      setLoading(false);
      setError(e?.message || "Something went wrong.");
    }
  }

  function openLink() {
    let url = link.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Payments</h1>
        <p className="text-gray-700">
          Pay a <strong>custom USD amount</strong> securely with PayPal, or open an existing PayPal invoice link.
        </p>
      </header>

      {/* Pay a custom amount (PayPal Checkout) */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Pay a custom amount (USD)</h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Amount (USD)</label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 border rounded bg-gray-50">$</span>
              <input
                className="border p-2 rounded w-full"
                type="number"
                min="0.50"
                step="0.01"
                inputMode="decimal"
                placeholder="1.00"
                value={Number.isFinite(amount) && amount > 0 ? amount : ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <p className="text-xs text-gray-500">You will be redirected to PayPal to complete payment.</p>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={!canPay || loading}
            className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50"
          >
            {loading ? "Redirecting…" : "Pay with PayPal"}
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </section>

      {/* Open a PayPal invoice or payment link */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Open an invoice/payment link</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Paste a PayPal invoice/payment link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="button" onClick={openLink} className="px-4 py-2 rounded-2xl bg-black text-white">
            Open
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Accepts PayPal-hosted invoice and checkout links.
        </p>
      </section>
    </main>
  );
}
