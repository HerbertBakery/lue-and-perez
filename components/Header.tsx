'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function NavLink({href,label}:{href:string,label:string}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href + '/')
  return (
    <Link href={href} className={`hover:text-teal-700 ${active ? 'text-teal-700 font-semibold' : ''}`}>
      {label}
    </Link>
  )
}
export default function Header(){
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-teal-700" />
          <span className="font-extrabold tracking-tight text-xl">Lue & Perez</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink href="/services" label="Services" />
          <NavLink href="/case-studies" label="Case Studies" />
          <NavLink href="/markets-compliance" label="Markets & Compliance" />
          <NavLink href="/payments" label="Payments" />
          <NavLink href="/contact" label="Contact" />
        </nav>
        <Link href="/contact" className="inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-white text-sm font-semibold shadow-sm hover:bg-teal-800">
          Request a Quote
        </Link>
      </div>
    </header>
  )
}
