"use client";

import FlowingMenu from "@/components/reactbits/FlowingMenu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { programs } from "@/content/home";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Programs as an editorial index: hovering a row slides in a red band with photos. */
export function ProgramsSection() {
  // Timing labels only fit beside the program names on wider screens.
  const showMeta = useMediaQuery("(min-width: 768px)", true);
  const items = programs.map((program) => ({
    text: program.name,
    link: program.href,
    image: program.photo.src,
    marquee: program.tagline,
    meta: showMeta ? program.when : undefined,
    // BoostHer gets its own light pink band; the rest stay Boost red.
    ...(program.slug === "boosther" ? { marqueeBgColor: "var(--color-her)", marqueeTextColor: "#25031a" } : {}),
  }));

  return (
    <section className="border-t border-line bg-surface py-14 sm:py-20">
      <Container size="wide">
        <SectionHeading
          title="From first idea to Demo Day"
          intro="Structured programs led by experienced coaches. All free, with no equity taken."
          action={
            <ButtonLink href="/programs" variant="outline" arrow>
              All programs
            </ButtonLink>
          }
        />

        <div className="mt-14 h-76 border-y border-line sm:h-112 lg:h-136">
          <FlowingMenu
            items={items}
            align="left"
            showIndex
            showArrow
            dividers
            imageShape="rounded"
            speed={55}
            bgColor="transparent"
            textColor="var(--color-ink)"
            marqueeBgColor="var(--color-boost)"
            marqueeTextColor="#ffffff"
            borderColor="var(--color-line)"
            ariaLabel="Boost programs"
          />
        </div>
      </Container>
    </section>
  );
}
