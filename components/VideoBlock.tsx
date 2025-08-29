"use client";
import React from "react";

type Props = {
  title: string;
  description?: string;
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
};

// Simple vertical block: heading, subcopy, fixed-width video, autoplay/muted/loop
export default function VideoBlock({ title, description, mp4Src, webmSrc, poster }: Props) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {description ? (
          <p className="mt-2 text-neutral-700 max-w-3xl">{description}</p>
        ) : null}

        {/* same visual size for every section */}
        <div className="mt-6 mx-auto w-full max-w-4xl rounded-2xl overflow-hidden bg-black">
          <div className="w-full aspect-video">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              preload="metadata"
            >
              {webmSrc && <source src={webmSrc} type="video/webm" />}
              <source src={mp4Src} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
