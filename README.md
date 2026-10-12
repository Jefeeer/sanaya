# Sanaya Events Place — landing page

Single-page marketing site for Sanaya Events Place (Tagaytay City), built to turn visitors into booking inquiries.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis smooth scroll · Zod · Vercel Analytics. One typeface: Jost.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
npm test                     # form validation tests
npm run build                # production build
```

## Environment variables

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical links, sitemap and Open Graph. |
| `RESEND_API_KEY` | Optional. When set, inquiries are emailed through [Resend](https://resend.com). |
| `INQUIRY_TO_EMAIL` | Inbox that receives inquiries (defaults to sanaya.eventplace@gmail.com). |
| `INQUIRY_FROM_EMAIL` | Sender on a domain verified in Resend. |

Without `RESEND_API_KEY` the form still works: after validation it opens the visitor's email app with every detail prefilled, so no lead is lost.

## Editing content

Everything on the page (copy, contact links, spaces, packages, FAQ answers, photos) lives in **`content/site.ts`**. You do not need to touch the components.

- **Prices:** set `startingPrice` and `pax` on a package. Leave them `null` to show "Quoted for your date".
- **Capacity / indoor-outdoor:** set `capacity` and `setting` on a space. Leave them `null` to show "Capacity on request".
- **FAQ:** replace each `a: null` with the answer. Unfilled answers show a friendly "message us" line.
- **Logo:** Sanaya's own logo (from their Facebook profile) lives in `public/images/logo-*.png`; swap in the original vector file when available.
- **Photos:** put files in `public/images/` and change `src` to `/images/your-file.jpg`. Write a real `alt` description.
- **Testimonials:** add real reviews only, with permission.

## Owner checklist: every `TODO(owner)` still open

- [ ] Real photo set: hero, each space, styled setups, food, night lighting, real events
- [ ] Guest capacity (min–max), overall and per space
- [ ] Space names, indoor vs. outdoor, air-conditioning, rain backup plan
- [ ] Package names, starting prices (₱), guests included, confirmed inclusions
- [ ] In-house catering vs. accredited caterers; corkage and outside-supplier rules
- [ ] Cuisine style and how the menu works (the menu card is a sample format)
- [ ] Bridal suite / holding room / accommodation
- [ ] Parking slots, generator backup, ingress/egress hours, event duration
- [ ] Taal view: do not mention it unless confirmed
- [ ] Real testimonials with names and permission; Google rating
- [ ] Landmarks and travel times for the directions copy
- [ ] Reply-time promise (`business.replyPromise`)
- [ ] All 10 FAQ answers

## Deploy

Push to GitHub and import into Vercel, then set the environment variables above.
