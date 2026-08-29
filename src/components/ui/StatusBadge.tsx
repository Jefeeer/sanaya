import { cn } from "@/lib/cn";
import { label } from "@/lib/contract";

// Status -> color. Text label is ALWAYS shown, so status is never
// communicated by color alone (accessibility).
const COLORS: Record<string, string> = {
  // Booking lifecycle
  INQUIRY: "bg-status-grey/10 text-status-grey",
  AVAILABILITY_CHECK: "bg-status-amber/10 text-status-amber",
  TENTATIVE: "bg-status-amber/10 text-status-amber",
  CONFIRMED: "bg-status-blue/10 text-status-blue",
  EVENT_PREPARATION: "bg-status-indigo/10 text-status-indigo",
  EVENT_DAY: "bg-status-purple/10 text-status-purple",
  COMPLETED: "bg-status-green/10 text-status-green",
  CANCELLED: "bg-status-red/10 text-status-red",
  // Inquiry
  NEW: "bg-status-blue/10 text-status-blue",
  REVIEWING: "bg-status-amber/10 text-status-amber",
  CONVERTED: "bg-status-green/10 text-status-green",
  ARCHIVED: "bg-status-grey/10 text-status-grey",
  // Payment
  UNPAID: "bg-status-grey/10 text-status-grey",
  PARTIALLY_PAID: "bg-status-amber/10 text-status-amber",
  PAID: "bg-status-green/10 text-status-green",
  OVERDUE: "bg-status-red/10 text-status-red",
};

const DOT: Record<string, string> = {
  INQUIRY: "bg-status-grey",
  AVAILABILITY_CHECK: "bg-status-amber",
  TENTATIVE: "bg-status-amber",
  CONFIRMED: "bg-status-blue",
  EVENT_PREPARATION: "bg-status-indigo",
  EVENT_DAY: "bg-status-purple",
  COMPLETED: "bg-status-green",
  CANCELLED: "bg-status-red",
  NEW: "bg-status-blue",
  REVIEWING: "bg-status-amber",
  CONVERTED: "bg-status-green",
  ARCHIVED: "bg-status-grey",
  UNPAID: "bg-status-grey",
  PARTIALLY_PAID: "bg-status-amber",
  PAID: "bg-status-green",
  OVERDUE: "bg-status-red",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        COLORS[status] ?? "bg-status-grey/10 text-status-grey",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", DOT[status] ?? "bg-status-grey")} aria-hidden />
      {label(status)}
    </span>
  );
}
