import Image from "next/image";
import type { Photo } from "@/content/types";
import { cn } from "@/lib/cn";

type PhotoMarqueeProps = {
  photos: readonly Photo[];
  /** Tile height, e.g. "h-48". Every photo keeps its own aspect ratio at this height. */
  heightClass?: string;
  /** Seconds for one full loop. */
  duration?: number;
  /** Load the first few eagerly (above the fold). */
  preloadFirst?: number;
  className?: string;
};

/**
 * Edge-to-edge strip of community photos drifting slowly left. Two copies of the
 * list scroll by half their width for a seamless loop. Pauses on hover; still
 * for reduced motion.
 */
export function PhotoMarquee({ photos, heightClass = "h-48 sm:h-56", duration = 70, preloadFirst = 0, className }: PhotoMarqueeProps) {
  return (
    <div className={cn("group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]", className)}>
      <ul
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...photos, ...photos].map((photo, i) => {
          const copy = i >= photos.length;
          return (
            <li key={`${photo.src}-${i}`} aria-hidden={copy || undefined} className={cn("shrink-0 overflow-hidden rounded-md bg-line", heightClass)}>
              <Image
                src={photo.src}
                alt={copy ? "" : photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="400px"
                preload={i < preloadFirst}
                className="h-full w-auto object-cover"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
