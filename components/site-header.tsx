"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { business, nav } from "@/content/site";
import { btn } from "./ui";
import { Logo } from "./logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        solid ? "bg-cream/85 text-ink shadow-[0_1px_0_rgba(34,38,31,.08)] backdrop-blur-xl" : "text-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
        <a href="#top" className="shrink-0" aria-label={`${business.name} — back to top`}>
          <Logo tone={solid ? "dark" : "light"} preload className="h-10 w-auto lg:h-11" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="relative py-2.5 opacity-85 transition hover:opacity-100 after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <a href="#inquire" className={`${btn.primary} py-2.5!`}>
              Check your date
            </a>
          </span>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink/10 bg-cream px-5 pb-10 pt-6 sm:px-8 lg:hidden"
        data-lenis-prevent
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-ink/10">
            {nav.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4 text-xl">
                  {n.label}
                  <span className="text-xs text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <a href="#inquire" onClick={() => setOpen(false)} className={btn.primary}>Check your date</a>
          <div className="grid grid-cols-2 gap-3">
            <a href={business.messenger} target="_blank" rel="noopener" className={btn.outline}>
              <MessageCircle className="size-4" /> Messenger
            </a>
            <a href={business.phoneHref} className={btn.outline}>
              <Phone className="size-4" /> Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
