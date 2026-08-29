import type { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth, isStaff } from "@/lib/auth";
import { CreateInquiryInput } from "@/lib/contract";
import { nextInquiryReference } from "@/lib/ref";
import { jsonOk, jsonError, zodError } from "@/lib/api";

// POST /api/inquiries — public "Plan Your Event" submission.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  const parsed = CreateInquiryInput.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);
  const input = parsed.data;

  // If a venue was requested, verify it exists & is published (ignore bad ids).
  let venueId: string | null = null;
  if (input.venueId) {
    const venue = await prisma.venue.findUnique({ where: { id: input.venueId }, select: { id: true, published: true } });
    venueId = venue?.published ? venue.id : null;
  }

  const data = {
    eventType: input.eventType,
    eventDate: new Date(input.eventDate),
    altDate: input.altDate ? new Date(input.altDate) : null,
    guestCount: input.guestCount,
    location: input.location ?? null,
    venuePreference: input.venuePreference,
    venueId,
    services: JSON.stringify(input.services ?? []),
    budgetRange: input.budgetRange ?? null,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone ?? null,
    message: input.message ?? null,
  };

  // Retry once on the (rare) reference-collision race — unique constraint is the backstop.
  for (let attempt = 0; attempt < 3; attempt++) {
    const reference = await nextInquiryReference();
    try {
      const inquiry = await prisma.inquiry.create({ data: { ...data, reference } });
      await prisma.notification.create({
        data: {
          type: "NEW_INQUIRY",
          title: "New event inquiry",
          body: `${reference} — ${input.contactName} (${input.eventType})`,
        },
      });
      return jsonOk({ reference: inquiry.reference, id: inquiry.id }, 201);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
  return jsonError(500, "Could not generate a unique reference, please retry");
}

// GET /api/inquiries — staff only. Paginated newest-first.
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isStaff(session?.user?.role)) return jsonError(403, "Forbidden");

  const sp = req.nextUrl.searchParams;
  const page = Math.max(1, Number(sp.get("page") ?? 1) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(sp.get("pageSize") ?? 25) || 25));

  const [items, total] = await Promise.all([
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { venue: { select: { name: true, slug: true } } },
    }),
    prisma.inquiry.count(),
  ]);

  return jsonOk({ items, total, page, pageSize });
}
