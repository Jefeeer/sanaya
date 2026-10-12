"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { business } from "@/content/site";

/** Thumb-reach actions on phones, shown once the hero is out of view. */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem]";
  return (
    <nav
      aria-label="Quick actions"
      className={`fixed inset-x-3 bottom-3 z-40 flex overflow-hidden rounded-2xl border border-white/10 bg-night/90 text-cream shadow-2xl backdrop-blur-xl transition duration-500 pb-[env(safe-area-inset-bottom)] lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
      }`}
    >
      <a href={business.phoneHref} className={item} tabIndex={show ? 0 : -1}>
        <Phone className="size-[18px]" aria-hidden /> Call
      </a>
      <a href={business.messenger} target="_blank" rel="noopener" className={`${item} border-x border-white/10`} tabIndex={show ? 0 : -1}>
        <MessageCircle className="size-[18px]" aria-hidden /> Messenger
      </a>
      <a href="#inquire" className={`${item} bg-terracotta font-medium`} tabIndex={show ? 0 : -1}>
        <CalendarCheck className="size-[18px]" aria-hidden /> Check date
      </a>
    </nav>
  );
}
