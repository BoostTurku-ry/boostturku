import { DM_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

/** Boost's brand display face (caps only). Used for brand moments: hero, big numbers, wordmark. */
export const axis = localFont({
  src: "../assets/fonts/Axis-Extrabold.otf",
  weight: "800",
  style: "normal",
  variable: "--font-axis",
  display: "swap",
});

/** Body and section headings. */
export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

/** Editorial labels: section indices, dates, meta. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
