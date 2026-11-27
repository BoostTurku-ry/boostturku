"use client";

import { applyTheme, getTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Day/night switch. The icon is driven purely by CSS (`dark:` variant on the
 * <html data-theme> attribute), so server and client markup always match.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    // Switch instantly: suspend all transitions for a frame, then restore them.
    root.classList.add("theme-switching");
    applyTheme(next);
    void root.offsetHeight; // force the new styles to apply before re-enabling transitions
    requestAnimationFrame(() => root.classList.remove("theme-switching"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle day / night"
      className={cn(
        "relative grid size-10 cursor-pointer place-items-center overflow-hidden rounded-sm border border-line bg-surface text-ink transition-colors hover:border-ink/30",
        className,
      )}
    >
      {/* Sun: visible in light mode */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="theme-icon absolute size-[18px] transition-all duration-200 ease-out dark:translate-y-6 dark:rotate-90 dark:opacity-0"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon: visible in dark mode */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="theme-icon absolute size-[18px] -translate-y-6 -rotate-90 opacity-0 transition-all duration-200 ease-out dark:translate-y-0 dark:rotate-0 dark:opacity-100"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
