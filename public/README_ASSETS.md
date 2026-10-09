# Assets

Static files under `public/`, all referenced by `app/layout.tsx`, `lib/entity.ts`, `app/manifest.ts`, `app/robots.ts` or `app/sitemap.ts`.

## Versioned filenames

Every icon and share card carries a version suffix (`-v3`). This is deliberate,
not decoration: browsers and search engines cache favicons and share images by
URL, so changing `favicon.svg` in place gets you the *old* icon for weeks.
Publishing `favicon-v4.svg` is a new URL, so the update propagates immediately.

**When the mark changes:** bump the suffix in the SVG filenames, run
`node scripts/generate-icons.mjs`, then update the references in:

| File | What references |
| --- | --- |
| `app/layout.tsx` | `icons` (icon + apple) and `openGraph.images` |
| `lib/entity.ts` | `image` in the Person JSON-LD |
| `app/manifest.ts` | `icons[]` |
| every `app/*/page.tsx` | `openGraph.images[].url` |
| `app/sitemap.ts` | routes (via `lib/routes.ts`) |

## Favicon & app icons

| File | Purpose |
| --- | --- |
| `favicon-v3.svg` | Master vector mark — the tab/bookmark icon |
| `favicon-v3.ico` | Multi-resolution 16/32/48 ICO. Google Search's favicon picker does not accept SVG, so this is what search actually uses |
| `icon-192-v3.png` / `icon-512-v3.png` | Raster renditions for platforms that skip SVG icons |
| `icon-maskable-v3.svg` | Full-bleed source, art pre-scaled into the 80% safe zone |
| `icon-maskable-192-v3.png` / `icon-maskable-512-v3.png` | Android's circular launcher masks crop aggressively; this art survives every mask shape |
| `apple-touch-icon-v3.png` | iOS home-screen icon (Safari ignores SVG touch icons) |

Regenerate all PNGs and the ICO from the SVG sources:

```sh
node scripts/generate-icons.mjs
```

Uses the `sharp` devDependency already in `package.json`.

## Share preview

`og-image-v3.png` — 1200×630 social card. Kept as a PNG rather than SVG
because X, Facebook and LinkedIn do not render SVG previews; an SVG there
would show up blank.

## Site identity & crawler surface

| Path | Source | Purpose |
| --- | --- | --- |
| `/manifest.webmanifest` | `app/manifest.ts` | PWA/site identity card — name, description, icons, colors |
| `/robots.txt` | `app/robots.ts` | Crawl policy — allows all bots including AI agents, blocks `/api/` |
| `/sitemap.xml` | `app/sitemap.ts` | Canonical URL list, sourced from `lib/routes.ts` |
| `llms.txt` | static copy | Human-written summary read by LLM-based agents |

## Verification

`google417300d46f28f819.html` — Google Search Console verification file. Do not
rename or move it; the domain ownership check is bound to this filename.
