'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function track(eventName: string, params: Record<string, any> = {}) {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    // @ts-ignore
    window.gtag('event', eventName, params)
  }
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
        if (trackEvent) track(trackEvent, { link_text: label, link_url: href })
      }}
      className={`hover:text-teal-700 ${active ? 'text-teal-700 font-semibold' : ''}`}
    >
      {label}
    </Link>
  )
}

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Lue & Perez Logo"
            className="h-16 w-auto md:h-20"
          />
          <span className="text-slate-700 font-semibold">Marketing &amp; Distribution</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink href="/services" label="Services" />
          <NavLink href="/case-studies" label="Case Studies" />
          <NavLink href="/markets-compliance" label="Markets & Compliance" />
          <NavLink href="/payments" label="Payments" trackEvent="click_payments" />
          <NavLink href="/contact" label="Contact" trackEvent="click_request_quote" />
        </nav>

        <Link
          href="/contact"
          onClick={() => track('click_request_quote', { link_text: 'Request a Quote', link_url: '/contact' })}
          className="inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-teal-800"
        >
          Request a Quote
        </Link>
      </div>
    </header>
  )
}
