"use client";
import LoopingVideo from "@/components/LoopingVideo";

type Props = {
  title?: string;
  description?: string;
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
};

// Simple vertical block: heading, subcopy, fixed-width video, autoplay/muted/loop
export default function VideoBlock({ title, description, mp4Src, webmSrc, poster }: Props) {

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto w-full max-w-6xl px-4">
        {title ? <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2> : null}
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-700 sm:text-base md:text-lg">{description}</p>
        ) : null}

        <div className={`${title || description ? "mt-6" : ""} mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm`}>
          <div className="w-full aspect-video">
            <LoopingVideo
              className="w-full h-full object-cover"
              poster={poster}
              mp4Src={mp4Src}
              webmSrc={webmSrc}
              ariaLabel={title ? `${title} video` : "Lue & Perez service video"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
