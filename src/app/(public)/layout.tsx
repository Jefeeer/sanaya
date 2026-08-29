import { PublicNav } from "@/components/public/PublicNav";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-col bg-ink text-ivory">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
