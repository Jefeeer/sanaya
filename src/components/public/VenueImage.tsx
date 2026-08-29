import { cn } from "@/lib/cn";
import { label } from "@/lib/contract";

// Deterministic gradient tile from the venue name — premium look, no asset
// files, no network. Stand-in until real photography is uploaded.
function hue(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

export function VenueImage({
  name,
  venueType,
  className,
  rounded = true,
}: {
  name: string;
  venueType: string;
  className?: string;
  rounded?: boolean;
}) {
  const h = hue(name);
  return (
    <div
      className={cn("relative flex items-end overflow-hidden", rounded && "rounded-[var(--radius-card)]", className)}
      style={{
        background: `linear-gradient(135deg, hsl(${h} 30% 16%), hsl(${(h + 40) % 360} 35% 26%))`,
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(70% 70% at 75% 15%, rgba(203,169,95,0.35), transparent 60%)" }}
      />
      <span className="relative m-4 rounded-full bg-ink/40 px-3 py-1 text-xs font-medium text-ivory backdrop-blur">
        {label(venueType)}
      </span>
    </div>
  );
}
