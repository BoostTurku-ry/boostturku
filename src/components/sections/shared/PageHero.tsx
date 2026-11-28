import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoData } from "@/content/types";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  title: string;
  /** The end of the title to set in Boost red, e.g. "Demo Day." */
  accent?: string;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  /** A quiet link above the title, e.g. back to a parent page. */
  back?: { href: string; label: string };
  /** 1–3 photos. "stack": the first is the print in front, the others peek out behind it. */
  photos?: readonly PhotoData[];
  /** "stack" (default): text left, a small stack of prints right. "wide": title and intro side by side, one wide photo below. */
  layout?: "stack" | "wide";
  /** Extra content under the header (e.g. key facts or stats). */
  children?: React.ReactNode;
  className?: string;
};

function Title({ title, accent, className }: { title: string; accent?: string; className?: string }) {
  const at = accent ? title.lastIndexOf(accent) : -1;
  return (
    <h1 className={cn("heading text-balance text-ink", className)}>
      {at > -1 ? (
        <>
          {title.slice(0, at)}
          <span className="text-boost">{accent}</span>
          {title.slice(at + (accent?.length ?? 0))}
        </>
      ) : (
        title
      )}
    </h1>
  );
}

/** Loose prints behind the front photo; they fan out a little more on hover. */
const prints = [
  "rotate-[-1.5deg] group-hover:rotate-[-1deg]",
  "rotate-[5deg] translate-x-[5%] -translate-y-[3%] group-hover:rotate-[7deg] group-hover:translate-x-[7%]",
  "rotate-[-6deg] -translate-x-[5%] translate-y-[3%] group-hover:rotate-[-8deg] group-hover:-translate-x-[7%]",
];

function PhotoStack({ photos }: { photos: readonly PhotoData[] }) {
  const stack = photos.slice(0, 3);
  return (
    <div className="group relative mx-auto aspect-[3/2] w-full max-w-xl">
      {/* Back to front, so the first photo ends up on top. */}
      {stack
        .map((photo, i) => ({ photo, i }))
        .reverse()
        .map(({ photo, i }) => (
          <div
            key={photo.src}
            className={cn(
              "absolute inset-[5%] rounded-xl bg-paper p-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out sm:p-2",
              prints[i],
            )}
          >
            <Photo photo={photo} preload={i === 0} className="h-full rounded-lg" sizes="(min-width: 1024px) 560px, 90vw" />
          </div>
        ))}
    </div>
  );
}

/**
 * Opening block for inner pages. Leaves room for the floating header.
 * Photos keep their 3:2 shape inside the prints, so nobody in them gets cut off.
 */
export function PageHero({ title, accent, intro, actions, back, photos, layout = "stack", children, className }: PageHeroProps) {
  const backLink = back && (
    <Link href={back.href} className="mb-6 inline-block text-sm text-ink-muted transition-colors hover:text-ink">
      ← {back.label}
    </Link>
  );
  const lead = (
    <>
      {intro && <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">{intro}</p>}
      {actions && <div className={cn("flex flex-wrap items-center gap-3", intro && "mt-8")}>{actions}</div>}
    </>
  );

  if (layout === "wide") {
    const photo = photos?.[0];
    return (
      <section className={cn("pt-36 pb-12 sm:pt-40 sm:pb-16", className)}>
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Reveal y={12} className="lg:col-span-8">
              {backLink}
              <Title title={title} accent={accent} className="text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02]" />
            </Reveal>
            {(intro || actions) && (
              <Reveal delay={0.1} y={12} className="lg:col-span-4 lg:pb-2">
                {lead}
              </Reveal>
            )}
          </div>
          {photo && (
            <Reveal delay={0.18} y={18} className="mt-14">
              <Photo photo={photo} preload className="aspect-[3/2] rounded-3xl sm:aspect-[2/1]" sizes="(min-width: 1280px) 1216px, 95vw" />
            </Reveal>
          )}
          {children && <div className="mt-14">{children}</div>}
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("overflow-x-clip pt-36 pb-12 sm:pt-40 sm:pb-16", className)}>
      <Container size="wide">
        <div className={cn("grid items-center gap-14", photos?.length && "lg:grid-cols-12 lg:gap-12")}>
          <Reveal y={12} className={photos?.length ? "lg:col-span-6" : "max-w-3xl"}>
            {backLink}
            <Title title={title} accent={accent} className="text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[1.02]" />
            {(intro || actions) && <div className="mt-6">{lead}</div>}
          </Reveal>
          {photos?.length ? (
            <Reveal delay={0.12} y={16} className="lg:col-span-6">
              <PhotoStack photos={photos} />
            </Reveal>
          ) : null}
        </div>
        {children && <div className="mt-14 sm:mt-16">{children}</div>}
      </Container>
    </section>
  );
}
