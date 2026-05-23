import Image from "next/image";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import type { CaseStudyContent } from "@/lib/siteContent";

export function buildCaseStudyMetadata(caseStudy: CaseStudyContent): Metadata {
  return {
    title: `${caseStudy.title} - Lue & Perez`,
    description: caseStudy.summary,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} - Lue & Perez`,
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

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-start">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{caseStudy.market}</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{caseStudy.title}</h1>
          <p className="mt-4 text-slate-600 md:text-lg">{caseStudy.summary}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {caseStudy.snapshot.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Outcome highlight</div>
          <p className="mt-3 text-lg font-semibold leading-7 text-white">{caseStudy.highlight}</p>
          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Client type</div>
            <div className="mt-2 text-sm font-medium text-white">{caseStudy.clientType}</div>
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Related capability</div>
            <div className="mt-2 text-sm font-medium text-white">{caseStudy.service}</div>
          </div>
        </aside>
      </div>

      <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
        <Image src={caseStudy.image.src} alt={caseStudy.image.alt} fill sizes="100vw" className="object-cover" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Challenge</div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{caseStudy.challenge}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Why it mattered</div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{caseStudy.relevance}</p>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">How Lue & Perez supported the project</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              {caseStudy.approach.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Business result</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {caseStudy.outcomes.map((item) => (
                <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-sm">
        <h2 className="text-2xl font-semibold">Working on a similar program?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
          Share the destination market, product mix, and operating constraints. The response will focus on execution risks, commercial fit, and the cleanest next step.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedLink
            href="/request-a-quote"
            eventName="case_study_cta_click"
            eventParams={{ case_study: caseStudy.slug, destination: "/request-a-quote" }}
            className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Discuss a Similar Project
          </TrackedLink>
        </div>
      </div>
    </Section>
  );
}
