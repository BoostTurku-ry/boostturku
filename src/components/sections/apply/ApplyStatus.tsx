import { connection } from "next/server";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import type { ApplicationKind } from "@/content/applications";
import { site } from "@/content/site";
import { getPublishedRounds, pickRound } from "@/lib/applications";
import { formatShortDate } from "@/lib/helsinki-time";

type ApplyStatusProps = {
  kind: ApplicationKind;
  /** Shown when no round is open or upcoming (the program's static status). */
  fallback: React.ReactNode;
};

/**
 * Status pill and action for a program page, driven by the application rounds the
 * board manages in /admin. Render inside <Suspense> with the fallback as its fallback.
 */
export async function ApplyStatus({ kind, fallback }: ApplyStatusProps) {
  await connection(); // open/closed depends on the current time
  const picked = pickRound(await getPublishedRounds(kind));
  if (!picked || picked.state === "closed") return <>{fallback}</>;

  if (picked.state === "upcoming") {
    return (
      <>
        <StatusPill label={`Applications open ${formatShortDate(picked.round.opens_at)}`} tone="next" className="w-full justify-center sm:w-auto" />
        <ButtonLink href={site.community.telegram.href ?? site.links.luma} variant="outline">
          Get notified on Telegram
        </ButtonLink>
      </>
    );
  }

  return (
    <>
      <StatusPill label={`Applications open · closes ${formatShortDate(picked.round.closes_at)}`} tone="open" className="w-full justify-center sm:w-auto" />
      <ButtonLink href={`/apply/${kind}`} arrow>
        Apply now
      </ButtonLink>
    </>
  );
}

/** Board and chair calls to action for the Get involved page. Renders nothing when neither round is open. */
export async function BoardApplyCallout() {
  await connection();
  const [board, chair] = await Promise.all([getPublishedRounds("board"), getPublishedRounds("chair")]);
  const openBoard = pickRound(board);
  const openChair = pickRound(chair);
  const boardOpen = openBoard?.state === "open" ? openBoard.round : null;
  const chairOpen = openChair?.state === "open" ? openChair.round : null;
  if (!boardOpen && !chairOpen) return null;

  return (
    <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-8 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="meta-label flex items-center gap-2 text-white">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-boost-ultra" />
          Applications are open
        </p>
        <p className="mt-2 text-white/70">
          {chairOpen && `Chairperson applications close ${formatShortDate(chairOpen.closes_at)}. `}
          {boardOpen && `Board applications close ${formatShortDate(boardOpen.closes_at)}.`}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {boardOpen && (
          <ButtonLink href="/apply/board" arrow>
            Apply to the board
          </ButtonLink>
        )}
        {chairOpen && (
          <ButtonLink href="/apply/chair" variant="ghostLight">
            Run for chair
          </ButtonLink>
        )}
        {chairOpen?.show_candidates && (
          <ButtonLink href="/apply/chair/candidates" variant="ghostDark">
            See the candidates
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
