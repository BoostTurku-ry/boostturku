"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormField, Select, Textarea, controlClass } from "@/components/ui/FormField";
import { Honeypot } from "@/components/ui/Honeypot";
import type { Question } from "@/content/applications";
import { submitApplication, type ApplyState } from "@/lib/application-actions";
import { cn } from "@/lib/cn";

type ApplicationFormProps = {
  kind: string;
  questions: Question[];
};

/** Renders a round's questions. Values survive validation errors (restored from the server's reply). */
export function ApplicationForm({ kind, questions }: ApplicationFormProps) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication.bind(null, kind), { status: "idle" });
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const hasPublic = questions.some((q) => q.public);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-boost/30 bg-boost-soft p-8">
        <p className="meta-label text-boost">Application received</p>
        <p className="heading mt-3 text-2xl">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="relative grid gap-7">
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full name" name="name" autoComplete="name" defaultValue={v.name} error={e.name} />
        <FormField label="Email" name="email" type="email" autoComplete="email" defaultValue={v.email} error={e.email} />
      </div>

      {questions.map((q) => {
        const name = `q_${q.id}`;
        const label = q.required ? q.label : `${q.label} (optional)`;
        if (q.type === "checkbox") {
          return (
            <div key={q.id}>
              <label className="flex items-start gap-3 text-ink-soft">
                <input type="checkbox" name={name} defaultChecked={v[name] === "on"} className="mt-1 size-4 accent-boost" />
                <span>{label}</span>
              </label>
              {e[name] && <p className="mt-1.5 text-sm text-boost">{e[name]}</p>}
            </div>
          );
        }
        return (
          <FormField key={q.id} label={label} name={name} error={e[name]} hint={q.help}>
            {q.type === "long" ? (
              <Textarea name={name} defaultValue={v[name]} error={e[name]} maxLength={5000} />
            ) : q.type === "select" ? (
              // Keyed by the returned value: React only applies a select's defaultValue on mount,
              // so this remount is what restores the choice after a validation error.
              <Select key={`${name}:${v[name] ?? ""}`} name={name} defaultValue={v[name] ?? ""} error={e[name]}>
                <option value="" disabled>
                  Choose one
                </option>
                {q.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            ) : (
              <input
                id={`f-${name}`}
                name={name}
                type={q.type === "email" ? "email" : q.type === "url" ? "url" : "text"}
                defaultValue={v[name]}
                placeholder={q.type === "url" ? "https://" : undefined}
                aria-invalid={e[name] ? true : undefined}
                maxLength={q.type === "short" ? 300 : 500}
                className={controlClass}
              />
            )}
          </FormField>
        );
      })}

      <div className="space-y-4 border-t border-line pt-6">
        {hasPublic && (
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input type="checkbox" name="publish_consent" defaultChecked={v.publish_consent === "on"} className="mt-0.5 size-4 accent-boost" />
            <span>
              Boost may publish my name and the answers marked for the candidates page ({questions.filter((q) => q.public).map((q) => q.label.toLowerCase()).join(", ")})
              on the website before the association meeting. Optional.
            </span>
          </label>
        )}
        <div>
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input type="checkbox" name="privacy" defaultChecked={v.privacy === "on"} className="mt-0.5 size-4 accent-boost" />
            <span>
              Boost Turku ry may process my application to select participants.{" "}
              <Link href="/privacy#applications" className="text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                How we handle applications
              </Link>
            </span>
          </label>
          {e.privacy && <p className="mt-1.5 text-sm text-boost">{e.privacy}</p>}
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md border border-boost/30 bg-boost-soft p-4 text-sm text-ink">
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-12 items-center gap-2 rounded-sm bg-boost px-7 font-medium text-white transition-colors hover:bg-boost-dark",
            pending && "opacity-70",
          )}
        >
          {pending ? "Sending…" : "Send application"}
          <span aria-hidden>→</span>
        </button>
        <p className="mt-3 text-sm text-ink-muted">You can update your answers until the deadline by sending the form again with the same email.</p>
      </div>
    </form>
  );
}
