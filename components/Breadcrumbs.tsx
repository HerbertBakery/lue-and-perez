import Link from 'next/link'
export function Breadcrumbs({items}:{items:{href:string,label:string}[]}) {
  return (
    <nav aria-label="Breadcrumb" className="hidden text-sm text-slate-600 sm:block">
      <ol className="flex items-center flex-wrap gap-2">
        <li><Link href="/" className="hover:text-teal-700">Home</Link></li>
        {items.map((it, i) => (
          <li key={it.href} className="flex items-center gap-2">
            <span>›</span>
            {i < items.length-1
              ? <Link href={it.href} className="hover:text-teal-700">{it.label}</Link>
              : <span className="text-slate-900 font-medium">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
