import type { Metadata } from "next";
import { PartnersSection } from "@/components/sections/about/PartnersSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PhotoMosaic } from "@/components/sections/shared/PhotoMosaic";
import { Container } from "@/components/ui/Container";
import { gallery } from "@/content/gallery";
import { aboutHero } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHero layout="wide" title={aboutHero.title} accent={aboutHero.accent} intro={aboutHero.intro} photos={[aboutHero.photo]} />
      <StorySection />
      <section className="pb-14 sm:pb-20">
        <Container size="wide">
          <PhotoMosaic photos={gallery.about} />
        </Container>
      </section>
      <TeamSection />
      <PartnersSection />
      <div className="pt-14 sm:pt-20">
        <JoinSection />
      </div>
    </>
  );
}
