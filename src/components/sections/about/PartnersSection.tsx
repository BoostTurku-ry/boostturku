import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem, partners } from "@/content/about";

export function PartnersSection() {
  const all = [...partners.key, ...partners.other];
  return (
    <section className="bg-night text-white">
      <Container size="wide" className="py-24 sm:py-32">
        <SectionHeading
          index={3}
          tone="paper"
          eyebrow="Partners"
          title="Free for students, thanks to them"
          intro="Our partners fund Boost's work, which is why every event and program costs participants nothing and we never take equity."
        />

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {all.map((p, i) => (
            <li key={p.name} className="bg-night">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-40 flex-col justify-between p-6 transition-colors hover:bg-white/[0.04] sm:h-48"
              >
                <span className="label-mono text-white/40">{i < partners.key.length ? "Key partner" : "Partner"}</span>
                <span className="relative block h-14 w-full">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="240px"
                    className="object-contain object-left opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-12 lg:gap-10">
          <p className="heading text-2xl lg:col-span-4">{ecosystem.title}</p>
          <div className="lg:col-span-8">
            <p className="max-w-2xl leading-relaxed text-white/70">{ecosystem.body}</p>
            <a
              href={ecosystem.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-white/30 underline-offset-4 hover:decoration-boost"
            >
              {ecosystem.link.label} ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
