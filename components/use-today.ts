"use client";

import { useEffect, useState } from "react";
import { manilaToday } from "@/lib/validators";

/** Manila's today, computed in the browser so a statically built page never carries a stale minimum date. */
export function useToday() {
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(manilaToday()), []);
  return today;
}
