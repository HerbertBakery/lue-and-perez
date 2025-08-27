import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import USDClient from './Client'

export const metadata = { title: 'USD Payments — Lue & Perez' }

export default function Page(){
  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/payments', label:'Payments'},{href:'/payments/usd', label:'USD'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">USD Portal (Stripe)</h1>
      <USDClient />
    </Section>
  )
}
