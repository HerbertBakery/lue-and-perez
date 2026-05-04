import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import FaqList from '@/components/FaqList'
import { faqItems } from '@/lib/siteContent'
export const metadata = { title: 'Markets & Compliance — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="markets-compliance" />
      <Breadcrumbs items={[{href:'/markets-compliance', label:'Markets & Compliance'}]} />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Markets & compliance</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Destination-market readiness matters as much as product sourcing</h1>
        <p className="mt-3 text-slate-600">
          Export work gets harder when labels, documents, and handling requirements are treated as afterthoughts. Lue & Perez works with those realities early so buyers can qualify opportunities with clearer operating assumptions.
        </p>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-4 text-slate-700 md:grid-cols-2">
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>North America</strong> — FDA, CFIA, Prior Notice, retailer-facing label readiness, and documentation discipline.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>UK / EU</strong> — nutrition panel review, label translation considerations, and shipment readiness for importer programs.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>Middle East</strong> — certificates of origin, market documentation needs, and where applicable Halal-related planning.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>CARICOM</strong> — regional documentation handling and tariff-aware movement planning.</li>
      </ul>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold">Questions buyers ask before moving forward</h2>
        <div className="mt-6">
          <FaqList items={faqItems.slice(0, 4)} />
        </div>
      </div>
    </Section>
  )
}
