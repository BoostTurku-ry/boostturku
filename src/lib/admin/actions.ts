"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { applicationKinds, applicationStatuses, defaultQuestions, isApplicationKind, type Question } from "@/content/applications";
import { requireAdmin } from "@/lib/admin/auth";
import { CANDIDATES_TAG, ROUNDS_TAG } from "@/lib/applications";
import { fromHelsinkiInput } from "@/lib/helsinki-time";
import { env, hasDatabase } from "@/lib/env";
import { createServiceClient, createUserClient } from "@/lib/supabase/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginState = { status: "idle" | "sent" | "error"; message?: string };

/**
 * Emails a sign-in link, but only to addresses on the board access list. The
 * reply is the same either way, so the form can't be used to probe who's listed.
 */
export async function requestSignInLink(_prev: LoginState, data: FormData): Promise<LoginState> {
  const email = String(data.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email)) return { status: "error", message: "Enter a valid email address." };
  if (!hasDatabase()) return { status: "error", message: "The admin isn't connected to a database yet." };

  const { data: listed } = await createServiceClient().from("admins").select("email").eq("email", email).maybeSingle();
  if (listed) {
    const supabase = await createUserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${env.siteUrl}/auth/callback`, shouldCreateUser: true },
    });
    if (error) {
      console.error("[admin] sign-in link failed", error.message);
      return { status: "error", message: "We couldn't send the link just now. Try again in a minute." };
    }
  }
  return { status: "sent", message: `If ${email} is on the board list, a sign-in link is on its way. It works once and expires in an hour.` };
}

export async function signOut() {
  const supabase = await createUserClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ */
/* Members                                                              */
/* ------------------------------------------------------------------ */

export async function setMemberLeft(data: FormData) {
  await requireAdmin();
  const id = String(data.get("id"));
  const left = data.get("left") === "1";
  const supabase = await createUserClient();
  await supabase.from("members").update({ left_at: left ? new Date().toISOString() : null }).eq("id", id);
  refresh();
}

export async function saveMemberNotes(data: FormData) {
  await requireAdmin();
  const id = String(data.get("id"));
  const notes = String(data.get("notes") ?? "").trim().slice(0, 2000);
  const supabase = await createUserClient();
  await supabase.from("members").update({ notes: notes || null }).eq("id", id);
  refresh();
}

/** Permanent removal, e.g. when someone asks to be erased (GDPR Art. 17). */
export async function deleteMember(data: FormData) {
  await requireAdmin();
  const supabase = await createUserClient();
  await supabase.from("members").delete().eq("id", String(data.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Messages                                                             */
/* ------------------------------------------------------------------ */

export async function setMessageStatus(data: FormData) {
  await requireAdmin();
  const handled = data.get("status") === "handled";
  const supabase = await createUserClient();
  await supabase
    .from("contact_messages")
    .update({ status: handled ? "handled" : "new", handled_at: handled ? new Date().toISOString() : null })
    .eq("id", String(data.get("id")));
  refresh();
}

export async function deleteMessage(data: FormData) {
  await requireAdmin();
  const supabase = await createUserClient();
  await supabase.from("contact_messages").delete().eq("id", String(data.get("id")));
  refresh();
}

/* ------------------------------------------------------------------ */
/* Board access                                                         */
/* ------------------------------------------------------------------ */

export type AccessState = { status: "idle" | "ok" | "error"; message?: string };

export async function addAdmin(_prev: AccessState, data: FormData): Promise<AccessState> {
  await requireAdmin();
  const email = String(data.get("email") ?? "").trim().toLowerCase();
  const name = String(data.get("name") ?? "").trim().slice(0, 120);
  if (!EMAIL.test(email)) return { status: "error", message: "Enter a valid email address." };
  const supabase = await createUserClient();
  const { error } = await supabase.from("admins").upsert({ email, name: name || null });
  if (error) return { status: "error", message: "Couldn't add that email. Try again." };
  refresh();
  return { status: "ok", message: `${email} can now sign in to the admin.` };
}

export async function removeAdmin(data: FormData) {
  const admin = await requireAdmin();
  const email = String(data.get("email") ?? "").toLowerCase();
  // You can't remove yourself, which also guarantees at least one admin remains.
  if (!email || email === admin.email) return;
  const supabase = await createUserClient();
  await supabase.from("admins").delete().eq("email", email);
  refresh();
}

/* ------------------------------------------------------------------ */
/* Application rounds                                                   */
/* ------------------------------------------------------------------ */

const QUESTION_TYPES = new Set(["short", "long", "email", "url", "select", "checkbox"]);

/** Cleans the question list sent by the editor. Unknown fields are dropped; ids stay stable. */
function parseQuestions(raw: string, allowPublic: boolean): Question[] | null {
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(input)) return null;
  const used = new Set<string>();
  const out: Question[] = [];
  for (const item of input.slice(0, 40)) {
    if (!item || typeof item !== "object") continue;
    const q = item as Record<string, unknown>;
    const label = String(q.label ?? "").trim().slice(0, 300);
    const type = String(q.type ?? "");
    if (!label || !QUESTION_TYPES.has(type)) continue;
    let id = String(q.id ?? "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 40);
    if (!id) id = label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 32) || "question";
    while (used.has(id)) id = `${id}_2`;
    used.add(id);
    const options =
      type === "select"
        ? (Array.isArray(q.options) ? q.options : [])
            .map((o) => String(o).trim().slice(0, 120))
            .filter(Boolean)
            .slice(0, 20)
        : undefined;
    if (type === "select" && !options?.length) continue;
    const help = String(q.help ?? "").trim().slice(0, 400);
    out.push({
      id,
      label,
      type: type as Question["type"],
      required: Boolean(q.required),
      ...(help ? { help } : {}),
      ...(options ? { options } : {}),
      ...(allowPublic && q.public ? { public: true } : {}),
    });
  }
  return out;
}

function refreshPublicApplications() {
  updateTag(ROUNDS_TAG);
  updateTag(CANDIDATES_TAG);
}

export async function createRound(data: FormData) {
  await requireAdmin();
  const kind = String(data.get("kind") ?? "");
  if (!isApplicationKind(kind)) return;
  const opensAt = String(data.get("opens_at") ?? "");
  const closesAt = String(data.get("closes_at") ?? "");
  const opens = opensAt ? fromHelsinkiInput(opensAt) : new Date().toISOString();
  const closes = closesAt ? fromHelsinkiInput(closesAt) : new Date(Date.now() + 30 * 864e5).toISOString();
  const title = String(data.get("title") ?? "").trim().slice(0, 120) || `${applicationKinds[kind].label} ${new Date(opens).getFullYear()}`;

  const supabase = await createUserClient();
  const { data: row, error } = await supabase
    .from("application_rounds")
    .insert({
      kind,
      title,
      opens_at: opens,
      closes_at: closes > opens ? closes : new Date(Date.parse(opens) + 30 * 864e5).toISOString(),
      questions: defaultQuestions[kind],
      is_published: false,
      show_candidates: false,
    })
    .select("id")
    .single();
  if (error || !row) throw new Error(`Could not create the round: ${error?.message}`);
  refreshPublicApplications();
  redirect(`/admin/applications/${row.id}?tab=settings`);
}

export type SaveRoundState = { status: "idle" | "saved" | "error"; message?: string };

export async function saveRound(_prev: SaveRoundState, data: FormData): Promise<SaveRoundState> {
  await requireAdmin();
  const id = String(data.get("id"));
  const kind = String(data.get("kind"));
  const title = String(data.get("title") ?? "").trim().slice(0, 120);
  const intro = String(data.get("intro") ?? "").trim().slice(0, 4000);
  const opens = String(data.get("opens_at") ?? "");
  const closes = String(data.get("closes_at") ?? "");
  const questions = parseQuestions(String(data.get("questions") ?? "[]"), kind === "chair");

  if (title.length < 3) return { status: "error", message: "Give the round a title." };
  if (!opens || !closes) return { status: "error", message: "Set both the opening and closing time." };
  const opensAt = fromHelsinkiInput(opens);
  const closesAt = fromHelsinkiInput(closes);
  if (closesAt <= opensAt) return { status: "error", message: "The closing time must be after the opening time." };
  if (!questions) return { status: "error", message: "The questions couldn't be read. Reload the page and try again." };

  const supabase = await createUserClient();
  const { error } = await supabase
    .from("application_rounds")
    .update({
      title,
      intro,
      opens_at: opensAt,
      closes_at: closesAt,
      questions,
      is_published: data.get("is_published") === "on",
      show_candidates: kind === "chair" && data.get("show_candidates") === "on",
    })
    .eq("id", id);
  if (error) return { status: "error", message: `Couldn't save: ${error.message}` };
  refreshPublicApplications();
  refresh();
  return { status: "saved", message: "Saved." };
}

