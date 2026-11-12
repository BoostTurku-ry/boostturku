import type { Photo } from "./types";

/** Community photos in /public/images/community. Single source for alt text and dimensions. */
export const photos = {
  rooftopCrew: {
    src: "/images/community/rooftop-crew.jpg",
    alt: "The Boost team together on a rooftop terrace in Turku",
    width: 2000,
    height: 1336,
  },
  startupJourney2024: {
    src: "/images/community/startup-journey-2024.jpg",
    alt: "Startup Journey 2024 participants on a pier by the sea",
    width: 960,
    height: 733,
  },
  welcomeNight: {
    src: "/images/community/welcome-night.jpg",
    alt: "An event venue lit in red with a welcome screen before a Boost event",
    width: 2000,
    height: 1333,
  },
  eventNight: {
    src: "/images/community/event-night.jpg",
    alt: "A packed audience listening to a speaker at a Boost evening event",
    width: 1500,
    height: 1000,
  },
  firesideTalk: {
    src: "/images/community/fireside-talk.jpg",
    alt: "Students listening to a speaker at a Boost talk",
    width: 1500,
    height: 1000,
  },
  crewOnStage: {
    src: "/images/community/crew-on-stage.jpg",
    alt: "Boost board members together in front of a Boost banner",
    width: 1500,
    height: 1000,
  },
  hackathon: {
    src: "/images/community/hackathon.jpg",
    alt: "Participants at a sustainability hackathon",
    width: 2000,
    height: 1886,
  },
  terraceHangout: {
    src: "/images/community/terrace-hangout.jpg",
    alt: "Students meeting around tables on a sunny terrace",
    width: 2000,
    height: 1498,
  },
  siliconValley: {
    src: "/images/community/silicon-valley-trip.jpg",
    alt: "Boost members in front of the Golden Gate Bridge during the Silicon Valley study trip",
    width: 1280,
    height: 960,
  },
  journeyStage: {
    src: "/images/community/startup-journey-stage.jpg",
    alt: "A founder presenting on stage at Startup Journey Demo Day",
    width: 1336,
    height: 2000,
  },
  rooftopSunset: {
    src: "/images/community/rooftop-sunset.jpg",
    alt: "Two Boost members on a rooftop at sunset over Turku",
    width: 1600,
    height: 1365,
  },
  board2024: {
    src: "/images/community/board-2024.jpg",
    alt: "The 2024 Boost board by the water",
    width: 960,
    height: 1054,
  },
  keynoteStage: {
    src: "/images/community/keynote-stage.jpg",
    alt: "A speaker on stage beneath a large Boost logo",
    width: 2000,
    height: 1500,
  },
  omaHommaGroup: {
    src: "/images/community/omahomma-group.jpg",
    alt: "OmaHomma program participants in Turku",
    width: 940,
    height: 950,
  },
} satisfies Record<string, Photo>;
