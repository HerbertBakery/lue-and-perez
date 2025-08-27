import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Markets & Compliance — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/markets-compliance', label:'Markets & Compliance'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Markets & Compliance</h1>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>North America</strong> — FDA, CFIA; Prior Notice; labeling compliance.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>UK/EU</strong> — Label translation, nutrition facts, health certificates as needed.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>Middle East</strong> — Certificates of Origin and Halal where applicable.</li>
        <li className="rounded-xl border border-slate-200 bg-white p-6"><strong>CARICOM</strong> — Regional documentation and tariff preferences.</li>
      </ul>
    </Section>
  )
}
