/**
 * Asset generator: rasterizes the versioned SVG sources in public/ into the
 * PNG/ICO renditions referenced by app/layout.tsx metadata and app/manifest.ts.
 *
 *   favicon-v3.svg              → icon-192-v3.png, icon-512-v3.png, favicon-v3.ico
 *   icon-maskable-v3.svg        → icon-maskable-192-v3.png, -512-v3.png, apple-touch-icon-v3.png
 *   og-image-v3.svg             → og-image-v3.png
 *
 * The version suffix is deliberate: it makes each design change a new URL, so
 * search engines and browsers re-fetch the icon instead of serving a cached
 * copy of the previous one. When the mark changes again, bump the suffixes in
 * the SOURCES constant below, run this script, and update the references in
 * app/layout.tsx, app/manifest.ts and lib/entity.ts.
 *
 * Run:
 *   node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(root, "..", "public");

/** Bump this when the brand mark or the layout changes. */
const VERSION = "v3";

const file = (base, ext = ".svg") => `${base}-${VERSION}${ext}`;

/**
 * sharp renders SVG through librsvg, which resolves the viewBox but needs an
 * explicit density to rasterize a small viewBox at a large pixel size. 64px
 * artwork at 192px output means density 2.5×; deriving it keeps strokes crisp.
 */
const densityFor = (size, base = 64) => Math.round((72 * size) / base);

const read = (name) => readFile(path.join(publicDir, name));

const faviconSvg = await read(file("favicon"));
const maskableSvg = await read(file("icon-maskable"));
const ogSvg = await read(file("og-image"));

const ogVersion = "v3";

const targets = [
  { src: faviconSvg, name: `icon-192-${VERSION}.png`, size: 192 },
  { src: faviconSvg, name: `icon-512-${VERSION}.png`, size: 512 },
  // Maskable art is full-bleed and pre-scaled into the safe zone, so it also
  // serves as the Apple touch icon.
  { src: maskableSvg, name: `icon-maskable-192-${VERSION}.png`, size: 192 },
  { src: maskableSvg, name: `icon-maskable-512-${VERSION}.png`, size: 512 },
  { src: maskableSvg, name: `apple-touch-icon-${VERSION}.png`, size: 180 },
];

for (const { src, name, size } of targets) {
  const out = path.join(publicDir, name);
  await sharp(src, { density: densityFor(size) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✔ ${name} (${size}×${size})`);
}

// Social share card. Kept as a PNG because X, Facebook and LinkedIn do not
// render SVG previews — an SVG here would show as a blank card.
const ogOut = path.join(publicDir, `og-image-${ogVersion}.png`);
await sharp(ogSvg, { density: 96 })
  .resize(1200, 630, { fit: "cover" })
  .png({ compressionLevel: 8 })
  .toFile(ogOut);
console.log(`✔ og-image-${ogVersion}.png (1200×630)`);

// Classic favicon.ico: a multi-resolution ICO container. favicon.svg alone
// isn't accepted by Google's favicon picker, so the ICO matters for search.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(faviconSvg, { density: densityFor(size) })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer()
  )
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved, must be 0
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(icoPngs.length, 4); // number of images

const directory = Buffer.alloc(16 * icoPngs.length);
let offset = header.length + directory.length;
icoPngs.forEach((png, i) => {
  const size = icoSizes[i];
  const entry = i * 16;
  directory.writeUInt8(size, entry);
  directory.writeUInt8(size, entry + 1);
  directory.writeUInt8(0, entry + 2);
  directory.writeUInt8(0, entry + 3);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});

await writeFile(
  path.join(publicDir, `favicon-${VERSION}.ico`),
  Buffer.concat([header, directory, ...icoPngs])
);
console.log(`✔ favicon-${VERSION}.ico (${icoSizes.join("/")})`);

console.log("\nAll icons and OG image written to public/.");
