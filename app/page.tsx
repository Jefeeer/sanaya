import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { EventTypes } from "@/components/sections/event-types";
import { Spaces } from "@/components/sections/spaces";
import { MenuStory } from "@/components/sections/menu-story";
import { Packages } from "@/components/sections/packages";
import { WhySanaya } from "@/components/sections/why-sanaya";
import { Gallery } from "@/components/sections/gallery";
import { BookingSteps } from "@/components/sections/booking-steps";
import { Faq } from "@/components/sections/faq";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { Location } from "@/components/sections/location";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <div className="pt-10 lg:pt-0">
          <Marquee />
        </div>
        <EventTypes />
        <Spaces />
        <MenuStory />
        <Packages />
        <WhySanaya />
        <Gallery />
        {/* TODO(owner): add a testimonials carousel once real reviews (with permission) are in content/site.ts */}
        <BookingSteps />
        <InquiryForm />
        <Faq />
        <Location />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
