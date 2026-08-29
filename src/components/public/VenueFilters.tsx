"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { VENUE_TYPES, EVENT_TYPES, INDOOR_OUTDOOR, label } from "@/lib/contract";

const CAPACITY_TIERS = [
  ["", "Any capacity"],
  ["50", "50+"],
  ["150", "150+"],
  ["300", "300+"],
  ["500", "500+"],
] as const;

const selectClass =
  "rounded-lg border border-ink-line bg-ink-soft px-3 py-2 text-sm text-ivory focus:border-champagne";

export function VenueFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`/venues?${next.toString()}`);
    },
    [params, router],
  );

  const has = Array.from(params.keys()).length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        defaultValue={params.get("location") ?? ""}
        placeholder="Location"
        aria-label="Filter by location"
        onKeyDown={(e) => e.key === "Enter" && setParam("location", (e.target as HTMLInputElement).value)}
        onBlur={(e) => setParam("location", e.target.value)}
        className={selectClass}
      />
      <select aria-label="Event type" className={selectClass} value={params.get("eventType") ?? ""} onChange={(e) => setParam("eventType", e.target.value)}>
        <option value="">Any event type</option>
        {EVENT_TYPES.map((t) => (
          <option key={t} value={t}>{label(t)}</option>
        ))}
      </select>
      <select aria-label="Venue type" className={selectClass} value={params.get("venueType") ?? ""} onChange={(e) => setParam("venueType", e.target.value)}>
        <option value="">Any venue type</option>
        {VENUE_TYPES.map((t) => (
          <option key={t} value={t}>{label(t)}</option>
        ))}
      </select>
      <select aria-label="Indoor or outdoor" className={selectClass} value={params.get("indoorOutdoor") ?? ""} onChange={(e) => setParam("indoorOutdoor", e.target.value)}>
        <option value="">Indoor / Outdoor</option>
        {INDOOR_OUTDOOR.map((t) => (
          <option key={t} value={t}>{label(t)}</option>
        ))}
      </select>
      <select aria-label="Minimum capacity" className={selectClass} value={params.get("minCapacity") ?? ""} onChange={(e) => setParam("minCapacity", e.target.value)}>
        {CAPACITY_TIERS.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      {has && (
        <button onClick={() => router.push("/venues")} className="text-sm text-champagne hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
