import type { Metadata } from "next";
import Link from "next/link";
import CountUp from "@/components/reactbits/CountUp";
import { CompanyWall } from "@/components/sections/alumni/CompanyWall";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoMarquee } from "@/components/sections/shared/PhotoMarquee";
import { gallery } from "@/content/gallery";
import { photos } from "@/content/photos";
import { getAllPosts } from "@/lib/posts";

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
  const tales = (await getAllPosts()).filter((p) => p.slug.startsWith("boost-tales-")).reverse();

  return (
    <>
      <PageHero
        eyebrow="Alumni"
        title="What Boosters build next."
        intro="Boost alumni include Startup Journey founders, former board members and people from the wider community. Many come back as coaches and mentors."
        photo={photos.demoDayGroup}
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

      <PhotoMarquee photos={gallery.alumni} className="pb-24 sm:pb-32" heightClass="h-52 sm:h-64" duration={55} />

      <section className="border-t border-line py-24 sm:py-32">
        <Container size="wide">
          <SectionHeading
            index={1}
            eyebrow="Companies"
            title="Founded by Boost alumni"
            intro="A selection of the companies started by people who came through Boost, from the newest Startup Journey cohort back to the early years."
          />
          <div className="mt-12">
            <CompanyWall />
          </div>
        </Container>
      </section>

      {tales.length > 0 && (
        <section className="border-t border-line bg-surface py-24 sm:py-32">
          <Container size="wide">
            <SectionHeading
              index={2}
              eyebrow="Boost Tales"
              title="In their own words"
              intro="Interviews with alumni about their time at Boost and what came after."
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tales.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-7 transition-colors hover:border-boost/40"
                  >
                    <span className="meta-label text-boost">Boost Tales</span>
                    <span className="heading mt-4 text-2xl group-hover:text-boost">
                      {post.title.replace(/^Boost Tales:\s*/, "")}
                    </span>
                    <span className="mt-3 line-clamp-3 leading-relaxed text-ink-soft">{post.excerpt}</span>
                    <span className="mt-auto pt-6 text-sm font-semibold">
                      Read the story <span aria-hidden>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <div className="pt-24 sm:pt-32">
        <JoinSection />
      </div>
    </>
  );
}
