import { GridField } from "@/components/effects/GridField";
import Magnet from "@/components/reactbits/Magnet";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

const perks = [
  "First to hear about events and programs",
  "Access to founders, coaches and investors",
  "Vote at meetings and run for the board",
];

export function JoinSection({ index }: { index?: number }) {
  const telegram = site.socials.find((s) => s.label === "Telegram")!;
  return (
    <section className="px-3 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative isolate mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-night text-white lg:grid-cols-12">
        <GridField tone="dark" className="-z-10" mask="radial-gradient(ellipse 60% 90% at 0% 100%, #000 10%, transparent 70%)" />

        <div className="px-6 py-16 sm:px-12 sm:py-20 lg:col-span-7 lg:px-16 lg:py-24">
          <p className="label-mono flex items-center gap-3 text-white/55">
            {index !== undefined && <span className="text-white">({String(index).padStart(2, "0")})</span>}
            Membership · Free
          </p>
          <h2 className="heading mt-5 max-w-xl text-4xl sm:text-[3.5rem]">Join the Boost community</h2>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-white/75">
                <span aria-hidden className="h-px w-5 bg-boost" />
                {perk}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnet padding={60} magnetStrength={4} maxOffset={10} wrapperClassName="inline-flex">
              <ButtonLink href={site.links.membership} size="lg" arrow className="w-full sm:w-auto">
                Become a member
              </ButtonLink>
            </Magnet>
            <ButtonLink href={telegram.href} size="lg" variant="light">
              Join our Telegram
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-72 p-3 lg:col-span-5 lg:min-h-0 lg:p-4 lg:pl-0">
          <Photo
            photo={photos.rooftopCrew}
            className="h-full min-h-72 rounded-[1.5rem]"
            sizes="(min-width: 1024px) 40vw, 95vw"
          />
        </div>
      </div>
    </section>
  );
}
