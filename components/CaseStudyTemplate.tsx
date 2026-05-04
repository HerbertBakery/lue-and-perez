import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import type { CaseStudyContent } from "@/lib/siteContent";

export function buildCaseStudyMetadata(caseStudy: CaseStudyContent): Metadata {
  return {
    title: `${caseStudy.title} — Lue & Perez`,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} — Lue & Perez`,
      description: caseStudy.summary,
      url: `/case-studies/${caseStudy.slug}`,
      type: "article",
    },
  };
}

export default function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudyContent }) {
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName={`case-study:${caseStudy.slug}`} />
      <Breadcrumbs
        items={[
          { href: "/case-studies", label: "Case Studies" },
          { href: `/case-studies/${caseStudy.slug}`, label: caseStudy.title },
        ]}
      />

      <div className="mt-4 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{caseStudy.market}</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{caseStudy.title}</h1>
        <p className="mt-4 text-slate-600 md:text-lg">{caseStudy.summary}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Client type</div>
            <div className="mt-2 text-sm font-medium text-slate-900">{caseStudy.clientType}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Market</div>
            <div className="mt-2 text-sm font-medium text-slate-900">{caseStudy.market}</div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Challenge</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{caseStudy.challenge}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">How Lue & Perez supported the project</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {caseStudy.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Business result</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {caseStudy.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-700">{caseStudy.relevance}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-sm">
        <h2 className="text-2xl font-semibold">Working on a similar program?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
          Share the destination market, product mix, and operating constraints. We’ll tell you where the real execution risks are and how we would approach them.
        </p>
        <TrackedLink
          href="/request-a-quote"
          eventName="case_study_cta_click"
          eventParams={{ case_study: caseStudy.slug, destination: "/request-a-quote" }}
          className="mt-6 inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Discuss a Similar Project
        </TrackedLink>
      </div>
    </Section>
  );
}
