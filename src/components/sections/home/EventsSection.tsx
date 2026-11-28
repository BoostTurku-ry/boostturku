import { CalendarCard } from "@/components/sections/shared/CalendarCard";
import { NoUpcoming } from "@/components/sections/shared/NoUpcoming";
import { EventCard } from "@/components/sections/shared/EventCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";

type EventsSectionProps = {
  /** null when the lu.ma calendar couldn't be loaded. */
  upcoming: LumaEvent[] | null;
  recent: LumaEvent[];
};

/** Next two events as spotlight cards beside the calendar card; recent events underneath. */
export function EventsSection({ upcoming, recent }: EventsSectionProps) {
  const next = upcoming?.slice(0, 2) ?? [];

  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title="What's coming up"
          intro="Workshops, talks, community breakfasts and founder nights. Registration helps us plan, but everyone is welcome."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {next.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {next.length === 0 && <NoUpcoming unavailable={upcoming === null} className="lg:col-span-2" />}
          {next.length === 1 && <div className="hidden lg:block" />}
          <CalendarCard />
        </div>

        {recent.length > 0 && (
          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 lg:flex-row lg:items-start lg:gap-8">
            <p className="meta-label shrink-0 text-ink-muted lg:pt-3">Recently at Boost</p>
            <ul className="flex flex-wrap gap-2">
              {recent.slice(0, 4).map((event) => (
                <li key={event.id}>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-sm border border-line bg-surface py-2 pr-4 pl-3 text-sm text-ink-soft transition-colors hover:border-boost/40 hover:text-ink"
                  >
                    <span className="meta-label text-boost">{formatDateTime(event.start).short}</span>
                    {event.title}
                    <span aria-hidden className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
