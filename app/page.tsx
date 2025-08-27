import VideoHero from '@/components/VideoHero'
import VideoPanel from '@/components/VideoPanel'
import Link from 'next/link'

export default function HomePage(){
  return (
    <>
      <VideoHero
        src="/media/hero.mp4"
        title="Caribbean Foods, Delivered Globally — B2B Only"
        subtitle="From Trinidad & Tobago to the world: export logistics, consolidation, sourcing, and manufacturing."
        ctaHref="/contact"
        ctaLabel="Request a Quote"
      />

      <div className="py-12 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">What We Do</h2>
        <p className="mt-3 text-slate-600 max-w-2xl">End-to-end B2B support across export lanes, supplier consolidation, compliant sourcing, and co-packing.</p>
      </div>

      <VideoPanel
        eyebrow="Export Logistics"
        title="Cold chain & customs without the drama"
        body="FCL/LCL planning, export permits, HS classification, customs documentation, and insured routes for ambient/chilled/frozen."
        href="/services/export-logistics"
        src="/media/hero.mp4"
      />
      <VideoPanel
        eyebrow="Consolidation"
        title="Multi-supplier pickups, QA, palletization"
        body="We coordinate suppliers, validate shelf-life, and build pallets with correct labeling and ASN docs."
        href="/services/consolidation"
        src="/media/hero.mp4"
        reverse
      />
      <VideoPanel
        eyebrow="Sourcing"
        title="Supplier discovery & compliance vetting"
        body="Category research, price benchmarking, GMP/HACCP checks, and documentation feasibility for your target markets."
        href="/services/sourcing"
        src="/media/hero.mp4"
      />
      <VideoPanel
        eyebrow="Manufacturing"
        title="Co-packing & private label"
        body="Recipe scale-up, label translations, nutrition panels, and export-ready packaging—ambient and frozen."
        href="/services/manufacturing"
        src="/media/hero.mp4"
        reverse
      />

      <section className="py-12">
        <div className="container mx-auto px-4 rounded-2xl bg-teal-700 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold">Ready for a proposal?</h3>
            <p className="mt-2 text-teal-50">Send us your SKUs, quantities, and destination—we’ll revert with pricing and lead times.</p>
          </div>
          <Link href="/contact" className="rounded-xl bg-white text-teal-800 px-6 py-3 font-semibold hover:bg-teal-50">Start an RFP</Link>
        </div>
      </section>
    </>
  )
}
