import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { applicationKinds, type ApplicationKind, type Question } from "@/content/applications";
import { hasDatabase } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/server";

export type Round = {
  id: string;
  kind: ApplicationKind;
  title: string;
  intro: string;
  opens_at: string;
  closes_at: string;
  is_published: boolean;
  questions: Question[];
  show_candidates: boolean;
};

export type RoundState = "open" | "upcoming" | "closed";

/** Cache tags. Admin actions call updateTag() with these so changes show immediately. */
export const ROUNDS_TAG = "application-rounds";
export const CANDIDATES_TAG = "application-candidates";

const ROUND_FIELDS = "id, kind, title, intro, opens_at, closes_at, is_published, questions, show_candidates";

/** Published rounds for one kind, newest first. Cached; the open/closed state is decided at request time. */
export async function getPublishedRounds(kind: ApplicationKind): Promise<Round[]> {
  "use cache";
  cacheTag(ROUNDS_TAG);
  cacheLife("hours");
  if (!hasDatabase()) return [];
  const { data, error } = await createServiceClient()
    .from("application_rounds")
    .select(ROUND_FIELDS)
    .eq("kind", kind)
    .eq("is_published", true)
    .order("opens_at", { ascending: false })
    .limit(10)
    .returns<Round[]>();
  if (error) console.error("[applications] rounds", error.message);
  return data ?? [];
}

export function roundState(round: Round, now = Date.now()): RoundState {
  if (now < Date.parse(round.opens_at)) return "upcoming";
  return now < Date.parse(round.closes_at) ? "open" : "closed";
}

/** The round to show for a kind: the open one, else the next upcoming, else the most recent. */
export function pickRound(rounds: Round[], now = Date.now()) {
  const open = rounds.find((r) => roundState(r, now) === "open");
  if (open) return { round: open, state: "open" as const };
  const upcoming = rounds.filter((r) => roundState(r, now) === "upcoming").sort((a, b) => a.opens_at.localeCompare(b.opens_at))[0];
  if (upcoming) return { round: upcoming, state: "upcoming" as const };
  return rounds[0] ? { round: rounds[0], state: "closed" as const } : null;
}

export type Candidate = { id: string; name: string; answers: { label: string; value: string; type: Question["type"] }[] };

/** Chair candidates the board approved for the public page, with only their public answers. */
export async function getCandidates(round: Round): Promise<Candidate[]> {
  "use cache";
  cacheTag(CANDIDATES_TAG);
  cacheLife("hours");
  if (!hasDatabase() || !round.show_candidates) return [];
  const { data } = await createServiceClient()
    .from("applications")
    .select("id, name, answers")
    .eq("round_id", round.id)
    .eq("is_public", true)
    .eq("publish_consent", true)
    .order("created_at")
    .returns<{ id: string; name: string; answers: Record<string, unknown> }[]>();
  const publicQuestions = round.questions.filter((q) => q.public);
  return (data ?? []).map((a) => ({
    id: a.id,
    name: a.name,
    answers: publicQuestions
      .map((q) => ({ label: q.label, type: q.type, value: typeof a.answers[q.id] === "string" ? (a.answers[q.id] as string) : "" }))
      .filter((x) => x.value),
  }));
}

export type KindStatus = { state: RoundState; closes_at: string; opens_at: string } | null;

/**
 * Where each kind stands right now (for the header's Apply menu). Rounds are
 * cached; the open/closed state is worked out per request.
 */
export async function getApplyStatuses(): Promise<Record<ApplicationKind, KindStatus>> {
  await connection();
  const kinds = Object.keys(applicationKinds) as ApplicationKind[];
  const rounds = await Promise.all(kinds.map((k) => getPublishedRounds(k)));
  return Object.fromEntries(
    kinds.map((k, i) => {
      const picked = pickRound(rounds[i]);
      return [k, picked && picked.state !== "closed" ? { state: picked.state, closes_at: picked.round.closes_at, opens_at: picked.round.opens_at } : null];
    }),
  ) as Record<ApplicationKind, KindStatus>;
}
