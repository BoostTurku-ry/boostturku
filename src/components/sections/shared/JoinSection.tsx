import { CommunityButtons } from "@/components/sections/shared/CommunityButtons";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

const perks = [
  "First to hear about events and programs",
  "Access to founders, coaches and investors",
  "Vote at meetings and run for the board",
];

export function JoinSection() {
  return (
    <section className="px-3 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="relative isolate mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-night text-white lg:grid-cols-12">

        <div className="px-6 py-16 sm:px-12 sm:py-20 lg:col-span-7 lg:px-16 lg:py-24">
          <h2 className="heading max-w-xl text-4xl sm:text-[3.5rem]">Join the Boost community</h2>
          <ul className="mt-8 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-white/75">
                <span aria-hidden className="h-px w-5 bg-boost" />
                {perk}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={site.links.membership} size="lg" arrow className="w-full sm:w-auto">
                Become a member
              </ButtonLink>
            <CommunityButtons tone="dark" size="lg" />
          </div>
        </div>

        <div className="relative min-h-72 p-3 lg:col-span-5 lg:min-h-0 lg:p-4 lg:pl-0">
          <Photo
            photo={photos.teamRedHoodies}
            className="h-full min-h-72 rounded-[1.5rem]"
            sizes="(min-width: 1024px) 40vw, 95vw"
          />
        </div>
      </div>
    </section>
  );
}
