import { type NextRequest, NextResponse } from "next/server";
import { toCsv, type Member } from "@/lib/admin/data";
import { sendEmail } from "@/lib/email";
import { env, hasDatabase } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Daily maintenance, run by Vercel Cron (vercel.json):
 * 1. Keeps the free Supabase project awake (it pauses after a week without queries).
 * 2. Applies the retention periods promised in the privacy pages: contact messages,
 *    ex-members, and applications to rounds that closed are deleted 12 months later.
 * 3. On Mondays, emails a CSV backup of the member register to BACKUP_EMAIL
 *    (the free plan has no automatic database backups).
 */
export async function GET(request: NextRequest) {
  if (!env.cronSecret || request.headers.get("authorization") !== `Bearer ${env.cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasDatabase()) return NextResponse.json({ skipped: "database not configured" });

  const db = createServiceClient();
  const yearAgo = new Date(Date.now() - 365 * 864e5).toISOString();

  const { data: oldRounds } = await db.from("application_rounds").select("id").lt("closes_at", yearAgo);
  const oldRoundIds = (oldRounds ?? []).map((r) => r.id as string);

  const [messages, members, applications] = await Promise.all([
    db.from("contact_messages").delete({ count: "exact" }).lt("created_at", yearAgo),
    db.from("members").delete({ count: "exact" }).lt("left_at", yearAgo),
    oldRoundIds.length
      ? db.from("applications").delete({ count: "exact" }).in("round_id", oldRoundIds)
      : Promise.resolve({ count: 0, error: null }),
  ]);

  let backup = "not scheduled today";
  if (new Date().getUTCDay() === 1 && env.backupEmail) {
    const { data } = await db
      .from("members")
      .select("id, name, email, school, interests, joined_at, left_at, notes")
      .order("joined_at")
      .returns<Member[]>();
    const date = new Date().toISOString().slice(0, 10);
    const sent = await sendEmail({
      to: env.backupEmail,
      subject: `Member register backup ${date}`,
      paragraphs: [
        `Weekly backup of the Boost Turku ry member register: ${data?.length ?? 0} people.`,
        "Keep this file somewhere only the board can reach, and delete older copies.",
      ],
      attachments: [{ filename: `boost-members-${date}.csv`, content: toCsv(data ?? []) }],
    });
    backup = sent ? "sent" : "failed";
  }

  return NextResponse.json({
    deletedMessages: messages.count ?? 0,
    deletedFormerMembers: members.count ?? 0,
    deletedApplications: applications.count ?? 0,
    backup,
    errors: [messages.error?.message, members.error?.message, applications.error?.message].filter(Boolean),
  });
}
