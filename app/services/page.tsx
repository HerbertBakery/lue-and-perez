import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ScrollDepthTracker from '@/components/ScrollDepthTracker'
import TrackedLink from '@/components/TrackedLink'
import { services } from '@/lib/siteContent'
export const metadata = { title: 'Services — Lue & Perez' }

export default function ServicesPage(){
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="services" />
      <Breadcrumbs items={[{href:'/services', label:'Services'}]} />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Services</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">B2B support from sourcing through export execution</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          These services are designed to help buyers solve the real operational questions behind Caribbean food programs: supplier fit, shipment structure, documentation readiness, private-label scale-up, and market execution.
        </p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {services.map(s => (
          <TrackedLink
            key={s.href}
            href={s.href}
            eventName="service_card_click"
            eventParams={{ service: s.key, location: "services_index" }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal-700"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{s.eyebrow}</p>
            <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{s.summary}</p>
          </TrackedLink>
        ))}
      </div>
    </Section>
  )
}
