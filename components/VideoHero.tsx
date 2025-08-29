"use client";
import React from "react";

type Props = {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  headline?: string;
  subhead?: string;
};

export default function HeroVideo({
  mp4Src,
  webmSrc,
  poster,
  headline = "Caribbean Export • Cold Chain • Consolidation",
  subhead = "Multi-supplier pickups, supplier discovery, co-packing & private label—handled.",
}: Props) {
  return (
    <section className="relative w-full">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <video
        className="w-full h-[55vh] md:h-[70vh] object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={mp4Src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="max-w-2xl">
            <h1 className="text-white text-3xl md:text-5xl font-semibold drop-shadow">
              {headline}
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              {subhead}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

}
