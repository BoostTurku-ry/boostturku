import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";

/** Upcoming-event card: flat surface, hairline border, lifts slightly on hover. */
export function EventCard({ event }: { event: LumaEvent }) {
  const date = formatDateTime(event.start);

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_40px_-24px_rgb(37_3_26/0.35)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="heading-display text-6xl leading-none text-boost">{date.day}</span>
          <span className="meta-label text-ink-muted">
            {date.month}
            <br />
            {date.weekday}
          </span>
        </div>
        {event.series && <span className="meta-label rounded-sm bg-boost/10 px-3 py-1.5 text-boost">{event.series}</span>}
      </div>

      <h3 className="heading mt-10 text-2xl text-ink sm:text-[1.7rem]">{event.title}</h3>
      {event.speaker && <p className="mt-2 text-ink-soft">{event.speaker}</p>}

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
        <span className="meta-label text-ink-muted">
          {date.time}
          {event.venue && ` · ${event.venue}`}
        </span>
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-sm bg-ink text-paper transition-colors duration-300 group-hover:bg-boost group-hover:text-white"
        >
          <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
        </span>
      </div>
    </a>
  );
}
