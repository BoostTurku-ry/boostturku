"use client";

import Image from "next/image";
import { useState } from "react";
import Stack from "@/components/reactbits/Stack";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

type HeroPhotoStackProps = {
  photos: Photo[];
  /** Rendered over the deck's bottom-left corner (e.g. the next-event card). */
  overlay?: React.ReactNode;
  className?: string;
};

/** Community photos as a swipeable, auto-advancing deck (React Bits Stack) with a mono counter. */
export function HeroPhotoStack({ photos, overlay, className }: HeroPhotoStackProps) {
  const [index, setIndex] = useState(0);
  const pad = (n: number) => String(n).padStart(2, "0");

  const cards = photos.map((photo, i) => (
    <div key={photo.src} className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-line">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        draggable={false}
        preload={i === 0}
        sizes="(min-width: 1024px) 30vw, 80vw"
        className="pointer-events-none object-cover select-none"
      />
    </div>
  ));

  return (
    <div className={cn("relative mx-auto flex w-full max-w-[24rem] flex-col lg:w-auto lg:max-w-none", className)}>
      {/* Clip zone: shuffled cards slide out of this frame instead of flying across the page.
          The padding (offset by negative margins) leaves room for the cascade offset and shadows. */}
      <div className="relative -mt-6 -mr-8 -mb-10 -ml-6 overflow-hidden pt-6 pr-8 pb-10 pl-6">
        <div className="relative aspect-4/5 w-full lg:h-[min(54svh,32rem)] lg:w-auto">
          <Stack
            cards={cards}
            layout="cascade"
            visible={3}
            spread={0.35}
            depth={0.35}
            tilt={10}
            radius={18}
            shadow
            autoplay
            autoplayDelay={4200}
            pauseOnHover
            sendToBackOnClick
            onChange={setIndex}
          />
        </div>
      </div>

      <div className="label-mono mt-5 flex items-center justify-between text-ink-muted">
        <span>
          <span className="text-boost">{pad((index % photos.length) + 1)}</span> / {pad(photos.length)}
        </span>
        <span className="flex gap-1.5" aria-hidden>
          {photos.map((photo, i) => (
            <span
              key={photo.src}
              className={cn(
                "h-0.5 rounded-full transition-all duration-500",
                i === index % photos.length ? "w-6 bg-boost" : "w-2.5 bg-ink/20",
              )}
            />
          ))}
        </span>
        <span className="hidden sm:inline">Drag or click to shuffle</span>
      </div>

      {/* Below the deck on phones; over its bottom-left corner on desktop (clear of the counter). */}
      {overlay && <div className="mt-6 lg:absolute lg:bottom-16 lg:-left-12 lg:z-30 lg:mt-0">{overlay}</div>}
    </div>
  );
}
