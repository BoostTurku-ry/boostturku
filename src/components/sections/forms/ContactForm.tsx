"use client";

import { useActionState } from "react";
import { FormField, Select, Textarea } from "@/components/ui/FormField";
import { submitContact, type FormState } from "@/lib/forms";
import { cn } from "@/lib/cn";

const topics = ["A general question", "I have a startup idea", "Partnering with Boost", "Speaking at an event", "Something else"];

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { status: "idle" });
  const e = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-boost/30 bg-boost-soft p-8">
        <p className="meta-label text-boost">Message sent</p>
        <p className="heading mt-3 text-2xl">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      <FormField label="Full name" name="name" autoComplete="name" error={e.name} />
      <FormField label="Email" name="email" type="email" autoComplete="email" error={e.email} />
      <FormField label="What's it about?" name="topic" className="sm:col-span-2">
        <Select name="topic" defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </FormField>
      <FormField label="Message" name="message" error={e.message} className="sm:col-span-2">
        <Textarea name="message" error={e.message} placeholder="Tell us what's on your mind…" />
      </FormField>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-12 items-center gap-2 rounded-sm bg-ink px-7 font-medium text-paper transition-colors hover:bg-boost hover:text-white",
            pending && "opacity-70",
          )}
        >
          {pending ? "Sending…" : "Send message"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
