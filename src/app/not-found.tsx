import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <Container size="wide" className="pt-28">
        <p className="label-mono text-boost">404</p>
        <h1 className="heading-display mt-6 text-[clamp(3rem,9vw,7rem)]">Page not found.</h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          The page you were looking for doesn&apos;t exist. It may have moved when we rebuilt the site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/blog" variant="outline">
            Browse stories
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
