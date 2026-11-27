import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { StatusPill } from "@/components/ui/StatusPill";
import { photos } from "@/content/photos";
import { programDetails } from "@/content/programs";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Programs",
  description: "Startup Journey, Startup Marathon, OmaHomma and the Proof of Concept grant. Free programs for students in Turku.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="From first idea to Demo Day."
        intro="Structured programs led by coaches who have built companies themselves. Every one of them is free, and we never take equity."
      />

      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {programDetails.map((program, i) => (
              <li key={program.slug}>
                <Reveal delay={(i % 2) * 0.08} y={16}>
                  <Link href={`/programs/${program.slug}`} className="group block">
                    <Photo
                      photo={program.photo}
                      zoomOnHover
                      className="aspect-[16/10] rounded-3xl"
                      sizes="(min-width: 768px) 46vw, 92vw"
                    />
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <span className="meta-label text-ink-muted">
                        {String(i + 1).padStart(2, "0")} · {program.tagline}
                      </span>
                      <StatusPill label={program.status.label} tone={program.status.tone} />
                    </div>
                    <h2 className="heading mt-4 text-3xl group-hover:text-boost sm:text-4xl">{program.name}</h2>
                    <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{program.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Read more
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}

            {/* BoostHer lives on its own site */}
            <li className="md:col-span-2">
              <a
                href={site.links.boostHer}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid overflow-hidden rounded-3xl border border-line bg-surface md:grid-cols-2"
              >
                <Photo photo={photos.boostHerPanel} zoomOnHover className="aspect-[16/10] rounded-none md:aspect-auto md:h-full" sizes="(min-width: 768px) 46vw, 92vw" />
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="meta-label text-ink-muted">Diversity in entrepreneurship</span>
                  <h2 className="heading mt-4 text-3xl group-hover:text-boost sm:text-4xl">
                    BoostHer <span aria-hidden className="text-xl">↗</span>
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                    A Boost concept that brings more women and underrepresented founders into the startup community through
                    workshops, mentoring and founder nights.
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </Container>
      </section>

      <JoinSection />
    </>
  );
}
