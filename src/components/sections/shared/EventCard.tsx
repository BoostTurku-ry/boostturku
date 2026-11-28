import Image from "next/image";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { Tilt } from "@/components/motion/Tilt";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";

/**
 * Upcoming event as a collectible Boost card: burgundy card stock with an inner
 * frame, the event art in a window, the date as a "player number" badge and a
 * stats row along the bottom. It tips towards the cursor on hover.
 */
export function EventCard({ event }: { event: LumaEvent }) {
  const date = formatDateTime(event.start);

  return (
    <a href={event.url} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-[1.4rem] focus-visible:outline-offset-4">
      <Tilt className="h-full">
        <article className="flex h-full flex-col rounded-[1.4rem] bg-night p-2 text-white shadow-[0_22px_45px_-28px_rgb(37_3_26/0.75)]">
          <div className="flex flex-1 flex-col rounded-[1.05rem] border border-white/15 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <BoostLogo title="" className="h-[18px] text-white" />
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-md bg-white/10 text-sm transition-colors duration-300 group-hover:bg-boost"
              >
                <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
              </span>
            </div>

            {/* Event art, with the date badge overlapping its lower edge */}
            <div className="relative mt-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-boost">
                {event.cover ? (
                  <Image
                    src={event.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <BoostLogo title="" className="absolute inset-0 m-auto h-10 text-white/90" />
                )}
                {event.series && (
                  <span className="meta-label absolute top-3 left-3 rounded-sm bg-white px-2.5 py-1 text-burgundy">{event.series}</span>
                )}
              </div>
              <div className="absolute -bottom-7 left-4 grid size-[4.5rem] place-items-center rounded-full bg-boost text-center ring-[6px] ring-night">
                <span className="leading-none">
                  <span className="heading-display block text-[1.85rem]">{date.day}</span>
                  <span className="meta-label mt-0.5 block text-[10px] text-white/85">{date.month}</span>
                </span>
              </div>
            </div>

            <h3 className="heading mt-11 text-[1.5rem] leading-tight sm:text-[1.6rem]">{event.title}</h3>
            {event.speaker && <p className="mt-1.5 text-white/70">{event.speaker}</p>}
            {event.venue && <p className="meta-label mt-2.5 text-white/55">{event.venue}</p>}

            <div className="mt-auto pt-6">
              <dl className="grid grid-cols-3 border-t border-white/15 pt-4 text-center">
                <div>
                  <dt className="meta-label text-white/50">Day</dt>
                  <dd className="mt-1 font-semibold">{date.weekday}</dd>
                </div>
                <div className="border-x border-white/15">
                  <dt className="meta-label text-white/50">Time</dt>
                  <dd className="mt-1 font-semibold tabular-nums">{date.time}</dd>
                </div>
                <div>
                  <dt className="meta-label text-white/50">{event.guests > 0 ? "Going" : "Entry"}</dt>
                  <dd className="mt-1 font-semibold tabular-nums">{event.guests > 0 ? event.guests : "Free"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>
      </Tilt>
    </a>
  );
}
