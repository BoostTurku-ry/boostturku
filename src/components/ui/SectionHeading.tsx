import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Optional call to action shown under the intro (right column). */
  action?: React.ReactNode;
  /** "split" = title left, intro right. "stack" = title over intro. */
  layout?: "split" | "stack";
  tone?: "ink" | "paper";
  className?: string;
};

/** Section header: a title, with an optional intro and action beside or below it. */
export function SectionHeading({ title, intro, action, layout = "split", tone = "ink", className }: SectionHeadingProps) {
  const dark = tone === "paper";
  return (
    <div className={cn("grid content-start gap-6", // Top-aligned: when the intro and action run taller than the title, the title stays level with the intro instead of sinking.
        layout === "split" && "lg:grid-cols-12 lg:items-start lg:gap-10", className)}>
      <h2
        className={cn(
          "heading text-balance text-[2rem] sm:text-5xl lg:text-[3.25rem]",
          layout === "split" && "lg:col-span-7",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {(intro || action) && (
        <div className={cn(layout === "split" && "lg:col-span-5 lg:pt-2")}>
          {intro && (
            <p className={cn("max-w-md text-base leading-relaxed sm:text-[17px]", dark ? "text-white/70" : "text-ink-soft")}>{intro}</p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
