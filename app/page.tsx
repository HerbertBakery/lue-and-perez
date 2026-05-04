import FaqList from "@/components/FaqList";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import TrackedLink from "@/components/TrackedLink";
import VideoHero from "@/components/VideoHero";
import VideoBlock from "@/components/VideoBlock";
import { buyerProfiles, caseStudies, faqItems, services } from "@/lib/siteContent";

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

      <section className="border-y border-slate-200 bg-white/85">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-5 md:grid-cols-4">
          {[
            "Distributor, importer, retail, and private-label support",
            "Ambient, chilled, and frozen export models",
            "North America, UK/EU, Middle East, and CARICOM lanes",
            "Sourcing, consolidation, documentation, and scale-up guidance",
          ].map((item) => (
            <p key={item} className="text-sm font-medium text-slate-700">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Who this is for</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Built for buyers who need operational confidence, not just product access</h2>
            <p className="mt-4 text-slate-600 md:text-lg">
              The website now reflects the core truth of the business: buyers need a regional partner who can connect supply, compliance, packaging, freight, and launch readiness into one clearer process.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {buyerProfiles.map((profile) => (
              <div key={profile.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{profile.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 md:py-6">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Core capabilities</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What buyers actually need help with</h2>
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
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <VideoBlock
        title="Scalable Manufacturing Solutions"
        description="End-to-end temperature-controlled storage and freight—from factory to destination—monitored and documented at every step."
        mp4Src="/media/cold-chain.mp4"
        webmSrc="/media/cold-chain.webm"
        poster="/media/cold-chain.jpg"
      />

      <VideoBlock
        title="Multi-Supplier Pickups"
        description="We coordinate and consolidate pickups across multiple suppliers, so your goods arrive together—on time."
        mp4Src="/media/multi-supplier-pickups.mp4"
        webmSrc="/media/multi-supplier-pickups.webm"
        poster="/media/multi-supplier-pickups.jpg"
      />

      <VideoBlock
        title="Supplier Discovery"
        description="We match you with vetted Caribbean producers at scale—aligned on quality, certifications, capacity, and pricing."
        mp4Src="/media/supplier-discovery.mp4"
        webmSrc="/media/supplier-discovery.webm"
        poster="/media/supplier-discovery.jpg"
      />

      <VideoBlock
        title="Co-Packing & Private Label"
        description="Recipe development, packaging, and brand execution under strict QA—so you can launch or scale with confidence."
        mp4Src="/media/co-packing-private-label.mp4"
        webmSrc="/media/co-packing-private-label.webm"
        poster="/media/co-packing-private-label.jpg"
      />

      <section className="py-14 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Proof of fit</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Selected project examples</h2>
            <p className="mt-4 text-slate-600 md:text-lg">
              These case studies show the types of buyer problems the team is built to solve: lower landed cost, better coordination, cleaner private-label readiness, and stronger cold-chain control.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <TrackedLink
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                eventName="case_study_open"
                eventParams={{ case_study: study.slug, location: "home" }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{study.market}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{study.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">{study.clientType}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{study.summary}</p>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
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

      <section className="pb-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-950 px-6 py-10 text-white shadow-sm md:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Next step</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">If the program is commercially serious, start with a qualified quote request</h2>
              <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
                Share your destination market, product scope, estimated volume, and timeline. That gives Lue & Perez enough context to respond like an operator, not just a brochure site.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href="/request-a-quote"
                eventName="quote_cta_click"
                eventParams={{ location: "home_bottom" }}
                className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
              >
                Request a Quote
              </TrackedLink>
              <TrackedLink
                href="/about"
                eventName="about_page_click"
                eventParams={{ location: "home_bottom" }}
                className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
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
