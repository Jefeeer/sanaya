import Link from "next/link";
import { Inbox, CalendarClock, Files, MapPin, Handshake, type LucideIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { InquiryTable, type InquiryRow } from "@/components/admin/InquiryTable";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic"; // always reflect latest inquiries

const inquirySelect = {
  id: true, reference: true, contactName: true, contactEmail: true,
  eventType: true, eventDate: true, guestCount: true, status: true,
  location: true, venuePreference: true, createdAt: true,
  venue: { select: { name: true } },
} as const;

function StatCard({ label, value, icon: Icon, href }: { label: string; value: number | string; icon: LucideIcon; href?: string }) {
  const inner = (
    <div className="group rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-brand/40 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-3xl font-semibold text-heading">{value}</div>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
      </div>
      <div className="mt-1 text-sm text-subtle">{label}</div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default async function AdminDashboard() {
  const now = new Date();
  const [newInquiries, totalInquiries, upcomingEvents, venues, partners, recent] = await Promise.all([
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { eventDate: { gte: now } } }),
    prisma.venue.count(),
    prisma.organization.count({ where: { type: "PARTNER" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 8, select: inquirySelect }),
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold text-heading">Operations dashboard</h1>
      <p className="mt-1 text-sm text-subtle">What needs your attention today.</p>

      {/* Action-first: new inquiries lead. */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="New inquiries" value={newInquiries} icon={Inbox} href="/admin/inquiries" />
        <StatCard label="Upcoming events" value={upcomingEvents} icon={CalendarClock} />
        <StatCard label="Total inquiries" value={totalInquiries} icon={Files} href="/admin/inquiries" />
        <StatCard label="Venues" value={venues} icon={MapPin} />
        <StatCard label="Partners" value={partners} icon={Handshake} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-heading">Recent inquiries</h2>
        <Link href="/admin/inquiries" className="text-sm font-medium text-brand hover:underline">View all →</Link>
      </div>
      <div className="mt-4">
        <InquiryTable rows={recent as unknown as InquiryRow[]} />
      </div>
    </div>
  );
}
