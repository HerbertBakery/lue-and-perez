import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'UK Distributor Consolidation — 3 Suppliers → 1 FCL — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/case-studies', label:'Case Studies'},{href:'/case-studies/uk-fcl-consolidation', label:'UK Distributor Consolidation'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">UK Distributor Consolidation — 3 Suppliers → 1 FCL</h1>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>18% freight/unit reduction via optimized palletization</li>
        <li>Shelf-life windows synchronized for import clearance</li>
        <li>UK import cleared in 48 hours</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Discuss a similar project</a>
    </Section>
  )
}
