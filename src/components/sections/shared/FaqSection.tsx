import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import type { FaqItem } from "@/content/types";

type FaqSectionProps = {
  items: FaqItem[];
  index?: number;
  title?: string;
};

export function FaqSection({ items, index, title = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <section className="py-24 sm:py-32">
      <Container size="wide" className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          index={index}
          eyebrow="FAQ"
          layout="stack"
          className="lg:col-span-5"
          title={title}
          intro={
            <>
              Can&apos;t find what you&apos;re looking for? Email us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                {site.email}
              </a>
              .
            </>
          }
        />

        <div className="border-t border-line lg:col-span-7">
          {items.map((item, i) => (
            <details key={item.question} open={i === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                <span className="label-mono w-6 shrink-0 text-ink-muted group-open:text-boost">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.question}</span>
                <span aria-hidden className="relative size-4 shrink-0 self-center text-ink-muted">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                  <span className="absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pl-11 leading-relaxed text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
