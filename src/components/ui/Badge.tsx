import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  dot?: boolean;
  tone?: "default" | "inverse";
  className?: string;
};

/** Small, quiet mono label, e.g. "Pre-Incubator" or the hero kicker. */
export function Badge({ children, dot = false, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "meta-label inline-flex items-center gap-2 rounded-sm border px-3 py-1.5",
        tone === "default" ? "border-line bg-surface text-ink-soft" : "border-white/20 text-white/80",
        className,
      )}
    >
      {dot && (
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-boost opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-1.5 rounded-full bg-boost" />
        </span>
      )}
      {children}
    </span>
  );
}
