import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import type { LegalDocument } from "@/content/privacy";
import { renderMarkdown } from "@/lib/markdown";

type LegalPageProps = {
  doc: LegalDocument;
  /** The other privacy document, linked at the end. */
  related?: { href: string; label: string };
};

/**
 * Long-form legal page: a compact header, a sticky table of contents on large
 * screens and numbered sections set in the article typography (prose-boost).
 */
export function LegalPage({ doc, related }: LegalPageProps) {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16">
        <Container size="wide">
          <Reveal y={12} className="max-w-3xl">
            <p className="meta-label flex items-center gap-2.5 text-ink-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-boost" />
              {doc.eyebrow}
            </p>
            <h1 className="heading mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)]">{doc.title}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{doc.intro}</p>
            <p className="meta-label mt-6 text-ink-muted">Last updated {doc.updated}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line pb-14 sm:pb-20">
        <Container size="wide" className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="meta-label text-ink-muted">On this page</p>
              <ol className="mt-4 space-y-2 border-l border-line">
                {doc.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px flex gap-3 border-l border-transparent py-0.5 pl-4 text-sm text-ink-soft transition-colors hover:border-boost hover:text-ink"
                    >
                      <span className="meta-label pt-0.5 text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
            {doc.sections.map((section, i) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 border-b border-line py-10 first:pt-0 last:border-b-0">
                <h2 className="heading flex items-baseline gap-4 text-2xl sm:text-[1.75rem]">
                  <span className="meta-label text-boost">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="prose-boost mt-5 text-base sm:text-[1.0625rem]" dangerouslySetInnerHTML={{ __html: renderMarkdown(section.body) }} />
              </article>
            ))}

            {related && (
              <Link
                href={related.href}
                className="group mt-6 flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink/25"
              >
                <span>
                  <span className="meta-label block text-ink-muted">Also read</span>
                  <span className="heading mt-1 block text-xl">{related.label}</span>
                </span>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-sm bg-ink text-paper transition-colors group-hover:bg-boost group-hover:text-white"
                >
                  →
                </span>
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
