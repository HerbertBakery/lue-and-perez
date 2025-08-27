import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Export Logistics — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/services', label:'Services'},{href:'/services/export-logistics', label:'Export Logistics'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Export Logistics</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">FCL/LCL planning (ocean & air), cold chain, export permits, HS classification, insurance, and customs documentation.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">What’s included</h3>
          <ul className="mt-3 list-disc pl-6 text-slate-600">
            <li>Lane & schedule planning, carrier booking</li>
            <li>Chilled & frozen validated routes</li>
            <li>Export permits & HS codes</li>
            <li>Insurance & risk management</li>
            <li>Customs documentation & liaison</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold">Deliverables</h3>
          <ul className="mt-3 list-disc pl-6 text-slate-600">
            <li>Pricing & lead-time proposal</li>
            <li>Documentation checklist</li>
            <li>Freight plan (FCL/LCL)</li>
            <li>QA & temperature plan</li>
          </ul>
        </div>
      </div>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Request a Quote</a>
    </Section>
  )
}
