const TZ = "Europe/Helsinki";

/** Format an ISO date (YYYY-MM-DD) into the pieces used on event cards. */
export function formatEventDate(isoDate: string) {
  // Noon UTC avoids the date shifting across time zones.
  const d = new Date(`${isoDate}T12:00:00Z`);
  const part = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(d);
  return {
    day: part({ day: "numeric" }),
    month: part({ month: "short" }),
    weekday: part({ weekday: "short" }),
    short: part({ day: "numeric", month: "short" }),
  };
}
