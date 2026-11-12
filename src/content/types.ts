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

export type BoostEvent = {
  title: string;
  host?: string;
  date: string; // ISO date, Europe/Helsinki
  time: string;
  venue: string;
  url: string;
  tag: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AlumniLogo = {
  name: string;
  src: string;
  href?: string;
};
