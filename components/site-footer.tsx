import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Instagram } from "./brand-icons";
import { business, nav } from "@/content/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-night pb-28 pt-20 text-cream/80 lg:pb-10">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-moss/40 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Closing CTA */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-cream/10 pb-14 md:flex-row md:items-end">
          <p className="max-w-xl text-title font-light text-cream">
            Your table is waiting. <em className="text-[#f3d3b8]">Let&rsquo;s plan the menu.</em>
          </p>
          <a href="#inquire" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-white transition hover:bg-terracotta-deep">
            Check your date
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo variant="full" tone="light" className="h-20 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">{business.description}</p>
            <div className="mt-6 flex gap-2">
              {[
                { href: business.facebook, label: "Facebook", Icon: Facebook },
                { href: business.instagram, label: "Instagram", Icon: Instagram },
                { href: business.messenger, label: "Messenger", Icon: MessageCircle },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener" aria-label={`${business.name} on ${label}`} className="grid size-11 place-items-center rounded-full border border-cream/15 transition hover:border-gold hover:text-gold">
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-block py-2 transition hover:text-cream">{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#inquire" className="inline-block py-2 transition hover:text-cream">Inquire</a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold">Contact</p>
            <ul className="mt-2.5 space-y-1 text-sm">
              <li>
                <a href={business.phoneHref} className="flex gap-3 py-1.5 transition hover:text-cream"><Phone className="mt-0.5 size-4 shrink-0" aria-hidden /> {business.phoneDisplay} (Call / Viber)</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex gap-3 break-all py-1.5 transition hover:text-cream"><Mail className="mt-0.5 size-4 shrink-0" aria-hidden /> {business.email}</a>
              </li>
              <li>
                <a href={business.mapsUrl} target="_blank" rel="noopener" className="flex gap-3 py-1.5 transition hover:text-cream"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden /> {business.address.full}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>
            Powered by <span className="text-cream/80">Arevixa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
