import type { BrandIconName } from "@/components/brand/BrandIcon";
import { photos } from "./photos";
import type { FaqItem, Photo, Program, Stat } from "./types";

export const hero = {
  kicker: "Student entrepreneurship society",
  headline: {
    lead: "Where students",
    verb: "become",
    /** The last word rotates; the first entry is the canonical headline. */
    rotating: ["founders.", "builders.", "leaders.", "makers."],
  },
  body: "Boost Turku is a student-run community. We organise free events, accelerator programs and mentoring for students who want to build something of their own, with or without an idea yet.",
  primaryCta: { label: "Upcoming events", href: "/events" },
  secondaryCta: { label: "Become a member", href: "/get-involved" },
  highlights: [
    { value: "180+", label: "companies founded by alumni" },
    { value: "€47M+", label: "raised by alumni startups" },
  ],
  meta: {
    place: "Turku, Finland",
    coordinates: "60.4518° N · 22.2666° E",
    established: "Est. 2009",
  },
  /** Slow photo strip under the hero, in this order. Any aspect ratio works; all are shown at the same height. */
  strip: [
    photos.teamRedHoodies,
    photos.journeyWinner,
    photos.eventSelfie,
    photos.boostSignSeaside,
    photos.packedHall,
    photos.boostHerCelebration,
    photos.thumbsUp,
    photos.goldenGate,
    photos.demoDayGroup,
    photos.femaleFounderEvening,
    photos.boostBar,
    photos.redVenueTalk,
    photos.breakfastPrep,
    photos.teamBlackHoodies,
    photos.audienceSteps,
    photos.boostHerHosts,
    photos.winner2019,
    photos.slackOffice,
    photos.boostSignCelebration,
  ] satisfies Photo[],
};

export const manifesto = {
  text: "Boost is where Turku's students take their first step into entrepreneurship. We're run by students, backed by partners who believe in them, and free for everyone, because the best time to start something is before you feel ready.",
  facts: [
    { label: "Founded", value: "2009" },
    { label: "Run by", value: "Students" },
    { label: "Cost", value: "Always free" },
    { label: "Equity taken", value: "None" },
  ],
  cta: { label: "Our story", href: "/about" },
};

export const waysIn: { step: string; title: string; icon: BrandIconName; body: string; cta: { label: string; href: string }; photo: Photo }[] = [
  {
    step: "01",
    title: "Attend",
    icon: "event",
    body: "Talks, workshops, breakfasts and hackathons throughout the year. Every event is free and open to all.",
    cta: { label: "Browse events", href: "/events" },
    photo: photos.packedHall,
  },
  {
    step: "02",
    title: "Build",
    icon: "rocketLaunch",
    body: "Structured programs take you from first idea to a pitch in front of investors, with experienced coaches.",
    cta: { label: "Explore programs", href: "/programs" },
    photo: photos.demoDaySpeaker,
  },
  {
    step: "03",
    title: "Contribute",
    icon: "groups",
    body: "Become a member, volunteer or join the board. Boost is run by students, and shaped by the people in it.",
    cta: { label: "Get involved", href: "/get-involved" },
    photo: photos.breakfastPrep,
  },
];

export const programs: Program[] = [
  {
    slug: "startup-journey",
    name: "Startup Journey",
    tagline: "Summer accelerator",
    description:
      "An intensive eight-week, on-site accelerator for early-stage teams, ending in a Demo Day for investors. Free, with no equity taken.",
    when: "June–August",
    href: "/programs/startup-journey",
    photo: photos.journeyWinner,
  },
  {
    slug: "startup-marathon",
    name: "Startup Marathon",
    tagline: "42-hour idea hackathon",
    description:
      "Form a team, validate an idea with real customers and pitch it within one weekend. No prior experience needed.",
    when: "March",
    href: "/programs/startup-marathon",
    photo: photos.outdoorCrowd,
  },
  {
    slug: "omahomma",
    name: "OmaHomma",
    tagline: "Create your own summer job",
    description:
      "A flexible summer program for turning your skills or side project into income, with weekly check-ins and coaching.",
    when: "Apply March–May",
    href: "/programs/omahomma",
    photo: photos.slackOffice,
  },
  {
    slug: "boosther",
    name: "BoostHer",
    tagline: "Diversity in entrepreneurship",
    description:
      "Workshops, mentoring and founder nights that lower the threshold for women and underrepresented founders.",
    when: "Year-round",
    href: "https://boosther.boostturku.com",
    photo: photos.boostHerCelebration,
  },
];

export const stats: Stat[] = [
  { value: 180, suffix: "+", label: "Companies founded by alumni" },
  { value: 47, prefix: "€", suffix: "M+", label: "VC raised by alumni companies" },
  { value: 66, prefix: "€", suffix: "M+", label: "Alumni company revenue in 2023" },
  { value: 60, suffix: "+", label: "Free events organised in 2026" },
];

export const galleryPhotos: Photo[] = [
  photos.boostSignCelebration,
  photos.redLightDuo,
  photos.boostHerHosts,
  photos.goldenGate,
  photos.femaleFounderNight,
  photos.teamBlackHoodies,
  photos.eventSelfie,
  photos.sponsorWall,
  photos.thumbsUp,
  photos.boardByTheWater,
  photos.crewBoostBanner,
  photos.boostHerPanel,
];

export const faq: FaqItem[] = [
  {
    question: "Who can attend Boost events?",
    answer:
      "Everyone. Our events are aimed at higher-education students in Turku (UTU, TUAS, ÅA and Novia), but they are open and free to all. You don't need to be a member or a student.",
  },
  {
    question: "Is there a cost to participate?",
    answer:
      "No. All events and programs are free, and we never take equity. Boost Turku ry is a non-profit supported by our partners, led by the City of Turku, Business Turku and Turku Startup Hub.",
  },
  {
    question: "Do I need a startup idea to get involved?",
    answer:
      "No. Most people start without one. Attend an event, join a team at the Startup Marathon, or explore options through OmaHomma.",
  },
  {
    question: "What is an entrepreneurship society?",
    answer:
      "A student-run organisation that helps students take their first steps toward entrepreneurship. Finland has a national network of them, including Aaltoes, Lutes and Tres.",
  },
  {
    question: "Can I earn study credits?",
    answer:
      "In many cases, yes. The University of Turku offers a 'Boost related activities' course worth 2–6 ECTS, and the Startup Marathon counts toward it (27 hours = 1 ECTS).",
  },
];
