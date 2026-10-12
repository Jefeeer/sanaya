import { Reveal } from "./reveal";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(166,93,55,.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-terracotta-deep",
  ghostLight:
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition duration-300 hover:bg-white/20",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition duration-300 hover:border-ink hover:bg-ink hover:text-cream",
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${tone === "dark" ? "text-gold" : "text-terracotta-deep"}`}>
        <span aria-hidden className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-title font-normal ${tone === "dark" ? "text-cream" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed ${tone === "dark" ? "text-cream/75" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}
