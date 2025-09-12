import Link from "next/link";

/** Tiny inline icons to avoid extra deps */
function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z"
        fill="currentColor"
      />
    </svg>
  );
}
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2l7 3v6c0 5-3.6 9-7 11-3.4-2-7-6-7-11V5l7-3zm-1 13l5-5-1.4-1.4L11 12.2 9.4 10.6 8 12l3 3z"
        fill="currentColor"
      />
    </svg>
  );
}
function BankIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3 10l9-6 9 6v2H3v-2zm2 4h2v6H5v-6zm4 0h2v6H9v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z"
        fill="currentColor"
      />
    </svg>
  );
}

function SecureBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1">
        <LockIcon className="h-3.5 w-3.5" /> Secured by Stripe
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1">
        <ShieldCheckIcon className="h-3.5 w-3.5" /> PCI&nbsp;DSS Level&nbsp;1
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1">
        <ShieldCheckIcon className="h-3.5 w-3.5" /> 3D Secure supported
      </span>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Choose a payment method</h1>
        <p className="text-slate-700">
          Select the option that works best for your team. Card payments are processed securely by Stripe.
        </p>
      </header>

      {/* Bank transfer */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <BankIcon className="h-6 w-6 text-slate-700" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Bank transfer</h2>
            </div>
            <ul className="ml-5 list-disc space-y-1 text-sm text-slate-700">
              <li>Local transfer; clears in 1–2 business days</li>
              <li>Use your <strong>invoice number</strong> as the payment reference</li>
              <li>Remit advice to <a className="underline" href="mailto:billing@lueandperez.com">billing@lueandperez.com</a></li>
            </ul>
            <Link
              href="/payments/ttd"
              className="inline-block rounded-2xl bg-black px-4 py-2 text-white"
            >
              View bank details
            </Link>
          </div>
        </div>
      </section>

      {/* Card (Stripe) */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <LockIcon className="h-6 w-6 text-slate-700" />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Pay securely with Stripe</h2>
            </div>

            <ul className="ml-5 list-disc space-y-1 text-sm text-slate-700">
              <li>Instant confirmation</li>
              <li>Visa &amp; Mastercard (incl. Trinidad &amp; Tobago cards)</li>
              <li>Charged in USD; your bank handles currency conversion</li>
            </ul>

            <SecureBadges />

            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/payments/usd"
                className="inline-block rounded-2xl bg-black px-4 py-2 text-white"
              >
                Pay securely with Stripe
              </Link>
              <Link
                href="/payments/usd?focus=link"
                className="inline-block rounded-2xl border px-4 py-2"
              >
                Open an invoice link
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="text-xs text-slate-500">
        By paying, you agree to our{" "}
        <Link className="underline" href="/terms-of-service">Terms of Service</Link> and{" "}
        <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </main>
  );
}
