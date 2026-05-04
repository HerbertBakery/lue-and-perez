"use client";

import { useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "eligibility", title: "Eligibility" },
  { id: "orders", title: "Orders & Payments" },
  { id: "shipping", title: "Shipping & Delivery" },
  { id: "refunds", title: "Refunds & Cancellations" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "compliance", title: "Compliance & Export" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  const [active, setActive] = useState("intro");

  return (
    <main className="flex max-w-6xl mx-auto p-8 gap-8">
      {/* Sidebar */}
      <aside className="w-64 border-r pr-4 sticky top-8 h-fit">
        <h2 className="font-semibold text-lg mb-4">Terms Menu</h2>
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className={`block px-2 py-1 rounded hover:bg-gray-100 ${
                  active === s.id ? "font-semibold text-teal-700" : "text-gray-700"
                }`}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <div className="flex-1 space-y-12">
        <section id="intro">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p>
            These Terms of Service (“Terms”) govern your access to and use of products and services
            provided by <strong>Lue & Perez Marketing & Distribution</strong> (“we,” “our,” or “us”).
            By engaging with us, you agree to these Terms.
          </p>
        </section>

        <section id="eligibility">
          <h2 className="text-2xl font-semibold mb-2">Eligibility</h2>
          <p>
            Our services are intended for businesses and professional entities. By placing orders,
            you confirm you are authorized to act on behalf of your organization.
          </p>
        </section>

        <section id="orders">
          <h2 className="text-2xl font-semibold mb-2">Orders & Payments</h2>
          <p>
            Orders become binding upon confirmation. All invoices are due according to agreed
            payment terms. Payments may be processed securely via PayPal or approved wire transfer.
          </p>
        </section>

        <section id="shipping">
          <h2 className="text-2xl font-semibold mb-2">Shipping & Delivery</h2>
          <p>
            Delivery timelines are estimates only. We are not liable for delays caused by carriers,
            customs, or unforeseen events. Title and risk of loss pass upon shipment.
          </p>
        </section>

        <section id="refunds">
          <h2 className="text-2xl font-semibold mb-2">Refunds & Cancellations</h2>
          <p>
            Cancellations must be requested in writing within 24 hours of order confirmation. Refunds
            are issued at our discretion for defective or non-conforming goods. PayPal processing
            fees may be non-refundable.
          </p>
        </section>

        <section id="liability">
          <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
          <p>
            Our liability is limited to the value of the goods or services purchased. We are not
            liable for indirect, incidental, or consequential damages.
          </p>
        </section>

        <section id="compliance">
          <h2 className="text-2xl font-semibold mb-2">Compliance & Export</h2>
          <p>
            Customers are responsible for compliance with all applicable import/export regulations
            and certifications for their jurisdictions.
          </p>
        </section>

        <section id="governing-law">
          <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
          <p>
            These Terms are governed by the laws of <strong>Trinidad & Tobago</strong>, without
            regard to conflict of law provisions.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            Questions regarding these Terms can be directed to{" "}
            <a href="mailto:info@lueandperez.com" className="text-teal-700 underline">
              info@lueandperez.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
