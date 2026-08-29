import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">SANAYA</div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Exceptional events, extraordinary venues — one seamless experience from first
            inquiry to the final toast.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ivory">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/venues" className="hover:text-ivory">Venues</Link></li>
            <li><Link href="/plan" className="hover:text-ivory">Plan your event</Link></li>
            <li><Link href="/#services" className="hover:text-ivory">Services</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ivory">Business</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><Link href="/#partner" className="hover:text-ivory">Partner with us</Link></li>
            <li><Link href="/admin/login" className="hover:text-ivory">Portal login</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted lg:px-8">
          © {new Date().getFullYear()} SANAYA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
