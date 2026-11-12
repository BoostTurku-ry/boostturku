import { cn } from "@/lib/cn";

/** Printer's crop marks at the four corners of the parent (parent must be `relative`). */
export function CropMarks({ className, inset = "-0.75rem" }: { className?: string; inset?: string }) {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <span aria-hidden className={cn("pointer-events-none absolute", className)} style={{ inset }}>
      {corners.map((c) => (
        <span key={c} className={cn("absolute size-3.5 border-ink/35", c)} />
      ))}
    </span>
  );
}
