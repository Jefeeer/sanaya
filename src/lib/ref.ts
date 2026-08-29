import { prisma } from "./prisma";

/**
 * Generates a human-friendly inquiry reference: EVT-2026-00128.
 * Sequence = count of inquiries created this calendar year + 1.
 * ponytail: count-based sequence has a race under concurrent inserts; the
 * unique constraint on Inquiry.reference is the backstop (caller retries).
 */
export async function nextInquiryReference(): Promise<string> {
  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const count = await prisma.inquiry.count({ where: { createdAt: { gte: start } } });
  const seq = String(count + 1).padStart(5, "0");
  return `EVT-${year}-${seq}`;
}
