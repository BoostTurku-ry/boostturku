import type { Metadata } from "next";
import { PartnersSection } from "@/components/sections/about/PartnersSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { aboutHero } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} intro={aboutHero.intro} photo={aboutHero.photo} />
      <StorySection />
      <TeamSection />
      <PartnersSection />
      <div className="pt-24 sm:pt-32">
        <JoinSection />
      </div>
    </>
  );
}
