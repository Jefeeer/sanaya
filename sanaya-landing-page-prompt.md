# Build Prompt — Sanaya Events Place Landing Page

> Paste everything below the line into your coding agent (Claude Code, Cursor, v0, etc.).
> Before shipping, fill every `TODO(owner)` with real info from Sanaya's management. Do not let the agent invent capacities, prices, reviews, or amenities.

---

## Role

You are a senior front-end engineer and conversion-focused web designer. Build a production-ready, single-page marketing site (plus a thank-you route) for **Sanaya Events Place**, an events venue in Tagaytay City, Philippines. The page's one job: turn visitors (mostly engaged couples, debutantes' parents, and HR/admin staff planning company events) into **booking inquiries** and **ocular-visit requests**.

## Verified business facts (use exactly)

| Field | Value |
|---|---|
| Name | Sanaya Events Place |
| Category | Wedding venue & hospitality / events place |
| Tagline (their own) | "Your special event starts with the perfect menu." |
| Address | 582 Maitim 2nd East, Tagaytay City, 4120 Cavite, Philippines |
| Coordinates | 14.1307004, 120.9570701 |
| Phone / Viber | 0993 119 7056 (`tel:+639931197056`) |
| Email | sanaya.eventplace@gmail.com |
| Facebook | https://www.facebook.com/sanayaeventsplacetagaytay |
| Messenger | https://m.me/sanayaeventsplacetagaytay |
| Instagram | https://www.instagram.com/sanaya.eventplace/ (@sanaya.eventplace) |
| Google Maps | https://maps.google.com/?q=14.1307004,120.9570701 |
| Listed on | Weddings and Beyond supplier directory (Venues & Hotels, Tagaytay) |

The tagline signals that **food/catering is a core selling point** — give the menu/catering story real prominence, not a footnote.

## Unknowns — keep as clearly marked placeholders in `content/site.ts`

- `TODO(owner)` Guest capacity (min–max), and per-space capacity if there are multiple spaces (pavilion / garden / indoor hall)
- `TODO(owner)` Indoor vs. outdoor spaces, air-conditioning, rain backup plan
- `TODO(owner)` Packages: names, starting prices (₱), pax included, inclusions
- `TODO(owner)` In-house catering vs. accredited caterers; corkage / outside-supplier rules
- `TODO(owner)` Accommodation / bridal suite / holding room
- `TODO(owner)` Parking slots, generator backup, ingress/egress hours, event duration
- `TODO(owner)` Whether there is a Taal view (do NOT claim it unless confirmed)
- `TODO(owner)` Real testimonials with names + permission; Google rating
- `TODO(owner)` Photo set (hero, spaces, styled setups, food, night lighting, real events) and logo

Render placeholders gracefully (e.g., "Capacity details on request") so the page works before real data arrives. Never fabricate reviews or numbers.

## Positioning & audience

Tagaytay is crowded with venues competing on scenery, all-in packages, and capacity. Sanaya should win on **"a beautiful Tagaytay celebration where the food is the highlight"** — warm, personal, easy to book.

Primary audiences and what each needs to see fast:
1. **Couples (weddings)** — the look of the space, what a package includes, a starting price, availability of their date.
2. **Debut / birthday / anniversary hosts (parents)** — package value, capacity, food, parking, convenience from Manila/Cavite.
3. **Corporate (team buildings, Christmas parties, seminars)** — capacity, setup options, AV, invoicing, quick quote.

## Tech stack

