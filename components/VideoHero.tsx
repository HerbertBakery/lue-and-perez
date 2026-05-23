"use client";
import Link from "next/link";

import LoopingVideo from "@/components/LoopingVideo";

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
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/45 to-slate-950/25 z-10" />
      <LoopingVideo
        className="h-[68svh] min-h-[420px] w-full object-cover sm:min-h-[460px] md:h-[72vh]"
        poster={poster}
        mp4Src={mp4Src}
        webmSrc={webmSrc}
        priority
      />

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 sm:mb-4 sm:text-sm">
              Trinidad & Tobago Based
            </p>
            <h1 className="text-balance text-white text-3xl font-semibold drop-shadow sm:text-4xl md:text-6xl">
              {headline}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/90 sm:text-base md:text-lg">
              {subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/request-a-quote"
                className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-800"
              >
                Request a Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/16"
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
