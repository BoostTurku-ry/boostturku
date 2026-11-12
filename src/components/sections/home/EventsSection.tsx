"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredEvents, recentEvents } from "@/content/events";
import { site } from "@/content/site";
import type { BoostEvent } from "@/content/types";
import { useTheme } from "@/hooks/useTheme";
import { formatEventDate } from "@/lib/dates";

/**
 * Upcoming events as spotlight cards (glow follows the cursor) next to a
 * Boost-red "subscribe" card; recent events as a quiet pill row underneath.
 */
export function EventsSection() {
  const theme = useTheme();

  return (
    <section className="py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          index={4}
          eyebrow="Events"
          title="What's coming up"
          intro="Workshops, talks, community breakfasts and founder nights. Registration helps us plan, but everyone is welcome."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.url} event={event} theme={theme} />
          ))}

          {/* Colour block: subscribe */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-boost p-8 text-white">
            <span
              aria-hidden
              className="absolute -top-24 -right-24 size-64 rounded-full border border-white/15"
            />
            <span
              aria-hidden
              className="absolute -top-12 -right-12 size-40 rounded-full border border-white/15"
            />
            <p className="label-mono text-white/70">Never miss one</p>
            <p className="heading-display mt-6 text-6xl">60+</p>
            <p className="mt-2 max-w-[16rem] text-white/85">free events organised so far in 2026, and more every week.</p>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <ButtonLink href={site.links.luma} variant="light" arrow className="justify-between">
                Subscribe on lu.ma
              </ButtonLink>
              <ButtonLink
                href="/events"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                See the full calendar
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Recent */}
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-start lg:gap-8">
          <p className="label-mono shrink-0 text-ink-muted lg:pt-3">Recently at Boost</p>
          <ul className="flex flex-wrap gap-2">
            {recentEvents.map((event) => (
              <li key={event.url}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-line bg-surface py-2 pr-4 pl-3 text-sm text-ink-soft transition-colors hover:border-boost/40 hover:text-ink"
                >
                  <span className="label-mono text-boost">{formatEventDate(event.date).short}</span>
                  {event.title}
                  <span aria-hidden className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function EventCard({ event, theme }: { event: BoostEvent; theme: "light" | "dark" }) {
  const date = formatEventDate(event.date);
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
          <span className="label-mono rounded-full bg-boost/10 px-3 py-1.5 text-boost">{event.tag}</span>
        </div>

        <h3 className="heading mt-10 text-2xl text-ink sm:text-[1.7rem]">{event.title}</h3>
        {event.host && <p className="mt-2 text-ink-soft">{event.host}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="label-mono text-ink-muted">
            {event.time} · {event.venue}
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
