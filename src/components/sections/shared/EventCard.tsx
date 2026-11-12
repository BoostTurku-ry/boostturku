"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { useTheme } from "@/hooks/useTheme";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";

/** Upcoming-event card with a cursor-following Boost-red spotlight. */
export function EventCard({ event }: { event: LumaEvent }) {
  const theme = useTheme();
  const date = formatDateTime(event.start);

  return (
    <a href={event.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <SpotlightCard
        theme={theme}
        spotlightColor="#c52127"
        intensity={theme === "dark" ? 0.18 : 0.12}
        spotlightSize={320}
        borderGlow={0.8}
        className="flex h-full flex-col border border-line"
        style={{ "--spotlight-card-surface": "var(--color-surface)" } as React.CSSProperties}
      >
        {/* soft brand wash in the corner */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_0%_0%,var(--color-boost-soft),transparent_60%)]"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="heading-display text-6xl leading-none text-boost">{date.day}</span>
            <span className="label-mono text-ink-muted">
              {date.month}
              <br />
              {date.weekday}
            </span>
          </div>
          {event.series && (
            <span className="label-mono rounded-full bg-boost/10 px-3 py-1.5 text-boost">{event.series}</span>
          )}
        </div>

        <h3 className="heading mt-10 text-2xl text-ink sm:text-[1.7rem]">{event.title}</h3>
        {event.speaker && <p className="mt-2 text-ink-soft">{event.speaker}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="label-mono text-ink-muted">
            {date.time}
            {event.venue && ` · ${event.venue}`}
          </span>
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-paper transition-all duration-300 group-hover:bg-boost group-hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
          </span>
        </div>
      </SpotlightCard>
    </a>
  );
}
