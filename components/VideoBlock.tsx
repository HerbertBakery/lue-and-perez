"use client";
import React from "react";

type Props = {
  title: string;
  description?: string;
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
};

export default function VideoBlock({ title, description, mp4Src, webmSrc, poster }: Props) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-2 text-neutral-700 max-w-3xl">{description}</p>
        )}

        <div className="mt-6 rounded-2xl overflow-hidden shadow bg-black">
          <video
            className="w-full h-auto object-cover"
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
    </section>
  );
}
