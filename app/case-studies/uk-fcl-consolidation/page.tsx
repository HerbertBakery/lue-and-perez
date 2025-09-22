import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = { title: 'UK Distributor Consolidation — FCL — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[
        {href:'/case-studies', label:'Case Studies'},
        {href:'/case-studies/uk-fcl-consolidation', label:'UK Distributor Consolidation'}
      ]} />

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">
        UK Distributor Consolidation — FCL
      </h1>

      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>18% freight/unit reduction via optimized palletization</li>
        <li>Shelf-life windows synchronized for import clearance</li>
        {/* Removed: UK import cleared in 48 hours */}
      </ul>

      <p className="mt-6 text-slate-700">
        Supply chain to our UK partners offering authentic Caribbean foods to the UK and EU, with consolidated FCL movements to improve landed cost, freshness, and service levels.
      </p>

      <a
        href="/contact"
        className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800"
      >
        Discuss a similar project
      </a>
    </Section>
  )
}
