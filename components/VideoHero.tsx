import Link from 'next/link'

export default function VideoHero({
  src = '/media/hero.mp4',
  poster = undefined,
  title = 'Caribbean Foods, Delivered Globally — B2B Only',
  subtitle = 'Export logistics • Consolidation • Sourcing • Manufacturing',
  ctaHref = '/contact',
  ctaLabel = 'Request a Quote',
}: {
  src?: string
  poster?: string
  title?: string
  subtitle?: string
  ctaHref?: string
  ctaLabel?: string
}) {
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          src={src}
          playsInline
          autoPlay
          loop
          muted
          preload="metadata"
          poster={poster}
          aria-label="Warehouse and export logistics video background"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/60" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">{title}</h1>
          <p className="mt-4 text-lg md:text-xl text-slate-100/90">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ctaHref} className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
              {ctaLabel}
            </Link>
            <Link href="/services" className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 hover:bg-white/20">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
