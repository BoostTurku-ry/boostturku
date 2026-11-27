import type { Metadata } from "next";
import { Suspense } from "react";
import { SubmitButton } from "@/components/admin/FormButtons";
import { AdminHeader, Empty, Skeleton, Status, Tabs, formatDateTime } from "@/components/admin/ui";
import { deleteMessage, setMessageStatus } from "@/lib/admin/actions";
import { listMessages } from "@/lib/admin/data";

export const metadata: Metadata = { title: "Messages" };

type Params = PageProps<"/admin/messages">["searchParams"];

export default function MessagesPage({ searchParams }: PageProps<"/admin/messages">) {
  return (
    <>
      <AdminHeader title="Messages" intro="From the contact form. Reply by email, then mark as handled. Messages are deleted after 12 months." />
      <Suspense fallback={<Skeleton rows={6} />}>
        <Messages searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Messages({ searchParams }: { searchParams: Params }) {
  const raw = (await searchParams).status;
  const status = raw === "handled" || raw === "all" ? raw : "new";
  const messages = await listMessages(status);

  return (
    <div>
      <Tabs
        current={status}
        items={[
          { key: "new", label: "New", href: "/admin/messages" },
          { key: "handled", label: "Handled", href: "/admin/messages?status=handled" },
          { key: "all", label: "All", href: "/admin/messages?status=all" },
        ]}
      />
      {messages.length ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {messages.map((m) => (
            <li key={m.id} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-sm text-ink">
                  {m.name} <span className="text-ink-muted">· {m.email}</span>
                </p>
                <span className="flex items-center gap-3 text-xs text-ink-muted">
                  {m.status === "new" ? <Status tone="accent">New</Status> : <Status tone="muted">Handled</Status>}
                  {formatDateTime(m.created_at)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">{m.topic}</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed whitespace-pre-line text-ink-soft">{m.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic}`)}`} className="text-ink underline decoration-line underline-offset-4">
                  Reply
                </a>
                <form action={setMessageStatus}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="status" value={m.status === "new" ? "handled" : "new"} />
                  <SubmitButton>{m.status === "new" ? "Mark as handled" : "Mark as new"}</SubmitButton>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <SubmitButton variant="danger" confirm="Delete this message permanently?">
                    Delete
                  </SubmitButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>{status === "new" ? "No new messages." : "No messages here."}</Empty>
      )}
    </div>
  );
}
