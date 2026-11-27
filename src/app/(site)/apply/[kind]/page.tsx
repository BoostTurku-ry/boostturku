import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/sections/apply/ApplicationForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { applicationKinds, isApplicationKind, type ApplicationKind } from "@/content/applications";
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

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32">
      <Container size="wide">
        <p className="meta-label flex items-center gap-2.5 text-ink-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-boost" />
          Apply · {meta.label}
        </p>
        <Suspense fallback={<div className="mt-6 h-40 animate-pulse rounded-2xl bg-line/50" />}>
          <Round kind={kind} />
        </Suspense>
      </Container>
    </section>
  );
}

async function Round({ kind }: { kind: ApplicationKind }) {
  await connection(); // open/closed depends on the current time
  const meta = applicationKinds[kind];
  const picked = pickRound(await getPublishedRounds(kind));

  if (!picked || picked.state !== "open") {
    return (
      <div className="mt-4 max-w-2xl">
        <h1 className="heading text-[clamp(2.25rem,4.5vw,3.5rem)]">{picked?.round.title ?? `${meta.label} applications`}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {picked?.state === "upcoming"
            ? `Applications open on ${formatDeadline(picked.round.opens_at)}.`
            : "Applications aren't open right now."}{" "}
          Follow our Telegram channel to hear the moment they open.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.community.telegram.href ?? site.links.luma} arrow>
            Follow on Telegram
          </ButtonLink>
          <ButtonLink href={meta.programHref} variant="outline">
            About {meta.label}
          </ButtonLink>
        </div>
      </div>
    );
  }

  const { round } = picked;
  return (
    <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:gap-10">
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
