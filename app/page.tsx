import VideoHero from "@/components/VideoHero";
import VideoBlock from "@/components/VideoBlock";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Single, wide-angle hero at the top */}
      <VideoHero
        mp4Src="/media/hero-wide.mp4"
        webmSrc="/media/hero-wide.webm"
        poster="/media/hero-wide.jpg"
        headline="Caribbean Food Export • Sourcing • Consolidation"
        subhead="Trusted supply, multi-supplier pickups, cold chain, co-packing & private label—handled end-to-end."
      />

      {/* Vertical, one-by-one autoplay sections */}
      <VideoBlock
        title="Cold Chain"
        description="End-to-end temperature-controlled storage and freight—from factory to destination—monitored and documented at every step."
        mp4Src="/media/cold-chain.mp4"
        webmSrc="/media/cold-chain.webm"
        poster="/media/cold-chain.jpg"
      />

      <VideoBlock
        title="Multi-Supplier Pickups"
        description="We coordinate and consolidate pickups across multiple suppliers, so your goods arrive together—on time, with clean paperwork."
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
    </main>
  );
}
