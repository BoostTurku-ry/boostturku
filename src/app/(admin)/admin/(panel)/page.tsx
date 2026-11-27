import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminHeader, Empty, List, SectionTitle, Skeleton, Status, formatDate, formatDateTime } from "@/components/admin/ui";
import { getOverview, listRounds } from "@/lib/admin/data";
import { roundState } from "@/lib/applications";
import { formatShortDate } from "@/lib/helsinki-time";

export const metadata: Metadata = { title: "Overview" };

export default function AdminOverviewPage() {
  return (
    <>
      <AdminHeader title="Overview" />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Overview />
      </Suspense>
    </>
  );
}

async function Overview() {
  await connection();
  const [o, rounds] = await Promise.all([getOverview(), listRounds()]);
  const live = rounds.filter((r) => r.is_published && roundState(r) !== "closed");

  const figures = [
    { label: "new applications", value: o.newApplications, href: "/admin/applications" },
    { label: "new messages", value: o.newMessages, href: "/admin/messages" },
    { label: "active members", value: o.activeMembers, href: "/admin/members" },
    { label: "joined in 30 days", value: o.joinedLast30Days, href: "/admin/members" },
  ];

  return (
    <div className="space-y-12">
      <dl className="grid grid-cols-2 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
        {figures.map((f) => (
          <Link key={f.label} href={f.href} className="group">
            <dd className="text-2xl text-ink tabular-nums group-hover:text-boost">{f.value}</dd>
            <dt className="text-xs text-ink-muted">{f.label}</dt>
          </Link>
        ))}
      </dl>

      <section>
        <SectionTitle action={<Link href="/admin/applications">All rounds →</Link>}>Application rounds</SectionTitle>
        {live.length ? (
          <List>
            {live.map((r) => {
              const state = roundState(r);
              return (
                <li key={r.id}>
                  <Link href={`/admin/applications/${r.id}`} className="flex items-center justify-between gap-4 py-3 hover:text-boost">
                    <span className="min-w-0 truncate text-sm text-ink">{r.title}</span>
                    <span className="flex shrink-0 items-center gap-4 text-xs text-ink-muted">
                      <span>{r.application_count} applied</span>
                      <Status tone={state === "open" ? "accent" : "neutral"}>
                        {state === "open" ? `Open until ${formatShortDate(r.closes_at)}` : `Opens ${formatShortDate(r.opens_at)}`}
                      </Status>
                    </span>
                  </Link>
                </li>
              );
            })}
          </List>
        ) : (
          <Empty>
            No application rounds are open.{" "}
            <Link href="/admin/applications" className="text-ink underline underline-offset-4">
              Open one
            </Link>
          </Empty>
        )}
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <SectionTitle action={<Link href="/admin/messages?status=all">All →</Link>}>Latest messages</SectionTitle>
          {o.latestMessages.length ? (
            <List>
              {o.latestMessages.map((m) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate text-ink">{m.name}</span>
                    {m.status === "new" ? <Status tone="accent">New</Status> : <Status tone="muted">Handled</Status>}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {m.topic} · {formatDateTime(m.created_at)}
                  </p>
                </li>
              ))}
            </List>
          ) : (
            <Empty>No messages yet.</Empty>
          )}
        </section>
        <section>
          <SectionTitle action={<Link href="/admin/members">All →</Link>}>Newest members</SectionTitle>
          {o.latestMembers.length ? (
            <List>
              {o.latestMembers.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="min-w-0 truncate text-ink">
                    {m.name} <span className="text-ink-muted">· {m.school}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-muted">{formatDate(m.joined_at)}</span>
                </li>
              ))}
            </List>
          ) : (
            <Empty>No members yet.</Empty>
          )}
        </section>
      </div>
    </div>
  );
}
