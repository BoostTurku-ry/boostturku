import { AlumniStrip } from "@/components/sections/home/AlumniStrip";
import { EventsSection } from "@/components/sections/home/EventsSection";
import { FaqSection } from "@/components/sections/home/FaqSection";
import { GallerySection } from "@/components/sections/home/GallerySection";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { ImpactSection } from "@/components/sections/home/ImpactSection";
import { JoinSection } from "@/components/sections/home/JoinSection";
import { ManifestoSection } from "@/components/sections/home/ManifestoSection";
import { ProgramsSection } from "@/components/sections/home/ProgramsSection";
import { WaysInSection } from "@/components/sections/home/WaysInSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AlumniStrip />
      <ManifestoSection />
      <WaysInSection />
      <ProgramsSection />
      <EventsSection />
      <GallerySection />
      <ImpactSection />
      <FaqSection />
      <JoinSection />
    </>
  );
}
