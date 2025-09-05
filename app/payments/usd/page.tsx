"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function UsdPaymentsPage() {
  const sp = useSearchParams();
  const status = sp.get("status");

  // A) Open a hosted invoice link you received
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const openInvoice = () => {
    try {
      if (!invoiceUrl.trim()) return;
      new URL(invoiceUrl.trim()); // basic validation
      window.location.href = invoiceUrl.trim();
    } catch {
      alert("Paste the full hosted invoice URL (https://invoice.stripe.com/...)");
    }
  };

  // B) Pay a custom USD amount via Checkout
  const [amount, setAmount] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successBox = useMemo(() => {
    if (status === "success") return "Payment completed. Thank you!";
    if (status === "cancel") return "Payment canceled.";
    return null;
  }, [status]);

  const startCheckout = async () => {
    setBusy(true);
    setError(null);
    const n = Number(amount);
    if (!Number.isFinite(n) || n < 1) {
      setBusy(false);
      return setError("Enter at least $1.00");
    }
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: n, email, name, memo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not start Checkout");
      window.location.href = data.url as string;
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setBusy(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-semibold">USD Payments</h1>

      {successBox && (
        <div className="border rounded p-3 bg-green-50 text-green-800 text-sm">
          {successBox}
        </div>
      )}

      {/* A) Pay your invoice (paste hosted link) */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-lg font-medium">Pay your invoice</h2>
        <p className="text-sm text-gray-600">
          Paste the hosted invoice link we emailed to you (starts with https://invoice.stripe.com/…).
        </p>
        <div className="flex gap-2">
          <input
            className="border rounded p-2 flex-1"
            placeholder="https://invoice.stripe.com/..."
            value={invoiceUrl}
            onChange={(e) => setInvoiceUrl(e.target.value)}
          />
          <button onClick={openInvoice} className="px-3 py-2 rounded bg-black text-white">
            Open
          </button>
        </div>
      </section>

      {/* B) Pay any amount (Checkout) */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-lg font-medium">Pay a custom amount (USD)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Amount (USD)</label>
            <input
              className="border rounded p-2 w-full"
              type="number"
              step="0.01"
              min={1}
              placeholder="e.g., 550.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email (optional)</label>
            <input
              className="border rounded p-2 w-full"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Name (optional)</label>
            <input
              className="border rounded p-2 w-full"
              placeholder="Your name or company"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Memo (optional)</label>
            <input
              className="border rounded p-2 w-full"
              placeholder="Invoice #, project, etc."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={startCheckout}
          disabled={busy}
          className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50"
        >
          {busy ? "Redirecting…" : "Pay with Stripe"}
        </button>
      </section>
    </main>
  );
}
