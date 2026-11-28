import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

/**
 * Two typefaces, both under the SIL Open Font License, downloaded by Next.js at
 * build time and served from our own domain (no font files in this repo).
 * - Bricolage Grotesque: headings, the hero headline and big numbers.
 * - Instrument Sans: body copy, interface text and small labels.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});
