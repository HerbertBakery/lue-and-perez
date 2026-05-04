import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import { aboutHighlights, buyerProfiles, capabilityHighlights } from "@/lib/siteContent";

export const metadata = {
  title: "About",
  description:
    "Learn how Lue & Perez supports buyers with sourcing, consolidation, export logistics, and private-label execution across Caribbean food categories.",
};

export default function AboutPage() {
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="about" />
      <Breadcrumbs items={[{ href: "/about", label: "About" }]} />

      <div className="mt-4 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">About</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">A B2B Caribbean export partner built for operational clarity</h1>
        <p className="mt-4 text-slate-600 md:text-lg">
          Lue & Perez supports buyers that need more than a supplier introduction. The work sits at the point where sourcing, export execution, compliance, and commercial launch planning all overlap.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {aboutHighlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Who we support</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {buyerProfiles.map((buyer) => (
              <div key={buyer.title} className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900">{buyer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{buyer.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-semibold">Capabilities buyers rely on</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
            {capabilityHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">How we approach a new opportunity</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            "Clarify market, volume, and category requirements.",
            "Test sourcing, documentation, and logistics feasibility.",
            "Recommend the cleanest path to quote, launch, or scale.",
          ].map((step, index) => (
            <li key={step} className="rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Step {index + 1}</div>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <TrackedLink
        href="/request-a-quote"
        eventName="about_cta_click"
        eventParams={{ destination: "/request-a-quote" }}
        className="mt-10 inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
      >
        Start a Qualified Quote Request
      </TrackedLink>
    </Section>
  );
}
