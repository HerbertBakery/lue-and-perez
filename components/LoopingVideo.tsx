"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  mp4Src: string;
  webmSrc?: string;
  poster?: string;
  className?: string;
  fill?: boolean;
  ariaLabel?: string;
  priority?: boolean;
  rootMargin?: string;
  showAudioToggle?: boolean;
  softBackdrop?: boolean;
};

export default function LoopingVideo({
  mp4Src,
  webmSrc,
  poster,
  className,
  fill = false,
  ariaLabel,
  priority = false,
  rootMargin = "320px 0px",
  showAudioToggle = false,
  softBackdrop = false,
}: Props) {
  const [isMuted, setIsMuted] = React.useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(priority);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    node.muted = isMuted;
    node.defaultMuted = isMuted;
    node.playsInline = true;
    if (isMuted) {
      node.setAttribute("muted", "");
    } else {
      node.removeAttribute("muted");
    }
    node.setAttribute("playsinline", "");
    node.setAttribute("webkit-playsinline", "true");
  }, [isMuted]);

  const wrapperClassName = fill
    ? "absolute inset-0 h-full w-full overflow-hidden"
    : "relative h-full w-full overflow-hidden";

  const videoClassName = className
    ? fill
      ? `absolute inset-0 z-10 block ${className}`
      : `relative z-10 block ${className}`
    : fill
      ? "absolute inset-0 z-10 block"
      : "relative z-10 block";

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
      node.muted = isMuted;
      node.defaultMuted = isMuted;
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
  }, [isMuted, prefersReducedMotion, shouldLoad]);

  const toggleAudio = React.useCallback(() => {
    const node = videoRef.current;
    if (!node) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    node.muted = nextMuted;
    node.defaultMuted = nextMuted;

    const playAttempt = node.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => {
        // A user-initiated toggle is the strongest chance to keep playback alive on mobile Safari.
      });
    }
  }, [isMuted]);

  return (
    <div className={wrapperClassName}>
      {softBackdrop && poster ? (
        <div aria-hidden="true" className="absolute inset-0">
          <img src={poster} alt="" className="h-full w-full scale-110 object-cover blur-3xl opacity-50" />
          <div className="absolute inset-0 bg-slate-950/35" />
        </div>
      ) : null}

      <video
        ref={videoRef}
        className={videoClassName}
        autoPlay={shouldLoad && !prefersReducedMotion}
        muted={isMuted}
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

      {showAudioToggle ? (
        <button
          type="button"
          onClick={toggleAudio}
          className="absolute bottom-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white backdrop-blur transition hover:bg-slate-950/85"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      ) : null}
    </div>
  );
}
