import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SANAYA — Exceptional Events. Extraordinary Venues.",
    template: "%s — SANAYA",
  },
  description:
    "SANAYA creates and coordinates exceptional events with trusted venues and partners — one seamless experience from inquiry to execution.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
