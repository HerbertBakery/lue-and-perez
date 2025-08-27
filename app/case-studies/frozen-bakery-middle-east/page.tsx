import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Frozen Bakery SKUs — Middle East — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/case-studies', label:'Case Studies'},{href:'/case-studies/frozen-bakery-middle-east', label:'Frozen Bakery SKUs'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Frozen Bakery SKUs — Middle East</h1>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Validated cold chain carriers and lanes</li>
        <li>2-stop routing with minimal dwell</li>
        <li>Shipment within 72h of production</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Discuss a similar project</a>
    </Section>
  )
}
