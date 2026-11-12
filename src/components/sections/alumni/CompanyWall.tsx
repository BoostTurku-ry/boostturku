"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { alumniCompanies } from "@/content/alumniCompanies";
import type { AlumniCompany } from "@/content/types";
import { cn } from "@/lib/cn";

const filters: { key: "all" | AlumniCompany["category"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "journey", label: "Startup Journey" },
  { key: "board", label: "Board alumni" },
  { key: "community", label: "Community" },
];

/** Filterable grid of companies founded by Boost alumni. */
export function CompanyWall() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");

  const visible = useMemo(
    () =>
      alumniCompanies.filter((c) =>
        filter === "all" ? true : filter === "community" ? c.category === "community" || c.category === "marathon" : c.category === filter,
      ),
    [filter],
  );

  return (
    <div>
      <div role="tablist" aria-label="Filter companies" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count =
            f.key === "all"
              ? alumniCompanies.length
              : alumniCompanies.filter((c) => (f.key === "community" ? c.category === "community" || c.category === "marathon" : c.category === f.key)).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink-soft hover:border-ink/30 hover:text-ink",
              )}
            >
              {f.label}
              <span className={cn("label-mono", active ? "text-paper/60" : "text-ink-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((company) => (
          <li key={company.name} className="overflow-hidden rounded-card border border-line bg-surface">
            <CompanyTile company={company} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyTile({ company }: { company: AlumniCompany }) {
  const content = (
    <>
      <span className="relative block h-14 w-full">
        {company.logo && (
          <Image
            src={company.logo}
            alt={company.name}
            fill
            sizes="180px"
            className={cn(
              "object-contain object-left transition duration-500",
              company.light
                ? // white logo: invert to black on light tiles, leave as-is on dark ones
                  "[filter:grayscale(1)_invert(1)] dark:[filter:grayscale(1)]"
                : "[filter:grayscale(1)] group-hover:[filter:none] dark:[filter:grayscale(1)_invert(1)_brightness(1.2)] dark:group-hover:[filter:grayscale(1)_invert(1)_brightness(1.4)]",
            )}
          />
        )}
      </span>
      <span className="mt-6 block">
        <span className="block font-semibold text-ink">{company.name}</span>
        <span className="label-mono mt-1 block text-ink-muted">{company.label}</span>
      </span>
    </>
  );
  const className = "group flex h-full flex-col justify-between p-6 transition-colors hover:bg-boost-soft/40";
  return company.href ? (
    <a href={company.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
