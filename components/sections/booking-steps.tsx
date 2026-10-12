"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { bookingSteps } from "@/content/site";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

export function BookingSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="How booking works" title={<>From first message to <em>last dance</em>, in four steps.</>} />

        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* A line that draws itself as you scroll */}
          <li aria-hidden className="absolute left-[1.35rem] top-0 h-full w-px list-none bg-ink/10 md:left-0 md:top-[1.35rem] md:h-px md:w-full">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-terracotta md:hidden" />
            <motion.div style={{ scaleX: progress }} className="hidden h-full w-full origin-left bg-terracotta md:block" />
          </li>
          {bookingSteps.map((s, i) => (
            <li key={s.title} className="relative pl-16 md:pl-0">
              <Reveal delay={i * 0.1}>
                <span className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-gold bg-cream text-sm md:relative">{i + 1}</span>
                <h3 className="text-lg font-normal md:mt-6">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
