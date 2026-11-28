"use client";

import { getImageProps } from "next/image";
import DepthCarousel from "@/components/reactbits/DepthCarousel";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DEFAULT_FOCUS } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryPhotos, lifeAtBoost } from "@/content/home";
import { useTheme } from "@/hooks/useTheme";

// DepthCarousel renders plain <img>; route each photo through the Next image
// optimizer so it gets a card-sized, modern-format file instead of the original.
const items = galleryPhotos.map((photo) => ({
  image: getImageProps({ src: photo.src, alt: photo.alt, width: 640, height: 800, quality: 75 }).props.src,
  alt: photo.alt,
  focus: photo.focus ?? DEFAULT_FOCUS,
}));

/** Life at Boost: a 3D depth carousel beside the section intro. */
export function GallerySection() {
  const theme = useTheme();

  return (
    <section className="overflow-hidden border-t border-line bg-surface py-14 sm:py-20">
      <Container size="wide" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading layout="stack" title="Life at Boost" intro={lifeAtBoost.intro} />
          <dl className="mt-8 border-t border-line">
            {lifeAtBoost.year.map((item) => (
              <div key={item.when} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3.5">
                <dt className="meta-label pt-1 text-boost">{item.when}</dt>
                <dd className="leading-snug text-ink">{item.what}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/events" variant="outline" arrow className="mt-8">
            See what&apos;s coming up
          </ButtonLink>
        </div>

        <div className="h-[25rem] sm:h-[27rem] lg:col-span-8">
          <DepthCarousel
            items={items}
            cardWidth={280}
            cardHeight={360}
            radius={16}
            depth={200}
            spread={95}
            tilt={20}
            visibleCards={3}
            // cards further back fade toward the page colour instead of black
            tint={theme === "dark" ? "#05060a" : "#ece6df"}
            falloff={0.3}
            blur={4}
            autoplay
            autoplayDelay={3600}
          />
        </div>
      </Container>
    </section>
  );
}
