import { Suspense } from "react";
import { VenueCard } from "@/components/public/VenueCard";
import { VenueFilters } from "@/components/public/VenueFilters";
import { Button } from "@/components/ui/Button";
import { getVenues } from "@/lib/venues";
import { VenueFilters as VenueFiltersSchema } from "@/lib/contract";

export const metadata = { title: "Venues" };

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  // Parse loosely — bad filter values just fall through to "no filter".
  const filters = VenueFiltersSchema.partial().safeParse({
    location: sp.location,
    eventType: sp.eventType,
    venueType: sp.venueType,
    indoorOutdoor: sp.indoorOutdoor,
    minCapacity: sp.minCapacity,
  });
  const venues = await getVenues(filters.success ? filters.data : {});

  return (
    <div className="bg-ink pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-champagne">Our trusted venue partners</p>
        <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">Find your venue</h1>
        <p className="mt-4 max-w-xl text-ivory/70">
          Browse extraordinary spaces from our partner network. Filter by location, event type, and
          capacity to find the perfect fit.
        </p>

        <div className="mt-10">
          <Suspense fallback={<div className="h-10" />}>
            <VenueFilters />
          </Suspense>
        </div>

        <p className="mt-6 text-sm text-muted">
          {venues.length} {venues.length === 1 ? "venue" : "venues"} available
        </p>

        {venues.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-ink-line bg-ink-soft p-14 text-center">
            <h2 className="font-display text-2xl text-ivory">No venues match those filters</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Try widening your search — or let our team recommend the perfect venue for your event.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button href="/venues" variant="ivoryOutline" size="md">Clear filters</Button>
              <Button href="/plan" variant="gold" size="md">Recommend a venue</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