- **Next.js 15** (App Router, React Server Components) + **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens as CSS variables
- **shadcn/ui** (Button, Card, Accordion, Dialog, Select, Calendar/Popover, Sonner toasts)
- **motion** (Framer Motion) for restrained reveal/parallax; respect `prefers-reduced-motion`
- **next/image** for all photos (AVIF/WebP, blur placeholders), **next/font** for fonts
- **Embla Carousel** for galleries/testimonials; **yet-another-react-lightbox** for the gallery
- **react-hook-form + zod** for the inquiry form; submit via a **Server Action** that sends email with **Resend** (env: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`) and falls back to a prefilled `mailto:` if not configured
- **lucide-react** icons
- Deploy target: **Vercel**. Add `@vercel/analytics`.

All copy, links, packages, FAQs and image paths live in **`content/site.ts`** (typed), so the owner's details can be swapped without touching components.

## Design direction

Mood: **misty highland garden at golden hour** — cool Tagaytay air, greenery, warm string lights, a beautifully set table. Elegant but not stiff; Filipino warmth.

- **Palette (tokens):** `--color-moss` #3F4F3A (primary), `--color-sage` #A7B49E, `--color-cream` #F7F3EC (background), `--color-linen` #EDE6DA, `--color-terracotta` #C0754D (accent/CTA), `--color-gold` #B8975A (fine lines, dividers), `--color-ink` #22261F (text). Provide a dark variant for the footer/night section.
- **Type:** display serif **Cormorant Garamond** (headings, large italic accents), body **Manrope** or **Inter**. Generous sizes: H1 clamp(2.75rem, 6vw, 5.5rem).
- **Layout:** lots of whitespace, full-bleed photography, asymmetric image/text pairs, thin gold rules, rounded-2xl cards, subtle paper/grain texture on cream sections.
- **Motion:** slow fade-up on scroll, gentle hero Ken Burns, hover lift on cards. Nothing bouncy.
- Avoid generic template feel: no stock "wedding rings" clip art, no purple gradients, no centered-everything sameness.

## Page structure (single page, anchor nav)

1. **Sticky header** — logo/wordmark, links (Spaces, Packages, Menu, Gallery, FAQ, Location), primary CTA "Check Your Date". Transparent over hero → cream with blur on scroll. Mobile: sheet menu.
2. **Hero** — full-bleed photo/video of the venue at golden hour or night lighting. H1 e.g. *"Celebrate in Tagaytay, where every gathering begins at the table."* Sub: weddings, debuts, and company events in Maitim 2nd East, Tagaytay. CTAs: **Check Your Date** (scrolls to form) and **Message us on Messenger**. Small trust row: "Weddings · Debuts · Corporate · Private Parties" + "Listed on Weddings and Beyond".
3. **Event types** — 4 cards (Weddings, Debuts & Birthdays, Corporate & Team Events, Intimate Celebrations), each with a photo, one-line promise, and "See packages" link.
4. **The Venue / Spaces** — alternating image/text blocks per space with capacity chips, indoor/outdoor badge, and key features (from `TODO(owner)` data).
5. **The Menu story** — signature section built around their tagline: food photography grid, short copy on cuisine style and food tasting, CTA "Request a Food Tasting". (Fill specifics from owner.)
6. **Packages** — 3 tier cards (e.g., Intimate / Classic / Grand, or by event type with tabs). Show "Starts at ₱__ for __ pax" when known, inclusions checklist, "Get a Quote" CTA that preselects the package in the form. Note: "Prices subject to date and guest count."
7. **Why Sanaya** — 4–6 icon points (only confirmed ones): accessible from Aguinaldo Highway area, cool-climate venue, catering-first experience, styling support, parking, backup power, etc.
8. **Gallery** — masonry grid with filter chips (Weddings, Debuts, Corporate, Venue, Food); lightbox. Link "More on Instagram".
9. **Testimonials** — carousel of real reviews only; hide section if none provided yet.
10. **Plan your visit / How booking works** — 4 steps: Inquire → Ocular visit & food tasting → Reserve with deposit → Celebrate. Builds trust and sets expectations.
11. **FAQ** (Accordion) — seed with the questions couples actually ask: guest capacity; ceremony + reception in one place; package inclusions; outside caterer/supplier rules & corkage; ingress/egress and event hours; parking; accommodations/bridal room; rain/backup plan; reservation fee & payment terms; ocular visit schedule. Answers from `site.ts` (placeholder "Message us for details" until filled). Emit FAQPage JSON-LD.
12. **Inquiry form** — headline "Check your date". Fields: full name*, mobile number* (PH format validation, accepts 09xx / +639xx), email*, event type* (select), preferred date* (date picker, no past dates) + alternate date, estimated guests* (number), budget range (select: below ₱100k / 100–200k / 200–350k / 350k+), preferred contact (Call / Viber / Messenger / Email), message. Honeypot + basic rate limit. On success → `/thank-you` with next steps and Messenger link. Also show phone, email, Messenger buttons beside the form for people who prefer chatting.
13. **Location** — embedded Google Map (iframe with the coordinates, lazy-loaded), address, "Get Directions" button, and short directions copy (e.g., travel time from Manila/SLEX — `TODO(owner)` confirm landmarks).
14. **Footer** — dark moss background, logo, short blurb, contact, social icons (Facebook, Instagram), quick links, © year.
15. **Mobile sticky action bar** — Call · Messenger · Check Date, visible after the hero on small screens.

## SEO & metadata

- `metadata` title: "Sanaya Events Place | Wedding & Events Venue in Tagaytay"; description mentions weddings, debuts, corporate events, catering, Maitim 2nd East Tagaytay.
- Open Graph + Twitter image (generate with `opengraph-image.tsx`).
- JSON-LD `EventVenue` (also `LocalBusiness`) with name, address, geo, telephone, email, sameAs (FB, IG), url.
- `sitemap.ts`, `robots.ts`, canonical URL from env `NEXT_PUBLIC_SITE_URL`.
- Semantic headings (one H1), descriptive alt text on every image.
- Target keywords naturally: "events place in Tagaytay", "Tagaytay wedding venue", "debut venue Tagaytay", "corporate events Tagaytay".

## Quality bar

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO (mobile).
- WCAG AA contrast, keyboard navigable, visible focus rings, form errors announced.
- Mobile-first; test at 360px, 768px, 1280px, 1536px. No horizontal scroll.
- LCP image is priority-loaded and sized; everything else lazy.
- No layout shift from fonts or images.

## Suggested structure

```
app/
  layout.tsx            # fonts, metadata, analytics, JSON-LD
  page.tsx              # composes sections
  thank-you/page.tsx
  actions/inquiry.ts    # server action (zod + Resend)
  opengraph-image.tsx
  sitemap.ts  robots.ts
components/
  site-header.tsx  mobile-action-bar.tsx  site-footer.tsx
  sections/ hero.tsx event-types.tsx spaces.tsx menu-story.tsx packages.tsx
            why-sanaya.tsx gallery.tsx testimonials.tsx booking-steps.tsx
            faq.tsx inquiry-form.tsx location.tsx
  ui/ (shadcn)
content/site.ts         # ALL copy, contacts, packages, FAQs, images, TODO(owner) markers
lib/validators.ts       # zod schemas (PH phone)
public/images/          # placeholders until owner photos arrive
```

## Deliverables

1. Complete, runnable project (`pnpm dev` works) with README covering setup, env vars, and **how to edit `content/site.ts`**.
2. Tasteful placeholder images (neutral garden/table photos, clearly swappable) — no other venues' photos.
3. A checklist in the README listing every `TODO(owner)` still unfilled.

Work section by section, keep components small and typed, and show me the hero + packages sections first for design approval before building the rest.
