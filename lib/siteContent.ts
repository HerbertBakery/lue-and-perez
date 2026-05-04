export type ServiceKey =
  | "export-logistics"
  | "consolidation"
  | "sourcing"
  | "manufacturing"
  | "caribbean-food-exports";

export type ServiceContent = {
  key: ServiceKey;
  href: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  idealFor: string[];
  includes: string[];
  outcomes: string[];
  commonChallenges: string[];
  media?: {
    title: string;
    description: string;
    mp4Src: string;
    webmSrc?: string;
    poster?: string;
  };
};

export type CaseStudyKey =
  | "uk-fcl-consolidation"
  | "private-label-pepper-sauce"
  | "frozen-bakery-middle-east";

export type CaseStudyContent = {
  slug: CaseStudyKey;
  title: string;
  market: string;
  clientType: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  relevance: string;
};

export const services: ServiceContent[] = [
  {
    key: "export-logistics",
    href: "/services/export-logistics",
    title: "Export Logistics",
    eyebrow: "Execution",
    summary: "Freight planning, cold chain, documentation, insurance, and export coordination for Caribbean food shipments.",
    description:
      "We coordinate the commercial and operational path from factory collection to destination arrival, with a focus on documentation discipline, temperature integrity, and market-specific requirements.",
    idealFor: [
      "Importers opening new Caribbean food lanes",
      "Distributors managing chilled or frozen SKUs",
      "Brands that need documentation support before launch",
    ],
    includes: [
      "FCL/LCL planning and carrier coordination",
      "Air and ocean routing guidance",
      "HS code and export document preparation",
      "Temperature-control and chain-of-custody planning",
      "Insurance, lead-time, and risk alignment",
    ],
    outcomes: [
      "Cleaner shipment readiness before booking",
      "Lower documentation risk at destination",
      "Fewer surprises around timing, handling, and compliance",
    ],
    commonChallenges: [
      "Unclear paperwork ownership across suppliers",
      "Cold-chain risk across handoffs and dwell time",
      "Launch delays caused by incomplete export packs",
    ],
  },
  {
    key: "consolidation",
    href: "/services/consolidation",
    title: "Consolidation",
    eyebrow: "Coordination",
    summary: "Multi-supplier pickups, QA coordination, pallet building, and load readiness across ambient, chilled, and frozen products.",
    description:
      "We align multiple suppliers into one export-ready shipment so buyers can reduce fragmentation, improve handling discipline, and keep documentation and shelf-life windows under control.",
    idealFor: [
      "Distributors buying across several Caribbean producers",
      "Retail programs requiring mixed pallets or mixed containers",
      "Teams trying to reduce landed cost per unit",
    ],
    includes: [
      "Pickup scheduling across suppliers",
      "Pre-shipment shelf-life and product checks",
      "Palletization, labeling, and shipment staging",
      "Ambient, chilled, and frozen consolidation planning",
      "Export-ready documentation sets for combined loads",
    ],
    outcomes: [
      "Better shipment density and cleaner receiving",
      "Fewer fragmented pickups and duplicated admin tasks",
      "More predictable handoff from origin to freight",
    ],
    commonChallenges: [
      "Suppliers shipping on different readiness timelines",
      "Mixed storage requirements across the same order",
      "Last-minute relabeling or pallet configuration problems",
    ],
    media: {
      title: "Multi-Supplier Pickups",
      description:
        "We coordinate and consolidate pickups across multiple suppliers so product arrives together, in specification, and ready for export handling.",
      mp4Src: "/media/multi-supplier-pickups.mp4",
      webmSrc: "/media/multi-supplier-pickups.webm",
      poster: "/media/multi-supplier-pickups.jpg",
    },
  },
  {
    key: "sourcing",
    href: "/services/sourcing",
    title: "Sourcing",
    eyebrow: "Discovery",
    summary: "Supplier discovery, commercial vetting, MOQ alignment, and compliance screening for Caribbean categories.",
    description:
      "We help buyers identify suppliers that fit the commercial reality of their market, with attention to capability, pricing logic, documentation readiness, and expansion potential.",
    idealFor: [
      "Buyers entering Caribbean categories for the first time",
      "Brands seeking second-source or regional supplier options",
      "Teams evaluating private label feasibility before committing",
    ],
    includes: [
      "Supplier search and shortlist development",
      "MOQ and price benchmarking",
      "Capability and compliance screening",
      "Documentation and label feasibility review",
      "Private label and co-packing suitability checks",
    ],
    outcomes: [
      "Higher-confidence supplier conversations",
      "Less wasted time on mismatched producers",
      "Better alignment between product ambition and export readiness",
    ],
    commonChallenges: [
      "Suppliers that can produce locally but not export cleanly",
      "MOQ or pricing that does not fit the target channel",
      "Unclear label or regulatory readiness for the destination market",
    ],
    media: {
      title: "Supplier Discovery",
      description:
        "We match buyers with vetted Caribbean producers aligned on capability, quality expectations, commercial fit, and documentation readiness.",
      mp4Src: "/media/supplier-discovery.mp4",
      webmSrc: "/media/supplier-discovery.webm",
      poster: "/media/supplier-discovery.jpg",
    },
  },
  {
    key: "manufacturing",
    href: "/services/manufacturing",
    title: "Manufacturing",
    eyebrow: "Scale-up",
    summary: "Co-packing, private label development, and export-ready packaging support for shelf-stable and frozen products.",
    description:
      "We support the path from product concept or existing formula to scalable production, packaging, and compliance readiness for export-driven retail and distribution channels.",
    idealFor: [
      "Private label buyers building Caribbean assortments",
      "Brands scaling from founder batches to repeat production",
      "Importers needing market-ready packaging and documentation",
    ],
    includes: [
      "Recipe standardization and scale-up guidance",
      "Private label and co-packing planning",
      "Packaging and label review by market",
      "Production scheduling and readiness coordination",
      "Quality-control checkpoints for launch batches",
    ],
    outcomes: [
      "Cleaner handoff from commercial spec to production",
      "Fewer revisions late in packaging and compliance work",
      "Better launch readiness for retailer and distributor programs",
    ],
    commonChallenges: [
      "Formulas that do not scale consistently",
      "Packaging that looks market-ready but misses compliance details",
      "Production timing that slips because specs are incomplete",
    ],
    media: {
      title: "Co-Packing & Private Label",
      description:
        "Recipe development, packaging, and private-label execution under tighter QA so buyers can launch or scale with more confidence.",
      mp4Src: "/media/co-packing-private-label.mp4",
      webmSrc: "/media/co-packing-private-label.webm",
      poster: "/media/co-packing-private-label.jpg",
    },
  },
  {
    key: "caribbean-food-exports",
    href: "/caribbean-food-exports",
    title: "Caribbean Food Exports",
    eyebrow: "End-to-end",
    summary: "A combined export partnership covering sourcing, consolidation, documentation, cold chain, and private label support.",
    description:
      "This is the full operating model for buyers who need a single export partner to coordinate product sourcing, supplier readiness, freight planning, and market-specific execution.",
    idealFor: [
      "Importers that want one accountable regional operating partner",
      "Retail or foodservice buyers building Caribbean programs",
      "Private label teams that need sourcing through shipment execution",
    ],
    includes: [
      "Supplier discovery and vetting",
      "Consolidation and QA coordination",
      "Ambient, chilled, and frozen export planning",
      "Documentation packs and compliance support",
      "Private label and packaging readiness",
    ],
    outcomes: [
      "A cleaner buying experience across multiple suppliers and markets",
      "Stronger control over shipment readiness and commercial coordination",
      "One operating partner across sourcing, export, and launch preparation",
    ],
    commonChallenges: [
      "Managing multiple vendors without a regional coordinator",
      "Trying to source and ship while also solving market compliance",
      "Needing private label support without building a large local team",
    ],
  },
];

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "uk-fcl-consolidation",
    title: "UK Distributor Consolidation — FCL",
    market: "United Kingdom",
    clientType: "Distributor",
    summary: "A Caribbean food distributor needed a more efficient full-container model across multiple suppliers heading into the UK market.",
    challenge:
      "The buyer needed cleaner consolidation planning, improved pallet density, and better shelf-life coordination before import clearance.",
    approach: [
      "Aligned multiple supplier pickup windows into one export-ready shipment",
      "Improved palletization to reduce freight per unit and simplify receiving",
      "Coordinated shelf-life windows so the load landed in a more commercially usable condition",
    ],
    outcomes: [
      "18% reduction in freight per unit through better palletization",
      "Better synchronized shelf-life windows before import clearance",
      "A more repeatable FCL process for ongoing replenishment",
    ],
    relevance:
      "This project reflects the type of consolidation work that matters for distributors trying to improve landed cost without compromising commercial usability.",
  },
  {
    slug: "private-label-pepper-sauce",
    title: "Private Label Pepper Sauce — Canada",
    market: "Canada",
    clientType: "Private Label Buyer",
    summary: "A buyer developing a private-label Caribbean condiment program needed recipe consistency, packaging discipline, and export readiness for Canada.",
    challenge:
      "The program required a repeatable production spec, retailer-ready packaging, and destination-market labeling logic before replenishment could scale.",
    approach: [
      "Standardized the recipe for production consistency",
      "Prepared bilingual labels and nutrition panel structure",
      "Aligned the product and packaging with CFIA-facing import and labeling expectations",
    ],
    outcomes: [
      "A repeatable private-label format ready for ongoing replenishment",
      "Cleaner packaging readiness for Canadian retail expectations",
      "A scalable path for adjacent private-label SKUs and categories",
    ],
    relevance:
      "This is the kind of work that helps buyers turn a promising Caribbean product concept into a commercial program with repeat purchase potential.",
  },
  {
    slug: "frozen-bakery-middle-east",
    title: "Frozen Bakery SKUs — Middle East",
    market: "Middle East",
    clientType: "Importer / Distributor",
    summary: "A frozen bakery shipment required tight temperature integrity, minimal dwell time, and a lane design suited to a longer-haul export market.",
    challenge:
      "Frozen product quality depended on validated routing, disciplined handling, and tighter shipment timing from production to export departure.",
    approach: [
      "Selected validated cold-chain carriers and routing options",
      "Used a two-stop routing plan with minimal dwell time",
      "Scheduled export movement within 72 hours of production readiness",
    ],
    outcomes: [
      "Improved cold-chain confidence across a long-haul lane",
      "Faster handoff from production to shipment readiness",
      "A more controlled operating model for frozen export programs",
    ],
    relevance:
      "This project demonstrates the kind of execution detail required when product quality depends on temperature discipline, timing, and route design.",
  },
];

