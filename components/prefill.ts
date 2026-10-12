"use client";

import { scrollToId } from "./smooth-scroll";

export type Prefill = Partial<Record<"eventType" | "date" | "guests" | "packageId" | "message", string>>;

export const PREFILL_EVENT = "sanaya:prefill";

/** Fill the inquiry form with what the visitor already chose, then glide to it. */
export function prefillInquiry(p: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: p }));
  scrollToId("inquire");
}
