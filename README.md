# boostturku.com

The new website for **Boost Turku ry**, Turku's student-run entrepreneurship society. It replaces the old Webflow site with a community-first design built on real photos from Boost events.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · [motion](https://motion.dev) · animated components from [reactbits.dev](https://reactbits.dev)

> Next.js 16 differs from older versions. Read `node_modules/next/dist/docs/` before using an API you're unsure about (see `AGENTS.md`).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (must pass before merging)
npm run lint
```

## Project structure

```
src/
├── app/                    Routes only: pages, layouts, metadata, icon
│   ├── layout.tsx          Root layout (fonts, header, footer)
│   ├── page.tsx            Home page, composed from sections
│   └── globals.css         Design tokens (@theme) and base styles
├── components/
│   ├── brand/              Boost logo and other brand marks
│   ├── layout/             SiteHeader, SiteFooter
│   ├── motion/             Our own small animation helpers (Reveal…)
│   ├── reactbits/          Third-party React Bits components (vendored, see its README)
│   ├── sections/<page>/    Page sections, grouped by page (home, about, alumni, blog, programs, forms)
│   ├── sections/shared/    Sections used on several pages (PageHero, FAQ, Join, EventCard…)
│   └── ui/                 Reusable primitives: Button, Badge, Container, Photo, SectionHeading
├── content/                All copy and data, typed. No JSX here.
│   ├── posts/              Stories as Markdown (103 posts imported from the old site)
│   └── events-snapshot.json  Fallback archive if lu.ma is unreachable
├── hooks/                  Reusable React hooks (useMediaQuery…)
├── lib/                    Helpers: posts (Markdown), luma (live events), forms (server actions), dates, theme
├── styles/                 Font setup
└── assets/fonts/           Self-hosted font files (Axis)
public/images/
├── community/              Event and community photos (resized originals)
├── people/                 Portraits
└── alumni/                 Alumni company logos
```

### Rules of thumb

- **Content lives in `src/content/`.** If you're changing wording, dates, links or photos, you shouldn't need to touch a component.
- **`app/` only wires things together.** Page files import sections; sections import `ui/` and `content/`.
- **Sections belong to a page** (`sections/home/…`). When a section is needed on a second page, move it to `sections/shared/`.
- **`reactbits/` stays close to upstream.** Wrap it rather than restyling it in place. Lint rules are relaxed only for that folder.
- **Photos:** add them to `public/images/community/`, at most 2000px on the long side and as JPG, with a descriptive kebab-case name. Register each one in `src/content/photos.ts` with real alt text.

## Design language

Professional and minimal, with a community feel that comes from the photography rather than decoration.

- **Colours:** off-white `#FAF8F5`, white surfaces, ink `#141314`, hairline borders `#E7E2DC`, and **one accent**: Boost red `#C52127`. Tokens live in `globals.css`.
- **Type:**
  - **Axis** (Boost's brand face; it only has capitals) is for brand moments only: the hero headline and big numbers (`heading-display`).
  - Section and card headings are **DM Sans** semibold in sentence case (`heading`). Body text is DM Sans.
- **Photos:** real community photos, cropped cleanly with rounded corners. No captions, tilts or overlays. The gallery uses React Bits `Masonry` (blur-to-focus reveal, lightbox).
- **Editorial structure:** every section opens with a hairline rule and a numbered mono label, e.g. `(03) PROGRAMS`. The title and intro sit in a two-column "magazine" header (`SectionHeading`). Small labels, dates and meta use **Geist Mono** (`label-mono`).
- **Signature moments** (keep these few, and don't add more):
  - The hero's last word rotates (`RotatingText`).
  - The manifesto resolves word by word as you scroll (`ScrollReveal`).
  - The programs index shows a red marquee band on hover (`FlowingMenu`).
- **Components:** flat buttons, thin borders, no heavy shadows or stickers.
- **Header:** a floating glass pill (`position: fixed`), so **every page's first section must reserve top space** (the home hero uses `pt-28`).
- **Atmosphere:** `components/effects/GridField` (React Bits `CursorGrid`) is a very faint grid that lights up around the cursor. It's masked away from body text, and used only in the hero, Events, Impact and Join sections. There's no grain or noise.
- **Themes:** light and dark via `<html data-theme>`. Every colour token is redefined in `globals.css`. Use the `night` token for always-dark sections.
- **Motion:** subtle, and everything respects `prefers-reduced-motion`.

## Content source

The text, photos and history behind this site come from the knowledgebase in `../knowledgebase` (outside this repo): a full scrape of the old site, the lu.ma events archive and outside sources.

## Data sources

- **Events** come live from the public lu.ma calendar (`src/lib/luma.ts`) and are cached for an hour. If lu.ma can't be reached, the archive falls back to `events-snapshot.json`, and upcoming events show a link to lu.ma rather than claiming nothing is scheduled.
- **Stories** are Markdown files in `src/content/posts/`. Add a post by adding a file with the same frontmatter fields; images go in `public/images/blog/`.
- **Programs, board, partners and alumni** are typed data in `src/content/`. Update program `status` and dates each season.

## Status

- [x] Home, About, Programs (+ Startup Journey, Startup Marathon, OmaHomma, PoC Grant), Events, Alumni, Stories (+ 103 posts), Get involved, Contact, 404, sitemap
- [ ] **Forms aren't connected yet.** Membership and contact submissions are validated but only logged on the server (`src/lib/forms.ts`, see `TODO(boost)`). Connect them to email or a sheet before launch.
- [ ] Program application links for the next round (add `primaryCta` in `src/content/programs.ts` when applications open)
- [ ] BoostHer pages (currently links to boosther.boostturku.com)
