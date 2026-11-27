import LogoLoop from "@/components/reactbits/LogoLoop";
import { Container } from "@/components/ui/Container";
import { alumniLogos } from "@/content/alumni";

/** Quiet trust row: label on the left, companies founded by alumni scrolling on the right. */
export function AlumniStrip() {
  return (
    <section aria-label="Companies founded by Boost alumni" className="border-y border-line bg-surface">
      <Container size="wide" className="grid items-center gap-6 py-8 md:grid-cols-12 md:gap-10">
        <p className="meta-label text-ink-muted md:col-span-3">
          <span className="text-ink">180+ companies</span>
          <br className="hidden md:block" /> founded by Boost alumni, including
        </p>
        {/* Logos as one-colour silhouettes: black in light mode (colour on hover), white in dark mode. */}
        <div className="min-w-0 overflow-hidden opacity-60 transition duration-500 [filter:brightness(0)] hover:opacity-100 hover:[filter:none] md:col-span-9 dark:opacity-60 dark:[filter:brightness(0)_invert(1)] dark:hover:opacity-90 dark:hover:[filter:brightness(0)_invert(1)]">
          <LogoLoop
            logos={alumniLogos.map((logo) => ({ src: logo.src, alt: logo.name, title: logo.name, href: logo.href }))}
            speed={40}
            logoHeight={26}
            gap={64}
            pauseOnHover
            fadeOut
            ariaLabel="Companies founded by Boost alumni"
          />
        </div>
      </Container>
    </section>
  );
}
