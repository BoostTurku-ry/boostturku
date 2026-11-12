import { Reveal } from "@/components/motion/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import Magnet from "@/components/reactbits/Magnet";
import Noise from "@/components/reactbits/Noise";
import RotatingText from "@/components/reactbits/RotatingText";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";
import { HeroPhotoStack } from "./HeroPhotoStack";

/**
 * Full-screen opening. Sits under the floating header (hence pt-28), with a
 * very faint film grain behind the content. Type and photo sizes
 * scale with viewport height so everything fits on one desktop screen.
 */
export function HeroSection({ nextEvent }: { nextEvent?: LumaEvent }) {
  const nextDate = nextEvent ? formatDateTime(nextEvent.start) : null;

  return (
    <section className="relative isolate overflow-hidden">
      {/* Very faint, slow film grain — atmosphere without competing with the copy. */}
      <Noise opacity={0.04} fps={8} blendMode="overlay" contrast={0.5} zIndex={-1} style={{ maskImage: "linear-gradient(to bottom, #000 55%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)" }} />
      {/* soft fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-b from-transparent to-paper" />

      <Container size="wide" className="flex flex-col pt-28 pb-6 sm:pt-32 lg:min-h-svh lg:pt-24">
        <div className="grid flex-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy */}
          <div>
            <Badge dot>{hero.kicker}</Badge>

            <h1 className="sr-only">
              {hero.headline.lead} {hero.headline.verb} {hero.headline.rotating[0]}
            </h1>
            <div
              aria-hidden
              className="heading-display mt-6 text-[clamp(2.6rem,7vw,4rem)] lg:text-[min(4.5vw,7.1svh,4.75rem)]"
            >
              <BlurText
                text={hero.headline.lead}
                animateBy="words"
                direction="bottom"
                trigger="load"
                delay={90}
                stepDuration={0.3}
                blur={8}
                distance={16}
                className="text-ink"
              />
              <BlurText
                text={hero.headline.verb}
                animateBy="words"
                direction="bottom"
                trigger="load"
                delay={260}
                stepDuration={0.3}
                blur={8}
                distance={16}
                className="text-boost"
              />
              <RotatingText
                texts={[...hero.headline.rotating]}
                effect="slide"
                rotationInterval={2600}
                staggerDuration={0.012}
                transition={{ type: "spring", damping: 30, stiffness: 520 }}
                staggerFrom="first"
                mainClassName="text-boost overflow-hidden pb-[0.06em]"
              />
            </div>

            <Reveal delay={0.35} y={12}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft lg:text-[17px]">{hero.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnet padding={60} magnetStrength={4} maxOffset={10} wrapperClassName="inline-flex">
                  <ButtonLink href={hero.primaryCta.href} size="lg" arrow className="w-full sm:w-auto">
                    {hero.primaryCta.label}
                  </ButtonLink>
                </Magnet>
                <ButtonLink href={hero.secondaryCta.href} size="lg" variant="outline" className="bg-surface/60 backdrop-blur">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>

              <dl className="mt-10 grid max-w-sm grid-cols-2 divide-x divide-line border-t border-line pt-5">
                {hero.highlights.map((item) => (
                  <div key={item.label} className="px-4 first:pl-0">
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="heading-display block text-2xl sm:text-3xl">{item.value}</span>
                      <span className="label-mono mt-1.5 block text-ink-muted">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Photo deck */}
          <Reveal delay={0.15} y={20} className="relative flex justify-center lg:justify-end">
            <HeroPhotoStack
              photos={hero.photos}
              overlay={
                nextEvent && nextDate ? (
                <a
                  href={nextEvent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center lg:w-[20.5rem] gap-4 rounded-card border border-line bg-surface/90 p-3 pr-5 shadow-[0_16px_50px_-16px_rgb(20_19_20/0.35)] backdrop-blur-md transition-colors hover:border-ink/30"
                >
                  <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-boost text-white">
                    <span className="label-mono opacity-80">{nextDate.month}</span>
                    <span className="heading-display text-xl leading-none">{nextDate.day}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="label-mono block text-ink-muted">Next event · {nextDate.time}</span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-ink group-hover:text-boost">
                      {nextEvent.title}
                    </span>
                  </span>
                </a>
                ) : null
              }
            />
          </Reveal>
        </div>

        {/* Meta bar */}
        <div className="label-mono mt-8 hidden items-center justify-between border-t border-line pt-4 text-ink-muted lg:flex">
          <span>{hero.meta.place}</span>
          <span className="tabular-nums">{hero.meta.coordinates}</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative h-6 w-px overflow-hidden bg-line">
              <span className="absolute inset-0 animate-scroll-cue bg-boost motion-reduce:animate-none" />
            </span>
          </span>
          <span>{hero.meta.established}</span>
        </div>
      </Container>
    </section>
  );
}
