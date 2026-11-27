import { photos } from "./photos";
import type { Photo } from "./types";

/**
 * Photo sets used across inner pages (mosaics and strips). Hero and card photos
 * live with their page's content; this file holds the extra community imagery.
 */
export const gallery = {
  /** About: life in the community. One large + four. */
  about: [photos.teamRedHoodies, photos.goldenGate, photos.boardByTheWater, photos.sponsorWall, photos.boostSignCelebration],
  /** Events page strip between upcoming and archive. */
  events: [
    photos.redVenueTalk,
    photos.audienceSteps,
    photos.boostHerBrunch,
    photos.femaleFounderEvening,
    photos.outdoorCrowd,
    photos.eventStand,
    photos.demoDayAudience,
    photos.breakfastPrep,
    photos.boostHerPanel,
    photos.packedHall,
  ],
  /** Get involved: the people who run Boost. One large + four. */
  involved: [photos.teamBlackHoodies, photos.breakfastPrep, photos.boostHerHosts, photos.eventSelfie, photos.boostSignToast],
  /** Alumni: winners and Demo Day. */
  alumni: [photos.winner2019, photos.journeyWinner, photos.chequeOnStage, photos.demoDaySpeaker, photos.sponsorWall, photos.demoDayAudience],
  /** Contact page. One large + two. */
  contact: [photos.crewBoostBanner, photos.redLightDuo, photos.boostSignToast],
  /** Program pages: three photos each, shown after the program details. */
  programs: {
    "startup-journey": [photos.demoDayGroup, photos.journeyWinner, photos.demoDayAudience],
    "startup-marathon": [photos.chequeOnStage, photos.audienceSteps, photos.eventStand],
    omahomma: [photos.eventSelfie, photos.breakfastPrep, photos.sponsorWall],
    "poc-grant": [photos.journeyWinner, photos.winner2019, photos.teamRedHoodies],
  } as Record<string, readonly Photo[]>,
  /** Stories index header. */
  stories: photos.demoDayAudience,
  /** Events index header. */
  eventsHero: photos.packedHall,
  /** 404. */
  notFound: photos.eventSelfie,
};
