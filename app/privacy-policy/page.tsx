"use client";

import { useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "info-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "sharing", title: "Sharing & Disclosure" },
  { id: "security", title: "Data Security" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "rights", title: "Your Rights" },
  { id: "compliance", title: "Compliance" },
  { id: "updates", title: "Policy Updates" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPage() {
  const [active, setActive] = useState("intro");

  return (
    <main className="flex max-w-6xl mx-auto p-8 gap-8">
      {/* Sidebar */}
      <aside className="w-64 border-r pr-4 sticky top-8 h-fit">
        <h2 className="font-semibold text-lg mb-4">Privacy Menu</h2>
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
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p>
            This Privacy Policy explains how <strong>Lue & Perez Marketing & Distribution</strong>
            (“we,” “our,” “us”) collects, uses, and safeguards your personal and business
            information when interacting with our website and services.
          </p>
        </section>

        <section id="info-we-collect">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc ml-6">
            <li>Business contact details (name, email, phone, address)</li>
            <li>Payment details processed securely via PayPal</li>
            <li>Communications sent to our team (emails, forms)</li>
            <li>Website usage data (cookies, analytics)</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
          <ul className="list-disc ml-6">
            <li>To fulfill and manage orders and invoices</li>
            <li>To process secure payments</li>
            <li>To comply with regulatory and tax requirements</li>
            <li>To improve our services and communication</li>
          </ul>
        </section>

        <section id="sharing">
          <h2 className="text-2xl font-semibold mb-2">Sharing & Disclosure</h2>
          <p>
            We do not sell or rent your information. Data may be shared with service providers
            (e.g., PayPal, logistics partners) strictly for order fulfillment and compliance
            purposes.
          </p>
        </section>

        <section id="security">
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>
            All payments are processed through <strong>PayPal</strong> and never stored on our
            servers. We use industry-standard security measures to protect your information.
          </p>
        </section>

        <section id="cookies">
          <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking</h2>
          <p>
            Our website may use cookies and analytics tools to improve functionality and measure
            engagement. You may disable cookies in your browser, though some features may be
            limited.
          </p>
        </section>

        <section id="rights">
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data by contacting us.
            Depending on your jurisdiction, you may have additional rights under applicable privacy
            laws.
          </p>
        </section>

        <section id="compliance">
          <h2 className="text-2xl font-semibold mb-2">Compliance</h2>
          <p>
            We comply with applicable data protection laws in Trinidad & Tobago, Canada, and other
            jurisdictions where we operate. PayPal maintains PCI DSS compliance for payment
            processing.
          </p>
        </section>

        <section id="updates">
          <h2 className="text-2xl font-semibold mb-2">Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Updates will be posted on this
            page with the revised date.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            Questions regarding this Privacy Policy can be directed to{" "}
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
