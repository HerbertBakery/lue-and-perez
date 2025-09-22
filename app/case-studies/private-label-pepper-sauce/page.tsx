import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = { title: 'Private Label Pepper Sauce — Canada — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[
        {href:'/case-studies', label:'Case Studies'},
        {href:'/case-studies/private-label-pepper-sauce', label:'Private Label Pepper Sauce'}
      ]} />

      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">
        Private Label Pepper Sauce — Canada
      </h1>

      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Recipe standardization for scale and consistency</li>
        <li>Bilingual labels and nutrition panels</li>
        <li>CFIA import and labeling compliance</li>
      </ul>

      <div className="mt-6 space-y-2 text-slate-700">
        <p><strong>Ongoing supply chain to Canada</strong> with regular replenishment cycles and retailer-ready packaging.</p>
        <p>We are the leading supplier of Caribbean foods to Canada by volume and quantity.</p>
        <p>Private labeling of pepper sauces, snacks, lifestyle, and cosmetic items.</p>
      </div>

      <a
        href="/contact"
        className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800"
      >
        Discuss a similar project
      </a>
    </Section>
  )
}
