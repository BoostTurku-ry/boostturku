import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { LoginForm } from "@/components/admin/LoginForm";
import { hasDatabase } from "@/lib/env";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  return (
    <main className="grid flex-1 place-items-center px-4 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" aria-label="Boost Turku home" className="text-boost">
          <BoostLogo className="h-8" />
        </Link>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-7 shadow-[0_18px_40px_-28px_rgb(37_3_26/0.35)]">
          <h1 className="heading text-2xl">Board sign-in</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Members, messages and board access. We&apos;ll email you a one-time link; no password needed.
          </p>
          <Suspense>
            <LinkError searchParams={searchParams} />
          </Suspense>
          <div className="mt-6">
            {hasDatabase() ? (
              <LoginForm />
            ) : (
              <p className="rounded-md border border-dashed border-line p-4 text-sm text-ink-muted">
                The admin isn&apos;t connected to a database yet. Add the Supabase keys to the environment (see README).
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

async function LinkError({ searchParams }: { searchParams: PageProps<"/admin/login">["searchParams"] }) {
  const { error } = await searchParams;
  if (error !== "link") return null;
  return (
    <p className="mt-4 rounded-md bg-boost/10 p-3 text-sm text-boost">
      That sign-in link didn&apos;t work. It may have expired or been used already. Request a new one below.
    </p>
  );
}
