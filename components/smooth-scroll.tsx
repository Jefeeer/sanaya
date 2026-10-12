"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

let lenis: Lenis | null = null;

/** Smoothly scroll to an in-page target, falling back to native scrolling. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = // Lenis honours the CSS scroll-padding-top, so anchors clear the fixed header without an extra offset.
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
