import { test } from "node:test";
import assert from "node:assert/strict";
import { inquirySchema, normalizePhPhone, manilaToday } from "../lib/validators.ts";

test("normalizes PH mobile formats", () => {
  assert.equal(normalizePhPhone("0993 119 7056"), "+639931197056");
  assert.equal(normalizePhPhone("+63 993-119-7056"), "+639931197056");
  assert.equal(normalizePhPhone("639931197056"), "+639931197056");
  assert.equal(normalizePhPhone("02 8123 4567"), null);
  assert.equal(normalizePhPhone("0993 119 705"), null);
});

test("manilaToday uses Asia/Manila", () => {
  // 2026-01-01 17:00 UTC is already Jan 2 in Manila (UTC+8)
  assert.equal(manilaToday(new Date("2026-01-01T17:00:00Z")), "2026-01-02");
});

const valid = {
  name: "Juan Dela Cruz", phone: "09171234567", email: "juan@example.com", eventType: "Wedding",
  date: "2099-02-14", altDate: "", guests: "150", budget: "", contactVia: "Viber", packageId: "classic", message: "",
};

test("accepts a valid inquiry", () => {
  const r = inquirySchema.safeParse(valid);
  assert.ok(r.success);
  assert.equal(r.data.phone, "+639171234567");
  assert.equal(r.data.guests, 150);
});

test("rejects past dates, bad phones and zero guests", () => {
  const r = inquirySchema.safeParse({ ...valid, date: "2000-01-01", phone: "12345", guests: "0" });
  assert.ok(!r.success);
  const paths = r.error.issues.map((i) => i.path[0]).sort();
  assert.deepEqual(paths, ["date", "guests", "phone"]);
});
