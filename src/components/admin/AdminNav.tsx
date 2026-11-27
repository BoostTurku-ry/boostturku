"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/access", label: "Board access" },
];

/** Highlights the current section. Reads the URL, so render it inside <Suspense> with AdminNavFallback. */
export function AdminNav() {
  return <NavLinks pathname={usePathname()} />;
}

/** Same links without the active marker, for the Suspense fallback. */
export function AdminNavFallback() {
  return <NavLinks pathname="" />;
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Admin" className="flex gap-4 overflow-x-auto text-sm lg:flex-col lg:gap-0.5">
      {items.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative shrink-0 py-1.5 transition-colors lg:pl-3",
              active ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {active && <span aria-hidden className="absolute top-1/2 left-0 hidden h-3.5 w-0.5 -translate-y-1/2 bg-boost lg:block" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
