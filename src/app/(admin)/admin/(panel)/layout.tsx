import Link from "next/link";
import { Suspense } from "react";
import { AdminNav, AdminNavFallback } from "@/components/admin/AdminNav";
import { SubmitButton } from "@/components/admin/FormButtons";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { signOut } from "@/lib/admin/actions";
import { getAdmin } from "@/lib/admin/auth";

/** Admin shell: a quiet text sidebar (top bar on small screens). Each page checks access itself. */
export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="border-b border-line px-4 py-4 lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-52 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2 text-boost" aria-label="Admin overview">
            <BoostLogo className="h-5" />
            <span className="text-xs text-ink-muted">Admin</span>
          </Link>
          <form action={signOut} className="lg:hidden">
            <SubmitButton variant="quiet">Sign out</SubmitButton>
          </form>
        </div>
        <div className="mt-4 lg:mt-10">
          <Suspense fallback={<AdminNavFallback />}>
            <AdminNav />
          </Suspense>
        </div>
        <div className="hidden text-sm lg:mt-auto lg:block">
          <Suspense fallback={<div className="h-12" />}>
            <SignedInAs />
          </Suspense>
          <Link href="/" className="mt-3 block text-ink-muted hover:text-ink">
            View site ↗
          </Link>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-14 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

async function SignedInAs() {
  const admin = await getAdmin();
  if (!admin) return null;
  return (
    <div>
      <p className="truncate text-ink" title={admin.email}>
        {admin.name ?? admin.email}
      </p>
      <form action={signOut}>
        <SubmitButton variant="quiet" className="-ml-1">
          Sign out
        </SubmitButton>
      </form>
    </div>
  );
}
