import { notFound } from "next/navigation";
import { VenueImage } from "@/components/public/VenueImage";
import { Button } from "@/components/ui/Button";
import { getVenueBySlug } from "@/lib/venues";
import { label } from "@/lib/contract";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  return { title: venue?.name ?? "Venue" };
}

export default async function VenueProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  const facts: Array<[string, string]> = [
    ["Location", venue.location],
    ["Venue type", label(venue.venueType)],
    ["Setting", label(venue.indoorOutdoor)],
    ["Capacity", `Up to ${venue.capacity.toLocaleString()} guests`],
  ];

  return (
    <div className="bg-ink pt-20">
      {/* Hero */}
      <VenueImage name={venue.name} venueType={venue.venueType} rounded={false} className="h-[42vh] min-h-[320px] w-full" />

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-display text-4xl text-ivory sm:text-5xl">{venue.name}</h1>
            <p className="mt-2 text-lg text-muted">{venue.location}</p>
            {venue.description && <p className="mt-6 max-w-2xl text-ivory/80">{venue.description}</p>}

            {/* Facts */}
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wide text-muted">{k}</dt>
                  <dd className="mt-1 text-sm text-ivory">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Suitable events */}
            {venue.suitableEventsList.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl text-ivory">Suitable for</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {venue.suitableEventsList.map((e) => (
                    <span key={e} className="rounded-full border border-ink-line px-3 py-1.5 text-sm text-ivory/80">
                      {label(e)}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities */}
            {venue.amenitiesList.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl text-ivory">Amenities</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {venue.amenitiesList.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-ivory/80">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cba95f" strokeWidth="2.2" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Event spaces */}
            {venue.spaces.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl text-ivory">Event spaces</h2>
                <div className="mt-4 divide-y divide-ink-line overflow-hidden rounded-[var(--radius-card)] border border-ink-line">
                  {venue.spaces.map((s) => (
                    <div key={s.id} className="flex items-center justify-between bg-ink-soft px-5 py-4">
                      <div>
                        <div className="text-ivory">{s.name}</div>
                        {s.spaceType && <div className="text-xs text-muted">{label(s.spaceType)}</div>}
                      </div>
                      <div className="text-sm text-ivory/80">{s.capacity.toLocaleString()} guests</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-[var(--radius-card)] border border-champagne/30 bg-ink-soft p-6">
              <h2 className="font-display text-xl text-ivory">Interested in this venue?</h2>
              <p className="mt-2 text-sm text-muted">
                Request {venue.name} and our team will confirm availability for your date.
              </p>
              <div className="mt-5">
                <Button href={`/plan?venue=${venue.id}`} variant="gold" size="lg" className="w-full">
                  Request this venue
                </Button>
              </div>
              <p className="mt-4 text-center text-xs text-muted">No commitment — we&apos;ll be in touch to plan the details.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
