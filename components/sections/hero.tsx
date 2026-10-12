import Image from "next/image";
import { MessageCircle, ArrowDown } from "lucide-react";
import { business, hero } from "@/content/site";
import { btn } from "../ui";
import { QuickCheck } from "./quick-check";

export function Hero() {
  return (
    <section id="top" className="relative isolate">
      <div className="relative min-h-[88svh] overflow-hidden lg:min-h-[100svh]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          quality={80}
          sizes="100vw"
          className="animate-kenburns object-cover object-[50%_40%]"
        />
        {/* Mist + dusk wash for legible type */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,32,24,.55)_0%,rgba(26,32,24,.05)_30%,rgba(26,32,24,.25)_55%,rgba(26,32,24,.88)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,32,24,.5)_0%,rgba(26,32,24,.15)_45%,transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_20%,rgba(184,151,90,.28),transparent_60%)] mix-blend-soft-light" />

        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-28 sm:px-8 lg:min-h-[100svh] lg:pb-16">
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_420px]">
            <div className="max-w-xl text-white">
              <p className="eyebrow flex items-center gap-3 text-[0.68rem] text-white/80">
                <span aria-hidden className="h-px w-8 bg-gold" />
                {hero.eyebrow}
              </p>
              <h1 className="mt-5 text-display font-light">
                Celebrate in Tagaytay, where every gathering{" "}
                <em className="font-normal text-[#f3d3b8]">begins at the table.</em>
              </h1>
              <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-white/80 sm:text-base">{hero.subtitle}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#inquire" className={btn.primary}>Check your date</a>
                <a href={business.messenger} target="_blank" rel="noopener" className={btn.ghostLight}>
                  <MessageCircle className="size-4" aria-hidden /> Message us on Messenger
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
                <span>{hero.trust.join(" · ")}</span>
                <span aria-hidden className="hidden h-3 w-px bg-white/30 sm:block" />
                <span>Listed on <span className="text-white">{business.listedOn}</span></span>
              </div>
            </div>
            <div className="hidden lg:block">
              <QuickCheck />
            </div>
          </div>
        </div>

        <a href="#events" aria-label="Scroll to event types" className="absolute bottom-6 right-6 hidden size-11 place-items-center rounded-full border border-white/30 text-white/80 transition hover:bg-white/10 lg:grid">
          <ArrowDown className="size-4 animate-bounce [animation-duration:2.4s]" aria-hidden />
        </a>
      </div>

      {/* On smaller screens the date checker sits just under the photo */}
      <div className="relative z-10 -mt-16 px-5 sm:px-8 lg:hidden">
        <div className="mx-auto max-w-xl">
          <QuickCheck />
        </div>
      </div>
    </section>
  );
}
