import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoData } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Editorial photo grid: the first photo is large (2×2), the rest fill in beside it.
 * Works for 3 (one large + two) or 5 (one large + four) photos. The lead sets the
 * row height at 3:2, the shape of most of our photos, so the smaller tiles come out
 * close to 3:2 as well and crop very little.
 */
export function PhotoMosaic({ photos, className }: { photos: readonly PhotoData[]; className?: string }) {
  const [lead, ...rest] = photos;
  const cols = rest.length > 2 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-rows-2", cols, className)}>
      <Reveal className="col-span-2 md:row-span-2">
        <Photo photo={lead} zoomOnHover className="group aspect-[4/3] md:aspect-[3/2]" sizes="(min-width: 768px) 50vw, 95vw" />
      </Reveal>
      {rest.map((photo, i) => (
        <Reveal key={photo.src} delay={0.06 * (i + 1)}>
          <Photo photo={photo} zoomOnHover className="group aspect-square h-full md:aspect-auto" sizes="(min-width: 768px) 25vw, 48vw" />
        </Reveal>
      ))}
    </div>
  );
}
