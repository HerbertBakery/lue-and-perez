import { Breadcrumbs } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqItems } from "@/lib/siteContent";

export const metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Caribbean sourcing, consolidation, export logistics, private label support, and quote readiness.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="faq" />
      <SeoJsonLd json={faqJsonLd} />
      <Breadcrumbs items={[{ href: "/faq", label: "FAQ" }]} />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">FAQ</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Common questions from B2B buyers</h1>
        <p className="mt-4 text-slate-600 md:text-lg">
          These are the questions buyers typically ask before requesting a quote, building a sourcing shortlist, or preparing a Caribbean export program.
        </p>
      </div>
      <div className="mt-8 max-w-4xl">
        <FaqList items={faqItems} />
      </div>
    </Section>
  );
}
