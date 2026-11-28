import { Reveal } from "@/components/motion/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import RotatingText from "@/components/reactbits/RotatingText";
import { CommunityButtons } from "@/components/sections/shared/CommunityButtons";
import { PhotoMarquee } from "@/components/sections/shared/PhotoMarquee";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

/**
 * Centred statement over an edge-to-edge strip of community photos, sized
 * against viewport height so it all fits on one desktop screen.
 */
export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pb-14 sm:pb-20">
      <Container size="wide" className="pt-32 sm:pt-36 lg:pt-[max(8rem,17svh)]">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="sr-only">
            {hero.headline.lead} {hero.headline.verb} {hero.headline.rotating[0]}
          </h1>
          <div aria-hidden className="heading-display text-[clamp(2.75rem,min(7.4vw,10.5svh),6.75rem)] leading-[1.02]">
            <BlurText
              text={hero.headline.lead}
              animateBy="words"
              direction="bottom"
              trigger="load"
              delay={90}
              stepDuration={0.3}
              blur={8}
              distance={16}
              className="justify-center text-ink"
            />
            {/* Two lines from tablet up: "become" and the word slot never wrap apart. */}
            <div className="flex flex-wrap justify-center gap-x-[0.22em] sm:flex-nowrap">
              <BlurText
                text={hero.headline.verb}
                animateBy="words"
                direction="bottom"
                trigger="load"
                delay={260}
                stepDuration={0.3}
                blur={8}
                distance={16}
                className="text-ink"
              />
              <RotatingText
                texts={[...hero.headline.rotating]}
                effect="slide"
                rotationInterval={2800}
                staggerDuration={0.012}
                transition={{ type: "spring", damping: 30, stiffness: 520 }}
                staggerFrom="first"
                // Fixed slot, as wide as the widest word ("founders.") with each word centred in it,
                // so the line never reflows and "become" stays put. Bottom padding keeps descenders.
                mainClassName="text-boost overflow-hidden w-[4.16em] justify-center pb-[0.08em]"
              />
            </div>
          </div>

          <Reveal delay={0.35} y={12}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{hero.body}</p>

            {/* One primary, one secondary, then the community chats as quiet text buttons. */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="outline">
                {hero.secondaryCta.label}
              </ButtonLink>
              <span aria-hidden className="mx-2 hidden h-6 w-px bg-line sm:block" />
              <CommunityButtons size="lg" emphasis="tertiary" className="justify-center" />
            </div>
          </Reveal>
        </div>
      </Container>

      <Reveal delay={0.5} y={20} className="mt-10">
        <PhotoMarquee photos={hero.strip} heightClass="h-[clamp(8rem,19svh,13rem)]" duration={90} preloadFirst={4} />
      </Reveal>
    </section>
  );
}
