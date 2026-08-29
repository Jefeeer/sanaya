import Link from "next/link";
import { VenueImage } from "./VenueImage";
import type { VenueCardData } from "@/lib/venues";
import { label } from "@/lib/contract";

export function VenueCard({ venue }: { venue: VenueCardData }) {
  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-line bg-ink-soft transition-colors hover:border-champagne/50"
    >
      <VenueImage name={venue.name} venueType={venue.venueType} rounded={false} className="h-52 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-ivory">{venue.name}</h3>
        <p className="mt-1 text-sm text-muted">{venue.location}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ivory/70">
          <span className="rounded-full border border-ink-line px-2.5 py-1">
            Up to {venue.capacity.toLocaleString()} guests
          </span>
          <span className="rounded-full border border-ink-line px-2.5 py-1">{label(venue.indoorOutdoor)}</span>
          <span className="rounded-full border border-ink-line px-2.5 py-1">{venue.spaceCount} spaces</span>
        </div>

        {venue.suitableEvents.length > 0 && (
          <p className="mt-4 text-sm text-muted">
            Ideal for {venue.suitableEvents.slice(0, 3).map((e) => label(e)).join(", ")}
          </p>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-champagne">
          View venue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
