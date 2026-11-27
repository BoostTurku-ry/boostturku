export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "boost-theme";

/**
 * Runs inline in <head> before first paint: applies the visitor's saved theme.
 * Light is the default (the OS preference is deliberately ignored); dark only
 * applies once someone picks it with the toggle. Prevents a flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light")}catch(e){}})()`;

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if (!persist) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode etc.) — theme still applies for this visit.
  }
}
