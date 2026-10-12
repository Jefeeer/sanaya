"use client";

import { Check, ArrowRight } from "lucide-react";
import { formatPeso, packages, packagesNote } from "@/content/site";
import { Reveal } from "../reveal";
import { SectionHeading } from "../ui";
import { prefillInquiry } from "../prefill";

export function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow="Packages"
        title={<>Clear starting points, <em>tailored</em> to your guest list.</>}
        intro="Choose the shape of your celebration. We will adjust the menu, styling and inclusions to fit your date and budget."
      />

      <ul className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
        {packages.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 0.08} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-2xl p-7 transition duration-500 hover:-translate-y-1.5 ${
                  p.featured
                    ? "bg-moss text-cream shadow-[0_40px_80px_-40px_rgba(37,46,34,.9)] md:-my-4 md:py-11"
                    : "border border-ink/10 bg-white/50 hover:shadow-[0_30px_60px_-40px_rgba(34,38,31,.5)]"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-terracotta px-3 py-1 text-[0.7rem] text-white">Most requested</span>
                )}
                <h3 className="text-2xl font-normal">{p.name}</h3>
                <p className={`mt-1 text-sm ${p.featured ? "text-cream/70" : "text-muted"}`}>{p.forWho}</p>

                <div className={`my-6 border-y py-5 ${p.featured ? "border-cream/15" : "border-ink/10"}`}>
                  {p.startingPrice ? (
                    <p>
                      <span className={`text-xs ${p.featured ? "text-cream/60" : "text-muted"}`}>Starts at</span>
                      <span className="block text-3xl font-light">{formatPeso(p.startingPrice)}</span>
                      {p.pax && <span className={`text-xs ${p.featured ? "text-cream/60" : "text-muted"}`}>for {p.pax} guests</span>}
                    </p>
                  ) : (
                    <p>
                      <span className={`text-xs ${p.featured ? "text-cream/60" : "text-muted"}`}>Starting price</span>
                      <span className="block text-xl italic">Quoted for your date</span>
                    </p>
                  )}
                </div>

                <ul className="flex-1 space-y-3 text-sm">
                  {p.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-2.5">
                      <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-[#f3d3b8]" : "text-terracotta"}`} aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => prefillInquiry({ packageId: p.id })}
                  className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                    p.featured ? "bg-terracotta text-white hover:bg-terracotta-deep" : "border border-ink/20 hover:border-ink hover:bg-ink hover:text-cream"
                  }`}
                >
                  Get a quote for {p.name}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-xs text-muted">{packagesNote}</p>
    </section>
  );
}
