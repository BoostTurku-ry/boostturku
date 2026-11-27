import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SubmitButton } from "@/components/admin/FormButtons";
import { AdminHeader, Empty, List, SectionTitle, Skeleton, Status, inputClass, labelClass } from "@/components/admin/ui";
import { applicationKinds, type ApplicationKind } from "@/content/applications";
import { createRound } from "@/lib/admin/actions";
import { listRounds, type AdminRound } from "@/lib/admin/data";
import { roundState } from "@/lib/applications";
import { formatShortDate } from "@/lib/helsinki-time";

export const metadata: Metadata = { title: "Applications" };

export default function ApplicationsPage() {
  return (
    <>
      <AdminHeader
        title="Applications"
        intro="Open and close application rounds for the programs, the board and the chairperson, and review who applied."
      />
      <NewRound />
      <Suspense fallback={<Skeleton rows={6} className="mt-12" />}>
        <Rounds />
      </Suspense>
    </>
  );
}

function NewRound() {
  return (
    <details className="group border-y border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm text-ink">
        New application round
        <span aria-hidden className="text-ink-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <form action={createRound} className="grid gap-4 pb-5 sm:grid-cols-[12rem_1fr_11rem_11rem_auto] sm:items-end">
        <label className="block">
          <span className={labelClass}>For</span>
          <select name="kind" required className={`mt-1 ${inputClass}`}>
            {(Object.keys(applicationKinds) as ApplicationKind[]).map((k) => (
              <option key={k} value={k}>
                {applicationKinds[k].label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Title (optional)</span>
          <input name="title" placeholder="e.g. Startup Journey 2027" className={`mt-1 ${inputClass}`} />
        </label>
        <label className="block">
          <span className={labelClass}>Opens</span>
          <input type="datetime-local" name="opens_at" required className={`mt-1 ${inputClass}`} />
        </label>
        <label className="block">
          <span className={labelClass}>Closes</span>
          <input type="datetime-local" name="closes_at" required className={`mt-1 ${inputClass}`} />
        </label>
        <SubmitButton variant="primary" className="h-9">
          Create
        </SubmitButton>
        <p className="text-xs text-ink-muted sm:col-span-5">
          Times are Finnish time. The round starts unpublished with the usual questions for that program, so you can review it before it goes
          live.
        </p>
      </form>
    </details>
  );
}

function RoundRow({ r }: { r: AdminRound }) {
  const state = roundState(r);
  const label = !r.is_published
    ? { text: "Draft", tone: "muted" as const }
    : state === "open"
      ? { text: `Open · closes ${formatShortDate(r.closes_at)}`, tone: "accent" as const }
      : state === "upcoming"
        ? { text: `Opens ${formatShortDate(r.opens_at)}`, tone: "neutral" as const }
        : { text: `Closed ${formatShortDate(r.closes_at)}`, tone: "muted" as const };
  return (
    <li>
      <Link href={`/admin/applications/${r.id}`} className="group grid gap-1 py-3 sm:grid-cols-[1fr_9rem_8rem_12rem] sm:items-center sm:gap-4">
        <span className="min-w-0 truncate text-sm text-ink group-hover:text-boost">{r.title}</span>
        <span className="text-xs text-ink-muted">{applicationKinds[r.kind].label}</span>
        <span className="text-xs text-ink-muted tabular-nums">
          {r.application_count} applied{r.new_count ? <span className="text-boost"> · {r.new_count} new</span> : null}
        </span>
        <span className="sm:text-right">
          <Status tone={label.tone}>{label.text}</Status>
        </span>
      </Link>
    </li>
  );
}

async function Rounds() {
  await connection();
  const rounds = await listRounds();
  const groups = [
    { title: "Open and upcoming", items: rounds.filter((r) => r.is_published && roundState(r) !== "closed") },
    { title: "Drafts", items: rounds.filter((r) => !r.is_published) },
    { title: "Closed", items: rounds.filter((r) => r.is_published && roundState(r) === "closed") },
  ];

  if (!rounds.length) return <Empty>No application rounds yet. Create the first one above.</Empty>;

  return (
    <div className="mt-12 space-y-10">
      {groups
        .filter((g) => g.items.length)
        .map((g) => (
          <section key={g.title}>
            <SectionTitle>{g.title}</SectionTitle>
            <List>
              {g.items.map((r) => (
                <RoundRow key={r.id} r={r} />
              ))}
            </List>
          </section>
        ))}
    </div>
  );
}
