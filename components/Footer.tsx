'use client'

import { Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

import SiteLogo from '@/components/SiteLogo'
import { trackEvent } from '@/lib/analytics'

function FacebookMark() {
  return <Facebook className="h-4 w-4 fill-current stroke-[1.75]" />
}

function InstagramMark() {
  return <Instagram className="h-4 w-4 stroke-[1.9]" />
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 sm:py-12">
      <div className="container mx-auto grid gap-8 px-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <SiteLogo compact />
          <p className="mt-3 max-w-sm text-slate-600">
            B2B export partner for Caribbean foods across sourcing, consolidation, export logistics, private label, and market-readiness work.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Link
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
              href="https://www.facebook.com/Lue.Perez.Marketing.Distribution"
              target="_blank"
              rel="noreferrer"
              aria-label="Lue & Perez on Facebook"
              onClick={() => trackEvent('click_social', { platform: 'facebook', location: 'footer' })}
            >
              <FacebookMark />
            </Link>
            <Link
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white shadow-sm transition hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6249f] focus-visible:ring-offset-2"
              href="https://www.instagram.com/lueandperez/"
              target="_blank"
              rel="noreferrer"
              aria-label="Lue & Perez on Instagram"
              onClick={() => trackEvent('click_social', { platform: 'instagram', location: 'footer' })}
            >
              <InstagramMark />
            </Link>
          </div>
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
