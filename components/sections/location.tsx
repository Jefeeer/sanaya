import { MapPin, Navigation, Phone } from "lucide-react";
import { business, location } from "@/content/site";
import { SectionHeading, btn } from "../ui";
import { Reveal } from "../reveal";

export function Location() {
  const { lat, lng } = business.geo;
  return (
    <section id="location" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Find us" title={<>Up in the cool air of <em>Tagaytay</em>.</>} />
          <Reveal delay={0.1} className="mt-8 space-y-5">
            <p className="flex gap-3 text-sm leading-relaxed">
              <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden />
              <span>
                <span className="block text-base">{business.name}</span>
                {business.address.full}
              </span>
            </p>
            <ul className="space-y-2 border-l border-gold/50 pl-4 text-sm leading-relaxed text-muted">
              {location.directions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={business.directionsUrl} target="_blank" rel="noopener" className={btn.primary}>
                <Navigation className="size-4" aria-hidden /> Get directions
              </a>
              <a href={business.phoneHref} className={btn.outline}>
                <Phone className="size-4" aria-hidden /> {business.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05} className="relative overflow-hidden rounded-3xl border border-ink/10 bg-linen">
          <iframe
            title={`Map showing ${business.name} in Tagaytay`}
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] h-full min-h-[320px] w-full grayscale-[35%] sepia-[15%]"
          />
        </Reveal>
      </div>
    </section>
  );
}
