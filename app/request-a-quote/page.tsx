import { Breadcrumbs } from "@/components/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm";
import Section from "@/components/Section";

export const metadata = {
  title: "Request a Quote",
  description:
    "Share your products, destination, and commercial requirements with Lue & Perez for sourcing, consolidation, export, and manufacturing support.",
};

export default function Page() {
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{ href: "/request-a-quote", label: "Request a Quote" }]} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_320px]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Commercial inquiry</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Request a quote</h1>
          <p className="mt-4 max-w-2xl text-slate-600 md:text-lg">
            Tell us what you need, where it is going, and how you plan to sell it. We will review product fit, export readiness, and the logistics path before responding with next steps.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <QuoteForm />
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">What to include</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Products or categories you want sourced or exported</li>
            <li>Approximate order volume and launch timeline</li>
            <li>Destination country or retail market</li>
            <li>Packaging, labeling, or private-label requirements</li>
            <li>Any certifications or cold-chain constraints</li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}
