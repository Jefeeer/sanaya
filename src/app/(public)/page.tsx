import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { VenueCard } from "@/components/public/VenueCard";
import { Button } from "@/components/ui/Button";
import { getVenues } from "@/lib/venues";
import { EVENT_TYPES, SERVICE_OPTIONS, label } from "@/lib/contract";

export default async function LandingPage() {
  const venues = (await getVenues()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Services */}
      <section id="services" className="border-t border-ink-line bg-ink py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-champagne">What we create</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-ivory">
            Every kind of occasion, coordinated end to end
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((t) => (
              <div key={t} className="rounded-[var(--radius-card)] border border-ink-line bg-ink-soft p-6">
                <h3 className="font-display text-xl text-ivory">{label(t)}</h3>
                <p className="mt-2 text-sm text-muted">
                  Venue, styling, catering and production — coordinated by one team.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <span className="mr-2 self-center text-sm text-muted">Coordination services:</span>
            {SERVICE_OPTIONS.map((s) => (
              <span key={s} className="rounded-full border border-ink-line px-3 py-1.5 text-sm text-ivory/80">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured venues */}
      <section className="bg-ink pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-champagne">Our trusted venue partners</p>
              <h2 className="mt-3 font-display text-4xl text-ivory">Extraordinary spaces</h2>
            </div>
            <Button href="/venues" variant="ivoryOutline" size="md">
              View all venues
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-ink-line bg-ink-soft py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-champagne">How SANAYA works</p>
          <h2 className="mt-3 font-display text-4xl text-ivory">From first idea to final toast</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              ["01", "Tell us your vision", "Share your event type, date, guest count and preferences."],
              ["02", "We match your venue", "Choose from our trusted network or let us recommend the perfect space."],
              ["03", "We coordinate everything", "Catering, styling, production and logistics — handled by one team."],
              ["04", "You enjoy the day", "A run sheet keeps every partner in sync on event day."],
            ].map(([n, title, body]) => (
              <div key={n}>
                <div className="font-display text-3xl text-champagne">{n}</div>
                <h3 className="mt-3 text-lg font-semibold text-ivory">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section id="partner" className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-[var(--radius-card)] border border-champagne/30 bg-gradient-to-br from-ink-soft to-ink p-10 md:p-14">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl text-ivory">Partner with SANAYA</h2>
              <p className="mt-4 text-lg text-ivory/75">
                Venues, hotels, resorts, caterers, and production partners — join our network and
                receive qualified bookings, manage availability, and coordinate every event through
                one dedicated portal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/admin/login" variant="gold" size="lg">
                  Partner login
                </Button>
                <Button href="/plan" variant="ivoryOutline" size="lg">
                  Plan an event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-ink-line bg-ink-soft py-24 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-4xl text-ivory sm:text-5xl">Ready to plan something extraordinary?</h2>
          <p className="mt-5 text-lg text-ivory/75">
            Start your event inquiry today — we&apos;ll take it from here.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/plan" variant="gold" size="lg">
              Plan your event
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Prefer to browse first?{" "}
            <Link href="/venues" className="text-champagne hover:underline">
              Explore our venues
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
