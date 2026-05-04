"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
};

export default function TrackedLink({
  children,
  className,
  eventName,
  eventParams,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        if (eventName) trackEvent(eventName, eventParams || {});
      }}
    >
      {children}
    </Link>
  );
}
