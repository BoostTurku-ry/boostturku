import { NextResponse } from "next/server";
import { getApplyStatuses } from "@/lib/applications";

/**
 * Which application rounds are open or upcoming, for the header's Apply menu.
 * Fetched by the browser after the page loads, so the header itself stays static.
 */
export async function GET() {
  return NextResponse.json(await getApplyStatuses(), {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
