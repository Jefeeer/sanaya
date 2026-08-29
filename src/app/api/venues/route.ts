import type { NextRequest } from "next/server";
import { getVenues } from "@/lib/venues";
import { VenueFilters } from "@/lib/contract";
import { jsonOk, jsonError } from "@/lib/api";

// GET /api/venues — public venue discovery with optional filters.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const parsed = VenueFilters.partial().safeParse({
    location: sp.get("location") ?? undefined,
    eventType: sp.get("eventType") ?? undefined,
    venueType: sp.get("venueType") ?? undefined,
    indoorOutdoor: sp.get("indoorOutdoor") ?? undefined,
    minCapacity: sp.get("minCapacity") ?? undefined,
  });
  if (!parsed.success) return jsonError(422, "Invalid filters", parsed.error.flatten().fieldErrors);

  const venues = await getVenues(parsed.data);
  return jsonOk(venues);
}
