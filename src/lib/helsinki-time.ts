/**
 * Conversions between UTC timestamps and Helsinki wall-clock time, for
 * `<input type="datetime-local">` fields in the admin (always Finnish time,
 * whatever the browser's time zone) and for showing deadlines.
 */
const TZ = "Europe/Helsinki";

const parts = (date: Date) =>
  Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );

/** "2026-04-30T23:59" (Helsinki) for a datetime-local input. */
export function toHelsinkiInput(iso: string) {
  const p = parts(new Date(iso));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/** Helsinki wall-clock "2026-04-30T23:59" to a UTC ISO string. Handles summer time. */
export function fromHelsinkiInput(local: string) {
  const [date, time = "00:00"] = local.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  // Offset of Helsinki from UTC at that moment, then correct the guess by it.
  const p = parts(new Date(guess));
  const asIfUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return new Date(guess - (asIfUtc - guess)).toISOString();
}

const deadlineFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const shortFormat = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "numeric", month: "short" });

/** "Thu 30 April 2026, 23:59" */
export const formatDeadline = (iso: string) => deadlineFormat.format(new Date(iso));
/** "30 Apr" */
export const formatShortDate = (iso: string) => shortFormat.format(new Date(iso));
