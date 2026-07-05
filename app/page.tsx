import Image from "next/image";

import CaseStudyCard from "@/components/CaseStudyCard";
import FaqList from "@/components/FaqList";
import LoopingVideo from "@/components/LoopingVideo";
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
      imageClassName?: string;
      panelClassName?: string;
    }
  > = {
    "export-logistics": {
      src: "/media/brand/export-logistics-pallet.jpg",
      alt: "Export-ready pallet staging inside a warehouse for logistics planning",
    },
    consolidation: {
      src: "/media/brand/consolidation-snacks.jpg",
      alt: "Retail snack assortment on shelf for consolidation planning across packaged products",
    },
    sourcing: {
      src: "/media/services/sourcing-breakfast-soursop.jpg",
      alt: "Breakfast setting with branded soursop pancake syrup for sourcing conversations",
      imageClassName: "object-cover object-center",
      panelClassName: "bg-slate-100",
    },
    manufacturing: {
      src: "/media/brand/manufacturing-scorpion-nuts.jpg",
      alt: "Scorpion pepper nuts product packaging prepared for manufacturing support",
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
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:gap-8 md:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">What moves well</p>
            <h2 className="mt-2 max-w-[12ch] text-2xl font-bold tracking-tight text-slate-900 sm:max-w-3xl sm:text-3xl md:text-4xl">
              Programs that need product, packaging, and execution in the same conversation
            </h2>
            <p className="mt-4 hidden max-w-2xl text-sm leading-6 text-slate-600 sm:block md:text-base">
              Product, packaging, and execution in one view.
            </p>

            <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
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
                className="hidden items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 sm:inline-flex"
              >
                Request a Quote
              </TrackedLink>
              <TrackedLink
                href="/services"
                eventName="service_index_click"
                eventParams={{ location: "home_visual_intro" }}
                className="hidden items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 sm:inline-flex"
              >
                Explore Services
              </TrackedLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:col-span-1 sm:row-span-2 sm:min-h-full">
              <div className="relative aspect-[16/11] sm:h-full sm:aspect-auto">
                <LoopingVideo
                  className="h-full w-full object-cover"
                  poster="/media/fresh/home-supplier-discovery.jpg"
                  mp4Src="/media/fresh/home-supplier-discovery.mp4"
                  ariaLabel="Supplier discovery and product review video"
                  priority
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-square sm:aspect-[4/3]">
                <Image
                  src="/logo.png"
                  alt="Lue & Perez official logo"
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-contain p-6 sm:p-8"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative aspect-square sm:aspect-[4/3]">
                <LoopingVideo
                  className="h-full w-full object-cover"
                  poster="/media/fresh/partnerships.jpg"
                  mp4Src="/media/fresh/partnerships.mp4"
                  ariaLabel="Caribbean partnerships and product presentation video"
                />
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
                <LoopingVideo
                  className="h-full w-full object-cover"
                  poster="/media/multi-supplier-pickups.jpg"
                  mp4Src="/media/multi-supplier-pickups.mp4"
                  webmSrc="/media/multi-supplier-pickups.webm"
                  ariaLabel="Multi-supplier pickup and consolidation video"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Built for</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Buyers who need execution to look as strong as the product</h2>
              <p className="mt-4 hidden max-w-2xl text-sm leading-6 text-white/75 sm:block md:text-base">
                Packed, documented, staged, and shipped with discipline.
              </p>

              <div className="mt-6 hidden gap-3 sm:grid sm:grid-cols-2">
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
              <p className="mt-4 hidden text-slate-600 sm:block md:text-lg">
                Sourcing, consolidation, export logistics, and manufacturing support.
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
                <div
                  className={`relative aspect-[16/10] border-b border-slate-200 ${
                    capabilityMedia[service.key].panelClassName ?? "bg-slate-100"
                  }`}
                >
                  <Image
                    src={capabilityMedia[service.key].src}
                    alt={capabilityMedia[service.key].alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className={capabilityMedia[service.key].imageClassName ?? "object-cover"}
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{service.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 hidden text-sm leading-6 text-slate-600 sm:block">{service.summary}</p>
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
            <p className="mt-4 hidden max-w-2xl text-sm leading-6 text-slate-600 sm:block md:text-base">
              Shelf-ready packaging and disciplined handling shorten buyer conversations.
            </p>
            <div className="mt-6 hidden flex-wrap gap-2 sm:flex">
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

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:col-span-2">
              <div className="relative aspect-[16/10]">
                <LoopingVideo
                  className="h-full w-full object-cover"
                  poster="/media/fresh/home-cold-chain.jpg"
                  mp4Src="/media/fresh/home-cold-chain.mp4"
                  ariaLabel="Cold-chain handling and product presentation video"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-slate-950/75 to-transparent px-4 py-4 text-white sm:block sm:px-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">Shelf to shipment</p>
                <p className="mt-1 max-w-md text-sm font-medium">Presentation and packaging should already support the buyer conversation.</p>
              </div>
            </div>

            <div className="relative hidden overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:block">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/media/homepage/slushie-syrup-guava.jpg"
                  alt="Branded guava slushie syrup promotional image"
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-fill"
                />
              </div>
            </div>

            <div className="relative hidden overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:block">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/media/services/simple-syrup-lineup.jpg"
                  alt="Branded simple syrup poster creative"
                  fill
                  sizes="(max-width: 639px) 100vw, 50vw"
                  className="object-fill"
                />
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

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} location="home" study={study} />
            ))}
          </div>
        </div>
      </section>

      <section className="hidden py-12 sm:block md:py-16">
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
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Start a quote request</h2>
              <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
                Share the destination market, product scope, estimated volume, and timeline.
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
                className="hidden items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 sm:inline-flex"
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
