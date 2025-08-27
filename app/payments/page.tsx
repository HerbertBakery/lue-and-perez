import Section from '@/components/Section'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Payments — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/payments', label:'Payments'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Secure B2B Payments</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">Pay deposits and balances by credit card in TTD or USD. Bank transfers also available.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/payments/ttd" className="rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">TTD Portal</Link>
        <Link href="/payments/usd" className="rounded-xl border border-teal-700 px-5 py-3 text-teal-700 font-semibold hover:bg-teal-700 hover:text-white">USD Portal</Link>
      </div>
    </Section>
  )
}
