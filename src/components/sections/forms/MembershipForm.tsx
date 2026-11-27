"use client";

import { useActionState } from "react";
import { FormField, Select } from "@/components/ui/FormField";
import { submitMembership, type FormState } from "@/lib/forms";
import { cn } from "@/lib/cn";

const schools = [
  "University of Turku",
  "Turku University of Applied Sciences",
  "Åbo Akademi University",
  "Novia University of Applied Sciences",
  "HUMAK",
  "Another school",
  "Not a student",
];

const interests = ["Events", "Programs", "Volunteering", "Joining the board"];

export function MembershipForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitMembership, { status: "idle" });
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-boost/30 bg-boost-soft p-8">
        <p className="meta-label text-boost">You&apos;re in</p>
        <p className="heading mt-3 text-2xl">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <FormField label="Full name" name="name" autoComplete="name" error={e.name} />
      <FormField label="Email" name="email" type="email" autoComplete="email" error={e.email} />
      <FormField label="Where do you study?" name="school" error={e.school} className="sm:col-span-2">
        <Select name="school" defaultValue="" error={e.school}>
          <option value="" disabled>
            Choose one
          </option>
          {schools.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
      </FormField>

      <fieldset className="sm:col-span-2">
        <legend className="meta-label text-ink-muted">I&apos;m interested in (optional)</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label key={interest} className="cursor-pointer">
              <input type="checkbox" name="interests" value={interest} className="peer sr-only" />
              <span className="inline-flex rounded-sm border border-line bg-paper px-4 py-2 text-sm text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-boost">
                {interest}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-[var(--color-boost)]" />
          Boost Turku ry may store my details in its member register and contact me about Boost activities.
        </label>
        {e.consent && <p className="mt-1.5 text-sm text-boost">{e.consent}</p>}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-12 items-center gap-2 rounded-sm bg-boost px-7 font-medium text-white transition-colors hover:bg-boost-dark",
            pending && "opacity-70",
          )}
        >
          {pending ? "Sending…" : "Become a member"}
          <span aria-hidden>→</span>
        </button>
        <p className="mt-3 text-sm text-ink-muted">Membership is free and you can leave at any time.</p>
      </div>
    </form>
  );
}
