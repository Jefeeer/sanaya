import { Suspense } from "react";
import { PlanWizard } from "@/components/public/PlanWizard";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Plan your event" };

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>;
}) {
  const { venue: preselectedVenueId } = await searchParams;
  const venues = await prisma.venue.findMany({
    where: { published: true },
    select: { id: true, name: true, location: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="bg-ink pt-28">
      <div className="mx-auto max-w-3xl px-5 pb-24 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-champagne">Plan your event</p>
        <h1 className="mt-3 font-display text-4xl text-ivory sm:text-5xl">Let&apos;s bring it to life</h1>
        <p className="mt-4 text-ivory/70">
          Tell us a little about your event. It takes about two minutes — no commitment.
        </p>

        <div className="mt-10">
          <Suspense fallback={<div className="h-96" />}>
            <PlanWizard venues={venues} preselectedVenueId={preselectedVenueId ?? null} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
