import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCard } from "@/components/sections/shared/CalendarCard";
import { EventCard } from "@/components/sections/shared/EventCard";
import { NoUpcoming } from "@/components/sections/shared/NoUpcoming";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { formatDateTime } from "@/lib/dates";
import { getPastEvents, getUpcomingEvents, type LumaEvent } from "@/lib/luma";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshops, talks, founder nights and community breakfasts. Every Boost event is free and open to all.",
};

function groupByMonth(events: LumaEvent[]) {
  const groups = new Map<string, LumaEvent[]>();
  for (const event of events) {
    const key = formatDateTime(event.start).monthYear;
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }
  return [...groups.entries()];
}

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <>
      <PageHero
        eyebrow="Events"
        meta={upcoming ? `${upcoming.length} upcoming` : undefined}
        title="Come to something."
        intro="Workshops, talks, founder nights and community breakfasts throughout the year. Every event is free and open to everyone, member or not."
        actions={
          <ButtonLink href={site.links.luma} arrow>
            Subscribe on lu.ma
          </ButtonLink>
        }
      />

      {/* Upcoming */}
      <section className="pb-24 sm:pb-32">
        <Container size="wide">
          <SectionHeading index={1} eyebrow="Upcoming" title="Next on the calendar" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcoming?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {!upcoming?.length && <NoUpcoming unavailable={upcoming === null} className="md:col-span-2" />}
            <CalendarCard showCalendarLink={false} />
          </div>
        </Container>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="border-t border-line bg-surface py-24 sm:py-32">
          <Container size="wide">
            <SectionHeading
              index={2}
              eyebrow="Archive"
              title="Recently at Boost"
              intro="A look back at what the community has been up to."
              action={
                <ButtonLink href={site.links.luma} variant="outline" arrow>
                  Full archive on lu.ma
                </ButtonLink>
              }
            />

            <div className="mt-14 space-y-14">
              {groupByMonth(past).map(([month, events]) => (
                <div key={month} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <h3 className="label-mono text-ink-muted lg:col-span-2 lg:pt-5">{month}</h3>
                  <ul className="border-t border-line lg:col-span-10">
                    {events.map((event) => (
                      <PastRow key={event.id} event={event} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function PastRow({ event }: { event: LumaEvent }) {
  const date = formatDateTime(event.start);
  return (
    <li className="border-b border-line">
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[3.5rem_5.5rem_1fr_auto] sm:gap-6"
      >
        <span className="label-mono text-ink-muted">
          {date.day} {date.month}
        </span>
        <span className="relative hidden aspect-[4/3] w-[5.5rem] overflow-hidden rounded-lg bg-line sm:block">
          {event.cover && (
            <Image src={event.cover} alt="" fill sizes="88px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
        </span>
        <span className="min-w-0">
          {event.series && <span className="label-mono mr-2 text-boost">{event.series}</span>}
          <span className="font-medium text-ink group-hover:text-boost">{event.title}</span>
          <span className="mt-0.5 block text-sm text-ink-muted">
            {[event.speaker, event.venue].filter(Boolean).join(" · ")}
          </span>
        </span>
        <span className="label-mono hidden text-right text-ink-muted sm:block">
          {event.guests > 0 ? `${event.guests} went` : ""}
          <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </span>
      </a>
    </li>
  );
}
