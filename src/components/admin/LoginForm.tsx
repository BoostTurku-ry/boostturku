"use client";

import { useActionState } from "react";
import { requestSignInLink, type LoginState } from "@/lib/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(requestSignInLink, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-md border border-line bg-paper p-5">
        <p className="meta-label text-boost">Check your inbox</p>
        <p className="mt-2 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="meta-label text-ink-muted">Board email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@boostturku.com"
          className="mt-2 h-12 w-full rounded-md border border-line bg-paper px-4 text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink/40"
        />
      </label>
      {state.status === "error" && <p className="text-sm text-boost">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-ink font-medium text-paper transition-colors hover:bg-boost disabled:opacity-60"
      >
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
