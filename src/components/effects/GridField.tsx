"use client";

import CursorGrid from "@/components/reactbits/CursorGrid";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

type GridFieldProps = {
  /** "auto" follows the site theme; "dark" is for always-dark sections. */
  tone?: "auto" | "dark";
  /** CSS mask deciding where the grid is visible (keep it away from body text). */
  mask?: string;
  className?: string;
};

/**
 * Decorative backdrop: a very faint hairline grid whose cells light up softly
 * around the cursor (React Bits CursorGrid). Canvas colours can't read CSS
 * variables, so they're chosen per theme here.
 */
export function GridField({
  tone = "auto",
  mask = "radial-gradient(ellipse 70% 80% at 75% 45%, #000 30%, transparent 80%)",
  className,
}: GridFieldProps) {
  const theme = useTheme();
  const dark = tone === "dark" || theme === "dark";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <CursorGrid
          lightMode={!dark}
          color={dark ? "#e0373d" : "#c52127"}
          gridColor={dark ? "#f1ede8" : "#141314"}
          cellSize={64}
          radius={170}
          gridOpacity={dark ? 0.04 : 0.035}
          fillOpacity={dark ? 0.035 : 0.04}
          maxOpacity={dark ? 0.35 : 0.45}
          spotlight={0.4}
          holdTime={450}
          fadeDuration={1000}
          edgeFade={0.3}
          clickPulse={false}
        />
      </div>
    </div>
  );
}
