// app/components/SeoJsonLd.tsx
"use client";

export default function SeoJsonLd({ json }: { json: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      // @ts-ignore
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
