import Image from "next/image";
import headerDark from "@/public/images/logo-header-dark.png";
import headerLight from "@/public/images/logo-header-light.png";
import fullDark from "@/public/images/logo-full-dark.png";
import fullLight from "@/public/images/logo-full-light.png";

// Sanaya's own logo, taken from their Facebook profile and cut onto a transparent background.
const files = { header: { dark: headerDark, light: headerLight }, full: { dark: fullDark, light: fullLight } };

export function Logo({
  variant = "header",
  tone = "dark",
  className = "h-9 w-auto",
  preload,
}: {
  variant?: "header" | "full";
  tone?: "dark" | "light";
  className?: string;
  preload?: boolean;
}) {
  return <Image src={files[variant][tone]} alt="Sanaya Events Place" className={className} preload={preload} unoptimized />;
}
