import type { Metadata } from "next";
import { PhotoMosaic } from "@/components/sections/shared/PhotoMosaic";
import { Container } from "@/components/ui/Container";
import { gallery } from "@/content/gallery";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ApplyStatus } from "@/components/sections/apply/ApplyStatus";
import { ProgramDetailSections } from "@/components/sections/programs/ProgramDetailSections";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { JoinSection } from "@/components/sections/shared/JoinSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { isApplicationKind } from "@/content/applications";
import { getProgram, programDetails } from "@/content/programs";
import { site } from "@/content/site";

export function generateStaticParams() {
  return programDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const program = getProgram((await params).slug);
  return program ? { title: program.name, description: program.summary } : {};
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const program = getProgram((await params).slug);
  if (!program) notFound();

  const telegram = site.socials.find((s) => s.label === "Telegram")!;
  // Shown when no application round is open (and while the live status loads).
  const staticStatus = (
    <>
      <StatusPill label={program.status.label} tone={program.status.tone} className="w-full justify-center sm:w-auto" />
      {program.primaryCta ? (
        <ButtonLink href={program.primaryCta.href} arrow>
          {program.primaryCta.label}
        </ButtonLink>
      ) : (
        <ButtonLink href={telegram.href} variant="outline">
          Get notified on Telegram
        </ButtonLink>
      )}
    </>
  );

  return (
    <>
      <PageHero
        back={{ href: "/programs", label: "All programs" }}
        title={program.name}
        intro={program.summary}
        actions={
          isApplicationKind(program.slug) ? (
            <Suspense fallback={staticStatus}>
              <ApplyStatus kind={program.slug} fallback={staticStatus} />
            </Suspense>
          ) : (
            staticStatus
          )
        }
        photos={[program.photo, ...(gallery.programs[program.slug] ?? []).filter((p) => p.src !== program.photo.src)]}
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {program.facts.map((fact) => (
            <div key={fact.label} className="bg-surface p-6">
              <dt className="meta-label text-ink-muted">{fact.label}</dt>
              <dd className="mt-2 font-semibold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <ProgramDetailSections program={program} />
      {gallery.programs[program.slug] && (
        <section className={program.highlight ? "pb-14 sm:pb-20" : "py-14 sm:py-20"}>
          <Container size="wide">
            <PhotoMosaic photos={gallery.programs[program.slug]} />
          </Container>
        </section>
      )}

      {program.faq && <FaqSection items={program.faq} />}
      <JoinSection />
    </>
  );
}
