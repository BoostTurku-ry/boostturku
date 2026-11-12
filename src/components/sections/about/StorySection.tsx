import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars, story, timeline } from "@/content/about";

export function StorySection() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container size="wide">
        <SectionHeading index={1} eyebrow="Our story" title="Built by students, since 2009" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <p className="heading text-2xl leading-snug text-ink sm:text-3xl lg:col-span-7">{story.lead}</p>
          <div className="space-y-5 text-lg leading-relaxed text-ink-soft lg:col-span-5">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* What we do */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="bg-surface">
              <Link href={pillar.href} className="group flex h-full flex-col p-8 transition-colors hover:bg-boost-soft/50">
                <span className="label-mono text-boost">{String(i + 1).padStart(2, "0")}</span>
                <span className="heading mt-6 text-2xl">{pillar.title}</span>
                <span className="mt-3 leading-relaxed text-ink-soft">{pillar.body}</span>
                <span aria-hidden className="mt-8 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-boost">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Timeline */}
        <div className="mt-24">
          <p className="label-mono text-ink-muted">Milestones</p>
          <ol className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <li key={item.year} className="border-t border-line py-6">
                <Reveal delay={(i % 4) * 0.06} y={10}>
                  <span className="heading-display text-3xl text-boost">{item.year}</span>
                  <p className="mt-3 font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 leading-relaxed text-ink-soft">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
