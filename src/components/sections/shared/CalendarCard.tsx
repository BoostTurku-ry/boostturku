import { BoostLogo } from "@/components/brand/BoostLogo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

/**
 * The lu.ma calendar as the back of a Boost card, sitting on top of the deck.
 * The cards underneath fan out on hover.
 */
export function CalendarCard({ showCalendarLink = true }: { showCalendarLink?: boolean }) {
  return (
    <div className="group relative isolate h-full min-h-[24rem]">
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-2 translate-y-1 rotate-[5deg] rounded-[1.4rem] bg-night transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:rotate-[8deg]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rotate-[2.5deg] rounded-[1.4rem] border border-line bg-paper transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:rotate-[4deg]"
      />

      <div className="relative flex h-full flex-col rounded-[1.4rem] bg-boost p-2 text-white">
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[1.05rem] border border-white/25 p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <BoostLogo title="" className="h-5 text-white" />
            <span className="meta-label text-white/70">lu.ma</span>
          </div>
          <p className="heading mt-8 text-3xl leading-tight">Every Boost event lives on lu.ma.</p>
          <p className="mt-3 max-w-[18rem] text-white/85">
            Subscribe once and new events appear in your calendar as soon as they&apos;re announced.
          </p>
          {/* Card-back motif: the wordmark, oversized and turned, filling the space above the buttons */}
          <div aria-hidden className="flex min-h-12 flex-1 items-center justify-end py-4">
            <BoostLogo title="" className="-mr-12 h-24 -rotate-12 text-white/12" />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href={site.links.luma} variant="light" arrow className="justify-between">
              Subscribe on lu.ma
            </ButtonLink>
            {showCalendarLink && (
              <ButtonLink href="/events" variant="outline" className="border-white/40 text-white hover:border-white hover:bg-white/10">
                See the full calendar
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
