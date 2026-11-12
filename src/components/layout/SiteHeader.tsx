"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Floating glass pill. It is `fixed`, so pages start under it — every page's first
 * section must reserve top space (the hero uses pt-28).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border pr-2 pl-5 transition-all duration-500 ease-out",
          scrolled || open
            ? "h-14 border-line bg-surface/80 shadow-[0_8px_30px_-12px_rgb(20_19_20/0.18)] backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="text-boost" aria-label="Boost Turku home" onClick={() => setOpen(false)}>
          <BoostLogo className="h-6 sm:h-7" />
        </Link>

        <LayoutGroup>
          <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                className="relative px-4 py-2 text-[14.5px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
                {item.label}
                {item.external && (
                  <span aria-hidden className="ml-1 text-[10px]">
                    ↗
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/get-involved" className="hidden h-10 sm:inline-flex">
            Join Boost
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface lg:hidden"
          >
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-ink transition-all duration-300",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-ink transition-all duration-300",
                  open ? "top-1/2 -rotate-45" : "top-full",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-3 top-20 bottom-3 overflow-y-auto rounded-3xl border border-line bg-surface p-6 shadow-2xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {mainNav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-baseline gap-4 border-b border-line py-4"
            >
              <span className="label-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="heading text-3xl text-ink">{item.label}</span>
            </Link>
          ))}
        </nav>
        <ButtonLink href="/get-involved" size="lg" arrow className="mt-8 w-full">
          Join Boost — it&apos;s free
        </ButtonLink>
      </div>
    </header>
  );
}
