const TZ = "Europe/Helsinki";

function parts(d: Date) {
  const part = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...opts }).format(d);
  return {
    day: part({ day: "numeric" }),
    month: part({ month: "short" }),
    weekday: part({ weekday: "short" }),
    year: part({ year: "numeric" }),
    short: part({ day: "numeric", month: "short" }),
    long: part({ day: "numeric", month: "long", year: "numeric" }),
    time: part({ hour: "2-digit", minute: "2-digit", hour12: false }),
    monthYear: part({ month: "long", year: "numeric" }),
  };
}

/** Format an ISO date (YYYY-MM-DD) into the pieces used on cards. */
export function formatEventDate(isoDate: string) {
  // Noon UTC avoids the date shifting across time zones.
  return parts(new Date(`${isoDate}T12:00:00Z`));
}

/** Format a full ISO timestamp (e.g. from lu.ma) in Turku time. */
export function formatDateTime(isoTimestamp: string) {
  return parts(new Date(isoTimestamp));
}
