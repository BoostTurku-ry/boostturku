import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { board, boardEmail, director } from "@/content/about";
import type { Person } from "@/content/types";

export function TeamSection() {
  return (
    <section className="border-t border-line bg-surface py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          index={2}
          eyebrow="The team"
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
            className="object-cover grayscale-[20%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        )}
        {highlight && (
          <span className="meta-label absolute top-3 left-3 rounded-sm bg-boost px-3 py-1.5 text-white">Staff</span>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-semibold text-ink">{person.name}</p>
        <p className="meta-label mt-1 text-ink-muted">{person.role}</p>
        {(person.email || person.linkedin) && (
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {person.email && (
              <a href={`mailto:${person.email}`} className="text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                {person.email}
              </a>
            )}
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="meta-label text-ink-muted transition-colors hover:text-ink"
              >
                LinkedIn ↗
              </a>
            )}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
