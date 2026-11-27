import { photos } from "./photos";
import type { Person } from "./types";

export const aboutHero = {
  eyebrow: "About Boost",
  title: "A student-run home for first-time founders.",
  intro:
    "Boost Turku is a non-profit entrepreneurship society run by students in Turku. Since 2009 we've helped students meet each other, test ideas and start companies, and everything we do is free.",
  photo: photos.boostSignSeaside,
};

export const story = {
  lead: "In 2009 there was hardly a startup scene in Turku. A group of students from the city's universities decided to build one themselves.",
  paragraphs: [
    "They founded Boost to give students what they were missing: other people to build with, coaches who had done it before, and a place to try without much at stake. Two years later the first Startup Journey accelerator ran, and it has run every summer since.",
    "Boost is still run the same way. A new student board takes over each year, alumni come back as coaches and mentors, and our partners cover the costs so that no student ever pays to take part.",
  ],
};

export const timeline = [
  { year: "2009", title: "Boost is founded", body: "Students from Turku's universities set up the society. Toni Perämäki is its first chairman." },
  { year: "2011", title: "First Startup Journey", body: "Our summer accelerator runs for the first time. It has run every summer since." },
  { year: "2012–16", title: "Growing the scene", body: "Startup Farm, hackathons, accelerators and study trips." },
  { year: "2016", title: "Best accelerator", body: "Startup Journey is named best accelerator program at the Nordic Startup Awards." },
  { year: "2018", title: "Startup Marathon", body: "The first 42-hour idea hackathon, plus Boost Dropout Academy." },
  { year: "2024", title: "Measuring impact", body: "The first Boost Impact report, and a study trip to Silicon Valley." },
  { year: "2026", title: "New programs", body: "The OmaHomma summer program and a Proof of Concept grant pilot with the City of Turku." },
];

export const pillars = [
  {
    title: "Events",
    body: "Talks, workshops, founder nights and community breakfasts throughout the academic year, open to everyone.",
    href: "/events",
  },
  {
    title: "Programs",
    body: "Startup Journey, Startup Marathon and OmaHomma take an idea from first sketch to a working business.",
    href: "/programs",
  },
  {
    title: "Community",
    body: "Members get access to founders, coaches and investors, and alumni come back to share what they learned.",
    href: "/get-involved",
  },
];

export const board: Person[] = [
  { name: "Heta Lääkkö", role: "President", photo: "/images/people/heta-laakko.jpg" },
  { name: "Tom Pippuri", role: "Vice President", photo: "/images/people/tom-pippuri.jpg" },
  { name: "Topi Hälinen", role: "Head of Finance", photo: "/images/people/topi-halinen.jpg" },
  { name: "Aino Kokkonen", role: "Head of Marketing", photo: "/images/people/aino-kokkonen.jpg" },
  { name: "Eetu Salminen", role: "Head of Projects", photo: "/images/people/eetu-salminen.jpg" },
  { name: "Arttu Karonen", role: "Head of Operations", photo: "/images/people/arttu-karonen.jpg" },
  { name: "Wilma Tiainen", role: "Head of Growth", photo: "/images/people/wilma-tiainen.jpg" },
];

export const director: Person = {
  name: "Lauri Koittola",
  role: "Executive Director & Head Coach",
  photo: "/images/people/lauri-koittola.jpg",
  email: "lauri@boostturku.com",
};

export const partners = {
  /** Main partners. Logos are white versions for the burgundy partners section. */
  key: [
    { name: "City of Turku", logo: "/images/partners/city-of-turku.png", href: "https://www.turku.fi" },
    { name: "Business Turku", logo: "/images/partners/business-turku.png", href: "https://businessturku.fi" },
    { name: "Turku Startup Hub", logo: "/images/partners/turku-startup-hub.png", href: "https://startupturku.com" },
  ],
  other: [
    { name: "University of Turku", logo: "/images/partners/university-of-turku.png", href: "https://www.utu.fi" },
    { name: "Turku University of Applied Sciences", logo: "/images/partners/turku-amk.png", href: "https://www.tuas.fi" },
  ],
};

export const ecosystem = {
  title: "Part of a national network",
  body: "Finland has a network of student-run entrepreneurship societies, including Aaltoes in Helsinki, Lutes in Lappeenranta and Tres in Tampere. Each helps students take their first steps, and alumni give back to the community that helped them.",
  link: { label: "Read Startup Foundation's report on entrepreneurship societies", href: "https://www.startup-saatio.fi/entrepreneurship-societies" },
};
