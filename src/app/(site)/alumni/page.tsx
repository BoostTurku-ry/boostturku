import type { Metadata } from "next";
import CountUp from "@/components/reactbits/CountUp";
import { CompanyWall } from "@/components/sections/alumni/CompanyWall";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoMarquee } from "@/components/sections/shared/PhotoMarquee";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Boost alumni have founded more than 180 companies. Meet some of them.",
};

const stats = [
  { value: 180, suffix: "+", label: "Companies founded" },
  { value: 17, label: "Years of founders" },
  { value: 66.7, prefix: "€", suffix: "M", decimals: 1, label: "Combined revenue, 2023" },
  { value: 47.2, prefix: "€", suffix: "M", decimals: 1, label: "Venture capital raised" },
];

export default async function AlumniPage() {

  return (
    <>
      <PageHero
        title="What Boosters build next."
        accent="build next."
        intro="Boost alumni include Startup Journey founders, former board members and people from the wider community. Many come back as coaches and mentors."
        photos={gallery.heroes.alumni}
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface p-6 sm:p-8">
              <dd className="heading-display text-4xl text-ink sm:text-5xl">
                <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} duration={1.8} trigger="view" />
              </dd>
              <dt className="meta-label mt-3 text-ink-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <PhotoMarquee photos={gallery.alumni} className="pb-14 sm:pb-20" heightClass="h-52 sm:h-64" duration={55} />

      <section className="border-t border-line py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            title="Founded by Boost alumni"
            intro="A selection of the companies started by people who came through Boost, from the newest Startup Journey cohort back to the early years."
          />
          <div className="mt-12">
            <CompanyWall />
          </div>
        </Container>
      </section>

      <div className="pt-14 sm:pt-20">
        <JoinSection />
      </div>
    </>
  );
}
