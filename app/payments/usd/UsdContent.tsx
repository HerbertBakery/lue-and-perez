"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function UsdContent() {
  const search = useSearchParams();
  const status = search?.get("status") || "";
  const sessionId = search?.get("session_id") || "";
  const passedAmount = Number(search?.get("amount") || "0"); // cents from success_url

  // existing amount/link
  const initialAmount = (() => {
    const q = search?.get("amount");
    const n = q ? Number(q) : NaN;
    return Number.isFinite(n) ? n : 0;
  })();
  const [amount, setAmount] = useState<number>(passedAmount ? passedAmount / 100 : initialAmount);
  const [link, setLink] = useState<string>(search?.get("link") || search?.get("invoice") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amountCents = useMemo(
    () => Math.round((Number.isFinite(amount) ? amount : 0) * 100),
    [amount]
  );
  const canPay = amountCents >= 50;

  // ✅ verify payment server-side
  const [confirmed, setConfirmed] = useState<{ payment_status: string; amount_total: number | null; currency: string | null } | null>(null);
  const [verifyErr, setVerifyErr] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success" && sessionId) {
      (async () => {
        try {
          const res = await fetch(`/api/stripe/checkout/status?session_id=${encodeURIComponent(sessionId)}`);
          const data = await res.json();
          if (!res.ok || !data?.ok) throw new Error(data?.error || "Unable to verify payment");
          setConfirmed({ payment_status: data.payment_status, amount_total: data.amount_total, currency: data.currency });
        } catch (e: any) {
          setVerifyErr(e?.message || "Verification failed");
        }
      })();
    }
  }, [status, sessionId]);

  async function handlePay() {
    setError(null);
    if (!canPay) { setError("Enter at least $0.50"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout/custom-amount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.message || data?.error || "Failed to create Stripe Checkout session.");
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
      {/* Status banners */}
      {status === "success" && (
        <div className="rounded-xl border border-green-600/30 bg-green-50 p-4 text-green-800">
          <p className="font-semibold">Payment successful</p>
          {confirmed?.payment_status === "paid" ? (
            <p className="text-sm mt-1">
              Charged{" "}
              {confirmed.amount_total != null
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: (confirmed.currency || "usd").toUpperCase(),
                  }).format((confirmed.amount_total || 0) / 100)
                : "—"}
              . Thank you!
            </p>
          ) : verifyErr ? (
            <p className="text-sm mt-1">Processed, but verification failed: {verifyErr}</p>
          ) : (
            <p className="text-sm mt-1">Verifying payment…</p>
          )}
        </div>
      )}
      {status === "cancel" && (
        <div className="rounded-xl border border-amber-600/30 bg-amber-50 p-4 text-amber-800">
          <p className="font-semibold">Payment cancelled</p>
          <p className="text-sm mt-1">No charge was made. You can try again below.</p>
        </div>
      )}

      {/* Your existing sections below (custom amount + open invoice link) */}
      {/* ...keep the rest of your UI exactly as you had it... */}
    </main>
  );
}
