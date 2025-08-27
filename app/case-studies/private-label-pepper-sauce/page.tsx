import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
export const metadata = { title: 'Private Label Pepper Sauce — North America — Lue & Perez' }
export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/case-studies', label:'Case Studies'},{href:'/case-studies/private-label-pepper-sauce', label:'Private Label Pepper Sauce'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Private Label Pepper Sauce — North America</h1>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Recipe standardization for scale and consistency</li>
        <li>Bilingual labels and nutrition panels</li>
        <li>FDA prior notice and import compliance</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Discuss a similar project</a>
    </Section>
  )
}
