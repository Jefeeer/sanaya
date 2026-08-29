"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg px-3 py-1.5 text-sm text-subtle hover:bg-line-soft hover:text-body"
    >
      Sign out
    </button>
  );
}
