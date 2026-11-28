import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/forms/ContactForm";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PhotoMosaic } from "@/components/sections/shared/PhotoMosaic";
import { gallery } from "@/content/gallery";
import { Container } from "@/components/ui/Container";
import { contacts, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Boost Turku. Questions, startup ideas and partnerships all welcome.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Talk to us."
        accent="us."
        intro="Questions, a startup idea you want feedback on, or a partnership in mind? Send a message, email the right person directly, or find us at an event."
        photos={gallery.heroes.contact}
      />

      <section className="pb-14 sm:pb-20">
        <Container size="wide" className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:col-span-7 lg:self-start">
            <p className="meta-label text-ink-muted">Send a message</p>
            <p className="heading mt-3 mb-8 text-3xl">We read everything.</p>
            <ContactForm />
          </div>

          {/* Details */}
          <div className="space-y-12 lg:col-span-5">
            <div>
              <p className="meta-label text-ink-muted">Email directly</p>
              <ul className="mt-4 border-t border-line">
                {contacts.map((c) => (
                  <li key={c.email} className="border-b border-line py-4">
                    <p className="meta-label text-boost">{c.topic}</p>
                    <p className="mt-1.5 text-ink-soft">{c.name}</p>
                    <a href={`mailto:${c.email}`} className="mt-0.5 inline-block font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                      {c.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="meta-label text-ink-muted">Find us</p>
              <p className="heading mt-4 text-2xl">{site.address.venue}</p>
              <p className="mt-1 text-ink-soft">
                {site.address.street}, {site.address.city}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                While SparkUp is being renovated we&apos;re based at Konttori, an entrepreneurial hub in the city centre, and
                hold events at venues around Turku.
              </p>
            </div>

            <div>
              <p className="meta-label text-ink-muted">Follow</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-sm border border-line bg-surface px-4 py-2 text-sm text-ink-soft hover:border-ink/30 hover:text-ink"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
        <Container size="wide" className="mt-14 sm:mt-20">
          <PhotoMosaic photos={gallery.contact} />
        </Container>
      </section>
    </>
  );
}
