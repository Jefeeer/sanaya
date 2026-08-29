"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), { ssr: false });

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

// Subscribe to the two media queries that gate the 3D scene. Server snapshot is
// `false`, so SSR/hydration always start on the static gradient; the client
// upgrades to 3D only when motion is allowed, the viewport isn't tiny, and
// WebGL exists — and re-evaluates live if the user changes those preferences.
function subscribe(cb: () => void): () => void {
  const a = window.matchMedia("(prefers-reduced-motion: reduce)");
  const b = window.matchMedia("(max-width: 640px)");
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}

function clientSnapshot(): boolean {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(max-width: 640px)").matches &&
    webglAvailable()
  );
}

export function Hero() {
  const enable3D = useSyncExternalStore(subscribe, clientSnapshot, () => false);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Static premium backdrop — always present, instantly. */}
      <div className="absolute inset-0 bg-ink" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 30%, rgba(203,169,95,0.18), transparent 60%), radial-gradient(50% 50% at 20% 80%, rgba(228,207,156,0.10), transparent 60%)",
        }}
      />

      {/* 3D layer (decorative, non-interactive). */}
      {enable3D && (
        <div className="absolute inset-0" aria-hidden>
          <Hero3DCanvas />
        </div>
      )}

      {/* Content overlay — usable immediately, independent of the 3D runtime. */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-32 lg:px-8">
        <div className="max-w-2xl animate-rise">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-champagne">
            Event Management &amp; Venue Coordination
          </p>
          <h1 className="font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Exceptional Events.
            <br />
            Extraordinary Venues.
            <br />
            <span className="text-champagne">One Seamless Experience.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-ivory/75">
            SANAYA creates and coordinates unforgettable events with a trusted network of
            venues and partners — from first inquiry to the final toast.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/plan" variant="gold" size="lg">
              Plan your event
            </Button>
            <Button href="/venues" variant="ivoryOutline" size="lg">
              Explore venues
            </Button>
            <Button href="/#partner" variant="ivoryOutline" size="lg">
              Partner with us
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" aria-hidden />
    </section>
  );
}
