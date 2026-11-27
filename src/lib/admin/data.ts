import "server-only";
import type { ApplicationStatus } from "@/content/applications";
import { requireAdmin } from "@/lib/admin/auth";
import type { Round } from "@/lib/applications";
import { createUserClient } from "@/lib/supabase/server";

export type Member = {
  id: string;
  name: string;
  email: string;
  school: string;
  interests: string[];
  joined_at: string;
  left_at: string | null;
  notes: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  status: "new" | "handled";
  created_at: string;
  handled_at: string | null;
};

export type MemberFilters = { q?: string; school?: string; status?: "active" | "left" | "all" };

const MEMBER_FIELDS = "id, name, email, school, interests, joined_at, left_at, notes";

/** Every function here checks the session first, then queries as that board member (RLS applies). */
async function adminClient() {
  await requireAdmin();
  return createUserClient();
}

export async function getOverview() {
  const supabase = await adminClient();
  const monthAgo = new Date(Date.now() - 30 * 864e5).toISOString();
  const [active, recentJoins, newMessages, latestMembers, latestMessages, newApplications] = await Promise.all([
    supabase.from("members").select("id", { count: "exact", head: true }).is("left_at", null),
    supabase.from("members").select("id", { count: "exact", head: true }).gte("joined_at", monthAgo),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("members").select(MEMBER_FIELDS).order("joined_at", { ascending: false }).limit(5).returns<Member[]>(),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5).returns<ContactMessage[]>(),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);
  return {
    activeMembers: active.count ?? 0,
    joinedLast30Days: recentJoins.count ?? 0,
    newMessages: newMessages.count ?? 0,
    latestMembers: latestMembers.data ?? [],
    latestMessages: latestMessages.data ?? [],
    newApplications: newApplications.count ?? 0,
  };
}

export async function listMembers({ q, school, status = "active" }: MemberFilters) {
  const supabase = await adminClient();
  let query = supabase.from("members").select(MEMBER_FIELDS).order("joined_at", { ascending: false });
  if (status === "active") query = query.is("left_at", null);
  if (status === "left") query = query.not("left_at", "is", null);
  if (school) query = query.eq("school", school);
  if (q) {
    const term = q.replace(/[%,()]/g, " ").trim();
    if (term) query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%`);
  }
  const { data, error } = await query.returns<Member[]>();
  if (error) throw new Error(`Could not load members: ${error.message}`);
  return data ?? [];
}

export async function listMessages(status: "new" | "handled" | "all" = "new") {
  const supabase = await adminClient();
  let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  if (status !== "all") query = query.eq("status", status);
  const { data, error } = await query.returns<ContactMessage[]>();
  if (error) throw new Error(`Could not load messages: ${error.message}`);
  return data ?? [];
}

export async function listAdmins() {
  const supabase = await adminClient();
  const { data, error } = await supabase
    .from("admins")
    .select("email, name, added_at")
    .order("added_at")
    .returns<{ email: string; name: string | null; added_at: string }[]>();
  if (error) throw new Error(`Could not load board access: ${error.message}`);
  return data ?? [];
}

/** Member register as CSV (same filters as the list). */
export async function membersCsv(filters: MemberFilters) {
  return toCsv(await listMembers(filters));
}

export function toCsv(members: Member[]) {
  const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = members.map((m) =>
    [m.name, m.email, m.school, m.interests.join("; "), m.joined_at.slice(0, 10), m.left_at?.slice(0, 10) ?? "", m.notes ?? ""]
      .map(cell)
      .join(","),
  );
  return ["Name,Email,School,Interests,Joined,Left,Notes", ...rows].join("\r\n");
}

/* ------------------------------------------------------------------ */
/* Application rounds                                                   */
/* ------------------------------------------------------------------ */

export type AdminRound = Round & { created_at: string; application_count: number; new_count: number };

export type Application = {
  id: string;
  round_id: string;
  name: string;
  email: string;
  answers: Record<string, string | boolean>;
  status: ApplicationStatus;
  board_notes: string | null;
  publish_consent: boolean;
  is_public: boolean;
  created_at: string;
};

const ROUND_FIELDS = "id, kind, title, intro, opens_at, closes_at, is_published, questions, show_candidates, created_at";

export async function listRounds(): Promise<AdminRound[]> {
  const supabase = await adminClient();
  const [{ data: rounds, error }, { data: apps }] = await Promise.all([
    supabase.from("application_rounds").select(ROUND_FIELDS).order("opens_at", { ascending: false }).returns<(Round & { created_at: string })[]>(),
    supabase.from("applications").select("round_id, status").returns<{ round_id: string; status: ApplicationStatus }[]>(),
  ]);
  if (error) throw new Error(`Could not load application rounds: ${error.message}`);
  return (rounds ?? []).map((r) => {
    const mine = (apps ?? []).filter((a) => a.round_id === r.id);
    return { ...r, application_count: mine.length, new_count: mine.filter((a) => a.status === "new").length };
  });
}

export async function getAdminRound(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await adminClient();
  const { data } = await supabase.from("application_rounds").select(ROUND_FIELDS).eq("id", id).maybeSingle<Round & { created_at: string }>();
  return data;
}

export async function listApplications(roundId: string, status?: ApplicationStatus) {
  const supabase = await adminClient();
  let query = supabase
    .from("applications")
    .select("id, round_id, name, email, answers, status, board_notes, publish_consent, is_public, created_at")
    .eq("round_id", roundId)
    .order("created_at", { ascending: true });
  if (status) query = query.eq("status", status);
  const { data, error } = await query.returns<Application[]>();
  if (error) throw new Error(`Could not load applications: ${error.message}`);
  return data ?? [];
}

export function applicationsCsv(round: Round, applications: Application[]) {
  const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = ["Name", "Email", "Status", "Applied", ...round.questions.map((q) => q.label), "Board notes"];
  const rows = applications.map((a) =>
    [a.name, a.email, a.status, a.created_at.slice(0, 10), ...round.questions.map((q) => (a.answers[q.id] === true ? "Yes" : (a.answers[q.id] ?? ""))), a.board_notes ?? ""]
      .map(cell)
      .join(","),
  );
  return [header.map(cell).join(","), ...rows].join("\r\n");
}
