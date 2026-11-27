import { Reveal } from "@/components/motion/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import Noise from "@/components/reactbits/Noise";
import RotatingText from "@/components/reactbits/RotatingText";
import { CommunityButtons } from "@/components/sections/shared/CommunityButtons";
import { PhotoMarquee } from "@/components/sections/shared/PhotoMarquee";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";
import { formatDateTime } from "@/lib/dates";
import type { LumaEvent } from "@/lib/luma";

/**
 * Centred statement over an edge-to-edge strip of community photos. Sized
 * against viewport height so the numbers are visible on one desktop screen.
 */
export function HeroSection({ nextEvent }: { nextEvent?: LumaEvent }) {
  return (
    <section className="relative isolate overflow-hidden pb-8">
      {/* Very faint, slow film grain — atmosphere without competing with the copy. */}
      <Noise
        opacity={0.04}
        fps={8}
        blendMode="overlay"
        contrast={0.5}
        zIndex={-1}
        style={{ maskImage: "linear-gradient(to bottom, #000 45%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent)" }}
      />

      <Container size="wide" className="pt-32 sm:pt-36 lg:pt-[max(8rem,17svh)]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="sr-only">
            {hero.headline.lead} {hero.headline.verb} {hero.headline.rotating[0]}
          </h1>
          <div aria-hidden className="heading-display text-[clamp(2.5rem,min(5.8vw,9.5svh),5.5rem)] leading-[0.95]">
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
            <div className="flex flex-wrap justify-center gap-x-[0.22em]">
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
                mainClassName="text-boost overflow-hidden"
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
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="outline" className="bg-surface/60 backdrop-blur">
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

      <Container size="wide" className="mt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Numbers />
          {nextEvent && <NextEvent event={nextEvent} />}
        </div>
      </Container>
    </section>
  );
}

function Numbers() {
  return (
    <dl className="flex divide-x divide-line">
      {hero.highlights.map((item) => (
        <div key={item.label} className="px-5 first:pl-0 last:pr-0">
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="heading-display block text-3xl leading-none">{item.value}</span>
            <span className="meta-label mt-2 block text-ink-muted">{item.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function NextEvent({ event }: { event: LumaEvent }) {
  const d = formatDateTime(event.start);
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex max-w-sm items-center gap-4 rounded-md border border-line bg-surface p-2.5 pr-5 transition-colors hover:border-ink/30"
    >
      <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-sm bg-boost text-white">
        <span className="meta-label text-[10px] opacity-80">{d.month}</span>
        <span className="heading-display text-lg leading-none">{d.day}</span>
      </span>
      <span className="min-w-0">
        <span className="meta-label block text-ink-muted">Next event · {d.time}</span>
        <span className="mt-0.5 block truncate text-sm font-medium text-ink group-hover:text-boost">{event.title}</span>
      </span>
      <span aria-hidden className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
