import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
export const metadata = { title: 'Case Studies — Lue & Perez' }

const cases = [
  { slug:'uk-fcl-consolidation', title:'UK Distributor Consolidation — 3 Suppliers → 1 FCL', summary:'Reduced freight/unit by 18%, synchronized shelf-life windows, UK import cleared in 48h.'},
  { slug:'private-label-pepper-sauce', title:'Private Label Pepper Sauce — North America', summary:'Standardized recipe, bilingual labels, FDA prior notice compliance.'},
  { slug:'frozen-bakery-middle-east', title:'Frozen Bakery SKUs — Middle East', summary:'Cold chain with 2-stop routing, shipped within 72h of production.'},
]

export default function CaseStudies(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/case-studies', label:'Case Studies'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Case Studies</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {cases.map(c => (
          <Link key={c.slug} href={`/case-studies/${c.slug}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700">
            <h3 className="font-bold">{c.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{c.summary}</p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
