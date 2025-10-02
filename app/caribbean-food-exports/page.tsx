// app/caribbean-food-exports/page.tsx
import type { Metadata } from "next";
import Section from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Caribbean Food Exports — Lue & Perez",
  description:
    "End-to-end Caribbean food exports: sourcing, multi-supplier consolidation, cold-chain logistics, co-packing/private label, and documentation.",
  alternates: { canonical: "/caribbean-food-exports" },
  openGraph: {
    title: "Caribbean Food Exports — Lue & Perez",
    description:
      "Sourcing, consolidation, cold-chain logistics, and private label for Caribbean food exports.",
    url: "/caribbean-food-exports",
    type: "article",
  },
};

export default function CaribbeanFoodExportsPage() {
  const faqs = [
    {
      q: "Which Caribbean products do you export?",
      a: "Shelf-stable, refrigerated, and frozen foods: sauces, seasonings, beverages, bakery, snacks, and specialty items.",
    },
    {
      q: "Do you consolidate multi-supplier pickups?",
      a: "Yes. We plan routes, coordinate pickups across producers, run QA, and build export-ready loads with complete documents.",
    },
    {
      q: "Can you support private label/co-packing?",
      a: "We handle recipe standardization, packaging specs, regulatory/label review, and production scheduling under strict QA.",
    },
    {
      q: "Which markets do you serve?",
      a: "North America, UK/EU, and others—with temperature-controlled lanes and destination-specific compliance.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <Section className="py-12">
      {/* JSON-LD for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { href: "/services", label: "Services" },
          { href: "/caribbean-food-exports", label: "Caribbean Food Exports" },
        ]}
      />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">
        Caribbean Food Exports
      </h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        We help buyers and brands move Caribbean food products globally with
        supplier discovery, multi-supplier consolidation, cold-chain logistics,
        export documentation, and private label/co-packing.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">What We Do</h3>
          <ul className="mt-3 list-disc pl-6 text-slate-600">
            <li>Sourcing & supplier vetting (GMP/HACCP, capacity, pricing)</li>
            <li>Multi-supplier pickups, QA & palletization</li>
            <li>Ambient, chilled & frozen lanes (validated routes)</li>
            <li>Export permits, HS codes & customs documentation</li>
            <li>Co-packing & private label (label/regulatory review)</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Deliverables</h3>
          <ul className="mt-3 list-disc pl-6 text-slate-600">
            <li>Supplier shortlist & price benchmarking</li>
            <li>Pickup plan & consolidation schedule</li>
            <li>Temperature plan and chain-of-custody logs</li>
            <li>Documentation checklist and export pack</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <dl className="mt-4 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border-t pt-4">
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-1 text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="/contact"
        className="mt-10 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800"
      >
        Request a Quote
      </a>
    </Section>
  );
}
