"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { capabilitiesPdfPath } from "@/lib/siteContent";

type Props = {
  className?: string;
  label?: string;
  context?: string;
};

export default function CapabilitiesLink({
  className,
  label = "Download capabilities PDF",
  context = "site",
}: Props) {
  return (
    <Link
      href={capabilitiesPdfPath}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => {
        trackEvent("capabilities_pdf_open", { location: context });
      }}
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
