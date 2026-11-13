import { cacheLife } from "next/cache";
import snapshot from "@/content/events-snapshot.json";

/** Boost's public lu.ma calendar (https://lu.ma/boost). */
const CALENDAR_ID = "cal-DFTEOW6z93AOspN";
const API = "https://api.lu.ma/calendar/get-items";
const USER_AGENT = "Mozilla/5.0 (compatible; BoostTurkuSite/1.0; +https://www.boostturku.com)";

export type LumaEvent = {
  id: string;
  /** Title with any "Series:" prefix and "(speaker)" suffix removed. */
  title: string;
  /** e.g. "Pre-Incubator", taken from a "Series: …" title prefix. */
  series?: string;
  /** e.g. "Lauri Koittola, Boost Head Coach", taken from a trailing "(…)". */
  speaker?: string;
  start: string;
  end?: string;
  url: string;
  cover?: string;
  venue?: string;
  guests: number;
};

type LumaEntry = {
  guest_count?: number;
  event: {
    api_id: string;
    name: string;
    start_at: string;
    end_at?: string;
    url: string;
    cover_url?: string;
    geo_address_info?: { address?: string; full_address?: string } | null;
  };
};

function splitTitle(name: string) {
  let title = name.trim();
  let series: string | undefined;
  let speaker: string | undefined;
  const prefix = title.match(/^([^:]{3,30}):\s+(.+)$/);
  if (prefix) {
    series = prefix[1].trim();
    title = prefix[2];
  }
  const suffix = title.match(/^(.+?)\s*\(([^()]{3,})\)$/);
  if (suffix) {
    title = suffix[1];
    speaker = suffix[2];
  }
  return { title, series, speaker };
}

function toEvent(entry: LumaEntry): LumaEvent {
  const e = entry.event;
  const venue = e.geo_address_info?.address?.split(",")[0]?.trim();
  return {
    id: e.api_id,
    ...splitTitle(e.name),
    start: e.start_at,
    end: e.end_at,
    url: `https://lu.ma/${e.url}`,
    cover: e.cover_url,
    venue: venue || undefined,
    guests: entry.guest_count ?? 0,
  };
}

/** Returns null when lu.ma can't be reached (network error, rate limit, API change). */
async function fetchPeriod(period: "future" | "past", limit: number): Promise<LumaEvent[] | null> {
  const url = `${API}?calendar_api_id=${CALENDAR_ID}&period=${period}&pagination_limit=${limit}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      // lu.ma answers 429 to requests without a User-Agent (Node's fetch sends none it accepts).
      const res = await fetch(url, { headers: { accept: "application/json", "user-agent": USER_AGENT } });
      if (res.status === 429 && attempt === 0) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      if (!res.ok) return null;
      const data = (await res.json()) as { entries?: LumaEntry[] };
      return (data.entries ?? []).map(toEvent);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Upcoming events, soonest first, or null if lu.ma couldn't be reached.
 * There's no snapshot fallback: stale "upcoming" events would be worse than none.
 */
export async function getUpcomingEvents(): Promise<LumaEvent[] | null> {
  "use cache";
  const events = await fetchPeriod("future", 20);
  // A failed fetch is only cached briefly so the next visitor triggers a retry.
  if (events) cacheLife("hours");
  else cacheLife("minutes");
  return events?.sort((a, b) => a.start.localeCompare(b.start)) ?? null;
}

const PAST_LIMIT = 36;

/** The most recent past events (up to 36), newest first. Falls back to a bundled snapshot. */
export async function getPastEvents(): Promise<LumaEvent[]> {
  "use cache";
  const live = await fetchPeriod("past", PAST_LIMIT);
  if (live) cacheLife("hours");
  else cacheLife("minutes");
  const events = live ?? (snapshot.past as LumaEntry[]).map(toEvent);
  return events.sort((a, b) => b.start.localeCompare(a.start));
}
