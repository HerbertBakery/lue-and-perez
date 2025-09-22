// app/payments/success/page.tsx
import type Stripe from "stripe";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function formatAmount(cents?: number | null, currency?: string | null) {
  if (cents == null || !Number.isFinite(cents)) return "";
  const amount = cents / 100;
  const code = (currency || "usd").toUpperCase();
  return new Intl.NumberFormat("en-US", { style: "currency", currency: code }).format(amount);
}

async function SuccessInner({ sessionId }: { sessionId: string }) {
  let amountText = "";
  let email = "";
  let receiptUrl: string | null = null;

  try {
    // Use Stripe server-side to pull details for clarity
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-06-20",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent.latest_charge"],
    });

    // Amount / currency
    amountText = formatAmount(session.amount_total ?? null, session.currency ?? null);

    // Customer email if present
    email = session.customer_details?.email || "";

    // Receipt URL when available (card payments)
    const latestCharge = (session.payment_intent as Stripe.PaymentIntent | null)?.latest_charge as
      | Stripe.Charge
      | null
      | undefined;
    receiptUrl = latestCharge?.receipt_url || null;
  } catch {
    // If Stripe key missing or session not found, we still render a generic success
  }

  return (
    <main className="max-w-xl mx-auto py-14">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-5">
        {/* Big success icon */}
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-green-700" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold">Payment successful</h1>

        <p className="text-slate-600">
          {amountText ? (
            <>
              We received <strong>{amountText}</strong>
              {email ? <> from <strong>{email}</strong></> : null}.
            </>
          ) : (
            <>Thank you for your payment.</>
          )}
        </p>

        {receiptUrl ? (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-semibold hover:opacity-90"
          >
            View / Download receipt
          </a>
        ) : null}

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <a
            href="/payments"
            className="rounded-xl border px-4 py-2 font-medium hover:border-teal-700"
          >
            Make another payment
          </a>
          <a
            href="/"
            className="rounded-xl bg-teal-700 px-4 py-2 text-white font-semibold hover:bg-teal-800"
          >
            Back to homepage
          </a>
        </div>

        <p className="text-xs text-slate-500 pt-2">
          You can close this page whenever you’re ready.
        </p>
      </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams?.session_id;
  if (!sessionId) {
    // Missing session id, still show clear confirmation
    return (
      <main className="max-w-xl mx-auto py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-5">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-green-700" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Payment successful</h1>
          <p className="text-slate-600">Thank you for your payment.</p>
          <div className="flex gap-3 justify-center">
            <a href="/payments" className="rounded-xl border px-4 py-2 font-medium hover:border-teal-700">Make another payment</a>
            <a href="/" className="rounded-xl bg-teal-700 px-4 py-2 text-white font-semibold hover:bg-teal-800">Back to homepage</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <Suspense fallback={<main className="max-w-xl mx-auto py-14">Loading…</main>}>
      {/* Server-side fetch of session details */}
      {/* @ts-expect-error Server Component async boundary */}
      <SuccessInner sessionId={sessionId} />
    </Suspense>
  );
}
