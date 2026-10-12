"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { UtensilsCrossed } from "lucide-react";
import { menuStory } from "@/content/site";
import { Reveal } from "../reveal";
import { SectionHeading, btn } from "../ui";
import { prefillInquiry } from "../prefill";

export function MenuStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const down = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const [a, b, c, d] = menuStory.images;

  return (
    <section id="menu" ref={ref} className="relative overflow-hidden bg-moss-deep py-20 text-cream lg:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 size-[520px] rounded-full bg-terracotta/20 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow={menuStory.eyebrow}
            title={<>Your special event starts with the <em className="text-[#f3d3b8]">perfect menu.</em></>}
          />
          <Reveal delay={0.1} className="mt-6 space-y-4 leading-relaxed text-cream/75">
            {menuStory.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {/* Printed-menu card */}
          <Reveal delay={0.15} className="mt-10">
            <div className="grain relative max-w-md rotate-[-1.2deg] rounded-sm bg-cream px-7 py-8 text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] transition duration-700 hover:rotate-0">
              <div className="pointer-events-none absolute inset-2.5 border border-gold/50" aria-hidden />
              <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">Sample menu</p>
              <p className="mt-1 text-center text-lg italic">An evening at Sanaya</p>
              <dl className="mt-6 space-y-3.5 text-sm">
                {menuStory.sampleMenu.map((m) => (
                  <div key={m.course} className="flex items-baseline gap-3">
                    <dt className="shrink-0 text-muted">{m.course}</dt>
                    <span aria-hidden className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-ink/30" />
                    <dd className="text-right">{m.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-center text-[0.7rem] text-muted">Final menu is tailored to you at the food tasting.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <button type="button" className={btn.primary} onClick={() => prefillInquiry({ message: "We would like to schedule a food tasting." })}>
              <UtensilsCrossed className="size-4" aria-hidden /> Request a food tasting
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <motion.div style={{ y: up }} className="space-y-4 sm:space-y-5">
            <Photo p={a} className="aspect-[3/4] arch" />
            <Photo p={b} className="aspect-square rounded-2xl" />
          </motion.div>
          <motion.div style={{ y: down }} className="space-y-4 pt-12 sm:space-y-5">
            <Photo p={c} className="aspect-square rounded-2xl" />
            <Photo p={d} className="aspect-[3/4] rounded-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Photo({ p, className }: { p: { src: string; alt: string }; className: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 25vw, 50vw" quality={70} className="object-cover transition duration-[1.2s] hover:scale-105" />
    </div>
  );
}
