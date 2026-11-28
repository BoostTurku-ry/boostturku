import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { StatusLine } from "@/components/ui/StatusPill";
import { gallery } from "@/content/gallery";
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
        title="From first idea to Demo Day."
        accent="Demo Day."
        intro="Structured programs led by coaches who have built companies themselves. Every one of them is free, and we never take equity."
        photos={gallery.heroes.programs}
      />

      <section className="pb-14 sm:pb-20">
        <Container size="wide">
          <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {programDetails.map((program, i) => (
              <li key={program.slug}>
                <Reveal delay={(i % 2) * 0.08} y={16}>
                  <Link href={`/programs/${program.slug}`} className="group block">
                    {/* The photo tips slightly on hover, like picking up a print. */}
                    <div className="transition-transform duration-500 ease-out group-hover:-rotate-1 group-hover:scale-[1.01]">
                      <Photo photo={program.photo} className="aspect-[16/10] rounded-2xl" sizes="(min-width: 768px) 46vw, 92vw" />
                    </div>
                    <p className="meta-label mt-6 text-ink-muted">{program.tagline}</p>
                    <h2 className="heading mt-2.5 text-3xl transition-colors group-hover:text-boost sm:text-[2.5rem]">{program.name}</h2>
                    <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{program.summary}</p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <StatusLine label={program.status.label} tone={program.status.tone} />
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-full bg-boost text-white transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}

            {/* BoostHer has its own page */}
            <li className="md:col-span-2">
              <Link
                href={site.links.boostHer}
                className="group grid overflow-hidden rounded-2xl bg-her-soft md:grid-cols-2"
              >
                <Photo photo={photos.boostHerPanel} zoomOnHover className="aspect-[16/10] rounded-none md:aspect-auto md:h-full" sizes="(min-width: 768px) 46vw, 92vw" />
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="meta-label text-ink-muted">Diversity in entrepreneurship</span>
                  <h2 className="heading mt-3 text-3xl transition-colors group-hover:text-boost sm:text-[2.5rem]">BoostHer</h2>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                    A Boost concept that brings more women and underrepresented founders into the startup community through
                    workshops, mentoring and founder nights.
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="text-sm text-ink-soft">Year-round</span>
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-boost text-white transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <JoinSection />
    </>
  );
}
