export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* HERO */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <video
          className="w-full h-[55vh] md:h-[70vh] object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-wide.jpg"
          preload="auto"
        >
          <source src="/media/hero-wide.webm" type="video/webm" />
          <source src="/media/hero-wide.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h1 className="text-white text-3xl md:text-5xl font-semibold drop-shadow">
              Caribbean Export • Cold Chain • Consolidation
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              Multi-supplier pickups, supplier discovery, co-packing & private label—handled.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR CLIPS */}
      <section className="w-full py-10">
        <div className="mx-auto w-full max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {t:"Cold Chain", f:"cold-chain"},
            {t:"Multi-Supplier Pickups", f:"multi-supplier-pickups"},
            {t:"Supplier Discovery", f:"supplier-discovery"},
            {t:"Co-Packing & Private Label", f:"co-packing-private-label"},
          ].map((v) => (
            <article key={v.f} className="rounded-2xl overflow-hidden shadow">
              <div className="aspect-video bg-black">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={`/media/${v.f}.jpg`}
                >
                  <source src={`/media/${v.f}.webm`} type="video/webm" />
                  <source src={`/media/${v.f}.mp4`} type="video/mp4" />
                </video>
              </div>
              <div className="p-4"><h3 className="font-medium">{v.t}</h3></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

