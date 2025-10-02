// app/page.tsx
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import VideoBlock from "@/components/VideoBlock";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Semantic H1 for brand/keywords (hidden visually but kept for SEO) */}
      <h1 className="sr-only">
        Lue & Perez — Caribbean Food Exports, Sourcing, Consolidation & Co-Packing
      </h1>

      {/* Hero */}
      <VideoHero
        mp4Src="/media/hero-wide.mp4"
        webmSrc="/media/hero-wide.webm"
        poster="/media/hero-wide.jpg"
        headline="Caribbean Food Export • Sourcing • Consolidation"
        subhead="Trusted supply, multi-supplier pickups, co-packing & private label—handled end-to-end."
      />

      {/* Vertical sections */}
      <VideoBlock
        title="Scalable Manufacturing Solutions"
        description="End-to-end temperature-controlled storage and freight—from factory to destination—monitored and documented at every step."
        mp4Src="/media/cold-chain.mp4"
        webmSrc="/media/cold-chain.webm"
        poster="/media/cold-chain.jpg"
      />

      <VideoBlock
        title="Multi-Supplier Pickups"
        description="We coordinate and consolidate pickups across multiple suppliers, so your goods arrive together—on time."
        mp4Src="/media/multi-supplier-pickups.mp4"
        webmSrc="/media/multi-supplier-pickups.webm"
        poster="/media/multi-supplier-pickups.jpg"
      />

      <VideoBlock
        title="Supplier Discovery"
        description="We match you with vetted Caribbean producers at scale—aligned on quality, certifications, capacity, and pricing."
        mp4Src="/media/supplier-discovery.mp4"
        webmSrc="/media/supplier-discovery.webm"
        poster="/media/supplier-discovery.jpg"
      />

      <VideoBlock
        title="Co-Packing & Private Label"
        description="Recipe development, packaging, and brand execution under strict QA—so you can launch or scale with confidence."
        mp4Src="/media/co-packing-private-label.mp4"
        webmSrc="/media/co-packing-private-label.webm"
        poster="/media/co-packing-private-label.jpg"
      />

      {/* Internal link points to main Services page */}
      <div className="px-4 py-10">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-3">Looking for Caribbean Food Exports?</h2>
          <p className="mb-4">
            We specialize in export logistics, consolidation, sourcing, and private label across the Caribbean.
          </p>
          <Link
            href="/services"
            className="inline-block rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Learn about our Caribbean Food Export services →
          </Link>
        </div>
      </div>
    </main>
  );
}
