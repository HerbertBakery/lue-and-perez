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
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700 sm:text-base md:text-lg">{description}</p>
        ) : null}

        <div className="mt-6 mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
          <div className="w-full aspect-video">
            <video
              className="w-full h-full object-cover"
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              poster={poster}
              preload="metadata"
              aria-label={`${title} video`}
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
