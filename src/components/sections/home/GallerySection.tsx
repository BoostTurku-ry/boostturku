"use client";

import { getImageProps } from "next/image";
import DepthCarousel from "@/components/reactbits/DepthCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryPhotos } from "@/content/home";
import { useTheme } from "@/hooks/useTheme";

// DepthCarousel renders plain <img>; route each photo through the Next image
// optimizer so it gets a card-sized, modern-format file instead of the original.
const items = galleryPhotos.map((photo) => ({
  image: getImageProps({ src: photo.src, alt: photo.alt, width: 640, height: 800, quality: 75 }).props.src,
  alt: photo.alt,
}));

/** Life at Boost: a 3D depth carousel beside the section intro. */
export function GallerySection() {
  const theme = useTheme();

  return (
    <section className="overflow-hidden border-t border-line bg-surface py-24 sm:py-32">
      <Container size="wide" className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          index={5}
          eyebrow="Community"
          layout="stack"
          className="lg:col-span-4"
          title="Life at Boost"
          intro="A year of events, programs and the people who make them happen. Drag, scroll or use the arrows to flip through."
        />

        <div className="h-[26rem] sm:h-[30rem] lg:col-span-8">
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
