"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { eventTypes } from "@/content/site";
import { EVENT_TYPES } from "@/lib/validators";
import { Reveal } from "../reveal";
import { SectionHeading } from "../ui";
import { prefillInquiry } from "../prefill";

const formValue: Record<string, (typeof EVENT_TYPES)[number]> = {
  wedding: "Wedding",
  debut: "Debut / Birthday",
  corporate: "Corporate / Team event",
  intimate: "Intimate celebration",
};

export function EventTypes() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Celebrations we host"
          title={<>One venue, every <em>milestone</em> worth gathering for.</>}
        />
        <Reveal className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
          From a two-hundred-guest wedding to a quiet anniversary dinner, each event gets its own menu and plan.
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
        {eventTypes.map((e, i) => (
          <li key={e.id} className={i % 2 ? "lg:translate-y-12" : ""}>
            <Reveal delay={i * 0.08}>
              <article className="group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    quality={70}
                    className="object-cover transition duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.7rem] text-ink backdrop-blur">0{i + 1}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-xl font-normal">{e.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{e.promise}</p>
                    <button
                      type="button"
                      onClick={() => prefillInquiry({ eventType: formValue[e.id], packageId: e.packageId })}
                      className="mt-2 inline-flex items-center gap-1.5 py-2.5 text-sm text-[#f3d3b8] underline-offset-4 hover:underline"
                    >
                      Get a quote
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
