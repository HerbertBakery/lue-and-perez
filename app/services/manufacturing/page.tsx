import type { Metadata } from "next";
import Section from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import SeoJsonLd from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Manufacturing — Lue & Perez",
  description:
    "Co-packing/private label for shelf-stable & frozen SKUs, recipe standardization, label/regulatory review, and export-ready packaging.",
  alternates: { canonical: "/services/manufacturing" },
  openGraph: {
    title: "Manufacturing — Lue & Perez",
    description:
      "Co-packing & private label, regulatory review, production scheduling, QC.",
    url: "/services/manufacturing",
    type: "article",
  },
};

export default function Page(){
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Manufacturing",
    serviceType: "Manufacturing",
    provider: { "@type": "Organization", name: "Lue & Perez" },
    description:
      "Co-packing/private label for shelf-stable & frozen SKUs, recipe standardization, label/regulatory review, and export-ready packaging.",
  };

  return (
    <Section className="py-12">
      <SeoJsonLd json={serviceJsonLd} />
      <Breadcrumbs items={[{href:'/services', label:'Services'},{href:'/services/manufacturing', label:'Manufacturing'}]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold">Manufacturing</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        Co-packing for shelf-stable & frozen SKUs, recipe standardization, label/regulatory review, and export-ready packaging.
      </p>
      <ul className="mt-6 list-disc pl-6 text-slate-600">
        <li>Recipe scale-up & validation</li>
        <li>Label translations & nutrition panels</li>
        <li>Regulatory compliance by market</li>
        <li>Production scheduling & QC</li>
      </ul>
      <a href="/contact" className="mt-8 inline-block rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold hover:bg-teal-800">Request a Quote</a>
    </Section>
  );
}
