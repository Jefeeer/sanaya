import { StatusBadge } from "@/components/ui/StatusBadge";
import { label } from "@/lib/contract";

export type InquiryRow = {
  id: string;
  reference: string;
  contactName: string;
  contactEmail: string;
  eventType: string;
  eventDate: Date;
  guestCount: number;
  status: string;
  location: string | null;
  venuePreference: string;
  venue: { name: string } | null;
  createdAt: Date;
};

const fmtDate = (d: Date) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function venueLabel(row: InquiryRow): string {
  if (row.venue) return row.venue.name;
  if (row.venuePreference === "RECOMMEND") return "Needs recommendation";
  if (row.venuePreference === "HAVE_OWN") return "Client has venue";
  return row.location || "—";
}

export function InquiryTable({ rows }: { rows: InquiryRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-surface p-12 text-center">
        <h3 className="text-lg font-semibold text-heading">No inquiries yet</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-subtle">
          New event requests submitted through the public site will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-subtle">
            <th className="px-4 py-3 font-medium">Reference</th>
            <th className="px-4 py-3 font-medium">Client</th>
            <th className="px-4 py-3 font-medium">Event</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Guests</th>
            <th className="px-4 py-3 font-medium">Venue</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-line-soft last:border-0 hover:bg-line-soft/50">
              <td className="px-4 py-3 font-medium text-brand-ink">{r.reference}</td>
              <td className="px-4 py-3">
                <div className="text-heading">{r.contactName}</div>
                <div className="text-xs text-subtle">{r.contactEmail}</div>
              </td>
              <td className="px-4 py-3 text-body">{label(r.eventType)}</td>
              <td className="px-4 py-3 text-body">{fmtDate(r.eventDate)}</td>
              <td className="px-4 py-3 text-body">{r.guestCount.toLocaleString()}</td>
              <td className="px-4 py-3 text-body">{venueLabel(r)}</td>
              <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
