import Image from "next/image";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { eventsHeader } from "@/content/events";
import { gallery } from "@/content/gallery";
import { site } from "@/content/site";

/** Events page header: the shared photo header, with the live upcoming count and the lu.ma link as actions. */
export function EventsHeader({ upcomingCount }: { upcomingCount: number | null }) {
  return (
    <PageHero
      title={eventsHeader.title}
      accent={eventsHeader.accent}
      intro={eventsHeader.intro}
      photos={gallery.heroes.events}
      actions={
        <>
          <ButtonLink href={site.links.luma} arrow>
            Subscribe on lu.ma
          </ButtonLink>
          <div className="flex items-center gap-3">
            <ul aria-hidden className="flex -space-x-2.5">
              {eventsHeader.faces.slice(0, 4).map((photo) => (
                <li key={photo.src} className="relative size-9 overflow-hidden rounded-full bg-line ring-2 ring-paper">
                  <Image src={photo.src} alt="" fill sizes="36px" className="object-cover" />
                </li>
              ))}
            </ul>
            <p className="text-sm leading-tight text-ink-soft">
              {upcomingCount !== null && (
                <span className="block font-medium text-ink">{upcomingCount === 1 ? "1 event coming up" : `${upcomingCount} events coming up`}</span>
              )}
              <span className="block text-ink-muted">{eventsHeader.perYear}</span>
            </p>
          </div>
        </>
      }
    />
  );
}