export const faqItems = [
  {
    question: "Who typically works with Lue & Perez?",
    answer:
      "We primarily support distributors, importers, retail programs, private-label buyers, and foodservice operators looking for Caribbean food sourcing or export execution support.",
  },
  {
    question: "Which markets do you support?",
    answer:
      "Current focus includes North America, the UK and EU, the Middle East, and CARICOM markets, with market-specific documentation and compliance considerations built into the workflow.",
  },
  {
    question: "Do you handle both ambient and temperature-controlled products?",
    answer:
      "Yes. We work across ambient, chilled, and frozen categories and plan the handling, consolidation, and routing model accordingly.",
  },
  {
    question: "Can you help with private label or co-packing?",
    answer:
      "Yes. We support private label and co-packing discussions, including packaging readiness, regulatory review, and production coordination.",
  },
  {
    question: "What should a qualified quote request include?",
    answer:
      "The best quote requests include destination market, product categories, expected volume, timeline, and any private-label, packaging, or cold-chain requirements.",
  },
  {
    question: "Do you support multi-supplier orders?",
    answer:
      "Yes. Consolidation across multiple suppliers is one of the core operating problems we solve for distributors and importers.",
  },
];

export const buyerProfiles = [
  {
    title: "Distributors & Importers",
    description: "Build a cleaner buying program across Caribbean suppliers, mixed product categories, and destination-market requirements.",
  },
  {
    title: "Retail Programs",
    description: "Prepare products, packaging, and replenishment logic for retailer-facing assortments and launch timelines.",
  },
  {
    title: "Private Label Buyers",
    description: "Move from concept or sourcing shortlist to production-ready SKUs, packaging, and export execution support.",
  },
  {
    title: "Foodservice & Multi-Channel Buyers",
    description: "Source or scale Caribbean categories with tighter planning across spec, logistics, and operating requirements.",
  },
];

export const capabilityHighlights = [
  "North America, UK/EU, Middle East, and CARICOM market support",
  "Ambient, chilled, and frozen execution models",
  "Supplier sourcing, consolidation, logistics, and private label support",
  "Documentation, label readiness, and destination-market coordination",
];

export const aboutHighlights = [
  {
    title: "Commercial clarity",
    description: "We help buyers understand what is commercially realistic before time is lost on suppliers or lanes that do not fit the market.",
  },
  {
    title: "Operational coordination",
    description: "We bridge supplier activity, documentation, and freight execution so export programs feel organized rather than improvised.",
  },
  {
    title: "Market-minded execution",
    description: "The work is shaped around destination-market packaging, compliance, and logistics realities, not just origin-side availability.",
  },
];

export function getServiceByKey(key: ServiceKey) {
  return services.find((service) => service.key === key);
}

export function getCaseStudyBySlug(slug: CaseStudyKey) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
