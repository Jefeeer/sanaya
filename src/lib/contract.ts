import { z } from "zod";

/**
 * SANAYA shared contract — the single source of truth for enums, statuses,
 * and API payloads. Frontend, backend, and QA all import from here.
 * Changing a value here is a deliberate, visible contract change.
 */

// ---------- Vocabularies (SQLite has no native enums; these are authoritative) ----------

export const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "EVENT_COORDINATOR",
  "FINANCE",
  "PARTNER_ADMIN",
  "PARTNER_STAFF",
] as const;
export const Role = z.enum(ROLES);
export type Role = z.infer<typeof Role>;

export const EVENT_TYPES = [
  "WEDDING",
  "CORPORATE",
  "CONFERENCE",
  "PRODUCT_LAUNCH",
  "EXHIBITION",
  "PRIVATE_CELEBRATION",
  "COMPANY_PARTY",
  "AWARDS_NIGHT",
  "TEAM_BUILDING",
] as const;
export const EventType = z.enum(EVENT_TYPES);
export type EventType = z.infer<typeof EventType>;

export const VENUE_TYPES = [
  "BALLROOM",
  "GARDEN",
  "HOTEL",
  "CONFERENCE",
  "RESORT",
  "RESTAURANT",
  "EXHIBITION",
  "OUTDOOR",
] as const;
export const VenueType = z.enum(VENUE_TYPES);
export type VenueType = z.infer<typeof VenueType>;

export const INDOOR_OUTDOOR = ["INDOOR", "OUTDOOR", "BOTH"] as const;
export const IndoorOutdoor = z.enum(INDOOR_OUTDOOR);

export const VENUE_PREFERENCE = ["SELECT", "RECOMMEND", "HAVE_OWN"] as const;
export const VenuePreference = z.enum(VENUE_PREFERENCE);

export const SERVICE_OPTIONS = [
  "Catering",
  "Styling",
  "Stage",
  "Lighting",
  "Sound",
  "Entertainment",
  "Photography",
  "Videography",
  "Registration",
  "Transportation",
] as const;

// Booking lifecycle — order matters; transitions validated server-side.
export const BOOKING_STATUSES = [
  "INQUIRY",
  "AVAILABILITY_CHECK",
  "TENTATIVE",
  "CONFIRMED",
  "EVENT_PREPARATION",
  "EVENT_DAY",
  "COMPLETED",
  "CANCELLED",
] as const;
export const BookingStatus = z.enum(BOOKING_STATUSES);
export type BookingStatus = z.infer<typeof BookingStatus>;

/** Legal forward transitions. CANCELLED reachable from any non-terminal state. */
export const BOOKING_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  INQUIRY: ["AVAILABILITY_CHECK", "CANCELLED"],
  AVAILABILITY_CHECK: ["TENTATIVE", "CANCELLED"],
  TENTATIVE: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["EVENT_PREPARATION", "CANCELLED"],
  EVENT_PREPARATION: ["EVENT_DAY", "CANCELLED"],
  EVENT_DAY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function canTransition(from: BookingStatus, to: BookingStatus): boolean {
  return BOOKING_TRANSITIONS[from]?.includes(to) ?? false;
}

export const INQUIRY_STATUSES = ["NEW", "REVIEWING", "CONVERTED", "ARCHIVED"] as const;
export const InquiryStatus = z.enum(INQUIRY_STATUSES);

export const PAYMENT_STATUSES = ["UNPAID", "PARTIALLY_PAID", "PAID", "OVERDUE"] as const;
export const PaymentStatus = z.enum(PAYMENT_STATUSES);

// ---------- API payloads ----------

/** Public "Plan Your Event" submission. Trust boundary — validated server-side. */
export const CreateInquiryInput = z.object({
  eventType: EventType,
  eventDate: z.string().min(1, "Event date is required"), // ISO date
  altDate: z.string().optional().nullable(),
  guestCount: z.coerce.number().int().min(1, "Guest count must be at least 1").max(100000),
  location: z.string().max(200).optional().nullable(),
  venuePreference: VenuePreference.default("RECOMMEND"),
  venueId: z.string().optional().nullable(),
  services: z.array(z.string()).max(30).default([]),
  budgetRange: z.string().max(100).optional().nullable(),
  contactName: z.string().min(1, "Name is required").max(120),
  contactEmail: z.string().email("Valid email required").max(200),
  contactPhone: z.string().max(50).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
});
export type CreateInquiryInput = z.infer<typeof CreateInquiryInput>;

export const VenueFilters = z.object({
  location: z.string().optional(),
  eventType: z.string().optional(),
  venueType: z.string().optional(),
  indoorOutdoor: z.string().optional(),
  minCapacity: z.coerce.number().int().optional(),
});
export type VenueFilters = z.infer<typeof VenueFilters>;

// ---------- Human-readable labels (shared UI dictionary) ----------

export const LABELS: Record<string, string> = {
  // Roles
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EVENT_COORDINATOR: "Event Coordinator",
  FINANCE: "Finance",
  PARTNER_ADMIN: "Partner Admin",
  PARTNER_STAFF: "Partner Staff",
  // Event types
  WEDDING: "Wedding",
  CORPORATE: "Corporate Event",
  CONFERENCE: "Conference",
  PRODUCT_LAUNCH: "Product Launch",
  EXHIBITION: "Exhibition",
  PRIVATE_CELEBRATION: "Private Celebration",
  COMPANY_PARTY: "Company Party",
  AWARDS_NIGHT: "Awards Night",
  TEAM_BUILDING: "Team Building",
  // Venue types
  BALLROOM: "Ballroom",
  GARDEN: "Garden",
  HOTEL: "Hotel",
  RESORT: "Resort",
  RESTAURANT: "Restaurant",
  OUTDOOR: "Outdoor",
  // Indoor/outdoor
  INDOOR: "Indoor",
  BOTH: "Indoor & Outdoor",
  // Booking statuses
  AVAILABILITY_CHECK: "Availability Check",
  TENTATIVE: "Tentative",
  CONFIRMED: "Confirmed",
  EVENT_PREPARATION: "Event Preparation",
  EVENT_DAY: "Event Day",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  INQUIRY: "Inquiry",
  // Inquiry statuses
  NEW: "New",
  REVIEWING: "Reviewing",
  CONVERTED: "Converted",
  ARCHIVED: "Archived",
};

export function label(key: string): string {
  return LABELS[key] ?? key;
}
