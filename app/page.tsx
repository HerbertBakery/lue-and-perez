import HeroVideo from "@/components/HeroVideo";
import VideoGallery from "@/components/VideoGallery";

export default function HomePage() {
  const featured = [
    {
      title: "Cold Chain",
      mp4Src: "/media/cold-chain.mp4",
      webmSrc: "/media/cold-chain.webm",
      poster: "/media/cold-chain.jpg",
      description: "End-to-end temperature-controlled storage & freight.",
    },
    {
      title: "Multi-Supplier Pickups",
      mp4Src: "/media/multi-supplier-pickups.mp4",
      webmSrc: "/media/multi-supplier-pickups.webm",
      poster: "/media/multi-supplier-pickups.jpg",
      description: "We consolidate from multiple vendors so you don’t have to.",
    },
    {
      title: "Supplier Discovery",
      mp4Src: "/media/supplier-discovery.mp4",
      webmSrc: "/media/supplier-discovery.webm",
      poster: "/media/supplier-discovery.jpg",
      description: "We match you with vetted Caribbean producers at scale.",
    },
    {
      title: "Co-Packing & Private Label",
      mp4Src: "/media/co-packing-private-label.mp4",
      webmSrc: "/media/co-packing-private-label.webm",
      poster: "/media/co-packing-private-label.jpg",
      description: "Recipe, packaging, and brand—all under strict QA.",
    },
  ];

  return (
    <main className="flex flex-col">
      <HeroVideo
        mp4Src="/media/hero-wide.mp4"
        webmSrc="/media/hero-wide.webm"
        poster="/media/hero-wide.jpg"
        headline="Caribbean Export • Cold Chain • Consolidation"
        subhead="Multi-supplier pickups, supplier discovery, co-packing & private label—handled."
      />
      <VideoGallery items={featured} />
    </main>
  );
}
