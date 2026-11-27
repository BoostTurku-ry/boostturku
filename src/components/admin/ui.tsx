import { cn } from "@/lib/cn";

/*
 * Admin building blocks. The admin is deliberately plain: text, hairlines and
 * one accent colour. No cards, shadows or big numbers.
 */

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Helsinki" });
const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Helsinki",
});

export const formatDate = (iso: string) => dateFormat.format(new Date(iso));
export const formatDateTime = (iso: string) => dateTimeFormat.format(new Date(iso));

export function AdminHeader({ title, intro, action, back }: { title: string; intro?: React.ReactNode; action?: React.ReactNode; back?: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back && <div className="mb-3 text-sm text-ink-muted">{back}</div>}
        <h1 className="text-xl font-medium text-ink">{title}</h1>
        {intro && <p className="mt-1 max-w-2xl text-sm text-ink-muted">{intro}</p>}
      </div>
      {action && <div className="flex shrink-0 flex-wrap gap-2">{action}</div>}
    </header>
  );
}

/** A section title inside a page. */
export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-2">
      <h2 className="text-sm font-medium text-ink">{children}</h2>
      {action && <div className="text-sm text-ink-muted">{action}</div>}
    </div>
  );
}

/** Hairline list: rows separated by thin lines, no boxes. */
export function List({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("divide-y divide-line border-y border-line", className)}>{children}</ul>;
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="border-y border-line py-10 text-center text-sm text-ink-muted">{children}</p>;
}

export function Skeleton({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div aria-busy className={cn("divide-y divide-line border-y border-line", className)}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="py-4">
          <div className="h-4 w-1/3 animate-pulse rounded-sm bg-line" />
        </div>
      ))}
    </div>
  );
}

/** Small status word with a dot. */
export function Status({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "accent" | "neutral" | "muted" | "good" }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs", tone === "muted" ? "text-ink-muted" : "text-ink-soft")}>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          tone === "accent" && "bg-boost",
          tone === "good" && "bg-ink",
          tone === "neutral" && "bg-ink/40",
          tone === "muted" && "bg-ink/20",
        )}
      />
      {children}
    </span>
  );
}

/** Plain text tabs (filters). */
export function Tabs({ items, current }: { items: { href: string; label: string; key: string; count?: number }[]; current: string }) {
  return (
    <nav aria-label="Filter" className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line text-sm">
      {items.map((t) => (
        <a
          key={t.key}
          href={t.href}
          aria-current={current === t.key ? "page" : undefined}
          className={cn(
            "-mb-px border-b pb-2 transition-colors",
            current === t.key ? "border-ink text-ink" : "border-transparent text-ink-muted hover:text-ink",
          )}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-1.5 text-ink-muted">{t.count}</span>}
        </a>
      ))}
    </nav>
  );
}

export const inputClass =
  "h-9 w-full rounded-sm border border-line bg-surface px-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-ink/40";
export const labelClass = "text-xs text-ink-muted";
