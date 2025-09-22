import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"  // adjust if your file is /logo.svg or in a subfolder
              alt="Lue & Perez Logo"
              className="h-12 w-auto md:h-14"
            />
            <span className="text-slate-700 font-semibold">Marketing &amp; Distribution</span>
          </div>
          <p className="mt-3 text-slate-600">
            B2B export partner for Caribbean foods — export logistics, consolidation, sourcing, and manufacturing.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/services">Services</Link></li>
            <li><Link className="hover:text-teal-700" href="/case-studies">What We’ve Done</Link></li>
            <li><Link className="hover:text-teal-700" href="/markets-compliance">Markets & Compliance</Link></li>
            <li><Link className="hover:text-teal-700" href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h4 className="font-semibold">Payments</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/payments">Pay by Card (USD)</Link></li>
            <li><span className="text-slate-500">Invoices & bank wire available</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:text-teal-700" href="/terms-of-service">Terms of Service</Link></li>
            <li><Link className="hover:text-teal-700" href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-xs text-slate-500">
        © {new Date().getFullYear()} Lue & Perez. All rights reserved.
      </div>
    </footer>
  )
}
