import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { business, bookingSteps } from "@/content/site";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Thank you | Sanaya Events Place",
  robots: { index: false },
};

export default function ThankYou() {
  return (
    <main id="main" className="grain flex min-h-svh items-center bg-linen px-5 py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-cream p-7 shadow-[0_40px_100px_-50px_rgba(34,38,31,.5)] sm:p-10">
        <Link href="/" aria-label="Back to home" className="text-ink">
          <Logo variant="full" className="h-16 w-auto" />
        </Link>
        <CheckCircle2 className="mt-10 size-10 text-moss" aria-hidden />
        <h1 className="mt-4 text-title font-normal">Salamat! Your inquiry is in.</h1>
        <p className="mt-3 leading-relaxed text-muted">
          We will check your date and get back to you with availability and a quote. Here&rsquo;s what happens next:
        </p>
        <ol className="mt-6 space-y-3 text-sm">
          {bookingSteps.slice(1).map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-gold text-xs">{i + 2}</span>
              <span>
                <span className="text-ink">{s.title}.</span> <span className="text-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm">Can&rsquo;t wait? Message us now:</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={business.messenger} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-medium text-white hover:bg-terracotta-deep">
            <MessageCircle className="size-4" aria-hidden /> Messenger
          </a>
          <a href={business.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm hover:bg-ink hover:text-cream">
            <Phone className="size-4" aria-hidden /> {business.phoneDisplay}
          </a>
        </div>
        <Link href="/" className="mt-10 inline-block text-sm underline decoration-gold underline-offset-4">
          Back to the site
        </Link>
      </div>
    </main>
  );
}
