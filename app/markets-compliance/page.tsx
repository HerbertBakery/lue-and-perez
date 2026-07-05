import { Breadcrumbs } from "@/components/Breadcrumbs";
import FaqList from "@/components/FaqList";
import LoopingVideo from "@/components/LoopingVideo";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import { faqItems } from "@/lib/siteContent";

export const metadata = {
  title: "Markets & Compliance — Lue & Perez",
  description:
    "See how Lue & Perez approaches market readiness, export documentation, labeling, and product handling for serious Caribbean food buyers.",
};

const marketCards = [
  {
    title: "North America",
    body: "FDA, CFIA, Prior Notice, retailer-facing label readiness, and documentation discipline.",
  },
  {
    title: "UK / EU",
    body: "Nutrition panel review, label translation considerations, and importer-facing shipment readiness.",
  },
  {
    title: "Middle East",
    body: "Certificate requirements, destination documents, and where relevant Halal-related planning.",
  },
  {
    title: "CARICOM",
    body: "Regional documentation handling, tariff-aware movement, and cleaner cross-island planning.",
  },
];

const readinessPoints = [
  "Label and pack format review",
  "Ambient, chilled, and frozen handling logic",
  "Export document discipline before shipment",
  "Commercial assumptions matched to destination reality",
];

export default function Page() {
  return (
    <Section className="py-10 sm:py-12">
      <ScrollDepthTracker pageName="markets-compliance" />
      <Breadcrumbs items={[{ href: "/markets-compliance", label: "Markets & Compliance" }]} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Markets &amp; compliance</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Destination-market readiness matters as much as product sourcing
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Labels, documents, handling, and product format need to be right before shipment.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["North America", "UK / EU", "Middle East", "CARICOM"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <div className="relative aspect-[4/5]">
            <LoopingVideo
              className="h-full w-full object-cover"
              poster="/media/fresh/markets-container-loading.jpg"
              mp4Src="/media/fresh/markets-container-loading.mp4"
              ariaLabel="Container loading and export staging video"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
          <div className="relative aspect-[16/10]">
            <LoopingVideo
              className="h-full w-full object-cover"
              poster="/media/fresh/markets-shipment-readiness.jpg"
              mp4Src="/media/fresh/markets-shipment-readiness.mp4"
              ariaLabel="Palletized shipment loading and export readiness video"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Before product moves</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The handling and paperwork have to make sense for the destination</h2>
          <p className="mt-4 text-sm leading-6 text-white/75 md:text-base">
            The easiest export projects are usually the ones where labeling, cold-chain logic, certificates, and import assumptions are already visible before freight gets booked.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {readinessPoints.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Destination focus</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Common market lenses buyers need to think through early</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {marketCards.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">Questions buyers ask before moving forward</h2>
          <div className="mt-6">
            <FaqList items={faqItems.slice(0, 4)} />
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Need a commercial read first?</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Start with the destination, product mix, and timing.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The faster we can see the market, product, handling, and packaging realities together, the more useful the next response will be.
          </p>
          <TrackedLink
            href="/request-a-quote"
            eventName="quote_cta_click"
            eventParams={{ location: "markets_compliance_sidebar" }}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Request a Quote
          </TrackedLink>
        </aside>
      </div>
    </Section>
  );
}
