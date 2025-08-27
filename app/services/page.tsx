import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
export const metadata = { title: 'Services — Lue & Perez' }

export default function ServicesPage(){
  const services = [
    { href:'/services/export-logistics', title:'Export Logistics', desc:'FCL/LCL shipping, cold chain, documentation, customs compliance.'},
    { href:'/services/consolidation', title:'Consolidation', desc:'Multi-supplier pickups, QA, palletization, labeling.'},
    { href:'/services/sourcing', title:'Sourcing', desc:'Supplier discovery, price benchmarking, compliance vetting.'},
    { href:'/services/manufacturing', title:'Manufacturing', desc:'Co-packing, private label, regulatory/label review.'},
  ]
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/services', label:'Services'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Services</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">End-to-end B2B support from Trinidad & Tobago and the wider Caribbean.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map(s => (
          <Link key={s.href} href={s.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700">
            <h3 className="font-bold text-xl">{s.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{s.desc}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
