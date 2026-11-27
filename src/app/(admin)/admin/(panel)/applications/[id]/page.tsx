import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SubmitButton } from "@/components/admin/FormButtons";
import { RoundSettingsForm } from "@/components/admin/RoundSettingsForm";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { AdminHeader, Empty, Skeleton, Status, Tabs, formatDateTime } from "@/components/admin/ui";
import { applicationKinds, applicationStatuses, statusLabels, type ApplicationStatus } from "@/content/applications";
import { deleteApplication, deleteRound, saveApplicationNotes, setApplicationPublic } from "@/lib/admin/actions";
import { getAdminRound, listApplications } from "@/lib/admin/data";
import { roundState } from "@/lib/applications";
import { formatDeadline, toHelsinkiInput } from "@/lib/helsinki-time";

export const metadata: Metadata = { title: "Application round" };

type Props = PageProps<"/admin/applications/[id]">;

export default function RoundPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Round params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Round({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const round = await getAdminRound(id);
  if (!round) notFound();

  const tab = sp.tab === "settings" ? "settings" : "applications";
  const filter = applicationStatuses.includes(sp.status as ApplicationStatus) ? (sp.status as ApplicationStatus) : undefined;
  const all = await listApplications(round.id);
  const shown = filter ? all.filter((a) => a.status === filter) : all;
  const state = roundState(round);
  const base = `/admin/applications/${round.id}`;

  return (
    <>
      <AdminHeader
        back={<Link href="/admin/applications" className="hover:text-ink">← Applications</Link>}
        title={round.title}
        intro={
          <>
            {applicationKinds[round.kind].label} ·{" "}
            {!round.is_published ? "Draft, not visible" : state === "open" ? "Open" : state === "upcoming" ? "Not open yet" : "Closed"} ·{" "}
            {formatDeadline(round.opens_at)} → {formatDeadline(round.closes_at)}
          </>
        }
        action={
          <>
            <a href={`/apply/${round.kind}`} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center rounded-sm border border-line px-3 text-[13px] text-ink hover:border-ink/30">
              Public form ↗
            </a>
            <a href={`${base}/export`} className="inline-flex h-8 items-center rounded-sm border border-line px-3 text-[13px] text-ink hover:border-ink/30">
              Export CSV
            </a>
          </>
        }
      />

      <Tabs
        current={tab}
        items={[
          { key: "applications", label: "Applications", href: base, count: all.length },
          { key: "settings", label: "Settings", href: `${base}?tab=settings` },
        ]}
      />

      {tab === "settings" ? (
        <div className="mt-8">
          <RoundSettingsForm
            key={JSON.stringify(round.questions) + round.title}
            round={round}
            opensLocal={toHelsinkiInput(round.opens_at)}
            closesLocal={toHelsinkiInput(round.closes_at)}
          />
          <form action={deleteRound} className="mt-16 border-t border-line pt-5 text-sm text-ink-muted">
            <input type="hidden" name="id" value={round.id} />
            Delete this round and all {all.length} applications in it.{" "}
            <SubmitButton variant="danger" confirm={`Delete "${round.title}" and all its applications permanently?`}>
              Delete round
            </SubmitButton>
          </form>
        </div>
      ) : (
        <div className="mt-6">
          <nav aria-label="Filter by status" className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <Link href={base} className={!filter ? "text-ink" : "text-ink-muted hover:text-ink"}>
              All {all.length}
            </Link>
            {applicationStatuses.map((s) => {
              const n = all.filter((a) => a.status === s).length;
              return (
                <Link key={s} href={`${base}?status=${s}`} className={filter === s ? "text-ink" : "text-ink-muted hover:text-ink"}>
                  {statusLabels[s]} {n}
                </Link>
              );
            })}
          </nav>

          {shown.length ? (
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {shown.map((a) => (
                <li key={a.id}>
                  <details className="group">
                    <summary className="grid cursor-pointer list-none gap-2 py-3 sm:grid-cols-[1fr_9rem_8rem] sm:items-center sm:gap-4">
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-ink group-open:font-medium">{a.name}</span>
                        <span className="block truncate text-xs text-ink-muted">{a.email}</span>
                      </span>
                      <span className="text-xs text-ink-muted">{formatDateTime(a.created_at)}</span>
                      <span className="sm:text-right">
                        <Status tone={a.status === "new" ? "accent" : a.status === "declined" ? "muted" : a.status === "accepted" ? "good" : "neutral"}>
                          {statusLabels[a.status]}
                          {a.is_public && " · public"}
                        </Status>
                      </span>
                    </summary>

                    <div className="grid gap-8 pt-2 pb-6 lg:grid-cols-[1fr_16rem]">
                      <dl className="space-y-4">
                        {round.questions.map((q) => {
                          const value = a.answers[q.id];
                          return (
                            <div key={q.id}>
                              <dt className="text-xs text-ink-muted">{q.label}</dt>
                              <dd className="mt-0.5 text-sm whitespace-pre-line text-ink">
                                {value === true ? "Yes" : value ? String(value) : <span className="text-ink-muted">—</span>}
                              </dd>
                            </div>
                          );
                        })}
                        {Object.keys(a.answers)
                          .filter((k) => !round.questions.some((q) => q.id === k))
                          .map((k) => (
                            <div key={k}>
                              <dt className="text-xs text-ink-muted">{k} (removed question)</dt>
                              <dd className="mt-0.5 text-sm whitespace-pre-line text-ink">{String(a.answers[k])}</dd>
                            </div>
                          ))}
                      </dl>

                      <div className="space-y-5 text-sm">
                        <div>
                          <p className="text-xs text-ink-muted">Status</p>
                          <div className="mt-1">
                            <StatusSelect id={a.id} status={a.status} />
                          </div>
                        </div>
                        <form action={saveApplicationNotes}>
                          <input type="hidden" name="id" value={a.id} />
                          <label className="block">
                            <span className="text-xs text-ink-muted">Board notes (only the board sees these)</span>
                            <textarea
                              name="notes"
                              rows={4}
                              defaultValue={a.board_notes ?? ""}
                              className="mt-1 w-full rounded-sm border border-line bg-surface p-2 text-sm text-ink outline-none focus:border-ink/40"
                            />
                          </label>
                          <SubmitButton className="mt-1">Save notes</SubmitButton>
                        </form>
                        {round.kind === "chair" && (
                          <div>
                            <p className="text-xs text-ink-muted">Candidates page</p>
                            {a.publish_consent ? (
                              <form action={setApplicationPublic} className="mt-1">
                                <input type="hidden" name="id" value={a.id} />
                                <input type="hidden" name="public" value={a.is_public ? "0" : "1"} />
                                <SubmitButton>{a.is_public ? "Hide from candidates page" : "Show on candidates page"}</SubmitButton>
                              </form>
                            ) : (
                              <p className="mt-1 text-xs text-ink-muted">Didn&apos;t agree to be published.</p>
                            )}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 border-t border-line pt-3">
                          <a href={`mailto:${a.email}?subject=${encodeURIComponent(round.title)}`} className="text-ink underline decoration-line underline-offset-4">
                            Email {a.name.split(" ")[0]}
                          </a>
                          <form action={deleteApplication}>
                            <input type="hidden" name="id" value={a.id} />
                            <SubmitButton variant="danger" confirm={`Delete ${a.name}'s application permanently?`}>
                              Delete
                            </SubmitButton>
                          </form>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>{filter ? "No applications with this status." : round.is_published ? "No applications yet." : "This round is a draft. Publish it in Settings to start accepting applications."}</Empty>
          )}
        </div>
      )}
    </>
  );
}
