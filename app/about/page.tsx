import Image from "next/image";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import LoopingVideo from "@/components/LoopingVideo";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Section from "@/components/Section";
import TrackedLink from "@/components/TrackedLink";
import {
  aboutHighlights,
  authorityPanels,
  buyerProfiles,
  capabilityHighlights,
} from "@/lib/siteContent";

export const metadata = {
  title: "About",
  description:
    "Learn how Lue & Perez supports buyers with sourcing, consolidation, export logistics, and private-label execution across Caribbean food categories.",
};

const opportunitySteps = [
  "Clarify the destination market, product scope, and commercial timing.",
  "Pressure-test sourcing, packaging, documentation, and logistics together.",
  "Respond with the cleanest path to quote, launch, or scale.",
];

export default function AboutPage() {
  return (
    <Section className="py-10 sm:py-12">
      <ScrollDepthTracker pageName="about" />
      <Breadcrumbs items={[{ href: "/about", label: "About" }]} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">About</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            A Caribbean export partner built for buyers who need commercial clarity and cleaner execution
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Sourcing, market readiness, packaging, and export handling in one operating partner.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/request-a-quote"
              eventName="about_cta_click"
              eventParams={{ destination: "/request-a-quote", location: "about_hero" }}
              className="inline-flex items-center justify-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Start a Qualified Quote Request
            </TrackedLink>
            <TrackedLink
              href="/services"
              eventName="service_index_click"
              eventParams={{ location: "about_hero" }}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:border-slate-400"
            >
              Explore Services
            </TrackedLink>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="relative aspect-[4/5] bg-slate-950">
              <LoopingVideo
                className="h-full w-full bg-slate-950 object-contain"
                poster="/media/fresh/about-lemon-lime.jpg"
                mp4Src="/media/fresh/about-lemon-lime.mp4"
                ariaLabel="Lemon lime bottled beverage video"
                showAudioToggle
                softBackdrop
                priority
              />
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">What buyers lean on us for</p>
            <ul className="mt-4 space-y-4 text-sm leading-6 text-white/80">
              {capabilityHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {aboutHighlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">What the work looks like</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Commercial support that stays close to the product reality</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Packaging, supplier readiness, market requirements, and export handling reviewed together.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Sourcing fit", "Export handling", "Label readiness", "Private label"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 sm:min-h-full">
            <div className="relative aspect-[4/5] sm:h-full sm:aspect-auto">
              <Image
                src="/media/fresh/about-cocoa-pods.jpg"
                alt="Cocoa pods growing in the field"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <div className="relative aspect-[4/5]">
              <Image
                src="/media/fresh/about-sorrel-bottle.jpg"
                alt="Bottled sorrel beverage photographed for buyer-facing product presentation"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 60vw, 26vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Who we support</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Buyer-side teams that need fewer gaps between product and execution</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {buyerProfiles.map((buyer) => (
            <div key={buyer.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">{buyer.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{buyer.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Why buyers bring us in</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">The value is usually in making the handoffs cleaner</h2>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {authorityPanels.map((panel) => (
            <div key={panel.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-xl font-semibold text-slate-900">{panel.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{panel.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {panel.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-950 px-5 py-8 text-white shadow-sm sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">How an opportunity moves</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">A serious request usually gets clearer fast</h2>
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {opportunitySteps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/80">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">Step {index + 1}</div>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
