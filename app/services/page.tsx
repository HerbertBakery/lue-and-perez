import Image from "next/image";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import LoopingVideo from "@/components/LoopingVideo";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import { services } from "@/lib/siteContent";

export const metadata = { title: "Services — Lue & Perez" };

const serviceMedia: Record<
  string,
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      mp4Src: string;
      poster: string;
      alt: string;
    }
> = {
  sourcing: {
    type: "image",
    src: "/media/fresh/service-sourcing-cassava.jpg",
    alt: "Cassava flour packaging photographed for Caribbean sourcing conversations",
  },
  consolidation: {
    type: "image",
    src: "/media/fresh/service-consolidation-container.jpg",
    alt: "Palletized products arranged inside a shipping container",
  },
  "export-logistics": {
    type: "image",
    src: "/media/fresh/service-export-pallets.jpg",
    alt: "Prepared pallet loads staged beside an export container",
  },
  manufacturing: {
    type: "image",
    src: "/media/fresh/service-manufacturing-syrups.jpg",
    alt: "Retail-ready syrup bottles prepared for private-label and production discussions",
  },
  "caribbean-food-exports": {
    type: "image",
    src: "/media/fresh/service-caribbean-rice.jpg",
    alt: "Packaged brown rice positioned for buyer-ready Caribbean export programs",
  },
};

const serviceTags: Record<string, string[]> = {
  sourcing: ["Supplier fit", "MOQ logic", "Compliance screen"],
  consolidation: ["Multi-supplier loads", "Mixed temperature", "Pallet planning"],
  "export-logistics": ["Documentation", "Cold chain", "Route design"],
  manufacturing: ["Private label", "Scale-up", "Packaging readiness"],
  "caribbean-food-exports": ["End-to-end support", "Buyer-side coordination", "Launch readiness"],
};

export default function ServicesPage() {
  return (
    <Section className="py-12">
      <ScrollDepthTracker pageName="services" />
      <Breadcrumbs items={[{ href: "/services", label: "Services" }]} />

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Services</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            Operating support for buyers who need product, packaging, and export execution to move together
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            Sourcing, consolidation, export logistics, and private-label support.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Sourcing", "Consolidation", "Cold Chain", "Private Label", "Documentation"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:row-span-2">
            <div className="relative aspect-[4/5]">
              <Image
                src="/media/fresh/services-hero-shelf.jpg"
                alt="Packaged Caribbean products merchandised on shelf"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 32vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="aspect-[4/5] bg-slate-950">
              <LoopingVideo
                className="h-full w-full bg-slate-950 object-contain"
                poster="/media/fresh/services-syrup-closeup.jpg"
                mp4Src="/media/fresh/services-syrup-closeup.mp4"
                ariaLabel="Product close-up video"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="aspect-[4/5] bg-slate-950">
              <LoopingVideo
                className="h-full w-full bg-slate-950 object-contain"
                poster="/media/fresh/services-loading-dock.jpg"
                mp4Src="/media/fresh/services-loading-dock.mp4"
                ariaLabel="Loading dock and export staging video"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const media = serviceMedia[service.key];

          return (
            <TrackedLink
              key={service.href}
              href={service.href}
              eventName="service_card_click"
              eventParams={{ service: service.key, location: "services_index" }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-700"
            >
              <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
                {media.type === "image" ? (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <LoopingVideo
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    poster={media.poster}
                    mp4Src={media.mp4Src}
                    ariaLabel={media.alt}
                  />
                )}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                    {service.eyebrow}
                  </span>
                  {serviceTags[service.key].slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>

                <p className="mt-4 text-sm font-medium text-slate-700">{serviceTags[service.key][2]}</p>
              </div>
            </TrackedLink>
          );
        })}
      </div>
    </Section>
  );
}
