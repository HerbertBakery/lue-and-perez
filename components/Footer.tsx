'use client'

import Link from 'next/link'
import SiteLogo from '@/components/SiteLogo'

import { trackEvent } from '@/lib/analytics'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto grid gap-8 px-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
        {/* Brand */}
        <div>
          <SiteLogo compact />
          <p className="mt-3 text-slate-600">
            B2B export partner for Caribbean foods — export logistics, consolidation, sourcing, and manufacturing.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/about">About</Link></li>
            <li><Link className="hover:text-teal-700" href="/services">Services</Link></li>
            <li><Link className="hover:text-teal-700" href="/case-studies">What We’ve Done</Link></li>
            <li><Link className="hover:text-teal-700" href="/markets-compliance">Markets & Compliance</Link></li>
            <li>
              <Link
                className="hover:text-teal-700"
                href="/contact"
                onClick={() => trackEvent('click_request_quote', { link_text: 'Contact (footer)', link_url: '/contact' })}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h4 className="font-semibold">Payments</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link
                className="hover:text-teal-700"
                href="/payments"
                onClick={() => trackEvent('click_payments', { link_text: 'Pay with PayPal (USD)', link_url: '/payments' })}
              >
                Pay with PayPal (USD)
              </Link>
            </li>
            <li><span className="text-slate-500">Invoices & bank wire available</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-teal-700" href="/terms-of-service">Terms of Service</Link></li>
            <li><Link className="hover:text-teal-700" href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4 text-xs text-slate-500">
        © {new Date().getFullYear()} Lue & Perez. All rights reserved.
      </div>
    </footer>
  )
}
