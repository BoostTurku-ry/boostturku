import type { Metadata } from "next";
import { Suspense } from "react";
import { SubmitButton } from "@/components/admin/FormButtons";
import { AdminHeader, Empty, Skeleton, Status, formatDate, inputClass } from "@/components/admin/ui";
import { schools } from "@/content/membership";
import { deleteMember, saveMemberNotes, setMemberLeft } from "@/lib/admin/actions";
import { listMembers, type MemberFilters } from "@/lib/admin/data";

export const metadata: Metadata = { title: "Members" };

type Params = PageProps<"/admin/members">["searchParams"];

function readFilters(params: Awaited<Params>): MemberFilters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const status = one(params.status);
  return {
    q: one(params.q).slice(0, 100),
    school: one(params.school),
    status: status === "left" || status === "all" ? status : "active",
  };
}

export default function MembersPage({ searchParams }: PageProps<"/admin/members">) {
  return (
    <>
      <AdminHeader
        title="Members"
        intro="The member register. Ex-members are deleted automatically 12 months after they leave."
        action={
          <Suspense>
            <ExportLink searchParams={searchParams} />
          </Suspense>
        }
      />
      <Suspense fallback={<Skeleton rows={8} />}>
        <Members searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ExportLink({ searchParams }: { searchParams: Params }) {
  const f = readFilters(await searchParams);
  const query = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]).toString();
  return (
    <a href={`/admin/members/export${query ? `?${query}` : ""}`} className="inline-flex h-8 items-center rounded-sm border border-line px-3 text-[13px] text-ink hover:border-ink/30">
      Export CSV
    </a>
  );
}

async function Members({ searchParams }: { searchParams: Params }) {
  const filters = readFilters(await searchParams);
  const members = await listMembers(filters);

  return (
    <div>
      <form className="flex flex-wrap items-center gap-2" role="search">
        <input type="search" name="q" defaultValue={filters.q} placeholder="Search name or email" aria-label="Search" className={`min-w-56 flex-1 ${inputClass}`} />
        <select name="school" defaultValue={filters.school} aria-label="School" className={`w-auto ${inputClass}`}>
          <option value="">All schools</option>
          {schools.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select name="status" defaultValue={filters.status} aria-label="Status" className={`w-auto ${inputClass}`}>
          <option value="active">Active</option>
          <option value="left">Left</option>
          <option value="all">All</option>
        </select>
        <button type="submit" className="h-9 rounded-sm bg-ink px-3 text-sm text-paper hover:bg-ink/85">
          Filter
        </button>
      </form>

      <p className="mt-6 mb-2 text-xs text-ink-muted">
        {members.length} {members.length === 1 ? "person" : "people"}
      </p>

      {members.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {members.map((m) => (
            <li key={m.id}>
              <details className="group">
                <summary className="grid cursor-pointer list-none gap-1 py-3 sm:grid-cols-[1fr_14rem_7rem] sm:items-center sm:gap-4">
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink">{m.name}</span>
                    <span className="block truncate text-xs text-ink-muted">{m.email}</span>
                  </span>
                  <span className="truncate text-xs text-ink-muted">{m.school}</span>
                  <span className="text-xs text-ink-muted sm:text-right">
                    {m.left_at ? <Status tone="muted">Left {formatDate(m.left_at)}</Status> : formatDate(m.joined_at)}
                  </span>
                </summary>
                <div className="grid gap-6 pt-1 pb-5 sm:grid-cols-[1fr_auto]">
                  <div className="space-y-3 text-sm">
                    <p className="text-ink-soft">
                      <span className="text-xs text-ink-muted">Interested in: </span>
                      {m.interests.length ? m.interests.join(", ") : "—"}
                    </p>
                    <form action={saveMemberNotes} className="max-w-xl">
                      <input type="hidden" name="id" value={m.id} />
                      <label className="block">
                        <span className="text-xs text-ink-muted">Notes</span>
                        <textarea
                          name="notes"
                          defaultValue={m.notes ?? ""}
                          rows={2}
                          maxLength={2000}
                          className="mt-1 w-full rounded-sm border border-line bg-surface p-2 text-sm text-ink outline-none focus:border-ink/40"
                        />
                      </label>
                      <SubmitButton className="mt-1">Save notes</SubmitButton>
                    </form>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <a href={`mailto:${m.email}`} className="inline-flex h-8 items-center text-ink underline decoration-line underline-offset-4">
                      Email
                    </a>
                    <form action={setMemberLeft}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="left" value={m.left_at ? "0" : "1"} />
                      <SubmitButton>{m.left_at ? "Restore" : "Mark as left"}</SubmitButton>
                    </form>
                    <form action={deleteMember}>
                      <input type="hidden" name="id" value={m.id} />
                      <SubmitButton variant="danger" confirm={`Delete ${m.name} from the register permanently? This can't be undone.`}>
                        Delete
                      </SubmitButton>
                    </form>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>{filters.q || filters.school ? "No members match these filters." : "No members yet."}</Empty>
      )}
    </div>
  );
}
