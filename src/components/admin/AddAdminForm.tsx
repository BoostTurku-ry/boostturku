"use client";

import { useActionState } from "react";
import { inputClass as input, labelClass } from "@/components/admin/ui";
import { addAdmin, type AccessState } from "@/lib/admin/actions";

export function AddAdminForm() {
  const [state, action, pending] = useActionState<AccessState, FormData>(addAdmin, { status: "idle" });
  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <label className="block">
        <span className={labelClass}>Email</span>
        <input type="email" name="email" required placeholder="name@boostturku.com" className={`mt-1 ${input}`} />
      </label>
      <label className="block">
        <span className={labelClass}>Name (optional)</span>
        <input type="text" name="name" placeholder="Board role or name" className={`mt-1 ${input}`} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="h-9 rounded-sm bg-ink px-4 text-sm text-paper transition-colors hover:bg-ink/85 disabled:opacity-60"
      >
        {pending ? "Adding…" : "Give access"}
      </button>
      {state.message && (
        <p className={`text-sm sm:col-span-3 ${state.status === "error" ? "text-boost" : "text-ink-soft"}`}>{state.message}</p>
      )}
    </form>
  );
}
