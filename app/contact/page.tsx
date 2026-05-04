import Section from '@/components/Section'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { sendRfp } from './sendRfp'
import Script from 'next/script'  // ✅ add this

export const metadata = { title: 'Contact / Request a Quote — Lue & Perez' }

export default function Page({ searchParams }: { searchParams?: { sent?: string; error?: string } }) {
  const sent = searchParams?.sent;
  const err = searchParams?.error;
  const startedAt = Date.now();

  return (
    <Section className="py-12">
      <Breadcrumbs items={[{href:'/contact', label:'Contact'}]} />
      <div className="mt-4 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Contact</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Talk to the Lue & Perez team</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Use this form for general business inquiries, introductions, and partnership questions. If you already know your products, volumes, and destination, use the dedicated quote form for a faster commercial response.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
        For detailed sourcing or export requests, head to{" "}
        <a href="/request-a-quote" className="font-semibold text-teal-700 underline underline-offset-2">
          Request a Quote
        </a>
        .
      </div>

      {/* ✅ Fire GA4 lead event ONLY on success */}
      {sent === '1' && (
        <Script id="ga-generate-lead" strategy="afterInteractive">
          {`
            window.gtag && window.gtag('event', 'generate_lead', {
              form_name: 'rfp_contact',
              page_path: '/contact'
            });
          `}
        </Script>
      )}

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

      <form action={sendRfp} className="mt-8 grid max-w-3xl gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <input type="hidden" name="startedAt" value={startedAt} />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
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
