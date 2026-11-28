# React Bits components

Animated components copied from [reactbits.dev](https://reactbits.dev) (TypeScript + Tailwind variants, fetched from
`https://reactbits.dev/r/<Name>-TS-TW.json` on 2026-11-12).

**Licence:** these components are © David Haz, under the React Bits licence (MIT + Commons Clause), included in
[`LICENSE.md`](./LICENSE.md). They may be used as part of this website, but not sold or redistributed on their own.
This folder is **not** covered by the repository's MIT licence.

**Rules for this folder**

- These files are third-party code. Keep them as close to upstream as possible so they can be refreshed.
- Don't put Boost-specific styling or copy here. Wrap a component in `src/components/ui/` or a section component instead.
- If you must patch one, add a `// PATCH(boost): reason` comment on the changed lines.

| Component | Used for | Dependency |
|---|---|---|
| `BlurText` | Hero headline reveal | `motion` |
| `CountUp` | Impact numbers | `motion` |
| `LogoLoop` | Alumni company logos | — |
| `ScrollReveal` | Manifesto text that resolves word by word on scroll | `gsap` |
| `FlowingMenu` | Programs list with hover marquee band | `@hugeicons/*` |
| `RotatingText` | Rotating last word of the hero headline | `motion` |
| `DepthCarousel` | "Life at Boost" 3D photo carousel | `gsap` |

To add another: `curl https://reactbits.dev/r/<Name>-TS-TW.json` and copy `files[0].content` here.
