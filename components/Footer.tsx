'use client'

import Link from 'next/link'

import CapabilitiesLink from '@/components/CapabilitiesLink'
import SiteLogo from '@/components/SiteLogo'
import { trackEvent } from '@/lib/analytics'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container mx-auto grid gap-8 px-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <SiteLogo compact />
          <p className="mt-3 max-w-sm text-slate-600">
            B2B export partner for Caribbean foods across sourcing, consolidation, export logistics, private label, and market-readiness work.
          </p>
          <CapabilitiesLink
            context="footer_brand"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-teal-700 hover:text-teal-700"
          />
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/about">About</Link></li>
            <li><Link className="hover:text-teal-700" href="/services">Services</Link></li>
            <li><Link className="hover:text-teal-700" href="/case-studies">Case Studies</Link></li>
            <li><Link className="hover:text-teal-700" href="/markets-compliance">Markets &amp; Compliance</Link></li>
            <li><Link className="hover:text-teal-700" href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Commercial</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/request-a-quote">Request a Quote</Link></li>
            <li>
              <Link
                className="hover:text-teal-700"
                href="/payments"
                onClick={() => trackEvent('click_payments', { link_text: 'Pay with PayPal (USD)', link_url: '/payments' })}
              >
                Pay with PayPal (USD)
              </Link>
            </li>
            <li><span className="text-slate-500">Invoices and bank wire available</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Legal</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/terms-of-service">Terms of Service</Link></li>
            <li><Link className="hover:text-teal-700" href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 border-t border-slate-200 px-4 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Lue & Perez. All rights reserved.
      </div>
    </footer>
  )
}
