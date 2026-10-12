"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Users, Leaf, Check } from "lucide-react";
import { spaces } from "@/content/site";
import { SectionHeading } from "../ui";

export function Spaces() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="spaces" className="grain bg-linen py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The venue"
          title={<>Garden air, a sheltered hall, and a <em>long table</em> in between.</>}
          intro="Walk through the spaces where your day happens. Book an ocular visit to see them in person."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Sticky photo stack — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden arch bg-moss/20">
              {spaces.map((s, i) => (
                <Image
                  key={s.name}
                  src={s.image.src}
                  alt={i === active ? s.image.alt : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="45vw"
                  quality={70}
                  className={`object-cover transition-[opacity,transform] duration-[1.1s] ease-[var(--ease-soft)] ${
                    i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute bottom-5 left-5 flex gap-1.5" aria-hidden>
                {spaces.map((s, i) => (
                  <span key={s.name} className={`h-1 rounded-full bg-cream transition-all duration-500 ${i === active ? "w-8" : "w-3 opacity-50"}`} />
                ))}
              </div>
            </div>
          </div>

          <ol className="space-y-6 lg:space-y-0">
            {spaces.map((s, i) => (
              <li
                key={s.name}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="lg:flex lg:min-h-[62vh] lg:items-center"
              >
                <article className={`w-full rounded-2xl bg-cream/70 p-4 transition-opacity duration-700 sm:p-6 lg:bg-transparent lg:p-0 ${i === active ? "lg:opacity-100" : "lg:opacity-50"}`}>
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl lg:hidden">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" quality={70} className="object-cover" />
                  </div>
                  <p className="text-sm text-gold">0{i + 1} / 0{spaces.length}</p>
                  <h3 className="mt-2 text-2xl font-normal">{s.name}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{s.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-moss/20 bg-cream px-3 py-1.5">
                      <Users className="size-3.5 text-moss" aria-hidden />
                      {s.capacity ?? "Capacity on request"}
                    </span>
                    {s.setting && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-moss/20 bg-cream px-3 py-1.5">
                        <Leaf className="size-3.5 text-moss" aria-hidden />
                        {s.setting}
                      </span>
                    )}
                  </div>
                  {s.features.length > 0 && (
                    <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="size-4 text-terracotta" aria-hidden /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
