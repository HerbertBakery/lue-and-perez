import Link from 'next/link'
export default function Footer(){
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal-700" />
            <span className="font-extrabold text-lg">Lue & Perez</span>
          </div>
          <p className="mt-3 text-slate-600">B2B export partner for Caribbean foods — export logistics, consolidation, sourcing, and manufacturing.</p>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/services">Services</Link></li>
            <li><Link className="hover:text-teal-700" href="/case-studies">What We’ve Done</Link></li>
            <li><Link className="hover:text-teal-700" href="/markets-compliance">Markets & Compliance</Link></li>
            <li><Link className="hover:text-teal-700" href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Payments</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/payments/ttd">TTD Portal</Link></li>
            <li><Link className="hover:text-teal-700" href="/payments/usd">USD Portal</Link></li>
            <li><span className="text-slate-500">Invoices & bank wire available</span></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Lue & Perez. All rights reserved.</div>
    </footer>
  )
}
