import Link from 'next/link'

export default function VideoPanel({
  src = '/media/hero.mp4',
  eyebrow,
  title,
  body,
  href,
  reverse = false,
}: {
  src?: string
  eyebrow?: string
  title: string
  body: string
  href?: string
  reverse?: boolean
}) {
  return (
    <section className="py-12">
      <div className={`container mx-auto px-4 grid gap-8 md:grid-cols-2 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow">
          <video
            className="h-full w-full object-cover"
            src={src}
            playsInline
            autoPlay
            loop
            muted
            preload="metadata"
            aria-label={`${title} video`}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 rounded-2xl" />
        </div>
        <div>
          {eyebrow && <p className="text-sm uppercase tracking-wider text-teal-700">{eyebrow}</p>}
          <h3 className="mt-2 text-2xl md:text-3xl font-extrabold">{title}</h3>
          <p className="mt-3 text-slate-600">{body}</p>
          {href && (
            <Link href={href} className="mt-5 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">
              Learn more
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
