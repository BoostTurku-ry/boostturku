import type { NavLink } from "./types";

export const site = {
  name: "Boost Turku",
  legalName: "Boost Turku ry",
  /** Business ID (Y-tunnus). */
  businessId: "2321515-1",
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
    boostHer: "/boosther",
  },
  /** Community chats: the Telegram channel for news, the WhatsApp community for chatting. */
  community: {
    telegram: { label: "Telegram", href: "https://t.me/boostturku" },
    whatsapp: { label: "WhatsApp", href: "https://chat.whatsapp.com/HgOoLSRPEUO76IaJCTpQlo" },
  },
  socials: [
    { label: "Telegram", href: "https://t.me/boostturku", external: true },
    { label: "WhatsApp community", href: "https://chat.whatsapp.com/HgOoLSRPEUO76IaJCTpQlo", external: true },
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
  { label: "BoostHer", href: "/boosther" },
];

export const footerNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Alumni", href: "/alumni" },
  { label: "BoostHer", href: "/boosther" },
  { label: "Get involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

/** Named contacts shown on the contact page. */
export const contacts = [
  { topic: "General questions", name: "Boost Turku", email: "info@boostturku.com" },
  { topic: "The board", name: "Boost Turku board", email: "board@boostturku.com" },
  { topic: "Programs and coaching", name: "Lauri Koittola, Executive Director", email: "lauri@boostturku.com" },
  { topic: "Proof of Concept grant", name: "Heta Lääkkö, President", email: "heta@boostturku.com" },
  { topic: "BoostHer", name: "Wilma Tiainen, BoostHer lead", email: "wilma@boostturku.com" },
];
