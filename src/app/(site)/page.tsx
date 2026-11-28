import { AlumniStrip } from "@/components/sections/home/AlumniStrip";
import { EventsSection } from "@/components/sections/home/EventsSection";
import { GallerySection } from "@/components/sections/home/GallerySection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ImpactSection } from "@/components/sections/home/ImpactSection";
import { ManifestoSection } from "@/components/sections/home/ManifestoSection";
import { ProgramsSection } from "@/components/sections/home/ProgramsSection";
import { WaysInSection } from "@/components/sections/home/WaysInSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { faq } from "@/content/home";
import { getPastEvents, getUpcomingEvents } from "@/lib/luma";

export default async function HomePage() {
  const [upcoming, recent] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <>
      <HeroSection />
      <AlumniStrip />
      <ManifestoSection />
      <WaysInSection />
      <ProgramsSection />
      <EventsSection upcoming={upcoming} recent={recent} />
      <GallerySection />
      <ImpactSection />
      <FaqSection items={faq} />
      <JoinSection />
    </>
  );
}
