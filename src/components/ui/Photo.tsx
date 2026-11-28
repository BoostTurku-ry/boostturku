import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Photo as PhotoData } from "@/content/types";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  preload?: boolean;
  zoomOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** Crops lean slightly upwards by default, where people's heads usually are. */
export const DEFAULT_FOCUS = "50% 35%";

/** Portrait crops sit a little above centre; set `focus` on people whose head is near the top edge. */
export const PORTRAIT_FOCUS = "50% 40%";

/** A cropped photo in a rounded frame that fills its parent's box. */
export function Photo({ photo, sizes, preload = false, zoomOnHover = false, className, style }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-line", className)} style={style}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: photo.focus ?? DEFAULT_FOCUS }}
        className={cn(
          "object-cover",
          zoomOnHover && "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
        )}
      />
    </div>
  );
}
