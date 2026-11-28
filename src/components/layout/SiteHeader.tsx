"use client";

import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { ApplyMenu, MobileApplyList } from "@/components/layout/ApplyMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Floating glass bar. It is `fixed`, so pages start under it — every page's first
 * section must reserve top space (the hero uses pt-24).
 * Over sections marked `data-header-dark` it switches to light text.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const [onDark, setOnDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      // Is the header's vertical centre over a burgundy section?
      const y = 40;
      setOnDark(
        Array.from(document.querySelectorAll("[data-header-dark]")).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= y && r.bottom >= y;
        }),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const dark = onDark && !open;

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
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-xl border pr-2 pl-5 transition-all duration-500 ease-out",
          scrolled || open
            ? dark
              ? "h-14 border-white/10 bg-burgundy/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
              : "h-14 border-line bg-paper/85 shadow-[0_8px_30px_-12px_rgb(37_3_26/0.18)] backdrop-blur-xl"
            : "h-16 border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="text-boost" aria-label="Boost Turku home" onClick={() => setOpen(false)}>
          <BoostLogo className="h-6 sm:h-7" />
        </Link>

        <LayoutGroup>
          <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {mainNav.map((item) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onMouseEnter={() => setHovered(item.href)}
                  onFocus={() => setHovered(item.href)}
                  className={cn(
                    "relative px-4 py-2 text-[14.5px] font-normal transition-colors",
                    dark ? "text-white/75 hover:text-white" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className={cn("absolute inset-0 -z-10 rounded-sm", dark ? "bg-white/10" : "bg-ink/[0.06]")}
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
                {item.href === "/events" && <ApplyMenu dark={dark} hovered={hovered === "apply"} onHover={() => setHovered("apply")} />}
              </Fragment>
            ))}
          </nav>
        </LayoutGroup>

        <div className="flex items-center gap-2">
          <ThemeToggle className={dark ? "border-white/15 bg-white/5 text-white hover:border-white/40" : undefined} />
          <ButtonLink href="/get-involved" className="hidden h-10 sm:inline-flex">
            Join Boost
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid size-10 cursor-pointer place-items-center rounded-sm border lg:hidden",
              dark ? "border-white/15 bg-white/5 [--bar:white]" : "border-line bg-surface [--bar:var(--color-ink)]",
            )}
          >
            <span aria-hidden className="relative block h-2.5 w-4">
              <span
                className={cn("absolute left-0 h-px w-4 bg-(--bar) transition-all duration-300", open ? "top-1/2 rotate-45" : "top-0")}
              />
              <span
                className={cn("absolute left-0 h-px w-4 bg-(--bar) transition-all duration-300", open ? "top-1/2 -rotate-45" : "top-full")}
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
              <span className="meta-label text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="heading text-3xl text-ink">{item.label}</span>
            </Link>
          ))}
        </nav>
        <MobileApplyList onNavigate={() => setOpen(false)} />
        <ButtonLink href="/get-involved" size="lg" arrow className="mt-8 w-full">
          Join Boost — it&apos;s free
        </ButtonLink>
      </div>
    </header>
  );
}
