import { prisma } from "./prisma";
import type { VenueFilters } from "./contract";

function parseList(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export type VenueCardData = {
  id: string;
  name: string;
  slug: string;
  location: string;
  venueType: string;
  indoorOutdoor: string;
  capacity: number;
  description: string | null;
  heroImage: string | null;
  amenities: string[];
  suitableEvents: string[];
  spaceCount: number;
};

export async function getVenues(filters: VenueFilters = {}): Promise<VenueCardData[]> {
  const where: Record<string, unknown> = { published: true };
  if (filters.location) where.location = { contains: filters.location };
  if (filters.venueType) where.venueType = filters.venueType;
  if (filters.indoorOutdoor) where.indoorOutdoor = filters.indoorOutdoor;
  if (filters.minCapacity) where.capacity = { gte: filters.minCapacity };

  const rows = await prisma.venue.findMany({
    where,
    orderBy: { capacity: "desc" },
    include: { _count: { select: { spaces: true } } },
  });

  let venues = rows.map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    location: v.location,
    venueType: v.venueType,
    indoorOutdoor: v.indoorOutdoor,
    capacity: v.capacity,
    description: v.description,
    heroImage: v.heroImage,
    amenities: parseList(v.amenities),
    suitableEvents: parseList(v.suitableEvents),
    spaceCount: v._count.spaces,
  }));

  // eventType lives inside the JSON suitableEvents list — filter in JS.
  if (filters.eventType) {
    venues = venues.filter((v) => v.suitableEvents.includes(filters.eventType!));
  }
  return venues;
}

export async function getVenueBySlug(slug: string) {
  const v = await prisma.venue.findUnique({
    where: { slug },
    include: { spaces: { orderBy: { capacity: "desc" } }, organization: { include: { partner: true } } },
  });
  if (!v || !v.published) return null;
  return {
    ...v,
    galleryList: parseList(v.gallery),
    amenitiesList: parseList(v.amenities),
    suitableEventsList: parseList(v.suitableEvents),
  };
}
