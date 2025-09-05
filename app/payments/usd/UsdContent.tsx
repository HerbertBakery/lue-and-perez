"use client";

import { useSearchParams } from "next/navigation";

const USD = {
  bankName: process.env.NEXT_PUBLIC_USD_BANK_NAME || "—",
  accountName: process.env.NEXT_PUBLIC_USD_ACCOUNT_NAME || "—",
  accountNumber: process.env.NEXT_PUBLIC_USD_ACCOUNT_NUMBER || "—",
  routingOrSwift: process.env.NEXT_PUBLIC_USD_ROUTING_OR_SWIFT || "",
  iban: process.env.NEXT_PUBLIC_USD_IBAN || "",
  beneficiaryAddress: process.env.NEXT_PUBLIC_USD_BENEFICIARY_ADDRESS || "—",
  bankAddress: process.env.NEXT_PUBLIC_USD_BANK_ADDRESS || "—",
  notes: process.env.NEXT_PUBLIC_USD_NOTES || "",
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_PAYMENTS_EMAIL || "";

function copy(text: string) {
  navigator.clipboard.writeText(text);
}

export default function UsdContent() {
  // Keeping this here so if you rely on URL params, it’s safe and inside Suspense.
  const search = useSearchParams();
  // (Optional) Example usage, not required:
  const ref = search.get("ref") || "";

  const allDetails = [
    "Lue & Perez — USD Bank Transfer",
    `Bank: ${USD.bankName}`,
    `Account name: ${USD.accountName}`,
    `Account number: ${USD.accountNumber}`,
    USD.routingOrSwift ? `Routing / SWIFT: ${USD.routingOrSwift}` : "",
    USD.iban ? `IBAN: ${USD.iban}` : "",
    `Beneficiary Address: ${USD.beneficiaryAddress}`,
    `Bank Address: ${USD.bankAddress}`,
    USD.notes ? `Notes: ${USD.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Bank Transfer (USD)</h1>
        <p className="text-gray-700">
          Use these instructions to pay in <strong>US Dollars (USD)</strong>.
          Please include your <strong>invoice number</strong>
          {ref ? ` (${ref})` : ""} in the payment reference.
        </p>
      </header>

      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Bank details</h2>

        <ul className="divide-y">
          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Bank</div>
              <div className="font-medium">{USD.bankName}</div>
            </div>
            <button onClick={() => copy(USD.bankName)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Account name</div>
              <div className="font-medium">{USD.accountName}</div>
            </div>
            <button onClick={() => copy(USD.accountName)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Account number</div>
              <div className="font-medium tracking-wider">{USD.accountNumber}</div>
            </div>
            <button onClick={() => copy(USD.accountNumber)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          {!!USD.routingOrSwift && (
            <li className="py-2 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">Routing / SWIFT</div>
                <div className="font-medium">{USD.routingOrSwift}</div>
              </div>
              <button onClick={() => copy(USD.routingOrSwift)} className="border rounded px-3 py-1 text-sm">Copy</button>
            </li>
          )}

          {!!USD.iban && (
            <li className="py-2 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">IBAN</div>
                <div className="font-medium">{USD.iban}</div>
              </div>
              <button onClick={() => copy(USD.iban)} className="border rounded px-3 py-1 text-sm">Copy</button>
            </li>
          )}

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Beneficiary Address</div>
              <div className="font-medium">{USD.beneficiaryAddress}</div>
            </div>
            <button onClick={() => copy(USD.beneficiaryAddress)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Bank Address</div>
              <div className="font-medium">{USD.bankAddress}</div>
            </div>
            <button onClick={() => copy(USD.bankAddress)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>
        </ul>

        {USD.notes && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Notes:</span> {USD.notes}
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={() => copy(allDetails)} className="px-4 py-2 rounded-2xl bg-black text-white">
            Copy all details
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 rounded-2xl border">
            Print instructions
          </button>
        </div>
      </section>

      <section className="border rounded-2xl p-5 bg-white">
        <h2 className="text-lg font-medium mb-2">How to pay</h2>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
          <li>Add <strong>Lue &amp; Perez</strong> as a payee in your banking app.</li>
          <li>Enter the bank details above exactly as shown.</li>
          <li>Amount: as shown on your invoice (USD).</li>
          <li>Reference: include your <strong>invoice number</strong>{ref ? ` (${ref})` : ""}.</li>
          <li>
            Send a payment confirmation/receipt to{" "}
            {CONTACT_EMAIL ? (
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            ) : (
              "our email on your invoice"
            )}.
          </li>
        </ol>
      </section>
    </main>
  );
}
