import { test, after } from "node:test";
import assert from "node:assert/strict";
import { PrismaClient } from "@prisma/client";
import { getVenues } from "../src/lib/venues";
import { CreateInquiryInput } from "../src/lib/contract";

// Integration against the seeded dev.db. Proves the public -> admin data path:
// filter venues -> submit an inquiry against a real venue -> admin can read it.
const prisma = new PrismaClient();
const createdRefs: string[] = [];

after(async () => {
  if (createdRefs.length) await prisma.inquiry.deleteMany({ where: { reference: { in: createdRefs } } });
  await prisma.$disconnect();
});

test("venue discovery: filters narrow results", async () => {
  const all = await getVenues();
  assert.ok(all.length >= 4, "seed should provide venues");

  const big = await getVenues({ minCapacity: 1000 });
  assert.ok(big.every((v) => v.capacity >= 1000));
  assert.ok(big.length < all.length, "capacity filter should narrow");

  const weddings = await getVenues({ eventType: "WEDDING" });
  assert.ok(weddings.every((v) => v.suitableEvents.includes("WEDDING")));
});

test("venue discovery: impossible filter yields empty (drives empty state)", async () => {
  const none = await getVenues({ minCapacity: 1_000_000 });
  assert.equal(none.length, 0);
});

test("inquiry: submitting against a real venue is stored and readable by admin", async () => {
  const venue = (await getVenues())[0];

  const parsed = CreateInquiryInput.safeParse({
    eventType: "WEDDING",
    eventDate: "2026-11-11",
    guestCount: 200,
    venuePreference: "SELECT",
    venueId: venue.id,
    services: ["Catering", "Photography"],
    contactName: "Test Couple",
    contactEmail: "test.couple@example.com",
  });
  assert.ok(parsed.success);
  if (!parsed.success) return;

  const reference = `EVT-TEST-${Date.now()}`;
  createdRefs.push(reference);
  const created = await prisma.inquiry.create({
    data: {
      reference,
      eventType: parsed.data.eventType,
      eventDate: new Date(parsed.data.eventDate),
      guestCount: parsed.data.guestCount,
      venuePreference: parsed.data.venuePreference,
      venueId: parsed.data.venueId,
      services: JSON.stringify(parsed.data.services),
      contactName: parsed.data.contactName,
      contactEmail: parsed.data.contactEmail,
    },
  });

  // Admin read path (what the dashboard query returns).
  const seen = await prisma.inquiry.findUnique({
    where: { id: created.id },
    include: { venue: { select: { name: true } } },
  });
  assert.ok(seen);
  assert.equal(seen!.reference, reference);
  assert.equal(seen!.status, "NEW"); // default status surfaces as "New" in admin
  assert.equal(seen!.venue?.name, venue.name);
  assert.deepEqual(JSON.parse(seen!.services), ["Catering", "Photography"]);
});
