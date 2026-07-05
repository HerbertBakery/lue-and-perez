import Image from "next/image";

import LoopingVideo from "@/components/LoopingVideo";
import TrackedLink from "@/components/TrackedLink";
import type { CaseStudyContent } from "@/lib/siteContent";

type Props = {
  location: string;
  study: CaseStudyContent;
};

export default function CaseStudyCard({ location, study }: Props) {
  const media =
    study.cardMedia ??
    ({
      type: "image",
      src: study.image.src,
      alt: study.image.alt,
      className: undefined,
    } as const);

  return (
    <TrackedLink
      href={`/case-studies/${study.slug}`}
      eventName="case_study_open"
      eventParams={{ case_study: study.slug, location }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-teal-700"
    >
      <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
        {media.type === "video" ? (
          <LoopingVideo
            className="h-full w-full object-cover"
            poster={media.poster}
            mp4Src={media.mp4Src}
            ariaLabel={media.alt}
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(max-width: 1279px) 100vw, 33vw"
            className={media.className ?? "object-cover"}
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700">
            {study.market}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
            {study.service}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">{study.title}</h3>
        <p className="mt-2 text-sm font-medium text-slate-500">{study.clientType}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{study.summary}</p>
        <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800">
          {study.highlight}
        </p>
      </div>
    </TrackedLink>
  );
}
