import Link from "next/link";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { manifesto } from "@/content/home";

/** Editorial statement that resolves word by word as you scroll. */
export function ManifestoSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="wide">
        <div className="meta-label flex items-center gap-4 border-t border-line pt-4 text-ink-muted">
          <span className="text-boost">(01)</span>
          <span>About Boost</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-9">
            <ScrollReveal
              baseOpacity={0.12}
              enableBlur={false}
              baseRotation={0}
              stagger={0.04}
              containerClassName="my-0!"
              textClassName="heading text-[clamp(1.75rem,3.4vw,3.25rem)]! leading-[1.18]! font-medium! text-ink"
            >
              {manifesto.text}
            </ScrollReveal>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 self-end border-t border-line pt-6 lg:col-span-3 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            {manifesto.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="meta-label text-ink-muted">{fact.label}</dt>
                <dd className="mt-1.5 text-lg font-medium">{fact.value}</dd>
              </div>
            ))}
            <div className="col-span-2 lg:col-span-1">
              <Link
                href={manifesto.cta.href}
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold hover:border-boost hover:text-boost"
              >
                {manifesto.cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
