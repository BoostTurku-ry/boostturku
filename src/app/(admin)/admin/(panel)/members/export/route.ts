import { type NextRequest, NextResponse } from "next/server";
import { getAdmin } from "@/lib/admin/auth";
import { membersCsv, type MemberFilters } from "@/lib/admin/data";

/** Downloads the member register (with the current filters) as CSV. Board only. */
export async function GET(request: NextRequest) {
  if (!(await getAdmin())) return NextResponse.redirect(new URL("/admin/login", request.url));

  const p = request.nextUrl.searchParams;
  const status = p.get("status");
  const filters: MemberFilters = {
    q: p.get("q") ?? undefined,
    school: p.get("school") ?? undefined,
    status: status === "left" || status === "all" ? status : "active",
  };
  const date = new Date().toISOString().slice(0, 10);
  // Byte-order mark so Excel opens the file as UTF-8 (names with ä, ö, å).
  return new NextResponse(`﻿${await membersCsv(filters)}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="boost-members-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
