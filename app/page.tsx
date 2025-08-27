import Section from '@/components/Section'
import Link from 'next/link'

export default function HomePage(){
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-slate-50" />
        <div className="relative py-20 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Caribbean Foods, Delivered Globally — <span className="text-teal-700">B2B Only</span>
          </h1>
          <p className="mt-6 text-lg text-slate-700 max-w-2xl">
            We handle export logistics, consolidation, sourcing, and contract manufacturing from Trinidad & Tobago and the wider Caribbean for importers, distributors, and brands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Start an RFP</Link>
            <Link href="/services" className="rounded-xl px-5 py-3 font-semibold border border-slate-300 hover:border-teal-700 hover:text-teal-700">View Services</Link>
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-slate-500">HS codes • Compliance • Cold chain • Private label • Shelf-stable • Frozen</p>
        </div>
      </Section>

      <Section className="py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">What We Do</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card title="Export Logistics" href="/services/export-logistics" />
          <Card title="Consolidation" href="/services/consolidation" />
          <Card title="Sourcing" href="/services/sourcing" />
          <Card title="Manufacturing" href="/services/manufacturing" />
        </div>
      </Section>
    </>
  )
}

function Card({title, href}:{title:string, href:string}){
  return (
    <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700">
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="mt-2 text-slate-600">Learn how we deliver for importers and distributors.</p>
      <span className="mt-4 inline-block text-teal-700 font-semibold">Learn more →</span>
    </Link>
  )
}
