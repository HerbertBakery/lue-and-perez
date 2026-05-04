import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import {
  aboutHighlights,
  authorityPanels,
  buyerProfiles,
  capabilityHighlights,
  operatingPillars,
} from "@/lib/siteContent";

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

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-start">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">About</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">A B2B Caribbean export partner built for commercial and operational clarity</h1>
          <p className="mt-4 text-slate-600 md:text-lg">
            Lue & Perez supports buyers that need more than a supplier introduction. The work sits where sourcing, export execution, compliance, packaging, and launch planning overlap, especially when multiple suppliers or more demanding operating requirements are involved.
          </p>
          <p className="mt-4 text-slate-600 md:text-lg">
            The objective is simple: give importers, distributors, retail programs, and private-label buyers a cleaner path from opportunity to execution.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/request-a-quote"
              eventName="about_cta_click"
              eventParams={{ destination: "/request-a-quote", location: "about_hero" }}
              className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Start a Qualified Quote Request
            </TrackedLink>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">At a glance</p>
          <ul className="mt-4 space-y-4 text-sm leading-6 text-white/80">
            {capabilityHighlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {aboutHighlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
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

        <div className="space-y-4">
          {authorityPanels.map((panel) => (
            <div key={panel.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">{panel.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{panel.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {panel.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">How a serious opportunity usually moves</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            "Clarify the destination market, channel, product scope, and timing.",
            "Test sourcing, documentation, packaging, and logistics feasibility together.",
            "Recommend the cleanest path to quote, launch, or scale with less avoidable friction.",
          ].map((step, index) => (
            <li key={step} className="rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Step {index + 1}</div>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Working style</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The value is in making the handoffs cleaner</h2>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {operatingPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {pillar.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
