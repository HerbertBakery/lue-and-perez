import { Suspense } from "react";

import { formatAmount, paypalFetch } from "@/lib/paypal";

export const dynamic = "force-dynamic";

function SuccessShell({
  amountText,
  email,
}: {
  amountText?: string;
  email?: string;
}) {
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

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <a href="/payments" className="rounded-xl border px-4 py-2 font-medium hover:border-teal-700">
            Make another payment
          </a>
          <a href="/" className="rounded-xl bg-teal-700 px-4 py-2 text-white font-semibold hover:bg-teal-800">
            Back to homepage
          </a>
        </div>

        <p className="text-xs text-slate-500 pt-2">You can close this page whenever you’re ready.</p>
      </div>
    </main>
  );
}

type PayPalOrder = {
  status?: string;
  payer?: {
    email_address?: string;
  };
  purchase_units?: Array<{
    amount?: { value?: string; currency_code?: string };
    payments?: {
      captures?: Array<{
        amount?: { value?: string; currency_code?: string };
      }>;
    };
  }>;
};

async function loadOrder(orderId: string) {
  try {
    const order = await paypalFetch<PayPalOrder>(`/v2/checkout/orders/${orderId}`, {
      method: "GET",
    });

    if (order.status !== "COMPLETED") {
      const captured = await paypalFetch<PayPalOrder>(`/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      return captured;
    }

    return order;
  } catch {
    return null;
  }
}

async function SuccessFromPayPal({ orderId }: { orderId: string }) {
  let amountText = "";
  let email = "";

  const order = await loadOrder(orderId);
  if (order) {
    const captureAmount = order.purchase_units?.[0]?.payments?.captures?.[0]?.amount;
    const orderAmount = order.purchase_units?.[0]?.amount;
    amountText = formatAmount(
      captureAmount?.value || orderAmount?.value || null,
      captureAmount?.currency_code || orderAmount?.currency_code || "USD"
    );
    email = order.payer?.email_address || "";
  }

  return <SuccessShell amountText={amountText} email={email} />;
}

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  const orderId = searchParams?.token;
  if (!orderId) {
    return <SuccessShell />;
  }

  return (
    <Suspense fallback={<main className="max-w-xl mx-auto py-14">Loading…</main>}>
      <SuccessFromPayPal orderId={orderId} />
    </Suspense>
  );
}
