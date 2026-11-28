import { photos } from "./photos";
import type { FaqItem, Person } from "./types";

/**
 * BoostHer: Boost's concept for women and minorities in entrepreneurship.
 * Copied from the old BoostHer site (boosther.boostturku.com), which this page replaces.
 */

export const boostHer = {
  title: "Encouraging women towards entrepreneurship.",
  /** The end of the title, set in the BoostHer italic. */
  accent: "entrepreneurship.",
  intro:
    "BoostHer is a concept under Boost Turku that brings more women and minorities into the startup ecosystem, through events, workshops and networking that lower the threshold to get started.",
  instagram: "https://www.instagram.com/boostherturku/",
  email: "wilma@boostturku.com",
  /** Matches BoostHer events in the lu.ma calendar (by series or title). */
  eventMatch: /boosther|female founder|women in tech/i,
};

/** Why BoostHer exists: figures and their sources, as cited on the old site. */
export const boostHerWhy = [
  { value: "11%", label: "of startups operating in Finland are founded by women", source: "Startup Genome, 2021" },
  { value: "81%", label: "of founding teams have only men as members", source: "Danske Bank, 2022" },
  { value: "103%", label: "more likely to be an impact company with at least one female founder", source: "Danske Bank, 2023" },
  { value: "35%", label: "more likely to outperform with gender-diverse leadership", source: "McKinsey" },
];

export const boostHerMission = [
  {
    title: "About",
    body: "BoostHer promotes the participation of women and minorities in the startup ecosystem. We provide practical tools for entrepreneurship and lower the threshold for joining the startup community.",
  },
  {
    title: "Mission",
    body: "To increase the representation of women and minorities in entrepreneurship and the startup ecosystem.",
  },
  {
    title: "Vision",
    body: "A diverse and inclusive startup ecosystem where everyone has the opportunity to innovate and succeed.",
  },
];

export const boostHerTeam: Person[] = [
  { name: "Wilma", role: "Team Lead", photo: "/images/people/boosther/wilma.jpg", linkedin: "https://linkedin.com/in/wilma-tiainen/" },
  { name: "India", role: "KM & Mentoring Program Lead", photo: "/images/people/boosther/india.jpg", focus: "38% 30%", linkedin: "https://www.linkedin.com/in/india-claudino/" },
  { name: "Uruj", role: "Tech Lead", photo: "/images/people/boosther/uruj.jpg", linkedin: "https://www.linkedin.com/in/uruj-sarwar/" },
  { name: "Kia", role: "Volunteer Lead", photo: "/images/people/boosther/kia.jpg", focus: "60% 30%", linkedin: "https://www.linkedin.com/in/kiakauppila/" },
  { name: "Eeva", role: "Marketing Lead", photo: "/images/people/boosther/eeva.jpg", linkedin: "https://www.linkedin.com/in/eeva-timonen/" },
  { name: "Suvi", role: "Wellbeing Lead", photo: "/images/people/boosther/suvi.jpg", linkedin: "https://www.linkedin.com/in/suvi-pajunen-b68006374/" },
];

/** Three portrait shots for the arches in the page header. */
export const boostHerHeroPhotos = [photos.femaleFounderEvening, photos.boostHerHosts, photos.femaleFounderNight];

/** Wide shots for the gallery further down (none repeat the header). */
export const boostHerGallery = [photos.boostHerCelebration, photos.boostHerBrunch, photos.boostHerPanel];

export const boostHerFaq: FaqItem[] = [
  {
    question: "What is BoostHer?",
    answer:
      "BoostHer is a concept under Boost Turku that promotes the participation of women and minorities in the startup ecosystem through events, workshops and networking opportunities.",
  },
  {
    question: "Who can join BoostHer events?",
    answer:
      "Anyone interested in entrepreneurship and supporting diversity in startups is welcome. Our events are especially designed to encourage women and underrepresented groups to get involved in the startup community.",
  },
  {
    question: "What kind of events do you organise?",
    answer:
      "Workshops, networking events and excursions that give practical tools for entrepreneurship. Our goal is to lower the threshold for joining the startup community.",
  },
  {
    question: "How can I get involved?",
    answer: "Follow us on Instagram and come to our events. We're always happy to collaborate with new partners and participants.",
  },
  {
    question: "Where are BoostHer events held?",
    answer: "In Turku, Finland. Follow our social media and the Boost events calendar for the latest events and locations.",
  },
];
