import type { Metadata } from "next";
import { Suspense } from "react";
import { AddAdminForm } from "@/components/admin/AddAdminForm";
import { SubmitButton } from "@/components/admin/FormButtons";
import { AdminHeader, List, SectionTitle, Skeleton, formatDate } from "@/components/admin/ui";
import { removeAdmin } from "@/lib/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { listAdmins } from "@/lib/admin/data";

export const metadata: Metadata = { title: "Board access" };

export default function AccessPage() {
  return (
    <>
      <AdminHeader title="Board access" intro="Who can sign in to the admin. When the board changes, add the new board and remove the old one." />
      <Suspense fallback={<Skeleton rows={4} />}>
        <Access />
      </Suspense>
    </>
  );
}

async function Access() {
  const [me, admins] = await Promise.all([requireAdmin(), listAdmins()]);
  return (
    <div className="space-y-10">
      <List>
        {admins.map((a) => (
          <li key={a.email} className="flex items-center justify-between gap-3 py-3">
            <span className="min-w-0">
              <span className="block truncate text-sm text-ink">
                {a.name ?? a.email}
                {a.email === me.email && <span className="text-ink-muted"> · you</span>}
              </span>
              <span className="block truncate text-xs text-ink-muted">
                {a.name ? `${a.email} · ` : ""}added {formatDate(a.added_at)}
              </span>
            </span>
            {a.email !== me.email && (
              <form action={removeAdmin}>
                <input type="hidden" name="email" value={a.email} />
                <SubmitButton variant="danger" confirm={`Remove admin access for ${a.email}?`}>
                  Remove
                </SubmitButton>
              </form>
            )}
          </li>
        ))}
      </List>
      <section>
        <SectionTitle>Give someone access</SectionTitle>
        <p className="mb-3 text-xs text-ink-muted">They sign in with this email. No password or invite needed.</p>
        <AddAdminForm />
      </section>
    </div>
  );
}
