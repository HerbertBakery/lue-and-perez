import Image from "next/image";

import FaqList from "@/components/FaqList";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedLink from "@/components/TrackedLink";
import VideoHero from "@/components/VideoHero";
import {
  caseStudies,
  faqItems,
  services,
  trustSignals,
} from "@/lib/siteContent";

export default function HomePage() {
  const featuredServices = services.slice(0, 4);
  const featuredFaqs = faqItems.slice(0, 4);
  const buyerSegments = [
    "Importers",
    "Distributors",
    "Retail Programs",
    "Private Label Teams",
  ];
  const capabilityMedia: Record<
    string,
    {
      src: string;
      alt: string;
    }
  > = {
    "export-logistics": {
      src: "/media/cold-chain.jpg",
      alt: "Cold-chain product handling ready for export",
    },
    consolidation: {
      src: "/media/multi-supplier-pickups.jpg",
      alt: "Multi-supplier consolidation workflow",
    },
    sourcing: {
      src: "/media/supplier-discovery.jpg",
      alt: "Supplier discovery and product sourcing work",
    },
    manufacturing: {
      src: "/media/co-packing-private-label.jpg",
      alt: "Co-packing and private label production",
    },
  };

  return (
    <main className="flex flex-col">
      <ScrollDepthTracker pageName="home" />

      <VideoHero
        mp4Src="/media/hero-wide.mp4"
        webmSrc="/media/hero-wide.webm"
        poster="/media/hero-wide.jpg"
        headline="Caribbean sourcing and export execution for serious B2B buyers"
        subhead="Source, consolidate, document, and move Caribbean food programs with tighter operational control."
      />

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">What moves well</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Programs that need product, packaging, and execution in the same conversation
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Buyers should see the kind of product, handling, and commercial readiness they can expect before the first call.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustSignals.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{item.label}</p>
                  <p className="mt-2 text-base font-semibold leading-6 text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/request-a-quote"
                eventName="quote_cta_click"
                eventParams={{ location: "home_visual_intro" }}
                className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Request a Quote
              </TrackedLink>
              <TrackedLink
                href="/services"
                eventName="service_index_click"
                eventParams={{ location: "home_visual_intro" }}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400"
              >
                Explore Services
              </TrackedLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:row-span-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/media/homepage/caribbean-rice-plate.jpg"
                  alt="Prepared Caribbean rice and fish plating beside packaged rice"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">Market-ready</p>
                <p className="mt-1 text-sm font-medium">Product presentation, packaging, and export execution should feel connected.</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/media/homepage/cocoa-dark-chocolate.jpg"
                  alt="Branded Caribbean chocolate product shot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
              <div className="aspect-[4/3]">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/media/supplier-discovery.jpg"
                  preload="metadata"
                  aria-label="Supplier discovery video"
                >
                  <source src="/media/supplier-discovery.webm" type="video/webm" />
                  <source src="/media/supplier-discovery.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="aspect-[16/10]">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/media/multi-supplier-pickups.jpg"
                  preload="metadata"
                  aria-label="Multi-supplier pickup and consolidation video"
                >
                  <source src="/media/multi-supplier-pickups.webm" type="video/webm" />
                  <source src="/media/multi-supplier-pickups.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Built for</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Buyers who need execution to look as strong as the product</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
                The strongest programs are not just sourced well. They are packed, documented, staged, and shipped with fewer weak handoffs.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {buyerSegments.map((segment) => (
                  <div key={segment} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-base font-semibold text-white">{segment}</p>
                  </div>
                ))}
              </div>
            </div>
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
                These are the operating workstreams behind export programs that need to launch cleanly and replenish reliably.
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
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:border-teal-700"
              >
                <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
                  <Image
                    src={capabilityMedia[service.key].src}
                    alt={capabilityMedia[service.key].alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{service.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">In motion</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Packaging, cold chain, and product presentation matter at every handoff</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Serious buyers move faster when the handling, product format, and export-readiness are already visible.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Ambient", "Chilled", "Frozen", "Private Label"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/media/homepage/sweet-potato-pasta.jpg"
                  alt="Packaged sweet potato pasta product lineup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950">
              <div className="aspect-[4/5]">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/media/cold-chain.jpg"
                  preload="metadata"
                  aria-label="Cold-chain handling video"
                >
                  <source src="/media/cold-chain.webm" type="video/webm" />
                  <source src="/media/cold-chain.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Proof of fit</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Selected project examples</h2>
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
                Share the destination market, product scope, estimated volume, and timeline so the response can start at the commercial brief, not at square one.
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
