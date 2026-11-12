export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Photo = {
  src: string;
  alt: string;
  /** Intrinsic size of the file in /public, used for aspect ratios. */
  width: number;
  height: number;
};

export type Program = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  when: string;
  href: string;
  photo: Photo;
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AlumniCompany = {
  name: string;
  category: "journey" | "board" | "marathon" | "community";
  label: string;
  year?: number;
  href?: string;
  logo: string | null;
  /** Logo is white/light (made for dark backgrounds); invert it on light tiles. */
  light?: boolean;
};

export type Person = {
  name: string;
  role: string;
  photo?: string;
  email?: string;
  linkedin?: string;
};

export type ProgramDetail = {
  slug: string;
  name: string;
  tagline: string;
  /** One or two sentences under the page title. */
  summary: string;
  status: { label: string; tone: "open" | "closed" | "next" };
  primaryCta?: { label: string; href: string };
  photo: Photo;
  facts: { label: string; value: string }[];
  overview: string[];
  blocks: { title: string; items: { title?: string; body: string }[] }[];
  schedule?: { title: string; intro?: string; days: { label: string; items: [string, string][] }[] };
  highlight?: { eyebrow: string; title: string; body: string; items: { label: string; value: string }[] };
  faq?: FaqItem[];
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  cover?: string;
};

export type AlumniLogo = {
  name: string;
  src: string;
  href?: string;
};
