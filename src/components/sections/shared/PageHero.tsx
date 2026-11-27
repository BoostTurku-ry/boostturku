import { Reveal } from "@/components/motion/Reveal";
import Noise from "@/components/reactbits/Noise";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoData } from "@/content/types";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Small mono line under the eyebrow rule, e.g. a status. */
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  photo?: PhotoData;
  /** Extra content under the title row (e.g. stats). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Opening block for inner pages. Leaves room for the floating header (pt-32)
 * and shares the home hero's faint grain.
 */
export function PageHero({ eyebrow, title, intro, meta, actions, photo, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <Noise opacity={0.04} fps={8} blendMode="overlay" contrast={0.5} zIndex={-1} style={{ maskImage: "linear-gradient(to bottom, #000 55%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent)" }} />
      <Container size="wide" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="meta-label flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-ink-muted">
          <span className="flex items-center gap-3">
            <span aria-hidden className="size-1.5 rounded-full bg-boost" />
            {eyebrow}
          </span>
          {meta && <span>{meta}</span>}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal y={14} className="lg:col-span-8">
            <h1 className="heading text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02]">{title}</h1>
          </Reveal>
          {(intro || actions) && (
            <Reveal delay={0.12} y={14} className="lg:col-span-4 lg:pb-2">
              {intro && <p className="text-lg leading-relaxed text-ink-soft">{intro}</p>}
              {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
            </Reveal>
          )}
        </div>

        {children && <div className="mt-14">{children}</div>}

        {photo && (
          <Reveal delay={0.2} y={20} className="mt-14">
            <Photo photo={photo} preload className="aspect-[16/9] rounded-3xl sm:aspect-[21/9]" sizes="(min-width: 1280px) 1216px, 95vw" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
