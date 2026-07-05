import { Breadcrumbs } from "@/components/Breadcrumbs";
import CaseStudyCard from "@/components/CaseStudyCard";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
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
          <CaseStudyCard key={study.slug} location="case_studies_index" study={study} />
        ))}
      </div>
    </Section>
  );
}
