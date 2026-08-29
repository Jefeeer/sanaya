import { test } from "node:test";
import assert from "node:assert/strict";
import { canTransition, CreateInquiryInput, BOOKING_STATUSES } from "../src/lib/contract";

test("booking lifecycle: legal forward transitions are allowed", () => {
  assert.ok(canTransition("INQUIRY", "AVAILABILITY_CHECK"));
  assert.ok(canTransition("AVAILABILITY_CHECK", "TENTATIVE"));
  assert.ok(canTransition("TENTATIVE", "CONFIRMED"));
  assert.ok(canTransition("CONFIRMED", "EVENT_PREPARATION"));
  assert.ok(canTransition("EVENT_PREPARATION", "EVENT_DAY"));
  assert.ok(canTransition("EVENT_DAY", "COMPLETED"));
});

test("booking lifecycle: illegal jumps are rejected", () => {
  assert.equal(canTransition("INQUIRY", "CONFIRMED"), false);
  assert.equal(canTransition("INQUIRY", "COMPLETED"), false);
  assert.equal(canTransition("COMPLETED", "INQUIRY"), false);
  assert.equal(canTransition("CANCELLED", "CONFIRMED"), false);
  // Cannot cancel a completed booking.
  assert.equal(canTransition("COMPLETED", "CANCELLED"), false);
});

test("booking lifecycle: cancellable from any active state", () => {
  for (const s of BOOKING_STATUSES) {
    if (s === "COMPLETED" || s === "CANCELLED" || s === "EVENT_DAY") continue;
    assert.ok(canTransition(s, "CANCELLED"), `${s} -> CANCELLED should be legal`);
  }
});

test("inquiry contract: accepts a valid submission", () => {
  const r = CreateInquiryInput.safeParse({
    eventType: "WEDDING",
    eventDate: "2026-12-20",
    guestCount: 150,
    contactName: "Jane Cruz",
    contactEmail: "jane@example.com",
  });
  assert.ok(r.success);
  if (r.success) {
    assert.equal(r.data.venuePreference, "RECOMMEND"); // default applied
    assert.deepEqual(r.data.services, []);
  }
});

test("inquiry contract: rejects bad event type, email, and guest count", () => {
  assert.equal(CreateInquiryInput.safeParse({ eventType: "PARTY", eventDate: "2026-12-20", guestCount: 10, contactName: "A", contactEmail: "a@b.com" }).success, false);
  assert.equal(CreateInquiryInput.safeParse({ eventType: "WEDDING", eventDate: "2026-12-20", guestCount: 10, contactName: "A", contactEmail: "not-an-email" }).success, false);
  assert.equal(CreateInquiryInput.safeParse({ eventType: "WEDDING", eventDate: "2026-12-20", guestCount: 0, contactName: "A", contactEmail: "a@b.com" }).success, false);
});

test("inquiry contract: coerces string guestCount from a form post", () => {
  const r = CreateInquiryInput.safeParse({
    eventType: "CORPORATE",
    eventDate: "2026-10-01",
    guestCount: "300",
    contactName: "Corp Co",
    contactEmail: "events@corp.com",
  });
  assert.ok(r.success);
  if (r.success) assert.equal(r.data.guestCount, 300);
});
