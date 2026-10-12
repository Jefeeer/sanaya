"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { business } from "@/content/site";
import { inquirySchema, type Inquiry } from "@/lib/validators";

export type InquiryState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> }
  | { status: "fallback"; mailto: string };

// ponytail: in-memory limiter is per server instance; move to a shared store (e.g. Upstash) if spam appears.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function summary(d: Inquiry) {
  return [
    `Name: ${d.name}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    `Event: ${d.eventType}`,
    `Preferred date: ${d.date}`,
    d.altDate && `Alternate date: ${d.altDate}`,
    `Guests: ${d.guests}`,
    d.budget && `Budget: ${d.budget}`,
    d.packageId && `Package: ${d.packageId}`,
    d.contactVia && `Preferred contact: ${d.contactVia}`,
    d.message && `\nMessage:\n${d.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real people never see or fill this field.
  if (formData.get("company")) redirect("/thank-you");

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many requests. Please message us on Messenger or call instead." };
  }

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const d = parsed.data;
  const subject = `Inquiry: ${d.eventType} on ${d.date} (${d.guests} guests) — ${d.name}`;
  const text = summary(d);
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    // Not configured yet: hand the visitor a prefilled email so the lead is never lost.
    const mailto = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    return { status: "fallback", mailto };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL || "Sanaya Website <onboarding@resend.dev>",
      to: [process.env.INQUIRY_TO_EMAIL || business.email],
      reply_to: d.email,
      subject,
      text,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("Resend failed", res?.status, await res?.text().catch(() => ""));
    const mailto = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    return { status: "fallback", mailto };
  }

  redirect("/thank-you");
}
