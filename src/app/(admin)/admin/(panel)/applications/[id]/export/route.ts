import { type NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { applicationsCsv, getAdminRound, listApplications } from "@/lib/admin/data";

/** Downloads one round's applications as CSV, one column per question. Board only. */
export async function GET(request: NextRequest, { params }: RouteContext<"/admin/applications/[id]/export">) {
  if (!(await getAdmin())) return NextResponse.redirect(new URL("/admin/login", request.url));
  const { id } = await params;
  const round = await getAdminRound(id);
  if (!round) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const slug = round.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return new NextResponse(`﻿${applicationsCsv(round, await listApplications(round.id))}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug || "applications"}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
