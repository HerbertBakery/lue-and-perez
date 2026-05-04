import type { Metadata } from "next";

import CapabilitiesLink from "@/components/CapabilitiesLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import SeoJsonLd from "@/components/SeoJsonLd";
import TrackedLink from "@/components/TrackedLink";
import VideoBlock from "@/components/VideoBlock";
import type { ServiceContent } from "@/lib/siteContent";

export function buildServiceMetadata(service: ServiceContent): Metadata {
  return {
    title: `${service.title} — Lue & Perez`,
    description: service.summary,
    alternates: { canonical: service.href },
    openGraph: {
      title: `${service.title} — Lue & Perez`,
      description: service.summary,
      url: service.href,
      type: "article",
    },
  };
}

export default function ServiceTemplate({ service }: { service: ServiceContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    provider: { "@type": "Organization", name: "Lue & Perez" },
    description: service.summary,
  };

  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName={`service:${service.key}`} />
      <SeoJsonLd json={jsonLd} />
      <Breadcrumbs items={[{ href: "/services", label: "Services" }, { href: service.href, label: service.title }]} />

      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">{service.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{service.title}</h1>
        <p className="mt-4 text-slate-600 md:text-lg">{service.description}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">What’s included</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Ideal for</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            {service.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Common challenges we solve</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            {service.commonChallenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">What a buyer gets</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            {service.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {service.media ? (
        <div className="mt-6">
          <VideoBlock
            title={service.media.title}
            description={service.media.description}
            mp4Src={service.media.mp4Src}
            webmSrc={service.media.webmSrc}
            poster={service.media.poster}
          />
        </div>
      ) : null}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-sm">
        <h2 className="text-2xl font-semibold">Need this capability in your supply chain?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
          Share the market, product categories, and commercial scope you are working toward. We’ll respond with the operating realities and next best step.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedLink
            href="/request-a-quote"
            eventName="service_cta_click"
            eventParams={{ service: service.key, destination: "/request-a-quote" }}
            className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Request a Quote
          </TrackedLink>
          <CapabilitiesLink
            context={`service_${service.key}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          />
        </div>
      </div>
    </Section>
  );
}
