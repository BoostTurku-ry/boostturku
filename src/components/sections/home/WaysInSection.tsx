"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { CropMarks } from "@/components/ui/CropMarks";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { waysIn } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * Editorial "hover index": a framed photo on the left swaps to match whichever
 * option is hovered or focused on the right.
 */
export function WaysInSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="pb-24 sm:pb-32">
      <Container size="wide">
        <SectionHeading
          index={2}
          eyebrow="Get involved"
          title="Three ways to be part of Boost"
          intro="There's no application to join the community. Start wherever it makes sense for you."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Photo frame */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <CropMarks />
                <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-line">
                  {waysIn.map((item, i) => (
                    <Image
                      key={item.photo.src}
                      src={item.photo.src}
                      alt={i === active ? item.photo.alt : ""}
                      aria-hidden={i !== active}
                      fill
                      sizes="(min-width: 1024px) 38vw, 0px"
                      className={cn(
                        "object-cover transition-[opacity,transform] duration-700 ease-out",
                        i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="label-mono mt-5 flex justify-between text-ink-muted">
                <span>{waysIn[active].title}</span>
                <span>
                  <span className="text-boost">{waysIn[active].step}</span> / {String(waysIn.length).padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>

          {/* Options */}
          <ol className="border-t border-line lg:col-span-7">
            {waysIn.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.step} className="border-b border-line">
                  <Link
                    href={item.cta.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-start gap-x-4 py-8 sm:py-10"
                  >
                    <span className={cn("label-mono pt-3 transition-colors", isActive ? "text-boost" : "text-ink-muted")}>
                      {item.step}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "heading block text-4xl transition-colors duration-300 sm:text-5xl",
                          isActive ? "text-ink" : "text-ink/35 lg:text-ink/30",
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "mt-4 block max-w-md leading-relaxed text-ink-soft transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-100 lg:opacity-50",
                        )}
                      >
                        {item.body}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                        {item.cta.label}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-2 grid size-11 place-items-center rounded-full border transition-all duration-300",
                        isActive ? "border-boost bg-boost text-white" : "border-line text-ink-muted",
                      )}
                    >
                      <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
