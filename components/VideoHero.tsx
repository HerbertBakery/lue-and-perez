"use client";
import React from "react";
import Link from "next/link";

type Props = {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  headline?: string;
  subhead?: string;
};

export default function VideoHero({
  mp4Src,
  webmSrc,
  poster,
  headline = "Caribbean Export • Cold Chain • Consolidation",
  subhead = "Multi-supplier pickups, supplier discovery, co-packing & private label—handled.",
}: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/45 to-slate-950/25 z-10" />
      <video
        className="w-full h-[62vh] min-h-[460px] object-cover md:h-[72vh]"
        autoPlay={!prefersReducedMotion}
        muted
        loop={!prefersReducedMotion}
        playsInline
        poster={poster}
        preload="metadata"
        aria-hidden="true"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
              Trinidad & Tobago Based
            </p>
            <h1 className="text-balance text-white text-4xl md:text-6xl font-semibold drop-shadow">
              {headline}
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-base md:text-lg">
              {subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request-a-quote"
                className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-800"
              >
                Request a Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/16"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
