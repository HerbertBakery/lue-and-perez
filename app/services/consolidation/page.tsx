import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Consolidation — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/services', label:'Services'},{href:'/services/consolidation', label:'Consolidation'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Consolidation</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">Multi-supplier pickups, quality checks, palletization, labeling, and shelf-life coordination across ambient/chilled/frozen.</p>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Route & pickup scheduling across suppliers</li>
        <li>Pre-shipment QA & shelf-life validation</li>
        <li>Pallet building, labeling & ASN doc set</li>
        <li>Ambient, chilled, and frozen lanes</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Request a Quote</a>
    </Section>
  )
}
