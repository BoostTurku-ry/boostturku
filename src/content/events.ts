import type { BoostEvent } from "./types";

/**
 * Hand-picked events from lu.ma/boost (snapshot 2026-11-12).
 * TODO: replace with a live fetch from the lu.ma calendar API.
 */
export const featuredEvents: BoostEvent[] = [
  {
    title: "Ideation and Product Thinking",
    host: "Tuukka Järvenpää · ex-Google, ex-Oura",
    date: "2026-11-24",
    time: "17:00",
    venue: "Edu-City, Joukahaisenkatu 7",
    url: "https://lu.ma/o7sfhw8t",
    tag: "Pre-Incubator",
  },
  {
    title: "Lean Canvas and Rapid Idea Validation",
    host: "Lauri Koittola · Boost Head Coach",
    date: "2026-12-01",
    time: "17:00",
    venue: "Edu-City, Joukahaisenkatu 7",
    url: "https://lu.ma/sma65awf",
    tag: "Pre-Incubator",
  },
];

export const recentEvents: BoostEvent[] = [
  {
    title: "Female Founder Night",
    date: "2026-11-11",
    time: "18:00",
    venue: "Fredrik & Doris",
    url: "https://lu.ma/k2j5da0q",
    tag: "BoostHer",
  },
  {
    title: "Find a Startup Co-founder",
    date: "2026-10-27",
    time: "16:30",
    venue: "Turku Startup Hub",
    url: "https://lu.ma/1w5hd6w3",
    tag: "Meetup",
  },
  {
    title: "Vibe Coding w/ Heidi Suutari + Lovable",
    date: "2026-10-23",
    time: "16:00",
    venue: "Astra",
    url: "https://lu.ma/b5rbdmns",
    tag: "Workshop",
  },
  {
    title: "Community Breakfast with DASH",
    date: "2026-10-16",
    time: "09:00",
    venue: "Konttori",
    url: "https://lu.ma/u7db8ifw",
    tag: "Breakfast",
  },
];
