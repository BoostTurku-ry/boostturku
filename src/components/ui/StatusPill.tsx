import { cn } from "@/lib/cn";

type StatusPillProps = {
  label: string;
  tone: "open" | "closed" | "next";
  className?: string;
};

/** Program status, e.g. "Applications open" (red, pulsing) or "Applications closed" (muted). */
export function StatusPill({ label, tone, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "meta-label inline-flex items-center gap-2 rounded-sm border px-3 py-1.5",
        tone === "open" && "border-boost/30 bg-boost-soft text-boost",
        tone === "next" && "border-line bg-surface text-ink-soft",
        tone === "closed" && "border-line bg-transparent text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "open" ? "animate-pulse bg-boost" : tone === "next" ? "bg-ink/50" : "bg-ink/25",
        )}
      />
      {label}
    </span>
  );
}

/** The same status as quiet text with a dot, for cards. */
export function StatusLine({ label, tone, className }: StatusPillProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-ink-muted", className)}>
      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", tone === "open" ? "animate-pulse bg-boost" : "bg-ink/30")} />
      {label}
    </span>
  );
}
