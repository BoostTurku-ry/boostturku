import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getCandidates, getPublishedRounds } from "@/lib/applications";

export const metadata: Metadata = {
  title: "Chairperson candidates",
  description: "People running for Boost Turku chairperson, in their own words.",
};

export function generateStaticParams() {
  return [{ kind: "chair" }];
}

export default async function CandidatesPage({ params }: PageProps<"/apply/[kind]/candidates">) {
  const { kind } = await params;
  if (kind !== "chair") notFound();
  return (
    <section className="pt-28 pb-14 sm:pt-32 sm:pb-20">
      <Container size="wide">
        <p className="meta-label flex items-center gap-2.5 text-ink-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-boost" />
          Association meeting
        </p>
        <h1 className="heading mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)]">Chairperson candidates</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          These candidates applied before the deadline and agreed to share their answers. Any Boost member can still run for chair at the
          association meeting.
        </p>
        <Suspense fallback={<div className="mt-12 h-64 animate-pulse rounded-2xl bg-line/50" />}>
          <Candidates />
        </Suspense>
      </Container>
    </section>
  );
}

async function Candidates() {
  await connection();
  // The most recent chair round that has the candidates page switched on.
  const round = (await getPublishedRounds("chair")).find((r) => r.show_candidates);
  const candidates = round ? await getCandidates(round) : [];

  if (!candidates.length) {
    return (
      <div className="mt-12 max-w-2xl rounded-2xl border border-dashed border-line p-8 text-ink-soft">
        <p>No candidates are listed yet. Check back closer to the association meeting.</p>
        <ButtonLink href="/apply/chair" variant="outline" className="mt-6" arrow>
          Run for chair
        </ButtonLink>
      </div>
    );
  }

  return (
    <ul className="mt-14 divide-y divide-line border-y border-line">
      {candidates.map((c) => {
        const link = c.answers.find((a) => a.type === "url");
        const short = c.answers.filter((a) => a.type !== "url" && a.type !== "long");
        const long = c.answers.filter((a) => a.type === "long");
        return (
          <li key={c.id} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="heading text-3xl">{c.name}</h2>
              {short.map((a) => (
                <p key={a.label} className="mt-2 text-ink-soft">
                  {a.value}
                </p>
              ))}
              {link && (
                <a
                  href={link.value.startsWith("http") ? link.value : `https://${link.value}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="meta-label mt-4 inline-block text-ink underline decoration-line underline-offset-4 hover:decoration-boost"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
            <div className="space-y-6 lg:col-span-8">
              {long.map((a) => (
                <div key={a.label}>
                  <p className="meta-label text-boost">{a.label}</p>
                  <p className="mt-2 leading-relaxed whitespace-pre-line text-ink-soft">{a.value}</p>
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
