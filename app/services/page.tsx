import Image from "next/image";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import { services } from "@/lib/siteContent";

export const metadata = { title: "Services — Lue & Perez" };

const serviceMedia: Record<
  string,
  {
    src: string;
    alt: string;
  }
> = {
  sourcing: {
    src: "/media/services/prep-board.jpg",
    alt: "Prepared ingredients and kitchen setup for sourcing discussions",
  },
  consolidation: {
    src: "/media/services/sausage-pack.jpg",
    alt: "Packaged products arranged for multi-supplier consolidation",
  },
  "export-logistics": {
    src: "/media/services/sungrown-harvests.jpg",
    alt: "Packaged food products aligned for export logistics planning",
  },
  manufacturing: {
    src: "/media/services/chilli-oil.jpg",
    alt: "Branded condiment bottle and plated food for manufacturing and private-label work",
  },
  "caribbean-food-exports": {
    src: "/media/homepage/sweet-potato-pasta.jpg",
    alt: "Packaged sweet potato pasta lineup for end-to-end export partnerships",
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
            The work stays commercial, visual, and shipment-minded from first shortlist through launch readiness.
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
                src="/media/services/guacamole-bowl.jpg"
                alt="Prepared Caribbean-style food photographed for a buyer-facing product presentation"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 32vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="relative aspect-[4/3]">
              <Image
                src="/media/homepage/cocoa-dark-chocolate.jpg"
                alt="Branded Caribbean chocolate product shot for buyer-facing service positioning"
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="relative aspect-[4/3]">
              <Image
                src="/media/brand/rice-plated-dark.jpg"
                alt="Plated Caribbean meal and branded rice styled for export presentation"
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <TrackedLink
            key={service.href}
            href={service.href}
            eventName="service_card_click"
            eventParams={{ service: service.key, location: "services_index" }}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-teal-700"
          >
            <div className="relative aspect-[16/10] border-b border-slate-200 bg-slate-100">
              <Image
                src={serviceMedia[service.key].src}
                alt={serviceMedia[service.key].alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
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

              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {service.outcomes.slice(0, 2).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TrackedLink>
        ))}
      </div>
    </Section>
  );
}
