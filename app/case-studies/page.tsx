import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import TrackedLink from '@/components/TrackedLink'
import { caseStudies } from '@/lib/siteContent'

export const metadata = { title: 'Case Studies — Lue & Perez' }

export default function CaseStudies(){
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="case-studies" />
      <Breadcrumbs items={[{href:'/case-studies', label:'Case Studies'}]} />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Case studies</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Examples of how buyer-side problems get solved</h1>
        <p className="mt-3 text-slate-600">
          These examples are shaped around operating outcomes that matter in B2B trade: cost structure, shelf-life usability, packaging readiness, and route discipline.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {caseStudies.map(c => (
          <TrackedLink
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            eventName="case_study_open"
            eventParams={{ case_study: c.slug, location: "case_studies_index" }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{c.market}</p>
            <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-sm font-medium text-slate-500">{c.clientType}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{c.summary}</p>
          </TrackedLink>
        ))}
      </div>
    </Section>
  )
}
