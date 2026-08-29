import { prisma } from "@/lib/prisma";
import { InquiryTable, type InquiryRow } from "@/components/admin/InquiryTable";

export const metadata = { title: "Inquiries" };
export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const rows = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true, reference: true, contactName: true, contactEmail: true,
      eventType: true, eventDate: true, guestCount: true, status: true,
      location: true, venuePreference: true, createdAt: true,
      venue: { select: { name: true } },
    },
  });

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold text-heading">Inquiries</h1>
      <p className="mt-1 text-sm text-subtle">{rows.length} event {rows.length === 1 ? "request" : "requests"}, newest first.</p>
      <div className="mt-6">
        <InquiryTable rows={rows as unknown as InquiryRow[]} />
      </div>
    </div>
  );
}
