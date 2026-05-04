"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

type Props = {
  pageName: string;
};

const THRESHOLDS = [50, 75, 90];

export default function ScrollDepthTracker({ pageName }: Props) {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const percent = Math.round((window.scrollY / maxScroll) * 100);
      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent("scroll_depth", { page_name: pageName, percent: threshold });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageName]);

  return null;
}
