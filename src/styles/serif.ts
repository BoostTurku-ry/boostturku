import { Instrument_Serif } from "next/font/google";

/**
 * Italic serif for BoostHer's accents, echoing the script "Her" in its logo.
 * Kept out of the root layout so only the BoostHer page loads it.
 */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
