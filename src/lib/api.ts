import { NextResponse } from "next/server";
import type { ZodError } from "zod";

// Predictable envelopes shared by every API route.
// Success: { data: T }   Error: { error: { message, details? } }

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function jsonError(status: number, message: string, details?: unknown) {
  return NextResponse.json({ error: { message, details } }, { status });
}

export function zodError(err: ZodError) {
  return jsonError(422, "Validation failed", err.flatten().fieldErrors);
}
