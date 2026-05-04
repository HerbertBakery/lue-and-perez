import Image from "next/image";

import CapabilitiesLink from "@/components/CapabilitiesLink";
import FaqList from "@/components/FaqList";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedLink from "@/components/TrackedLink";
import VideoHero from "@/components/VideoHero";
import VideoBlock from "@/components/VideoBlock";
import {
  buyerProfiles,
  caseStudies,
  faqItems,
  operatingPillars,
  services,
  trustSignals,
} from "@/lib/siteContent";

export default function HomePage() {
  const featuredServices = services.slice(0, 4);
  const featuredFaqs = faqItems.slice(0, 4);

  return (
    <main className="flex flex-col">
      <ScrollDepthTracker pageName="home" />

      <VideoHero
        mp4Src="/media/hero-wide.mp4"
        webmSrc="/media/hero-wide.webm"
        poster="/media/hero-wide.jpg"
        headline="Caribbean sourcing and export execution for serious B2B buyers"
        subhead="Lue & Perez helps distributors, importers, and private-label programs source, consolidate, document, and move Caribbean food products into market with stronger operational control."
      />

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {trustSignals.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Capabilities sheet</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">A simple B2B leave-behind for buyer teams</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Download a concise overview of markets served, operating scope, and the kind of programs Lue & Perez is built to support.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <CapabilitiesLink
                context="home_trust_strip"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-teal-700 hover:text-teal-700"
              />
              <TrackedLink
                href="/request-a-quote"
                eventName="quote_cta_click"
                eventParams={{ location: "home_trust_strip" }}
                className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Request a Quote
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Who this is for</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Built for buyers who need operating confidence, not just supplier access</h2>
            <p className="mt-4 text-slate-600 md:text-lg">
              The commercial value is not just product availability. It is the ability to connect sourcing, export readiness, packaging, logistics, and market requirements into one clearer path.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {buyerProfiles.map((profile) => (
              <div key={profile.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-lg font-semibold">{profile.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Why buyers choose Lue & Perez</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The operating value is in the handoffs</h2>
            <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
              Most import problems are not caused by a lack of suppliers. They come from poor alignment between product fit, packaging, documentation, timing, and freight execution.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {operatingPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{pillar.description}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                  {pillar.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Core capabilities</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What buyers actually need help with</h2>
              <p className="mt-4 text-slate-600 md:text-lg">
                These are the operating workstreams behind Caribbean food programs that need to launch cleanly, replenish reliably, and scale with fewer avoidable surprises.
              </p>
            </div>
            <TrackedLink
              href="/services"
              eventName="service_index_click"
              eventParams={{ location: "home_header" }}
              className="hidden text-sm font-semibold text-teal-700 hover:text-teal-800 md:inline-flex"
            >
              View all services
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featuredServices.map((service) => (
              <TrackedLink
                key={service.key}
                href={service.href}
                eventName="service_card_click"
                eventParams={{ service: service.key, location: "home" }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{service.eyebrow}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {service.outcomes.slice(0, 2).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <VideoBlock
        title="Cold-chain execution that respects the commercial stakes"
        description="Temperature-sensitive products live or die on handling discipline, routing, and documentation. The goal is to preserve product quality and protect commercial usability at destination."
        mp4Src="/media/cold-chain.mp4"
        webmSrc="/media/cold-chain.webm"
        poster="/media/cold-chain.jpg"
      />

      <section className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Proof of fit</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Selected project examples</h2>
              <p className="mt-4 text-slate-600 md:text-lg">
                These examples show the kinds of buyer-side problems the team is built to solve: lower landed cost, cleaner packaging readiness, stronger cold-chain control, and more reliable replenishment.
              </p>
            </div>
            <TrackedLink
              href="/case-studies"
              eventName="case_studies_index_click"
              eventParams={{ location: "home" }}
              className="hidden text-sm font-semibold text-teal-700 hover:text-teal-800 md:inline-flex"
            >
              View all case studies
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            {caseStudies.map((study) => (
              <TrackedLink
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                eventName="case_study_open"
                eventParams={{ case_study: study.slug, location: "home" }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-teal-700"
              >
                <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
                  <Image src={study.image.src} alt={study.image.alt} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                      {study.market}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                      {study.service}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{study.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-500">{study.clientType}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{study.summary}</p>
                  <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800">
                    {study.highlight}
                  </p>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Common pre-quote questions</h2>
          </div>
          <div className="mt-8">
            <FaqList items={featuredFaqs} />
          </div>
          <TrackedLink
            href="/faq"
            eventName="faq_page_click"
            eventParams={{ location: "home" }}
            className="mt-6 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            View all FAQ
          </TrackedLink>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-950 px-5 py-8 text-white shadow-sm sm:px-6 md:px-10 md:py-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Next step</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">If the program is commercially serious, start with a qualified quote request</h2>
              <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
                Share the destination market, product scope, estimated volume, and timeline. That gives Lue & Perez enough context to respond like an operator, not just a brochure site.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/request-a-quote"
                eventName="quote_cta_click"
                eventParams={{ location: "home_bottom" }}
                className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
              >
                Request a Quote
              </TrackedLink>
              <TrackedLink
                href="/about"
                eventName="about_page_click"
                eventParams={{ location: "home_bottom" }}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Learn How We Work
              </TrackedLink>
              <CapabilitiesLink
                context="home_bottom"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
