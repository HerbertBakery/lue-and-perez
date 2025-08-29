"use client";
import React from "react";

type VideoItem = {
  title: string;
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  description?: string;
};

export default function VideoGallery({ items }: { items: VideoItem[] }) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {items.map((v, i) => (
            <article key={i} className="rounded-2xl overflow-hidden shadow">
              <div className="aspect-video bg-black">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  poster={v.poster}
                >
                  {v.webmSrc && <source src={v.webmSrc} type="video/webm" />}
                  <source src={v.mp4Src} type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{v.title}</h3>
                {v.description && (
                  <p className="text-sm text-neutral-600 mt-1">{v.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
