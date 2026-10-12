import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { business, photos } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  display: "swap",
});

const title = "Sanaya Events Place | Wedding & Events Venue in Tagaytay";
const description =
  "Events place in Tagaytay for weddings, debuts, corporate events and private parties, with catering at the heart of every celebration. 582 Maitim 2nd East, Tagaytay City.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  keywords: ["events place in Tagaytay", "Tagaytay wedding venue", "debut venue Tagaytay", "corporate events Tagaytay", "catering Tagaytay"],
  openGraph: { title, description, url: "/", siteName: business.name, locale: "en_PH", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

const venueLd = {
  "@context": "https://schema.org",
  "@type": ["EventVenue", "LocalBusiness"],
  name: business.name,
  description: business.description,
  slogan: business.tagline,
  url: siteUrl,
  image: photos.heroArch.src,
  telephone: "+639931197056",
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  hasMap: business.mapsUrl,
  sameAs: [business.facebook, business.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" className={jost.variable}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <JsonLd data={venueLd} />
        <Analytics />
      </body>
    </html>
  );
}
