/**
 * Downloads the brand fonts (Clash Display, Switzer) from Fontshare before
 * `dev` and `build` (npm pre-scripts), into src/assets/fonts.
 *
 * Why not commit them? They're under ITF's Fontshare licence, which allows
 * self-hosting them on our own website but restricts redistributing the font
 * files, and this repository is public. The site still serves them from its
 * own domain, so visitors' browsers never contact a font service.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets", "fonts");
// One request per family: the Fontshare CSS API only answers for the first family in a combined request.
const CSS = [
  "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600&display=swap",
  "https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600&display=swap",
];
const FILE_NAMES = { "Clash Display": "ClashDisplay", Switzer: "Switzer" };

const wanted = [
  ...[400, 500, 600].map((w) => `ClashDisplay-${w}.woff2`),
  ...[300, 400, 500, 600].map((w) => `Switzer-${w}.woff2`),
];
if (wanted.every((f) => existsSync(join(OUT, f)))) process.exit(0);

mkdirSync(OUT, { recursive: true });
const headers = { "User-Agent": "Mozilla/5.0 (boostturku.com build)" };
const css = (await Promise.all(CSS.map(async (url) => (await fetch(url, { headers })).text()))).join("\n");
const faces = [...css.matchAll(/font-family:\s*'([^']+)';\s*src:\s*url\('([^']+?\.woff2)'\)[\s\S]*?font-weight:\s*(\d+);/g)];
if (!faces.length) throw new Error("fetch-fonts: no fonts found in the Fontshare CSS response");

for (const [, family, url, weight] of faces) {
  if (!(family in FILE_NAMES)) continue; // the API sometimes includes other families
  const name = `${FILE_NAMES[family] ?? family.replace(/\s+/g, "")}-${weight}.woff2`;
  if (existsSync(join(OUT, name))) continue;
  const res = await fetch(url.startsWith("//") ? `https:${url}` : url, { headers });
  if (!res.ok) throw new Error(`fetch-fonts: ${name} failed with ${res.status}`);
  writeFileSync(join(OUT, name), Buffer.from(await res.arrayBuffer()));
  console.log(`fetch-fonts: downloaded ${name}`);
}

const missing = wanted.filter((f) => !existsSync(join(OUT, f)));
if (missing.length) throw new Error(`fetch-fonts: still missing ${missing.join(", ")}`);
