import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

/** Boost-red card pointing people to the lu.ma calendar. */
export function CalendarCard({ showCalendarLink = true }: { showCalendarLink?: boolean }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-boost p-8 text-white">
      <span aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full border border-white/15" />
      <span aria-hidden className="absolute -top-12 -right-12 size-40 rounded-full border border-white/15" />
      <p className="label-mono text-white/70">Calendar</p>
      <p className="heading mt-6 text-3xl leading-tight">Every Boost event lives on lu.ma.</p>
      <p className="mt-3 max-w-[18rem] text-white/85">
        Subscribe once and new events appear in your calendar as soon as they&apos;re announced.
      </p>
      <div className="mt-auto flex flex-col gap-3 pt-10">
        <ButtonLink href={site.links.luma} variant="light" arrow className="justify-between">
          Subscribe on lu.ma
        </ButtonLink>
        {showCalendarLink && (
          <ButtonLink
            href="/events"
            variant="outline"
            className="border-white/40 text-white hover:border-white hover:bg-white/10"
          >
            See the full calendar
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
