import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Shown instead of upcoming-event cards. `unavailable` means lu.ma couldn't be
 * reached, so we don't claim that nothing is scheduled.
 */
export function NoUpcoming({ unavailable, className }: { unavailable: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col justify-center rounded-3xl border border-dashed border-line p-8", className)}>
      <p className="heading text-2xl">{unavailable ? "See what's on at lu.ma" : "New events are on their way."}</p>
      <p className="mt-2 max-w-md text-ink-soft">
        {unavailable ? "We couldn't load the calendar just now. The full schedule is always on " : "Nothing is scheduled right now. Subscribe on "}
        <a href={site.links.luma} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
          lu.ma/boost
        </a>
        {unavailable ? "." : " to hear as soon as the next one is announced."}
      </p>
    </div>
  );
}
