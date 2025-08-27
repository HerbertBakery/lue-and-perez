import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import TTDClient from './Client'

export const metadata = { title: 'TTD Payments — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/payments', label:'Payments'},{href:'/payments/ttd', label:'TTD'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">TTD Portal (Hosted Page)</h1>
      <TTDClient />
    </Section>
  )
}
