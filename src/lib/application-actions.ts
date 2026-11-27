"use server";

import { updateTag } from "next/cache";
import { applicationKinds, isApplicationKind, type Question } from "@/content/applications";
import { site } from "@/content/site";
import { CANDIDATES_TAG, roundState, type Round } from "@/lib/applications";
import { sendEmail } from "@/lib/email";
import { env, hasDatabase } from "@/lib/env";
import { formatDeadline } from "@/lib/helsinki-time";
import { createServiceClient } from "@/lib/supabase/server";

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** What was typed, returned on errors so the form can restore it (React resets forms after submit). */
  values?: Record<string, string>;
};

const keep = (data: FormData) =>
  Object.fromEntries([...data.entries()].filter(([k, v]) => typeof v === "string" && k !== "company" && !k.startsWith("$")) as [string, string][]);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i;
const LIMIT = { short: 300, long: 5000, email: 254, url: 500 } as const;

function text(data: FormData, name: string, max: number) {
  const v = data.get(name);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Validates one answer against its question. Returns [value, error]. */
function readAnswer(q: Question, data: FormData): [string | boolean, string | undefined] {
  const key = `q_${q.id}`;
  if (q.type === "checkbox") {
    const on = data.get(key) === "on";
    return [on, q.required && !on ? "Please confirm this to apply." : undefined];
  }
  const value = text(data, key, q.type === "select" ? 200 : LIMIT[q.type]);
  if (!value) return ["", q.required ? "This one is required." : undefined];
  if (q.type === "email" && !EMAIL.test(value)) return [value, "Enter a valid email address."];
  if (q.type === "url" && !URL_RE.test(value)) return [value, "Enter a valid link, e.g. https://…"];
  if (q.type === "select" && !(q.options ?? []).includes(value)) return [value, "Choose one of the options."];
  return [value, undefined];
}

/**
 * Submits an application to the currently open round of `kind`. The round is
 * re-read here (not from cache), so a closed round never accepts late submissions.
 * Applying again with the same email in the same round updates the earlier answers.
 */
export async function submitApplication(kind: string, _prev: ApplyState, data: FormData): Promise<ApplyState> {
  if (!isApplicationKind(kind)) return { status: "error", message: "Unknown application." };
  const meta = applicationKinds[kind];

  if (text(data, "company", 100)) return { status: "success", message: "Thanks, your application is in." };
  if (!hasDatabase()) {
    return { status: "error", message: `Sorry, applications aren't working right now. Please email us at ${site.email}.` };
  }

  const db = createServiceClient();
  const { data: rounds } = await db
    .from("application_rounds")
    .select("id, kind, title, intro, opens_at, closes_at, is_published, questions, show_candidates")
    .eq("kind", kind)
    .eq("is_published", true)
    .returns<Round[]>();
  const round = (rounds ?? []).find((r) => roundState(r) === "open");
  if (!round) return { status: "error", values: keep(data), message: "This application round has closed." };

  const name = text(data, "name", 120);
  const email = text(data, "email", 254).toLowerCase();
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";

  const answers: Record<string, string | boolean> = {};
  for (const q of round.questions) {
    const [value, error] = readAnswer(q, data);
    if (error) errors[`q_${q.id}`] = error;
    if (value !== "" && value !== false) answers[q.id] = value;
  }
  if (data.get("privacy") !== "on") errors.privacy = "We need your OK to process your application.";
  if (Object.keys(errors).length) return { status: "error", errors, values: keep(data), message: "Check the highlighted answers." };

  const publishConsent = round.questions.some((q) => q.public) && data.get("publish_consent") === "on";
  const { data: existing } = await db
    .from("applications")
    .select("id")
    .eq("round_id", round.id)
    .eq("email", email)
    .maybeSingle();

  const row = { name, email, answers, publish_consent: publishConsent, ...(publishConsent ? {} : { is_public: false }) };
  const { error } = existing
    ? await db.from("applications").update(row).eq("id", existing.id)
    : await db.from("applications").insert({ ...row, round_id: round.id });
  if (error) {
    console.error("[applications] save failed", error.message);
    return { status: "error", values: keep(data), message: `Sorry, something went wrong. Please try again, or email us at ${site.email}.` };
  }
  if (existing) updateTag(CANDIDATES_TAG);

  const firstName = name.split(" ")[0];
  await Promise.all([
    sendEmail({
      to: email,
      subject: existing ? `Your ${meta.noun} was updated` : `We received your ${meta.noun}`,
      paragraphs: [
        `Hi ${firstName},`,
        existing
          ? `Your answers for ${round.title} have been updated.`
          : `Thanks for applying to ${round.title}. Your application is in, and the Boost board will be in touch after applications close on ${formatDeadline(round.closes_at)}.`,
        "If you need to change something before the deadline, just submit the form again with the same email address.",
        "Best,\nThe Boost Turku board",
        `How we handle application data: ${env.siteUrl}/privacy#applications`,
      ],
    }),
    env.notifyEmail &&
      sendEmail({
        to: env.notifyEmail,
        replyTo: email,
        subject: `${existing ? "Updated" : "New"} application: ${round.title} (${name})`,
        paragraphs: [`${name} (${email}) ${existing ? "updated their application to" : "applied to"} ${round.title}.`, `Review: ${env.siteUrl}/admin/applications/${round.id}`],
      }),
  ]);

  return {
    status: "success",
    message: existing
      ? `Thanks, ${firstName}. We've updated your application.`
      : `Thanks, ${firstName}! Your application is in. We've sent a confirmation to ${email}.`,
  };
}
