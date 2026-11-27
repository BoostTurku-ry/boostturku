import localFont from "next/font/local";

/** Axis (caps only): the hero headline and big numbers. */
export const axis = localFont({
  src: "../assets/fonts/Axis-Extrabold.otf",
  weight: "800",
  style: "normal",
  variable: "--font-axis",
  display: "swap",
});

/**
 * Boost brand typography (see the brandbook):
 * - Clash Display: section and card headings, small functional labels.
 * - Switzer: body copy and interface text (Light for paragraphs).
 * Both are from Fontshare (ITF Free Font License, free for commercial and web use)
 * and are self-hosted from src/assets/fonts.
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
