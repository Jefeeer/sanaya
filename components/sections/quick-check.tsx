"use client";

import { CalendarDays, Users, Sparkles, ArrowRight } from "lucide-react";
import { EVENT_TYPES } from "@/lib/validators";
import { useToday } from "../use-today";
import { prefillInquiry } from "../prefill";

const field =
  "w-full appearance-none rounded-xl border border-ink/10 bg-white/70 py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition focus:border-terracotta focus:bg-white";

export function QuickCheck() {
  const today = useToday();
  return (
    <form
      aria-label="Check your date"
      className="rounded-3xl border border-white/60 bg-cream/90 p-5 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,.55)] backdrop-blur-xl sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        prefillInquiry({
          eventType: String(f.get("qEventType") ?? ""),
          date: String(f.get("qDate") ?? ""),
          guests: String(f.get("qGuests") ?? ""),
        });
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-base">Is your date still open?</p>
        <span className="eyebrow text-[0.6rem] text-terracotta-deep">Free quote</span>
      </div>
      <div className="mt-4 grid gap-3">
        <label className="relative block">
          <span className="sr-only">Event type</span>
          <Sparkles className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gold" aria-hidden />
          <select name="qEventType" className={field} defaultValue="Wedding">
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-[1.25fr_1fr] gap-3">
          <label className="relative block">
            <span className="sr-only">Preferred date</span>
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gold" aria-hidden />
            <input type="date" name="qDate" min={today} className={field} />
          </label>
          <label className="relative block">
            <span className="sr-only">Estimated guests</span>
            <Users className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gold" aria-hidden />
            <input type="number" name="qGuests" min={1} inputMode="numeric" placeholder="Guests" className={field} />
          </label>
        </div>
        <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3 text-sm font-medium text-cream transition hover:bg-moss-deep">
          Check availability
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">No commitment. We reply with availability and a quote.</p>
    </form>
  );
}
