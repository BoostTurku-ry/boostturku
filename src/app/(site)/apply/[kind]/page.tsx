import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/sections/apply/ApplicationForm";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applicationKinds, isApplicationKind, type ApplicationKind } from "@/content/applications";
import { getApplyInfo, type ApplyInfo } from "@/content/applyInfo";
import { site } from "@/content/site";
import { getPublishedRounds, pickRound } from "@/lib/applications";
import { formatDeadline } from "@/lib/helsinki-time";
import { renderMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  return Object.keys(applicationKinds).map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: PageProps<"/apply/[kind]">): Promise<Metadata> {
  const { kind } = await params;
  if (!isApplicationKind(kind)) return {};
  return { title: `Apply: ${applicationKinds[kind].label}`, description: applicationKinds[kind].blurb };
}

export default async function ApplyPage({ params }: PageProps<"/apply/[kind]">) {
  const { kind } = await params;
  if (!isApplicationKind(kind)) notFound();
  const meta = applicationKinds[kind];

  const info = getApplyInfo(kind);

  return (
    <>
      <section className="pt-28 pb-14 sm:pt-32 sm:pb-20">
        <Container size="wide">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-line/50" />}>
            <Round kind={kind} />
          </Suspense>
        </Container>
      </section>
      {info && <ApplyDetails info={info} programHref={meta.programHref} label={meta.label} />}
      {info?.faq && info.faq.length > 0 && <FaqSection items={info.faq} />}
    </>
  );
}

async function Round({ kind }: { kind: ApplicationKind }) {
  await connection(); // open/closed depends on the current time
  const meta = applicationKinds[kind];
  const picked = pickRound(await getPublishedRounds(kind));

  if (!picked || picked.state !== "open") {
    const info = getApplyInfo(kind);
    return (
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="heading text-[clamp(2.25rem,4.5vw,3.5rem)]">{picked?.round.title ?? `${meta.label} applications`}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            {picked?.state === "upcoming"
              ? `Applications open on ${formatDeadline(picked.round.opens_at)}.`
              : "Applications aren't open right now."}{" "}
            Follow our Telegram channel to hear the moment they open. Until then, here&apos;s what to know before you apply.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.community.telegram.href ?? site.links.luma} arrow>
              Follow on Telegram
            </ButtonLink>
            <ButtonLink href={meta.programHref} variant="outline">
              {meta.programHref.startsWith("/programs") ? `About ${meta.label}` : "Ways to get involved"}
            </ButtonLink>
          </div>
        </div>
        {info && (
          <div className="lg:col-span-5">
            {/* A single print, slightly turned, like the page headers elsewhere. */}
            <div className="mx-auto max-w-md rotate-[2deg] rounded-xl bg-paper p-1.5 shadow-[0_24px_50px_-28px_rgb(37_3_26/0.45)] transition-transform duration-500 hover:rotate-0">
              <Photo photo={info.photo} preload className="aspect-[4/3] rounded-lg" sizes="(min-width: 1024px) 30vw, 90vw" />
            </div>
          </div>
        )}
      </div>
    );
  }

  const { round } = picked;
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <h1 className="heading text-[clamp(2.25rem,4vw,3.25rem)]">{round.title}</h1>
          <dl className="mt-6 border-t border-line">
            <div className="flex justify-between gap-4 border-b border-line py-3 text-sm">
              <dt className="text-ink-muted">Deadline</dt>
              <dd className="text-right font-medium text-ink">{formatDeadline(round.closes_at)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3 text-sm">
              <dt className="text-ink-muted">Cost</dt>
              <dd className="font-medium text-ink">Free</dd>
            </div>
          </dl>
          {round.intro && <div className="prose-boost mt-6 text-base" dangerouslySetInnerHTML={{ __html: renderMarkdown(round.intro) }} />}
          <p className="mt-6 text-sm text-ink-muted">
            Questions? Email{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline decoration-line underline-offset-4">
              {site.email}
            </a>
            .{" "}
            {kind === "chair" && round.show_candidates && (
              <Link href="/apply/chair/candidates" className="text-ink underline decoration-line underline-offset-4">
                See the candidates
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:col-span-8">
        <ApplicationForm kind={kind} questions={round.questions} />
      </div>
    </div>
  );
}

/** What you're applying for: summary, key facts, how it works and (for roles) the timeline. */
function ApplyDetails({ info, programHref, label }: { info: ApplyInfo; programHref: string; label: string }) {
  const isProgram = programHref.startsWith("/programs");
  return (
    <section className="border-t border-line bg-surface py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title={info.title}
          intro={info.summary}
          action={
            isProgram ? (
              <ButtonLink href={programHref} variant="outline" arrow>
                Full {label} page
              </ButtonLink>
            ) : undefined
          }
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {info.facts.map((fact) => (
            <div key={fact.label} className="bg-paper p-6">
              <dt className="meta-label text-ink-muted">{fact.label}</dt>
              <dd className="mt-2 text-lg font-semibold leading-snug text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
          {info.blocks.map((block) => (
            <div key={block.title}>
              <h3 className="heading text-2xl sm:text-3xl">{block.title}</h3>
              <ul className="mt-6 border-t border-line">
                {block.items.map((item) => (
                  <li key={item.body} className="flex gap-4 border-b border-line py-5">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-boost" />
                    <p className="leading-relaxed text-ink-soft">
                      {item.title && <span className="font-semibold text-ink">{item.title}. </span>}
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {info.timeline && (
          <div className="mt-14">
            <h3 className="heading text-2xl sm:text-3xl">{info.timeline.title}</h3>
            <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {info.timeline.steps.map((step, i) => (
                <li key={step.label} className="bg-paper p-6">
                  <p className="meta-label text-boost">
                    {String(i + 1).padStart(2, "0")} · {step.label}
                  </p>
                  <p className="mt-3 leading-snug text-ink">{step.value}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Container>
    </section>
  );
}
