"use client";

import Link from "next/link";
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
    <Link
      href="/lue-and-perez-capabilities.pdf"
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackEvent("capabilities_pdf_open", { location: context })}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
