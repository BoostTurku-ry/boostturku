import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Editorial section number, e.g. 2 → "(02)". */
  index?: number;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Optional call to action shown under the intro (right column). */
  action?: React.ReactNode;
  /** "split" = magazine layout (title left, intro right). "stack" = title over intro. */
  layout?: "split" | "stack";
  tone?: "ink" | "paper";
  className?: string;
};

/**
 * Editorial section header:
 *   ───────────────────────────────── hairline
 *   (02)  PROGRAMS
 *   Big title                 Intro text…   [action]
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  action,
  layout = "split",
  tone = "ink",
  className,
}: SectionHeadingProps) {
  const dark = tone === "paper";
  return (
    <div className={className}>
      {(eyebrow || index) && (
        <div
          className={cn(
            "label-mono flex items-center gap-4 border-t pt-4",
            dark ? "border-white/15 text-white/55" : "border-line text-ink-muted",
          )}
        >
          {index !== undefined && (
            <span className={dark ? "text-white" : "text-boost"}>({String(index).padStart(2, "0")})</span>
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}

      <div
        className={cn(
          "mt-8 grid gap-6",
          layout === "split" && "lg:grid-cols-12 lg:items-start lg:gap-10",
        )}
      >
        <h2
          className={cn(
            "heading text-[2rem] sm:text-5xl lg:text-[3.5rem]",
            layout === "split" && "lg:col-span-7",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {(intro || action) && (
          <div className={cn(layout === "split" && "lg:col-span-5 lg:pt-2")}>
            {intro && (
              <p className={cn("max-w-md text-base leading-relaxed sm:text-[17px]", dark ? "text-white/65" : "text-ink-soft")}>
                {intro}
              </p>
            )}
            {action && <div className="mt-6">{action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
