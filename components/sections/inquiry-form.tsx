"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { Phone, MessageCircle, Mail, Send, Loader2, AlertCircle } from "lucide-react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { budgetRanges, business, contactMethods, packages } from "@/content/site";
import { EVENT_TYPES } from "@/lib/validators";
import { PREFILL_EVENT, type Prefill } from "../prefill";
import { useToday } from "../use-today";
import { SectionHeading } from "../ui";
import { Reveal } from "../reveal";

const input =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white/80 px-3.5 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-ink/35 focus:border-terracotta focus:bg-white focus:ring-4 focus:ring-terracotta/10 aria-[invalid=true]:border-red-700";

export function InquiryForm() {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const form = useRef<HTMLFormElement>(null);
  const today = useToday();
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  // Accept choices made elsewhere on the page (hero date checker, package buttons…)
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<Prefill>).detail;
      const f = form.current;
      if (!f) return;
      for (const [name, value] of Object.entries(detail)) {
        const el = f.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        if (el && value) el.value = value;
      }
      setTimeout(() => (f.elements.namedItem("name") as HTMLInputElement | null)?.focus({ preventScroll: true }), 900);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    if (state.status === "fallback") window.location.href = state.mailto;
  }, [state]);

  const fieldProps = (name: string) => ({
    name,
    id: `f-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-err` : undefined,
  });
  const Err = ({ name }: { name: string }) =>
    errors[name] ? (
      <span id={`f-${name}-err`} className="mt-1 block text-xs text-red-800">
        {errors[name]}
      </span>
    ) : null;

  return (
    <section id="inquire" className="grain relative bg-linen py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Check your date"
            title={<>Tell us about your <em>celebration</em>.</>}
            intro="Share a few details and we will reply with availability, a quote, and a schedule for your ocular visit and food tasting."
          />
          <Reveal delay={0.1} className="mt-8 space-y-3">
            <p className="text-sm text-muted">Prefer to chat? Reach us directly:</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Contact href={business.messenger} icon={<MessageCircle className="size-4" />} label="Messenger" value="Chat with us" external />
              <Contact href={business.phoneHref} icon={<Phone className="size-4" />} label="Call or Viber" value={business.phoneDisplay} />
              <Contact href={`mailto:${business.email}`} icon={<Mail className="size-4" />} label="Email" value={business.email} wide />
            </div>
            {business.replyPromise && <p className="pt-2 text-xs text-muted">We usually reply {business.replyPromise}.</p>}
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <form
            ref={form}
            noValidate={false}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              // Calling the action manually keeps typed values if the server sends back errors.
              startTransition(() => action(data));
            }}
            className="rounded-3xl border border-white bg-cream/80 p-5 shadow-[0_40px_100px_-50px_rgba(34,38,31,.5)] backdrop-blur sm:p-8"
          >
            <div aria-live="polite" role="status">
              {state.status === "error" && (
                <p className="mb-6 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-900">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> {state.message}
                </p>
              )}
              {state.status === "fallback" && (
                <p className="mb-6 rounded-xl bg-moss/10 p-4 text-sm">
                  Almost there — your email app should open with your details filled in. If it doesn&rsquo;t,{" "}
                  <a href={state.mailto} className="underline">tap here to send it</a> or message us on{" "}
                  <a href={business.messenger} target="_blank" rel="noopener" className="underline">Messenger</a>.
                </p>
              )}
            </div>

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2" htmlFor="f-name">
                Full name *
                <input {...fieldProps("name")} required autoComplete="name" className={input} placeholder="Juan Dela Cruz" />
                <Err name="name" />
              </label>
              <label className="block text-sm" htmlFor="f-phone">
                Mobile number *
                <input
                  {...fieldProps("phone")}
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9+\s\(\)\-]{10,18}"
                  title="PH mobile number, e.g. 0917 123 4567 or +63 917 123 4567"
                  className={input}
                  placeholder="0917 123 4567"
                />
                <Err name="phone" />
              </label>
              <label className="block text-sm" htmlFor="f-email">
                Email *
                <input {...fieldProps("email")} required type="email" autoComplete="email" className={input} placeholder="you@email.com" />
                <Err name="email" />
              </label>
              <label className="block text-sm" htmlFor="f-eventType">
                Event type *
                <select {...fieldProps("eventType")} required defaultValue="" className={input}>
                  <option value="" disabled>Choose one</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Err name="eventType" />
              </label>
              <label className="block text-sm" htmlFor="f-guests">
                Estimated guests *
                <input {...fieldProps("guests")} required type="number" min={1} max={5000} inputMode="numeric" className={input} placeholder="150" />
                <Err name="guests" />
              </label>
              <label className="block text-sm" htmlFor="f-date">
                Preferred date *
                <input {...fieldProps("date")} required type="date" min={today} className={input} />
                <Err name="date" />
              </label>
              <label className="block text-sm" htmlFor="f-altDate">
                Alternate date
                <input {...fieldProps("altDate")} type="date" min={today} className={input} />
                <Err name="altDate" />
              </label>
              <label className="block text-sm" htmlFor="f-budget">
                Budget range
                <select {...fieldProps("budget")} defaultValue="" className={input}>
                  <option value="">Select a range</option>
                  {budgetRanges.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm" htmlFor="f-packageId">
                Package of interest
                <select {...fieldProps("packageId")} defaultValue="" className={input}>
                  <option value="">Not sure yet</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm">Best way to reach you</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {contactMethods.map((m, i) => (
                    <label key={m} className="cursor-pointer">
                      <input type="radio" name="contactVia" value={m} defaultChecked={i === 2} className="peer sr-only" />
                      <span className="block rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm transition peer-checked:border-moss peer-checked:bg-moss peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-terracotta">
                        {m}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm sm:col-span-2" htmlFor="f-message">
                Anything else we should know?
                <textarea {...fieldProps("message")} rows={4} className={input} placeholder="Theme, ceremony plans, dietary needs, questions…" />
              </label>
            </div>

            <div className="mt-7 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-muted">We only use your details to reply to this inquiry.</p>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(166,93,55,.8)] transition hover:-translate-y-0.5 hover:bg-terracotta-deep disabled:opacity-70 sm:w-auto"
              >
                {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                {pending ? "Sending…" : "Send my inquiry"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ href, icon, label, value, external, wide }: { href: string; icon: React.ReactNode; label: string; value: string; external?: boolean; wide?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`group flex items-center gap-3 rounded-2xl border border-ink/10 bg-cream/70 p-3.5 transition hover:border-moss/40 hover:bg-cream ${wide ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-moss text-cream transition group-hover:bg-terracotta">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-muted">{label}</span>
        <span className="block truncate text-sm">{value}</span>
      </span>
    </a>
  );
}
