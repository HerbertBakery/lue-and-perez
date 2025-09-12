import Link from "next/link";

export default function PaymentsPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Choose a payment method</h1>

      {/* Bank Transfer (TTD) */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Bank transfer (TTD)</h2>
        <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Local Trinidad &amp; Tobago bank transfer</li>
          <li>Clears in 1–2 business days</li>
          <li>Use your <strong>invoice number</strong> as the payment reference</li>
        </ul>
        <Link
          href="/payments/ttd"
          className="inline-block px-4 py-2 rounded-2xl bg-black text-white"
        >
          View bank details
        </Link>
      </section>

      {/* Card payment (USD via Stripe) */}
      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Pay by card (USD via Stripe)</h2>
        <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Instant confirmation</li>
          <li>Any Visa/Mastercard (incl. Trinidad &amp; Tobago cards)</li>
          <li>Charged in USD; your bank handles currency conversion</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/payments/usd"
            className="inline-block px-4 py-2 rounded-2xl bg-black text-white"
          >
            Pay by card
          </Link>
          <Link
            href="/payments/usd?focus=link"
            className="inline-block px-4 py-2 rounded-2xl border"
          >
            Open an invoice link
          </Link>
        </div>
      </section>
    </main>
  );
}