export async function deleteRound(data: FormData) {
  await requireAdmin();
  const supabase = await createUserClient();
  await supabase.from("application_rounds").delete().eq("id", String(data.get("id")));
  refreshPublicApplications();
  redirect("/admin/applications");
}

export async function setApplicationStatus(data: FormData) {
  await requireAdmin();
  const status = String(data.get("status"));
  if (!(applicationStatuses as readonly string[]).includes(status)) return;
  const supabase = await createUserClient();
  await supabase.from("applications").update({ status }).eq("id", String(data.get("id")));
  updateTag(CANDIDATES_TAG);
  refresh();
}

export async function saveApplicationNotes(data: FormData) {
  await requireAdmin();
  const notes = String(data.get("notes") ?? "").trim().slice(0, 4000);
  const supabase = await createUserClient();
  await supabase.from("applications").update({ board_notes: notes || null }).eq("id", String(data.get("id")));
  refresh();
}

/** Show or hide a consenting chair candidate on the public candidates page. */
export async function setApplicationPublic(data: FormData) {
  await requireAdmin();
  const supabase = await createUserClient();
  await supabase
    .from("applications")
    .update({ is_public: data.get("public") === "1" })
    .eq("id", String(data.get("id")))
    .eq("publish_consent", true);
  updateTag(CANDIDATES_TAG);
  refresh();
}

export async function deleteApplication(data: FormData) {
  await requireAdmin();
  const supabase = await createUserClient();
  await supabase.from("applications").delete().eq("id", String(data.get("id")));
  updateTag(CANDIDATES_TAG);
  refresh();
}
