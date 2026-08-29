"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { EVENT_TYPES, SERVICE_OPTIONS, label } from "@/lib/contract";

type VenueOpt = { id: string; name: string; location: string };

const BUDGETS = ["Under ₱100k", "₱100k – ₱300k", "₱300k – ₱500k", "₱500k – ₱1M", "Over ₱1M", "Not sure yet"];

const inputClass =
  "w-full rounded-lg border border-ink-line bg-ink px-4 py-3 text-ivory placeholder:text-muted focus:border-champagne";
const labelClass = "block text-sm font-medium text-ivory";

type Form = {
  eventType: string;
  eventDate: string;
  altDate: string;
  guestCount: string;
  location: string;
  venuePreference: "SELECT" | "RECOMMEND" | "HAVE_OWN";
  venueId: string;
  services: string[];
  budgetRange: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  message: string;
};

const STEP_TITLES = ["Event", "Date & guests", "Venue", "Services", "Your details", "Review"];

export function PlanWizard({ venues, preselectedVenueId }: { venues: VenueOpt[]; preselectedVenueId: string | null }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const [form, setForm] = useState<Form>({
    eventType: "",
    eventDate: "",
    altDate: "",
    guestCount: "",
    location: "",
    venuePreference: preselectedVenueId ? "SELECT" : "RECOMMEND",
    venueId: preselectedVenueId ?? "",
    services: [],
    budgetRange: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    message: "",
  });

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggleService = (s: string) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  // Per-step "can advance" checks (server re-validates authoritatively).
  const stepValid = (i: number): boolean => {
    switch (i) {
      case 0: return !!form.eventType;
      case 1: return !!form.eventDate && Number(form.guestCount) >= 1;
      case 2: return form.venuePreference !== "SELECT" || !!form.venueId;
      case 3: return true;
      case 4: return form.contactName.trim().length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contactEmail);
      default: return true;
    }
  };

  const next = () => {
    if (!stepValid(step)) {
      setError("Please complete the required fields to continue.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  };
  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: form.eventType,
          eventDate: form.eventDate,
          altDate: form.altDate || null,
          guestCount: Number(form.guestCount),
          location: form.location || null,
          venuePreference: form.venuePreference,
          venueId: form.venuePreference === "SELECT" ? form.venueId || null : null,
          services: form.services,
          budgetRange: form.budgetRange || null,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone || null,
          message: form.message || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error?.message ?? "Something went wrong. Please try again.");
        return;
      }
      setReference(json.data.reference);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Success screen ----
  if (reference) {
    return (
      <div className="rounded-[var(--radius-card)] border border-champagne/40 bg-ink-soft p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-champagne/15">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#cba95f" strokeWidth="2.2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-3xl text-ivory">Your event request has been received</h2>
        <p className="mt-3 text-ivory/75">Our team will be in touch shortly to plan the details.</p>
        <div className="mx-auto mt-8 inline-block rounded-lg border border-ink-line bg-ink px-6 py-4">
          <div className="text-xs uppercase tracking-wide text-muted">Your reference</div>
          <div className="mt-1 font-display text-2xl text-champagne">{reference}</div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/venues" variant="ivoryOutline" size="md">Browse more venues</Button>
          <Button href="/" variant="gold" size="md">Back to home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-ink-line bg-ink-soft p-6 sm:p-8">
      {/* Progress */}
      <ol className="mb-8 flex flex-wrap gap-x-2 gap-y-2 text-xs">
        {STEP_TITLES.map((t, i) => (
          <li key={t} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-[11px]",
                i < step && "border-champagne bg-champagne text-ink",
                i === step && "border-champagne text-champagne",
                i > step && "border-ink-line text-muted",
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span className={cn(i === step ? "text-ivory" : "text-muted")}>{t}</span>
            {i < STEP_TITLES.length - 1 && <span className="mx-1 text-ink-line">—</span>}
          </li>
        ))}
      </ol>

      {/* Step 0 — Event type */}
      {step === 0 && (
        <div>
          <h2 className="font-display text-2xl text-ivory">What kind of event are you planning?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => set("eventType", t)}
                className={cn(
                  "rounded-lg border px-4 py-4 text-left text-sm transition-colors",
                  form.eventType === t ? "border-champagne bg-champagne/10 text-ivory" : "border-ink-line text-ivory/80 hover:border-champagne/50",
                )}
              >
                {label(t)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Date & guests */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-ivory">When, and for how many?</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="eventDate">Preferred date *</label>
              <input id="eventDate" type="date" className={cn(inputClass, "mt-2")} value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="altDate">Alternative date</label>
              <input id="altDate" type="date" className={cn(inputClass, "mt-2")} value={form.altDate} onChange={(e) => set("altDate", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="guestCount">Expected guests *</label>
            <input id="guestCount" type="number" min={1} placeholder="e.g. 150" className={cn(inputClass, "mt-2")} value={form.guestCount} onChange={(e) => set("guestCount", e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 2 — Venue */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-ivory">Do you have a venue in mind?</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {([["SELECT", "Select a venue"], ["RECOMMEND", "Recommend a venue"], ["HAVE_OWN", "I already have a venue"]] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => set("venuePreference", v)}
                className={cn(
                  "rounded-lg border px-4 py-4 text-sm transition-colors",
                  form.venuePreference === v ? "border-champagne bg-champagne/10 text-ivory" : "border-ink-line text-ivory/80 hover:border-champagne/50",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {form.venuePreference === "SELECT" && (
            <div>
              <label className={labelClass} htmlFor="venueId">Choose a venue *</label>
              <select id="venueId" className={cn(inputClass, "mt-2")} value={form.venueId} onChange={(e) => set("venueId", e.target.value)}>
                <option value="">Select…</option>
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} — {v.location}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="location">Preferred location {form.venuePreference === "SELECT" ? "" : "*"}</label>
            <input id="location" type="text" placeholder="e.g. Makati, Metro Manila" className={cn(inputClass, "mt-2")} value={form.location} onChange={(e) => set("location", e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 3 — Services */}
      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl text-ivory">Which services do you need?</h2>
          <p className="mt-2 text-sm text-muted">Optional — select any that apply. We coordinate all of these.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => toggleService(s)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  form.services.includes(s) ? "border-champagne bg-champagne/10 text-ivory" : "border-ink-line text-ivory/80 hover:border-champagne/50",
                )}
              >
                <span className={cn("flex h-4 w-4 items-center justify-center rounded border", form.services.includes(s) ? "border-champagne bg-champagne text-ink" : "border-ink-line")}>
                  {form.services.includes(s) && "✓"}
                </span>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Details */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="font-display text-2xl text-ivory">How can we reach you?</h2>
          <div>
            <label className={labelClass} htmlFor="budget">Budget range</label>
            <select id="budget" className={cn(inputClass, "mt-2")} value={form.budgetRange} onChange={(e) => set("budgetRange", e.target.value)}>
              <option value="">Prefer not to say</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Full name *</label>
              <input id="name" type="text" className={cn(inputClass, "mt-2")} value={form.contactName} onChange={(e) => set("contactName", e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">Email *</label>
              <input id="email" type="email" className={cn(inputClass, "mt-2")} value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone</label>
            <input id="phone" type="tel" className={cn(inputClass, "mt-2")} value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="message">Anything else we should know?</label>
            <textarea id="message" rows={3} className={cn(inputClass, "mt-2 resize-none")} value={form.message} onChange={(e) => set("message", e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 5 — Review */}
      {step === 5 && (
        <div>
          <h2 className="font-display text-2xl text-ivory">Review your request</h2>
          <dl className="mt-6 divide-y divide-ink-line rounded-lg border border-ink-line">
            {[
              ["Event type", label(form.eventType)],
              ["Date", form.eventDate + (form.altDate ? ` (alt: ${form.altDate})` : "")],
              ["Guests", form.guestCount],
              ["Venue", form.venuePreference === "SELECT" ? (venues.find((v) => v.id === form.venueId)?.name ?? "Selected") : form.venuePreference === "RECOMMEND" ? "Recommend for me" : "I have my own"],
              ["Location", form.location || "—"],
              ["Services", form.services.length ? form.services.join(", ") : "—"],
              ["Budget", form.budgetRange || "—"],
              ["Contact", `${form.contactName} · ${form.contactEmail}${form.contactPhone ? " · " + form.contactPhone : ""}`],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 px-4 py-3 text-sm">
                <dt className="w-32 shrink-0 text-muted">{k}</dt>
                <dd className="text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {error && <p className="mt-6 rounded-lg border border-status-red/40 bg-status-red/10 px-4 py-3 text-sm text-status-red" role="alert">{error}</p>}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" size="md" onClick={back} className="text-ivory/80 hover:bg-ivory/10">Back</Button>
        ) : (
          <Link href="/venues" className="text-sm text-muted hover:text-ivory">Cancel</Link>
        )}
        {step < STEP_TITLES.length - 1 ? (
          <Button variant="gold" size="md" onClick={next}>Continue</Button>
        ) : (
          <Button variant="gold" size="lg" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit request"}
          </Button>
        )}
      </div>
    </div>
  );
}
