import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { sendRfp } from './sendRfp'

export const metadata = { title: 'Contact / Request a Quote — Lue & Perez' }

export default function Page({ searchParams }: { searchParams?: { sent?: string; error?: string } }) {
  const sent = searchParams?.sent;
  const err = searchParams?.error;

  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/contact', label:'Contact'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Request a Quote</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">Tell us SKUs, volumes, destination, and timelines. We’ll reply with pricing and lead times.</p>

      {sent === '1' && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          Thanks! We’ll get back to you shortly.
        </div>
      )}
      {sent === '0' && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          Something went wrong{err ? `: ${decodeURIComponent(err)}` : '.'}
        </div>
      )}

      <form action={sendRfp} className="mt-8 grid md:grid-cols-2 gap-4 max-w-3xl">
        <div>
          <label className="text-sm font-medium" htmlFor="name">Company / Contact</label>
          <input id="name" name="name" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">Work Email</label>
          <input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium" htmlFor="message">Requirements</label>
          <textarea id="message" name="message" rows={6} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div className="md:col-span-2 flex items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" name="b2b" value="yes" className="rounded border-slate-300" required/> I confirm this is a B2B inquiry.
          </label>
          <button type="submit" className="rounded-xl bg-teal-700 px-6 py-3 text-white font-semibold hover:bg-teal-800">Submit Inquiry</button>
        </div>
      </form>
    </Section>
  )
}
