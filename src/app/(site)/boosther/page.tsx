import type { Metadata } from "next";
import {
  BoostHerContact,
  BoostHerEvents,
  BoostHerGallery,
  BoostHerHero,
  BoostHerMission,
  BoostHerTeam,
  BoostHerWhy,
} from "@/components/sections/boosther/BoostHerSections";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { boostHer, boostHerFaq } from "@/content/boosther";
import { getPastEvents, getUpcomingEvents, type LumaEvent } from "@/lib/luma";
import { instrumentSerif } from "@/styles/serif";

export const metadata: Metadata = {
  title: "BoostHer",
  description: boostHer.intro,
};

const isBoostHer = (e: LumaEvent) => boostHer.eventMatch.test(`${e.series ?? ""} ${e.title}`);

/**
 * BoostHer has its own look inside the Boost site: soft pink, navy and an italic
 * serif, taken from the BoostHer logo. The page flow stays the same as elsewhere.
 */
export default async function BoostHerPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <div className={instrumentSerif.variable}>
      <BoostHerHero />
      <BoostHerWhy />
      <BoostHerMission />
      <BoostHerEvents upcoming={(upcoming ?? []).filter(isBoostHer)} past={past.filter(isBoostHer).slice(0, 6)} />
      <BoostHerGallery />
      <BoostHerTeam />
      <FaqSection items={boostHerFaq} />
      <BoostHerContact />
    </div>
  );
}
