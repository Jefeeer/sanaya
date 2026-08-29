"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const field = "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-heading focus:border-brand";

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center font-display text-3xl text-heading">SANAYA</Link>
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-heading">Portal sign in</h1>
          <p className="mt-1 text-sm text-subtle">Staff &amp; partner access</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-heading">Email</label>
              <input id="email" type="email" autoComplete="username" required className={`mt-1.5 ${field}`} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-heading">Password</label>
              <input id="password" type="password" autoComplete="current-password" required className={`mt-1.5 ${field}`} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="rounded-lg border border-status-red/40 bg-status-red/5 px-3 py-2 text-sm text-status-red" role="alert">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-brand py-2.5 font-medium text-white hover:bg-brand-ink disabled:opacity-50">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 rounded-lg bg-line-soft px-3 py-2 text-xs text-subtle">
            Demo: <span className="font-medium text-body">admin@sanaya.events</span> / <span className="font-medium text-body">password123</span>
          </p>
        </div>
        <Link href="/" className="mt-6 block text-center text-sm text-subtle hover:text-body">← Back to sanaya.events</Link>
      </div>
    </div>
  );
}
