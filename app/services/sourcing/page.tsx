import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Sourcing — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/services', label:'Services'},{href:'/services/sourcing', label:'Sourcing'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Sourcing</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">Supplier discovery & vetting, MOQ/pricing, documentation feasibility, and private-label options for Caribbean categories.</p>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Vendor identification & shortlisting</li>
        <li>Price benchmarking & MOQs</li>
        <li>GMP/HACCP & label compliance checks</li>
        <li>Private label & co-packing feasibility</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Request a Quote</a>
    </Section>
  )
}
