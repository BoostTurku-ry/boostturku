import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Photo as PhotoData } from "@/content/types";

type PhotoProps = {
  photo: PhotoData;
  sizes: string;
  preload?: boolean;
  zoomOnHover?: boolean;
  className?: string;
};

/** A cropped photo in a rounded frame that fills its parent's box. */
export function Photo({ photo, sizes, preload = false, zoomOnHover = false, className }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-line", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          "object-cover",
          zoomOnHover && "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
        )}
      />
    </div>
  );
}
