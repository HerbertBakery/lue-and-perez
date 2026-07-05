'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import SiteLogo from '@/components/SiteLogo'
import { trackEvent } from '@/lib/analytics'

type NavItem = {
  href: string
  label: string
  trackEvent?: string
}

function NavLink({
  href,
  label,
  trackEvent,
}: {
  href: string
  label: string
  trackEvent?: string
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      onClick={() => {
        if (trackEvent) trackEventFn(trackEvent, { link_text: label, link_url: href })
      }}
      className={`block rounded-xl px-3 py-2.5 text-sm hover:bg-slate-100 hover:text-teal-700 md:inline-flex md:rounded-md md:px-1 md:py-1 md:hover:bg-transparent ${active ? 'font-semibold text-teal-700' : ''}`}
    >
      {label}
    </Link>
  )
}

function trackEventFn(eventName: string, params: Record<string, unknown>) {
  trackEvent(eventName, params)
}

export default function Header() {
  const [open, setOpen] = useState(false)

  const navItems: NavItem[] = [
    { href: '/services', label: 'Services' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/markets-compliance', label: 'Markets & Compliance' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-2 sm:py-3">
          <div className="md:hidden">
            <SiteLogo compact />
          </div>
          <div className="hidden md:block">
            <SiteLogo />
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} trackEvent={item.trackEvent} />
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/request-a-quote"
              onClick={() => trackEvent('click_request_quote', { link_text: 'Request a Quote', link_url: '/request-a-quote' })}
              className="inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav
          id="mobile-nav"
          className={`${open ? 'grid' : 'hidden'} mb-3 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:hidden`}
        >
          {navItems.map((item) => (
            <div key={item.href} onClick={() => setOpen(false)}>
              <NavLink href={item.href} label={item.label} trackEvent={item.trackEvent} />
            </div>
          ))}
          <Link
            href="/request-a-quote"
            onClick={() => {
              trackEvent('click_request_quote', { link_text: 'Request a Quote', link_url: '/request-a-quote' })
              setOpen(false)
            }}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
