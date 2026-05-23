"use client";

import React from "react";

type Props = {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
  rootMargin?: string;
};

export default function LoopingVideo({
  mp4Src,
  webmSrc,
  poster,
  className,
  ariaLabel,
  priority = false,
  rootMargin = "320px 0px",
}: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(priority);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    node.muted = true;
    node.defaultMuted = true;
    node.playsInline = true;
    node.setAttribute("muted", "");
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "true");
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (priority || shouldLoad) return;

    const node = videoRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, rootMargin, shouldLoad]);

  React.useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad || prefersReducedMotion) return;

    const attemptPlayback = () => {
      node.muted = true;
      node.defaultMuted = true;
      const playAttempt = node.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {
          // Mobile browsers can briefly reject autoplay before metadata is ready.
        });
      }
    };

    attemptPlayback();
    node.addEventListener("loadeddata", attemptPlayback);
    node.addEventListener("canplay", attemptPlayback);

    return () => {
      node.removeEventListener("loadeddata", attemptPlayback);
      node.removeEventListener("canplay", attemptPlayback);
    };
  }, [prefersReducedMotion, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={shouldLoad && !prefersReducedMotion}
      muted
      loop={!prefersReducedMotion}
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      poster={poster}
      preload={shouldLoad ? (priority ? "auto" : "metadata") : "none"}
      aria-hidden={ariaLabel ? undefined : "true"}
      aria-label={ariaLabel}
    >
      {shouldLoad && webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
      {shouldLoad ? <source src={mp4Src} type="video/mp4" /> : null}
    </video>
  );
}
