import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const pw = (plain: string) => bcrypt.hashSync(plain, 10);
const j = (v: unknown) => JSON.stringify(v);

async function main() {
  // Clear (dependency order) for a repeatable seed.
  await prisma.bookingStatusHistory.deleteMany();
  await prisma.eventService.deleteMany();
  await prisma.eventTimeline.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.document.deleteMany();
  await prisma.message.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.event.deleteMany();
  await prisma.venueSpace.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.client.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.service.deleteMany();
  await prisma.organization.deleteMany();

  // ---- SANAYA house org + staff ----
  const house = await prisma.organization.create({
    data: { name: "SANAYA", slug: "sanaya", type: "SANAYA" },
  });

  await prisma.user.createMany({
    data: [
      { email: "admin@sanaya.events", name: "SANAYA Admin", passwordHash: pw("password123"), role: "SUPER_ADMIN", organizationId: house.id },
      { email: "coordinator@sanaya.events", name: "Casey Coordinator", passwordHash: pw("password123"), role: "EVENT_COORDINATOR", organizationId: house.id },
      { email: "finance@sanaya.events", name: "Fran Finance", passwordHash: pw("password123"), role: "FINANCE", organizationId: house.id },
    ],
  });

  // ---- Services catalog ----
  const services = [
    ["Catering", "CATERING"], ["Styling", "STYLING"], ["Stage", "STAGE"],
    ["Lighting", "LIGHTING"], ["Sound", "SOUND"], ["Entertainment", "ENTERTAINMENT"],
    ["Photography", "PHOTOGRAPHY"], ["Videography", "VIDEOGRAPHY"],
    ["Registration", "REGISTRATION"], ["Transportation", "TRANSPORTATION"],
  ];
  await prisma.service.createMany({ data: services.map(([name, category]) => ({ name, category })) });

  // ---- Partner organizations (each may own MANY venues) ----
  const aurora = await prisma.organization.create({
    data: {
      name: "Aurora Hospitality Group",
      slug: "aurora-hospitality",
      type: "PARTNER",
      partner: {
        create: {
          companyName: "Aurora Hospitality Group",
          partnerType: "HOTEL",
          contactName: "Alicia Reyes",
          contactEmail: "partners@aurorahg.com",
          contactPhone: "+63 2 8123 4567",
          commissionRate: 0.1,
        },
      },
      users: {
        create: [
          { email: "admin@aurorahg.com", name: "Alicia Reyes", passwordHash: pw("password123"), role: "PARTNER_ADMIN" },
          { email: "ops@aurorahg.com", name: "Marco Dela Cruz", passwordHash: pw("password123"), role: "PARTNER_STAFF" },
        ],
      },
    },
  });

  const seaside = await prisma.organization.create({
    data: {
      name: "Seaside Resorts Manila",
      slug: "seaside-resorts",
      type: "PARTNER",
      partner: {
        create: {
          companyName: "Seaside Resorts Manila",
          partnerType: "RESORT",
          contactName: "Diego Santos",
          contactEmail: "events@seasideresorts.ph",
          commissionRate: 0.12,
        },
      },
      users: { create: [{ email: "admin@seasideresorts.ph", name: "Diego Santos", passwordHash: pw("password123"), role: "PARTNER_ADMIN" }] },
    },
  });

  // ---- Venues (with multiple spaces each) ----
  await prisma.venue.create({
    data: {
      organizationId: aurora.id,
      name: "The Grand Aurora",
      slug: "the-grand-aurora",
      location: "Makati City, Metro Manila",
      venueType: "BALLROOM",
      indoorOutdoor: "INDOOR",
      capacity: 500,
      description: "A landmark ballroom with soaring ceilings, crystal chandeliers, and column-free floors — built for grand weddings and gala nights.",
      heroImage: "/venues/grand-aurora.svg",
      gallery: j(["/venues/grand-aurora.svg"]),
      amenities: j(["Valet Parking", "Bridal Suite", "In-house Catering", "Stage & Rigging", "Dressing Rooms", "Wheelchair Access"]),
      suitableEvents: j(["WEDDING", "AWARDS_NIGHT", "CORPORATE", "PRIVATE_CELEBRATION"]),
      spaces: {
        create: [
          { name: "Grand Ballroom", capacity: 500, spaceType: "BALLROOM" },
          { name: "Aurora Garden", capacity: 250, spaceType: "GARDEN" },
          { name: "Executive Conference Room", capacity: 100, spaceType: "CONFERENCE" },
          { name: "VIP Lounge", capacity: 30, spaceType: "VIP" },
        ],
      },
    },
  });

  await prisma.venue.create({
    data: {
      organizationId: aurora.id,
      name: "Aurora Sky Pavilion",
      slug: "aurora-sky-pavilion",
      location: "Bonifacio Global City, Taguig",
      venueType: "GARDEN",
      indoorOutdoor: "BOTH",
      capacity: 300,
      description: "A rooftop pavilion pairing an open-air garden with a glass-enclosed hall — skyline views by day, city lights by night.",
      heroImage: "/venues/sky-pavilion.svg",
      gallery: j(["/venues/sky-pavilion.svg"]),
      amenities: j(["Rooftop Garden", "Weather Cover", "Bar Service", "LED Wall", "Parking"]),
      suitableEvents: j(["WEDDING", "PRODUCT_LAUNCH", "COMPANY_PARTY", "PRIVATE_CELEBRATION"]),
      spaces: {
        create: [
          { name: "Sky Garden", capacity: 180, spaceType: "GARDEN" },
          { name: "Glass Hall", capacity: 300, spaceType: "BALLROOM" },
        ],
      },
    },
  });

  await prisma.venue.create({
    data: {
      organizationId: seaside.id,
      name: "Seaside Grand Resort",
      slug: "seaside-grand-resort",
      location: "Nasugbu, Batangas",
      venueType: "RESORT",
      indoorOutdoor: "BOTH",
      capacity: 400,
      description: "Beachfront resort with a grand hall and an oceanfront terrace — destination weddings and multi-day corporate retreats.",
      heroImage: "/venues/seaside-grand.svg",
      gallery: j(["/venues/seaside-grand.svg"]),
      amenities: j(["Beachfront", "On-site Rooms", "Pool", "Catering", "Shuttle Service", "Generator Backup"]),
      suitableEvents: j(["WEDDING", "TEAM_BUILDING", "CORPORATE", "CONFERENCE"]),
      spaces: {
        create: [
          { name: "Grand Hall", capacity: 400, spaceType: "BALLROOM" },
          { name: "Ocean Terrace", capacity: 200, spaceType: "GARDEN" },
          { name: "Sunset Deck", capacity: 60, spaceType: "VIP" },
        ],
      },
    },
  });

  await prisma.venue.create({
    data: {
      organizationId: seaside.id,
      name: "Metro Exhibition Center",
      slug: "metro-exhibition-center",
      location: "Pasay City, Metro Manila",
      venueType: "EXHIBITION",
      indoorOutdoor: "INDOOR",
      capacity: 2000,
      description: "Flexible column-free exhibition halls for conferences, expos, and product launches at scale.",
      heroImage: "/venues/metro-exhibition.svg",
      gallery: j(["/venues/metro-exhibition.svg"]),
      amenities: j(["Loading Docks", "High Ceilings", "Fibre Internet", "Modular Halls", "On-site AV", "Ample Parking"]),
      suitableEvents: j(["CONFERENCE", "EXHIBITION", "PRODUCT_LAUNCH", "CORPORATE"]),
      spaces: {
        create: [
          { name: "Hall A", capacity: 2000, spaceType: "CONFERENCE" },
          { name: "Hall B", capacity: 800, spaceType: "CONFERENCE" },
          { name: "Breakout Suites", capacity: 120, spaceType: "CONFERENCE" },
        ],
      },
    },
  });

  // ---- Sample inquiries (so the admin dashboard is demonstrative on first run) ----
  const grandAurora = await prisma.venue.findUnique({ where: { slug: "the-grand-aurora" } });
  await prisma.inquiry.createMany({
    data: [
      {
        reference: "EVT-2026-00001",
        eventType: "WEDDING",
        eventDate: new Date("2026-11-14"),
        guestCount: 220,
        venuePreference: "SELECT",
        venueId: grandAurora?.id ?? null,
        services: j(["Catering", "Styling", "Photography"]),
        budgetRange: "₱500k – ₱1M",
        contactName: "Maria & Josh Santos",
        contactEmail: "maria.santos@example.com",
        contactPhone: "+63 917 555 0110",
        message: "Evening reception, sit-down dinner for 220.",
        status: "REVIEWING",
      },
      {
        reference: "EVT-2026-00002",
        eventType: "CONFERENCE",
        eventDate: new Date("2026-09-30"),
        guestCount: 800,
        venuePreference: "RECOMMEND",
        location: "Metro Manila",
        services: j(["Registration", "Sound", "Lighting", "Videography"]),
        budgetRange: "Over ₱1M",
        contactName: "Liza Fernandez",
        contactEmail: "liza@techsummit.ph",
        contactPhone: "+63 928 555 0199",
        message: "Annual developer summit, needs breakout rooms.",
        status: "NEW",
      },
      {
        reference: "EVT-2026-00003",
        eventType: "PRODUCT_LAUNCH",
        eventDate: new Date("2026-10-18"),
        guestCount: 150,
        venuePreference: "HAVE_OWN",
        services: j(["Stage", "Lighting", "Entertainment"]),
        contactName: "Marco Aguilar",
        contactEmail: "marco@brandco.com",
        status: "NEW",
      },
    ],
  });
  await prisma.notification.create({
    data: { type: "NEW_INQUIRY", title: "New event inquiry", body: "EVT-2026-00002 — Liza Fernandez (CONFERENCE)" },
  });

  const counts = {
    organizations: await prisma.organization.count(),
    venues: await prisma.venue.count(),
    spaces: await prisma.venueSpace.count(),
    users: await prisma.user.count(),
    services: await prisma.service.count(),
    inquiries: await prisma.inquiry.count(),
  };
  console.log("Seed complete:", counts);
  console.log("Admin login: admin@sanaya.events / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
