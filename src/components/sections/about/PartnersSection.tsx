import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ecosystem, partners } from "@/content/about";

export function PartnersSection() {
  return (
    <section data-header-dark className="bg-night text-white">
      <Container size="wide" className="py-24 sm:py-32">
        <SectionHeading
          index={3}
          tone="paper"
          eyebrow="Partners"
          title="Free for students, thanks to them"
          intro="Our partners fund Boost's work, which is why every event and program costs participants nothing and we never take equity."
        />

        <p className="meta-label mt-16 text-white/45">Main partners</p>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {partners.key.map((p) => (
            <PartnerTile key={p.name} partner={p} size="lg" />
          ))}
        </ul>

        <p className="meta-label mt-10 text-white/45">Also supported by</p>
        <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
          {partners.other.map((p) => (
            <PartnerTile key={p.name} partner={p} size="sm" />
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

type Partner = (typeof partners.key)[number];

function PartnerTile({ partner, size }: { partner: Partner; size: "lg" | "sm" }) {
  return (
    <li className="bg-night">
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className={size === "lg" ? "group flex h-44 items-center p-8 transition-colors hover:bg-white/[0.04] sm:h-52" : "group flex h-28 items-center p-6 transition-colors hover:bg-white/[0.04]"}
      >
        <span className={size === "lg" ? "relative block h-16 w-full max-w-[13rem] sm:h-20" : "relative block h-10 w-full max-w-[9rem]"}>
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            sizes="300px"
            className="object-contain object-left opacity-80 transition-opacity group-hover:opacity-100"
          />
        </span>
      </a>
    </li>
  );
}
