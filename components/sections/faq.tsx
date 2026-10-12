import { Plus } from "lucide-react";
import { business, faqs } from "@/content/site";
import { SectionHeading } from "../ui";
import { JsonLd } from "../json-ld";

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
      <div>
        <SectionHeading eyebrow="FAQ" title={<>Questions couples and planners <em>ask us</em>.</>} />
        <p className="mt-5 text-sm text-muted">
          Don&rsquo;t see yours?{" "}
          <a href={business.messenger} target="_blank" rel="noopener" className="text-ink underline decoration-gold underline-offset-4 hover:text-terracotta-deep">
            Ask us on Messenger
          </a>
          .
        </p>
      </div>
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-base transition hover:text-terracotta-deep sm:text-[1.05rem]">
              {f.q}
              <Plus className="size-4 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" aria-hidden />
            </summary>
            <p className="pb-5 pr-10 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
