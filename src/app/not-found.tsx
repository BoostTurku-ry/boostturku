import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { gallery } from "@/content/gallery";

/** Unknown URLs render outside the (site) group, so this page brings the site chrome itself. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="flex min-h-[80svh] items-center">
          <Container size="wide" className="grid items-center gap-12 pt-28 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="meta-label text-boost">404</p>
              <h1 className="heading-display mt-6 text-[clamp(3rem,9vw,7rem)]">Page not found.</h1>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                The page you were looking for doesn&apos;t exist. It may have moved when we rebuilt the site.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/" arrow>
                  Back to home
                </ButtonLink>
                <ButtonLink href="/events" variant="outline">
                  See upcoming events
                </ButtonLink>
              </div>
            </div>
            <Photo photo={gallery.notFound} className="aspect-[4/5] lg:col-span-5" sizes="(min-width: 1024px) 40vw, 95vw" />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
