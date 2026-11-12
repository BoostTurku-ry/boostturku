import type { NavLink } from "./types";

export const site = {
  name: "Boost Turku",
  legalName: "Boost Turku ry",
  description:
    "Boost Turku is a student-run entrepreneurship society. Free events, accelerator programs and a community for students in Turku who want to build things.",
  email: "info@boostturku.com",
  foundedYear: 2009,
  address: {
    venue: "Konttori",
    street: "Hämeenkatu 9",
    city: "20500 Turku",
  },
  links: {
    luma: "https://lu.ma/boost",
    membership: "/get-involved",
    ideaForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSd_ULN2AkSZfvyD5y9d382OG2rkIfactWh3MfMhYMD3QQ9xXw/viewform",
    boostHer: "https://boosther.boostturku.com",
  },
  socials: [
    { label: "Telegram", href: "https://t.me/boostturku", external: true },
    { label: "Instagram", href: "https://www.instagram.com/boostturku/", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/boostturku/", external: true },
    { label: "Facebook", href: "https://www.facebook.com/boostturku", external: true },
  ] satisfies NavLink[],
} as const;

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Alumni", href: "/alumni" },
  { label: "Stories", href: "/blog" },
  { label: "BoostHer", href: "https://boosther.boostturku.com", external: true },
];
