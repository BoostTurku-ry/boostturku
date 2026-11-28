import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ContactIcons } from "@/components/ui/ContactIcons";
import { Container } from "@/components/ui/Container";
import { PORTRAIT_FOCUS } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { board, boardEmail, director } from "@/content/about";
import type { Person } from "@/content/types";

export function TeamSection() {
  return (
    <section className="border-t border-line bg-surface py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title="Board 2026"
          intro="Boost is run by a student board elected each year at our fall association meeting, together with our executive director and head coach."
          action={
            <a
              href={`mailto:${boardEmail}`}
              className="inline-flex h-10 items-center rounded-sm border border-ink/20 px-5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Email the board · {boardEmail}
            </a>
          }
        />

        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {/* Director first, highlighted */}
          <li className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Reveal y={14}>
              <PersonCard person={director} highlight />
            </Reveal>
          </li>
          {board.map((person, i) => (
            <li key={person.name}>
              <Reveal delay={(i % 4) * 0.06} y={14}>
                <PersonCard person={person} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function PersonCard({ person, highlight = false }: { person: Person; highlight?: boolean }) {
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-line">
        {person.photo && (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            style={{ objectPosition: person.focus ?? PORTRAIT_FOCUS }}
            className="object-cover grayscale-[20%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        )}
        {highlight && (
          <span className="meta-label absolute top-3 left-3 rounded-sm bg-boost px-3 py-1.5 text-white">Staff</span>
        )}
      </div>
      {/* Name and role on the left, contact icons in the opposite corner. */}
      <figcaption className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-ink">{person.name}</p>
          <p className="meta-label mt-1 text-ink-muted">{person.role}</p>
        </div>
        <ContactIcons name={person.name} email={person.email} linkedin={person.linkedin} className="shrink-0" />
      </figcaption>
    </figure>
  );
}
