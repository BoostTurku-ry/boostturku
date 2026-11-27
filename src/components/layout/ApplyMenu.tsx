"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { applicationKinds, applyMenu, type ApplicationKind } from "@/content/applications";
import type { KindStatus } from "@/lib/applications";
import { cn } from "@/lib/cn";

type Statuses = Partial<Record<ApplicationKind, KindStatus>>;

const short = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Helsinki" });

/** Live open/upcoming state for the menu, loaded after the page so the header stays static. */
function useApplyStatuses() {
  const [statuses, setStatuses] = useState<Statuses>({});
  useEffect(() => {
    let alive = true;
    fetch("/api/apply-status")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: Statuses) => alive && setStatuses(data))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return statuses;
}

function StatusTag({ status }: { status?: KindStatus }) {
  if (!status) return null;
  if (status.state === "open") {
    return (
      <span className="meta-label inline-flex shrink-0 items-center gap-1.5 text-[10px] text-boost">
        <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-boost" />
        Open · closes {short.format(new Date(status.closes_at))}
      </span>
    );
  }
  return <span className="meta-label shrink-0 text-[10px] text-ink-muted">Opens {short.format(new Date(status.opens_at))}</span>;
}

type ApplyMenuProps = {
  dark: boolean;
  /** Shared hover highlight with the other nav items. */
  hovered: boolean;
  onHover: () => void;
};

/** "Apply" item in the desktop navigation with a dropdown of everything people can apply to. */
export function ApplyMenu({ dark, hovered, onHover }: ApplyMenuProps) {
  // The menu remembers which page it was opened on, so navigating closes it.
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((current) => {
      const next = typeof value === "function" ? value(current === pathname) : value;
      return next ? pathname : null;
    });
  const statuses = useApplyStatuses();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const anyOpen = Object.values(statuses).some((s) => s?.state === "open");

  // Close on Escape and on clicks elsewhere.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const onClick = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={root} className="relative" onMouseEnter={show} onMouseLeave={hideSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="apply-menu"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={onHover}
        onFocus={onHover}
        className={cn(
          "relative flex items-center gap-1.5 px-4 py-2 text-[14.5px] font-normal transition-colors",
          dark ? "text-white/75 hover:text-white" : "text-ink-soft hover:text-ink",
          open && (dark ? "text-white" : "text-ink"),
        )}
      >
        {hovered && (
          <motion.span
            layoutId="nav-hover"
            className={cn("absolute inset-0 -z-10 rounded-sm", dark ? "bg-white/10" : "bg-ink/[0.06]")}
            transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
          />
        )}
        Apply
        {anyOpen && <span aria-label="Applications open" className="size-1.5 rounded-full bg-boost" />}
        <svg aria-hidden viewBox="0 0 12 12" className={cn("size-2.5 transition-transform duration-200", open && "rotate-180")}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div
        id="apply-menu"
        hidden={!open}
        className="absolute top-full left-1/2 w-[38rem] -translate-x-1/2 pt-3"
      >
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgb(37_3_26/0.35)]">
          {applyMenu.map((group) => (
            <div key={group.title} className="p-2">
              <p className="meta-label px-2 pb-2 text-[10px] text-ink-muted">{group.title}</p>
              <ul>
                {group.kinds.map((kind) => (
                  <li key={kind}>
                    <Link
                      href={`/apply/${kind}`}
                      onClick={() => setOpen(false)}
                      className="group block rounded-sm px-2 py-2 transition-colors hover:bg-ink/[0.04]"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-ink group-hover:text-boost">{applicationKinds[kind].label}</span>
                        <StatusTag status={statuses[kind]} />
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">{applicationKinds[kind].blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The same list for the mobile menu. */
export function MobileApplyList({ onNavigate }: { onNavigate: () => void }) {
  const statuses = useApplyStatuses();
  return (
    <div className="mt-8 grid gap-6">
      {applyMenu.map((group) => (
        <div key={group.title}>
          <p className="meta-label text-ink-muted">Apply · {group.title}</p>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {group.kinds.map((kind) => (
              <li key={kind}>
                <Link href={`/apply/${kind}`} onClick={onNavigate} className="flex items-center justify-between gap-3 py-3">
                  <span className="text-ink">{applicationKinds[kind].label}</span>
                  <StatusTag status={statuses[kind]} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
