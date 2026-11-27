import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { eventsHeader } from "@/content/events";
import { site } from "@/content/site";

/**
 * Compact header for the events page: title and intro on the left; a stack of
 * community photos, the live upcoming count and the lu.ma link on the right.
 * Kept short so the event cards start high on the page.
 */
export function EventsHeader({ upcomingCount }: { upcomingCount: number | null }) {
  return (
    <section className="pt-28 pb-14 sm:pt-32 sm:pb-16">
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal y={12} className="max-w-2xl">
            <p className="meta-label flex items-center gap-2.5 text-ink-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-boost" />
              {eventsHeader.eyebrow}
            </p>
            <h1 className="heading mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)]">{eventsHeader.title}</h1>
            <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">{eventsHeader.intro}</p>
          </Reveal>

          <Reveal delay={0.1} y={12} className="flex flex-col gap-5 sm:flex-row sm:items-center lg:shrink-0">
            <div className="flex items-center gap-4">
              <ul aria-hidden className="flex -space-x-3">
                {eventsHeader.faces.map((photo) => (
                  <li key={photo.src} className="relative size-11 overflow-hidden rounded-full bg-line ring-2 ring-paper">
                    <Image src={photo.src} alt="" fill sizes="44px" preload className="object-cover" />
                  </li>
                ))}
              </ul>
              <div className="leading-tight">
                {upcomingCount !== null && (
                  <p className="flex items-center gap-2 text-sm font-medium text-ink">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-boost opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-boost" />
                    </span>
                    {upcomingCount === 1 ? "1 event coming up" : `${upcomingCount} events coming up`}
                  </p>
                )}
                <p className="mt-1 text-sm text-ink-muted">{eventsHeader.perYear}</p>
              </div>
            </div>
            <ButtonLink href={site.links.luma} arrow>
              Subscribe on lu.ma
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
