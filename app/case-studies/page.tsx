import Image from "next/image";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import { caseStudies } from "@/lib/siteContent";

export const metadata = { title: "Case Studies - Lue & Perez" };

export default function CaseStudies() {
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="case-studies" />
      <Breadcrumbs items={[{ href: "/case-studies", label: "Case Studies" }]} />

      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Case studies</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Examples of how buyer-side problems get solved</h1>
        <p className="mt-3 text-slate-600 md:text-lg">
          These examples are shaped around operating outcomes that matter in B2B trade: cost structure, shelf-life usability, packaging readiness, and route discipline.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {caseStudies.map((study) => (
          <TrackedLink
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            eventName="case_study_open"
            eventParams={{ case_study: study.slug, location: "case_studies_index" }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-teal-700"
          >
            <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
              <Image src={study.image.src} alt={study.image.alt} fill sizes="(max-width: 1279px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                  {study.market}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {study.service}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">{study.title}</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">{study.clientType}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{study.summary}</p>
              <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800">
                {study.highlight}
              </p>
            </div>
          </TrackedLink>
        ))}
      </div>
    </Section>
  );
}
