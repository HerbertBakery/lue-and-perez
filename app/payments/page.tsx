import Link from "next/link";

export default function PaymentsPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Payments</h1>

      <section className="border rounded-2xl p-5 bg-white space-y-2">
        <h2 className="text-xl font-medium">TTD Bank Transfer</h2>
        <p className="text-sm text-gray-700">
          For local Trinidad &amp; Tobago Dollar transfers, view our bank details.
        </p>
        <Link href="/payments/ttd" className="inline-block px-4 py-2 rounded-2xl bg-black text-white">
          View TTD bank details
        </Link>
      </section>

      <section className="border rounded-2xl p-5 bg-white space-y-2">
        <h2 className="text-xl font-medium">USD Payments</h2>
        <p className="text-sm text-gray-700">
          Pay a Stripe invoice or a custom USD amount securely.
        </p>
        <Link href="/payments/usd" className="inline-block px-4 py-2 rounded-2xl bg-black text-white">
          Pay in USD
        </Link>
      </section>
    </main>
  );
}
