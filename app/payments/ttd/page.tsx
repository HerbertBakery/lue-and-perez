"use client";

const BANK = {
  name: process.env.NEXT_PUBLIC_TTD_BANK_NAME || "—",
  accountName: process.env.NEXT_PUBLIC_TTD_ACCOUNT_NAME || "—",
  accountNumber: process.env.NEXT_PUBLIC_TTD_ACCOUNT_NUMBER || "—",
  branch: process.env.NEXT_PUBLIC_TTD_BRANCH || "—",
  transit: process.env.NEXT_PUBLIC_TTD_TRANSIT || "—",
  swift: process.env.NEXT_PUBLIC_TTD_SWIFT_OR_ROUTING || "",
  beneficiaryAddress: process.env.NEXT_PUBLIC_TTD_BENEFICIARY_ADDRESS || "—",
  bankAddress: process.env.NEXT_PUBLIC_TTD_BANK_ADDRESS || "—",
  notes: process.env.NEXT_PUBLIC_TTD_NOTES || "",
};

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_PAYMENTS_EMAIL || "";

function copy(text: string) {
  navigator.clipboard.writeText(text);
}

export default function TtdBankPage() {
  const allDetails = [
    "Lue & Perez — TTD Bank Transfer",
    `Bank: ${BANK.name}`,
    `Account name: ${BANK.accountName}`,
    `Account number: ${BANK.accountNumber}`,
    `Branch: ${BANK.branch}`,
    `Transit #: ${BANK.transit}`,
    BANK.swift ? `SWIFT / Routing: ${BANK.swift}` : "",
    `Beneficiary Address: ${BANK.beneficiaryAddress}`,
    `Bank Address: ${BANK.bankAddress}`,
    BANK.notes ? `Notes: ${BANK.notes}` : "",
  ].filter(Boolean).join("\n");

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Bank Transfer (TTD)</h1>
      <p className="text-gray-700">
        Use the details below to send a <strong>local Trinidad &amp; Tobago Dollars (TTD)</strong> bank transfer.
        Please include your <strong>invoice number</strong> in the payment reference.
      </p>

      <section className="border rounded-2xl p-5 bg-white space-y-3">
        <h2 className="text-xl font-medium">Bank details</h2>

        <ul className="divide-y">
          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Bank</div>
              <div className="font-medium">{BANK.name}</div>
            </div>
            <button onClick={() => copy(BANK.name)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Account name</div>
              <div className="font-medium">{BANK.accountName}</div>
            </div>
            <button onClick={() => copy(BANK.accountName)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Account number</div>
              <div className="font-medium tracking-wider">{BANK.accountNumber}</div>
            </div>
            <button onClick={() => copy(BANK.accountNumber)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Branch</div>
              <div className="font-medium">{BANK.branch}</div>
            </div>
            <button onClick={() => copy(BANK.branch)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Transit #</div>
              <div className="font-medium">{BANK.transit}</div>
            </div>
            <button onClick={() => copy(BANK.transit)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          {BANK.swift && (
            <li className="py-2 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-500">SWIFT / Routing</div>
                <div className="font-medium">{BANK.swift}</div>
              </div>
              <button onClick={() => copy(BANK.swift)} className="border rounded px-3 py-1 text-sm">Copy</button>
            </li>
          )}

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Beneficiary Address</div>
              <div className="font-medium">{BANK.beneficiaryAddress}</div>
            </div>
            <button onClick={() => copy(BANK.beneficiaryAddress)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>

          <li className="py-2 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Bank Address</div>
              <div className="font-medium">{BANK.bankAddress}</div>
            </div>
            <button onClick={() => copy(BANK.bankAddress)} className="border rounded px-3 py-1 text-sm">Copy</button>
          </li>
        </ul>

        {BANK.notes && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Notes:</span> {BANK.notes}
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
          <li>Amount: as shown on your invoice (TTD).</li>
          <li>Reference: include your <strong>invoice number</strong> or project name.</li>
          <li>
            Send a payment confirmation/receipt to{" "}
            {CONTACT_EMAIL ? <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> : "our email on your invoice"}.
          </li>
        </ol>
      </section>
    </main>
  );
}
