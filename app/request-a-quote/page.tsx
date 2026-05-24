import CapabilitiesLink from "@/components/CapabilitiesLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import QuoteForm from "@/components/QuoteForm";
import Section from "@/components/Section";
import { quoteChecklist, quoteExpectations } from "@/lib/siteContent";

export const metadata = {
  title: "Request a Quote",
  description:
    "Share your products, destination, and commercial requirements with Lue & Perez for sourcing, consolidation, export, and manufacturing support.",
};

export default function Page() {
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{ href: "/request-a-quote", label: "Request a Quote" }]} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_340px]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Commercial inquiry</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Request a quote</h1>
          <p className="mt-4 max-w-2xl text-slate-600 md:text-lg">
            Share the products, destination market, volume, and timeline.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-700">
            Qualified B2B inquiries typically receive a response within two business days.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <QuoteForm />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">What to include</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {quoteChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <h2 className="text-lg font-semibold">What happens next</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              {quoteExpectations.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Buyer support</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">Need a one-page overview first?</h2>
            <CapabilitiesLink
              context="quote_sidebar"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-teal-700 hover:text-teal-700"
            />
          </div>
        </aside>
      </div>
    </Section>
  );
}
