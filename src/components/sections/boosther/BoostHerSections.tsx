import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { EventCard } from "@/components/sections/shared/EventCard";
import { PhotoMosaic } from "@/components/sections/shared/PhotoMosaic";
import { ButtonLink } from "@/components/ui/Button";
import { ContactIcons } from "@/components/ui/ContactIcons";
import { Container } from "@/components/ui/Container";
import { Photo, PORTRAIT_FOCUS } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  boostHer,
  boostHerGallery,
  boostHerHeroPhotos,
  boostHerMission,
  boostHerTeam,
  boostHerWhy,
} from "@/content/boosther";
import { site } from "@/content/site";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";
import { cn } from "@/lib/cn";

/**
 * BoostHer's signature: a word set in italic serif, like the script "Her" in the logo.
 * Navy on light backgrounds, pink on navy.
 */
function Accent({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "pink" }) {
  return (
    <span
      className={cn(
        "font-serif text-[1.08em] font-normal tracking-[-0.01em] italic",
        tone === "navy" ? "text-her-ink" : "text-her",
      )}
    >
      {children}
    </span>
  );
}

/** Splits a title so its last words can take the accent. */
function withAccent(title: string, accent: string, tone?: "navy" | "pink") {
  const at = title.lastIndexOf(accent);
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <Accent tone={tone}>{accent}</Accent>
      {title.slice(at + accent.length)}
    </>
  );
}

