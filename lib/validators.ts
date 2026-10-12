import { z } from "zod";

export const EVENT_TYPES = ["Wedding", "Debut / Birthday", "Corporate / Team event", "Intimate celebration", "Other"] as const;

/** Accepts 09xx xxx xxxx, 9xx..., +639xx / 639xx with spaces or dashes. Returns +639XXXXXXXXX or null. */
export function normalizePhPhone(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  const m = digits.match(/^(?:\+?63|0)?(9\d{9})$/);
  return m ? `+63${m[1]}` : null;
}

/** Today's date in Manila as YYYY-MM-DD (the venue's calendar, not the server's). */
export function manilaToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(now);
}

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date");
const notPast = (d: string) => d >= manilaToday();

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => normalizePhPhone(v) ?? (ctx.addIssue({ code: "custom", message: "Use a PH mobile number like 0917 123 4567" }), z.NEVER)),
  email: z.email("Enter a valid email").max(160),
  eventType: z.enum(EVENT_TYPES, "Choose an event type"),
  date: isoDate.refine(notPast, "Pick a date from today onward"),
  altDate: z.union([z.literal(""), isoDate.refine(notPast, "Pick a date from today onward")]),
  guests: z.coerce.number("Enter a number").int("Enter a whole number").min(1, "At least 1 guest").max(5000),
  budget: z.string().max(40).optional().default(""),
  contactVia: z.string().max(20).optional().default(""),
  packageId: z.string().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

export type Inquiry = z.infer<typeof inquirySchema>;
