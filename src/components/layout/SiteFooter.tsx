import Link from "next/link";
import { BoostLogo } from "@/components/brand/BoostLogo";
import { Container } from "@/components/ui/Container";
import { mainNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BoostLogo className="h-8 text-boost" />
            <p className="mt-5 max-w-sm text-white/65">
              A student-run, non-profit entrepreneurship society helping students in Turku take their first steps
              toward building something of their own. Since {site.foundedYear}.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-boost"
            >
              {site.email}
            </a>
          </div>

          <FooterColumn title="Explore">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/65 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Follow">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Find us">
            <li className="text-white/65">
              {site.address.venue}
              <br />
              {site.address.street}
              <br />
              {site.address.city}
            </li>
          </FooterColumn>
        </div>

        <div className="label-mono mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-white/45 sm:flex-row sm:justify-between">
          <p>© {site.legalName} · Made by students, for students</p>
          <p>Funded by the University of Turku &amp; Business Turku</p>
          <a href="#main" className="group inline-flex items-center gap-2 text-white/70 hover:text-white">
            Back to top
            <span aria-hidden className="transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label-mono text-white/45">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
