import CountUp from "@/components/reactbits/CountUp";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/content/home";

export function ImpactSection() {
  return (
    <section data-header-dark className="relative isolate overflow-hidden bg-night text-white">
      <Container size="wide" className="py-14 sm:py-20">
        <SectionHeading
          tone="paper"
          title="Seventeen years of founders"
          intro="Since 2009, Boost alumni have built companies, raised funding and returned to coach the next generation."
          action={
            <ButtonLink href="/alumni" variant="light" arrow>
              Meet our alumni
            </ButtonLink>
          }
        />

        <dl className="mt-14 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="group border-t border-white/15 pt-6 lg:pr-8">
              <dt className="meta-label flex min-h-[2.6em] justify-between gap-4 text-white/50">
                <span>{stat.label}</span>
                <span className="hidden text-white/30 lg:inline">{String(i + 1).padStart(2, "0")}</span>
              </dt>
              <dd className="heading-display mt-6 text-5xl sm:text-6xl lg:text-[clamp(2.75rem,4.2vw,3.75rem)]">
                <CountUp
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  separator=","
                  duration={2}
                  trigger="view"
                />
              </dd>
              {/* grows on reveal: a thin red underline per figure */}
              <span aria-hidden className="mt-6 block h-px w-10 bg-boost transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
