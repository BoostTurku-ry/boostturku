import { Archivo } from "next/font/google";
import localFont from "next/font/local";

/**
 * Archivo (SIL Open Font License) at its widest setting: the hero headline and
 * big numbers, set in capitals. Downloaded by Next.js at build time and served
 * from our own domain; no font file is stored in this repo.
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * Boost brand typography (see the brandbook):
 * - Clash Display: section and card headings, small functional labels.
 * - Switzer: body copy and interface text (Light for paragraphs).
 * Both are from Fontshare (ITF licence: free for commercial and web use, including
 * self-hosting, but the font files may not be redistributed). They're served from
 * our own domain, and downloaded into src/assets/fonts at dev/build time by
 * scripts/fetch-fonts.mjs rather than committed to this public repo.
 */
export const clashDisplay = localFont({
  src: [
    { path: "../assets/fonts/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["Arial", "system-ui", "sans-serif"],
});

export const switzer = localFont({
  src: [
    { path: "../assets/fonts/Switzer-300.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Switzer-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
