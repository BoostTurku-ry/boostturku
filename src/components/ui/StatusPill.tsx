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
        "label-mono inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
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
