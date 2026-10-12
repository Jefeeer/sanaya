import Image from "next/image";
import { UtensilsCrossed, Mountain, MapPin, Heart, Car, Zap } from "lucide-react";
import { photos, whySanaya } from "@/content/site";
import { Reveal } from "../reveal";
import { SectionHeading } from "../ui";

const icons = { utensils: UtensilsCrossed, mountain: Mountain, map: MapPin, heart: Heart, car: Car, zap: Zap };

export function WhySanaya() {
  return (
    <section className="grain bg-linen py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden arch">
            <Image src={photos.coupleDusk.src} alt={photos.coupleDusk.alt} fill sizes="(min-width:1024px) 40vw, 100vw" quality={70} className="object-cover object-[50%_85%]" />
          </div>
          <div className="absolute -bottom-6 right-4 max-w-[15rem] rounded-2xl bg-cream p-5 shadow-[0_30px_60px_-30px_rgba(34,38,31,.6)] sm:-right-6">
            <p className="text-sm italic leading-relaxed">“Your special event starts with the perfect menu.”</p>
            <p className="mt-2 text-xs text-muted">— the Sanaya promise</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Why Sanaya" title={<>Tagaytay has many venues. Few put the <em>table</em> first.</>} />
          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {whySanaya.map((w, i) => {
              const Icon = icons[w.icon];
              return (
                <li key={w.title}>
                  <Reveal delay={i * 0.06}>
                    <span className="grid size-11 place-items-center rounded-full border border-gold/50 text-moss">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-normal">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
