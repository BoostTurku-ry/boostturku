"use client";

import { useSyncExternalStore } from "react";

/**
 * True when the media query matches. Returns `serverValue` during SSR and
 * hydration, then tracks the real value.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
