"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

// ensure this page is always dynamic (no caching)
export const dynamic = "force-dynamic";

export default function PaymentsPage() {
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
  const canPay = amountCents >= 50; // Stripe min is 50¢

  async function handlePay() {
    setError(null);
    if (!canPay) {
      setError("Enter at least $0.50");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout/custom-amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.message || data?.error || "Failed to create Stripe Checkout session.");
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
          Pay a <strong>custom USD amount</strong> securely by card with Stripe, or paste an existing Stripe invoice/payment link.
        </p>
      </header>

      {/* Pay a custom amount (Stripe Checkout) */}
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
                placeholder="0.50"
                value={Number.isFinite(amount) && amount > 0 ? amount : ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <p className="text-xs text-gray-500">Minimum $0.50</p>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={!canPay || loading}
            className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50"
          >
            {loading ? "Processing…" : "Pay by card (Stripe)"}
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </section>

      {/* Open a Stripe invoice or payment link */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Open an invoice/payment link</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Paste a Stripe invoice/payment link (e.g. https://invoice.stripe.com/...)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="button" onClick={openLink} className="px-4 py-2 rounded-2xl bg-black text-white">
            Open
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Accepts hosted invoice URLs, payment links, and checkout links.
        </p>
      </section>
    </main>
  );
}
