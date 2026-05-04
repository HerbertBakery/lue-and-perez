"use client";

import { Download } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

type Props = {
  className?: string;
  context?: string;
  label?: string;
};

export default function CapabilitiesLink({
  className,
  context = "quote_page",
  label = "Download capabilities sheet",
}: Props) {
  return (
    <a
      href="/lue-and-perez-capabilities.pdf"
      download="lue-and-perez-capabilities.pdf"
      className={className}
      onClick={() => trackEvent("capabilities_pdf_open", { location: context })}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
