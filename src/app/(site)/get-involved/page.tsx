import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BoardApplyCallout } from "@/components/sections/apply/ApplyStatus";
import { MembershipForm } from "@/components/sections/forms/MembershipForm";
import { PageHero } from "@/components/sections/shared/PageHero";
import { PhotoMosaic } from "@/components/sections/shared/PhotoMosaic";
import { gallery } from "@/content/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { boardFacts, involvedHero, memberPerks, ways } from "@/content/getInvolved";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Become a free Boost member, volunteer at events or run for the board.",
};

export default function GetInvolvedPage() {
  const telegram = site.socials.find((s) => s.label === "Telegram")!;

  return (
    <>
      <PageHero title={involvedHero.title} accent="everything else." intro={involvedHero.intro} photos={gallery.heroes.involved} />

      {/* Membership */}
      <section id="join" className="scroll-mt-24 pb-14 sm:pb-20">
        <Container size="wide" className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading title="What members get" layout="stack" />
            <ul className="mt-10 border-t border-line">
              {memberPerks.map((perk, i) => (
                <li key={perk.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-5">
                  <span className="meta-label pt-1 text-boost">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-semibold text-ink">{perk.title}</p>
                    <p className="mt-1 leading-relaxed text-ink-soft">{perk.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-muted">
              Prefer chat? Join our{" "}
              <a href={telegram.href} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
                Telegram channel
              </a>{" "}
              for news and announcements.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:col-span-7">
            <p className="meta-label text-ink-muted">Membership form</p>
            <p className="heading mt-3 text-3xl">Join Boost</p>
            <p className="mt-2 mb-8 text-ink-soft">It takes a minute, and there&apos;s no membership fee.</p>
            <MembershipForm />
          </div>
        </Container>
      </section>

      {/* Do more */}
      <section className="pb-14 sm:pb-20">
        <Container size="wide">
          <PhotoMosaic photos={gallery.involved} />
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-14 sm:py-20">
        <Container size="wide">
          <SectionHeading
            title="Help run Boost"
            intro="Boost is run entirely by students. Everything you see on this site is organised by people who started out just like you."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {ways.map((way, i) => (
              <li key={way.title} className="bg-surface p-8">
                <span className="meta-label text-boost">{String(i + 1).padStart(2, "0")}</span>
                <p className="heading mt-6 text-2xl">{way.title}</p>
                <p className="mt-3 leading-relaxed text-ink-soft">{way.body}</p>
                {way.cta && (
                  <Link href={way.cta.href} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-boost">
                    {way.cta.label} <span aria-hidden>→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Board facts */}
          <div className="mt-16 grid gap-10 rounded-3xl bg-night p-8 text-white sm:p-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="meta-label text-white/55">Thinking about the board?</p>
              <p className="heading mt-4 text-3xl">What it takes</p>
              <p className="mt-4 max-w-sm leading-relaxed text-white/70">
                Board work is a real commitment, and it&apos;s also one of the fastest ways to build your network and skills in
                the Finnish startup ecosystem.
              </p>
            </div>
            <dl className="divide-y divide-white/15 border-y border-white/15 lg:col-span-7">
              {boardFacts.map((fact) => (
                <div key={fact.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="meta-label pt-1 text-white/50">{fact.label}</dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <Suspense>
              <BoardApplyCallout />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
