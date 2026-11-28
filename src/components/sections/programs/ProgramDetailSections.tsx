import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProgramDetail } from "@/content/types";

/** Body of a program page: overview, content blocks, optional schedule and highlight. */
export function ProgramDetailSections({ program }: { program: ProgramDetail }) {
  return (
    <>
      {/* Overview */}
      <section className="pb-14 sm:pb-20">
        <Container size="wide">
          <SectionHeading title={`About ${program.name}`} />
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-ink-soft lg:grid-cols-2 lg:gap-10">
            {program.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Blocks */}
      {program.blocks.length > 0 && (
        <section className="border-t border-line bg-surface py-14 sm:py-20">
          <Container size="wide" className="space-y-20">
            {program.blocks.map((block) => (
              <div key={block.title} className="grid gap-10 lg:grid-cols-12 lg:gap-10">
                <SectionHeading title={block.title} layout="stack" className="lg:col-span-4" />
                <ol className="border-t border-line lg:col-span-8">
                  {block.items.map((item, i) => (
                    <li key={item.body} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6">
                      <span className="meta-label pt-1 text-boost">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        {item.title && <p className="font-semibold text-ink">{item.title}</p>}
                        <p className={item.title ? "mt-1.5 leading-relaxed text-ink-soft" : "leading-relaxed text-ink"}>
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Schedule */}
      {program.schedule && (
        <section className="py-14 sm:py-20">
          <Container size="wide">
            <SectionHeading title={program.schedule.title} intro={program.schedule.intro} />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {program.schedule.days.map((day, i) => (
                <Reveal key={day.label} delay={i * 0.08} y={14}>
                  <div className="h-full rounded-3xl border border-line bg-surface p-7">
                    <p className="meta-label text-boost">Day {i + 1}</p>
                    <p className="heading mt-2 text-xl">{day.label}</p>
                    <ul className="mt-6 space-y-3">
                      {day.items.map(([time, what]) => (
                        <li key={time + what} className="flex gap-4">
                          <span className="meta-label w-12 shrink-0 pt-0.5 text-ink-muted">{time}</span>
                          <span className="text-ink-soft">{what}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Highlight */}
      {program.highlight && (
        <section className="px-3 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-boost p-8 text-white sm:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-5">
              <p className="meta-label text-white/70">{program.highlight.eyebrow}</p>
              <h2 className="heading mt-4 text-4xl sm:text-5xl">{program.highlight.title}</h2>
              <p className="mt-5 max-w-md leading-relaxed text-white/85">{program.highlight.body}</p>
            </div>
            <dl className="divide-y divide-white/20 border-y border-white/20 lg:col-span-7">
              {program.highlight.items.map((item) => (
                <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="meta-label pt-1 text-white/65">{item.label}</dt>
                  <dd className="text-lg font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}
    </>
  );
}
