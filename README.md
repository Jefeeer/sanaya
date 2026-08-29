# SANAYA

Event-management platform: a premium public marketing/inquiry website, a
partner portal, and an internal operations dashboard — one integrated product.

This repository is being built in **small, verified vertical slices** (not a big
rewrite). The first slice — **Public → Inquiry → Admin** — is complete and tested.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) — frontend + API routes in one repo |
| Styling | Tailwind CSS v4 (CSS-based tokens in `globals.css`) |
| Database | SQLite via Prisma 6 — fully local, no external services |
| Auth | Auth.js v5 (Credentials + JWT sessions) |
| 3D | react-three-fiber + drei (procedural hero, no asset files) |
| Validation / contract | Zod (`src/lib/contract.ts`) |

Runs fully offline on Windows — no web fonts, no external images, no cloud calls.

## Getting started

```bash
npm install
npm run db:push     # create the SQLite schema (prisma/dev.db)
npm run db:seed     # seed orgs, venues, spaces, services, users, sample inquiries
npm run dev         # http://localhost:3000
```

**Demo admin login:** `admin@sanaya.events` / `password123`
(also `coordinator@…`, `finance@…`, and partner logins — see `prisma/seed.ts`).

Scripts: `npm run build`, `npm test`, `npm run db:reset` (reseed).

## The shared contract

`src/lib/contract.ts` is the **single source of truth** shared by frontend,
backend, and tests: role/event/venue/booking/payment vocabularies, the booking
lifecycle + legal transitions (`canTransition`), API payload schemas
(`CreateInquiryInput`, `VenueFilters`), and human-readable `label()`s.

SQLite has no native enums, so these Zod enums — not the DB — are authoritative.
Changing a value here is a deliberate, visible contract change.

## Domain model

`prisma/schema.prisma` defines the full domain. **Organization is the tenant
boundary** — one org owns many venues, users, and bookings; one venue has many
spaces (never assume 1 login = 1 venue). Booking status changes are recorded in
`BookingStatusHistory`, never overwritten.

## Authorization

`isStaff()` gates staff-only surfaces. Enforcement is **server-side and
independent of the UI**: the `/admin` layout redirects non-staff, and every
sensitive API route re-checks (`GET /api/inquiries` → 403 without a staff
session). Hiding buttons is never the authorization mechanism.

## What's built (slice 1 — Checkpoint B)

- **Public site** (premium/dark): 3D landing (with reduced-motion, no-WebGL, and
  mobile fallbacks; headline/CTA usable before the scene loads), venue discovery
  with filters + empty state, venue profiles with spaces + "Request this venue".
- **Plan Your Event**: 6-step guided inquiry flow → `POST /api/inquiries` →
  `EVT-YYYY-NNNNN` reference. Carries a preselected venue from a venue page.
- **Admin** (clean/light): auth-gated dashboard (action-first stats + recent
  inquiries) and full inquiries list.
- **APIs**: `GET /api/venues` (public, filtered), `POST /api/inquiries` (public,
  Zod-validated), `GET /api/inquiries` (staff-only, paginated). Predictable
  envelopes: `{ data }` / `{ error: { message, details } }`.
- **Tests** (`npm test`): booking-transition guard, inquiry contract validation,
  venue filtering, and the end-to-end inquiry persistence path.

## Roadmap (next slices)

Partner portal (bookings, tenant isolation, status tracker, calendar, run sheet)
→ operations (documents, payments, messages, notifications, audit log) →
analytics + hardening. See the project brief for the full phased plan.

## Notes / known simplifications

- The landing page is statically prerendered; new venues appear after a rebuild
  (add `revalidate` if that changes). The `/venues` page is always live.
- Inquiry references use a count-based sequence; the DB unique constraint is the
  race backstop (the API retries on collision).
- Design tokens use robust system/Georgia font stacks — swap in a web font via
  `next/font` later without touching component code.