/** Pink header with the title beside three arch-framed photos. */
export function BoostHerHero() {
  // Arch heights step down from the middle; focus keeps faces inside the narrow frames.
  const arches = [
    { photo: boostHerHeroPhotos[0], shape: "aspect-[3/4.4]", delay: 0.1 },
    { photo: boostHerHeroPhotos[1], shape: "aspect-[3/5.2]", delay: 0 },
    { photo: boostHerHeroPhotos[2], shape: "aspect-[3/4]", delay: 0.2 },
  ];
  return (
    <section className="overflow-hidden bg-her-soft pt-32 pb-14 sm:pt-36 sm:pb-20">
      <Container size="wide" className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h1 className="heading-display text-balance text-[clamp(2.75rem,5.2vw,5rem)] leading-[1.02] text-ink">
            {withAccent(boostHer.title, boostHer.accent)}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">{boostHer.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#events" size="lg" arrow>
              BoostHer events
            </ButtonLink>
            <ButtonLink href={boostHer.instagram} size="lg" variant="outline">
              Follow on Instagram
            </ButtonLink>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          {/* A flat pink disc behind the arches, like a low sun. */}
          <span aria-hidden className="absolute top-1/2 left-1/2 aspect-square w-[66%] -translate-1/2 rounded-full bg-her" />
          <div className="relative mx-auto flex max-w-[38rem] items-end gap-3 sm:gap-4">
            {arches.map(({ photo, shape, delay }) => (
              <Reveal key={photo.src} delay={delay} y={18} className="flex-1">
                <Photo
                  photo={photo}
                  preload
                  className={cn(shape, "rounded-t-full rounded-b-3xl transition-transform duration-500 ease-out hover:-translate-y-2")}
                  sizes="(min-width: 1024px) 15vw, 30vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** The figures behind BoostHer: the headline share drawn as dots, the rest as a list. */
export function BoostHerWhy() {
  const [lead, ...rest] = boostHerWhy;
  const share = parseInt(lead.value, 10);
  return (
    <section className="py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title={<>Why it <Accent>matters</Accent></>}
          intro="Diverse founding teams build stronger companies, yet most startups in Finland are still founded by men."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-10">
          <Reveal y={14} className="rounded-3xl bg-her-soft p-8 sm:p-10 lg:col-span-5">
            <p className="heading-display text-[clamp(4.5rem,9vw,7rem)] leading-none text-boost">{lead.value}</p>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-ink">{lead.label}</p>
            <p className="meta-label mt-3 text-ink-muted">{lead.source}</p>
            {/* One dot per hundred startups; the red ones were founded by women. */}
            <div aria-hidden className="mt-8 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5">
              {Array.from({ length: 100 }, (_, i) => (
                <span key={i} className={cn("aspect-square rounded-full", i < share ? "bg-boost" : "bg-her")} />
              ))}
            </div>
          </Reveal>

          <ul className="border-t border-line lg:col-span-7">
            {rest.map((item, i) => (
              <li key={item.value} className="border-b border-line">
                <Reveal delay={0.06 * (i + 1)} y={14} className="grid gap-3 py-7 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-8">
                  <p className="font-serif text-6xl leading-none text-her-ink italic">{item.value}</p>
                  <div>
                    <p className="text-lg leading-relaxed text-ink">{item.label}</p>
                    <p className="meta-label mt-2 text-ink-muted">{item.source}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Navy band: the vision as a large quote, with about and mission beneath. */
export function BoostHerMission() {
  const vision = boostHerMission.find((m) => m.title === "Vision");
  const others = boostHerMission.filter((m) => m !== vision);
  return (
    <section data-header-dark className="bg-her-night py-14 text-white sm:py-20">
      <Container size="wide">
        {vision && (
          <figure>
            <p className="meta-label text-her">Our vision</p>
            <blockquote className="mt-6 max-w-5xl font-serif text-[clamp(2.1rem,4.4vw,3.9rem)] leading-[1.1] text-balance italic">
              “{vision.body}”
            </blockquote>
          </figure>
        )}
        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2 md:gap-16">
          {others.map((item) => (
            <div key={item.title}>
              <p className="meta-label text-her">{item.title}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Upcoming BoostHer events from lu.ma, and the most recent past ones. */
export function BoostHerEvents({ upcoming, past }: { upcoming: LumaEvent[]; past: LumaEvent[] }) {
  return (
    <section id="events" className="scroll-mt-24 py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title="BoostHer events"
          intro="Workshops, brunches, founder nights and excursions. Free, and open to everyone who supports diversity in startups."
          action={
            <ButtonLink href={site.links.luma} variant="outline" arrow>
              Boost calendar on lu.ma
            </ButtonLink>
          }
        />
        {/* With one or two upcoming events, the recent list sits beside them instead of leaving the row half empty. */}
        <div className={cn("mt-12 grid gap-10", upcoming.length > 0 && upcoming.length < 3 && past.length > 0 && "lg:grid-cols-12")}>
          {upcoming.length > 0 ? (
            <div
              className={cn(
                "grid gap-5",
                upcoming.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : upcoming.length === 2 ? "sm:grid-cols-2 lg:col-span-8" : "lg:col-span-4",
              )}
            >
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="max-w-xl text-ink-soft">
              No BoostHer events are scheduled right now. Follow{" "}
              <a href={boostHer.instagram} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                @boostherturku
              </a>{" "}
              or subscribe to the Boost calendar to hear about the next one.
            </p>
          )}
          {past.length > 0 && (
            <div className={cn(upcoming.length === 1 ? "lg:col-span-8" : upcoming.length === 2 ? "lg:col-span-4" : "")}>
              <p className="meta-label text-ink-muted">Recently</p>
              <ul className="mt-4 border-t border-line">
                {past.map((event) => {
                  const date = formatDateTime(event.start);
                  return (
                    <li key={event.id} className="border-b border-line">
                      <a href={event.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline gap-5 py-4">
                        <span className="meta-label w-24 shrink-0 text-ink-muted">
                          {date.day} {date.month} {date.year}
                        </span>
                        <span className="font-medium text-ink transition-colors group-hover:text-her-ink">{event.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Photos from past BoostHer events, straight after the event list. */
export function BoostHerGallery() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container size="wide">
        <PhotoMosaic photos={boostHerGallery} />
      </Container>
    </section>
  );
}

/** The BoostHer team as round portraits on pink. */
export function BoostHerTeam() {
  return (
    <section className="bg-her-soft py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title={<>The people behind <Accent>BoostHer</Accent></>}
          intro="The team that plans BoostHer's workshops, brunches and founder nights."
        />
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {boostHerTeam.map((person, i) => (
            <li key={person.name}>
              <Reveal delay={(i % 6) * 0.05} y={14} className="group">
                <div className="relative aspect-square w-full overflow-hidden rounded-full bg-her ring-0 ring-her transition-[box-shadow] duration-300 group-hover:ring-8">
                  {person.photo && (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(min-width: 1024px) 12vw, (min-width: 640px) 26vw, 42vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: person.focus ?? PORTRAIT_FOCUS }}
                    />
                  )}
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{person.name}</p>
                    <p className="meta-label mt-1 text-ink-muted">{person.role}</p>
                  </div>
                  <ContactIcons name={person.name} email={person.email} linkedin={person.linkedin} className="shrink-0" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Collaboration call to action on navy. */
export function BoostHerContact() {
  return (
    <section className="px-3 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-her-night px-6 py-14 text-white sm:px-12 lg:grid-cols-12 lg:items-end lg:px-16 lg:py-20">
        <div className="lg:col-span-7">
          <h2 className="heading text-4xl sm:text-5xl">
            Let&apos;s build something <Accent tone="pink">together.</Accent>
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-white/75">
            Want to host a workshop, partner on an event or support BoostHer? We&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <ButtonLink href={`mailto:${boostHer.email}`} size="lg" arrow>
            {boostHer.email}
          </ButtonLink>
          <ButtonLink href={boostHer.instagram} size="lg" variant="ghostLight">
            Instagram
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
