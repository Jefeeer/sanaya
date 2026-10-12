"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { Instagram } from "../brand-icons";
import { business, gallery, type GalleryCategory } from "@/content/site";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

const filters: ("All" | GalleryCategory)[] = ["All", "Weddings", "Debuts", "Corporate", "Venue", "Food"];

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));
  const current = index !== null ? items[index] : null;

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Gallery" title={<>Moments from the <em>highlands</em>.</>} />
        <div role="group" aria-label="Filter photos" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                filter === f ? "border-moss bg-moss text-cream" : "border-ink/15 hover:border-ink/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3">
        {items.map((g, i) => (
          <li key={g.src} className="mb-3 break-inside-avoid sm:mb-4">
            <Reveal y={20} delay={(i % 3) * 0.05}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={`group relative block w-full overflow-hidden rounded-xl ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                aria-label={`Open photo: ${g.alt}`}
              >
                <Image src={g.src} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" quality={70} className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-night/70 to-transparent p-3 text-xs text-white opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.category}
                  <Expand className="size-4" aria-hidden />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <a href={business.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 py-3 text-sm underline decoration-gold underline-offset-4 hover:text-terracotta-deep">
          <Instagram className="size-4" aria-hidden /> More on Instagram {business.instagramHandle}
        </a>
      </div>

      <dialog
        ref={dialog}
        data-lenis-prevent
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-night/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div
            className="relative flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10"
            onClick={(e) => e.target === e.currentTarget && setIndex(null)}
          >
            <div className="relative h-[70dvh] w-full max-w-5xl">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={80} className="object-contain" />
            </div>
            <p className="max-w-xl text-center text-sm text-cream/80">{current.alt}</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-11 place-items-center rounded-full border border-cream/30 text-cream hover:bg-cream/10">
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <span className="min-w-14 text-center text-xs text-cream/70">
                {(index ?? 0) + 1} / {items.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-11 place-items-center rounded-full border border-cream/30 text-cream hover:bg-cream/10">
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
            <button type="button" onClick={() => setIndex(null)} aria-label="Close photo viewer" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20">
              <X className="size-5" aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
