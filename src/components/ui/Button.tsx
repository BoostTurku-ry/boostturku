import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "ghostLight" | "ghost" | "ghostDark";
type Size = "md" | "lg";

/** Square-cornered buttons. Containers around them use a radius of (4px + their padding). */
const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors duration-200 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-boost text-white hover:bg-boost-dark",
  dark: "bg-ink text-paper hover:bg-ink/85",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink/[0.03]",
  light: "bg-white text-night hover:bg-white/85",
  /** Outline button for dark backgrounds. */
  ghostLight: "border border-white/25 text-white hover:border-white hover:bg-white/[0.06]",
  /** Tertiary: text and icon only, for links that sit next to primary and secondary buttons. */
  ghost: "text-ink-soft hover:bg-ink/[0.05] hover:text-ink",
  ghostDark: "text-white/75 hover:bg-white/[0.08] hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type ButtonLinkProps = {
  /** Leave out (or set `disabled`) for a placeholder that isn't live yet. */
  href?: string | null;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  disabled?: boolean;
  /** Shown as a small mono tag on disabled buttons, e.g. "Soon". */
  disabledNote?: string;
  className?: string;
};

/** A link styled as a button. External URLs open in a new tab. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  disabled = false,
  disabledNote,
  className,
}: ButtonLinkProps) {
  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, variants[variant], sizes[size], "pointer-events-none cursor-not-allowed opacity-55", className)}
      >
        {children}
        {disabledNote && <span className="meta-label text-[10px] opacity-75">{disabledNote}</span>}
      </span>
    );
  }

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
