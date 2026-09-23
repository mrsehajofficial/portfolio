/**
 * Asset generator: rasterizes public/favicon.svg and public/og-image.svg
 * into the PNG renditions referenced by app/layout.tsx metadata and app/manifest.ts
 *
 *   icon-192.png / icon-512.png           — "any" purpose launchers/favicons
 *   icon-maskable-192.png / -512.png      — full-bleed art inside Android's circular mask safe zone
 *   apple-touch-icon.png                  — iOS home-screen icon (Apple ignores SVG favicons)
 *   favicon.ico                           — multi-res 16/32/48 ICO container
 *   og-image.png                          — 1200x630 social share card
 *
 * Run once whenever the brand mark changes:
 *   node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(root, "..", "public");

const faviconSvg = await readFile(path.join(publicDir, "favicon.svg"));
const ogSvg = await readFile(path.join(publicDir, "og-image.svg"));

// Full-bleed maskable variant for Android launchers and Apple Touch Icon:
// Solid #17130d background with the SV monogram scaled safely inside the inner 70% zone.
const fullBleedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#17130d"/>
  <path d="M 40 21.5 C 38 18.5 34.5 17 29.5 17 C 22.5 17 18 20.5 18 26 C 18 34.5 35 32 35 40 C 35 43.5 31.8 46 26.5 46 C 21.2 46 17.5 43 15.5 39.5" 
        fill="none" 
        stroke="#f2efe8" 
        stroke-width="4.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
  <path d="M 33 26.5 L 43.5 46.5 L 53 26.5" 
        fill="none" 
        stroke="#d6401f" 
        stroke-width="4.5" 
        stroke-linecap="round" 
        stroke-linejoin="round" />
  <circle cx="43.5" cy="18" r="2.2" fill="#d6401f" />
</svg>`;

const densityFor = (size, base = 64) => Math.round((72 * size) / base);

const targets = [
  { src: faviconSvg, name: "icon-192.png", size: 192, base: 64 },
  { src: faviconSvg, name: "icon-512.png", size: 512, base: 64 },
  { src: Buffer.from(fullBleedSvg), name: "icon-maskable-192.png", size: 192, base: 64 },
  { src: Buffer.from(fullBleedSvg), name: "icon-maskable-512.png", size: 512, base: 64 },
  { src: Buffer.from(fullBleedSvg), name: "apple-touch-icon.png", size: 180, base: 64 },
];

for (const { src, name, size, base } of targets) {
  const out = path.join(publicDir, name);
  await sharp(src, { density: densityFor(size, base) })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✔ ${name} (${size}×${size})`);
}

// Generate og-image.png (1200x630)
const ogOut = path.join(publicDir, "og-image.png");
await sharp(ogSvg)
  .resize(1200, 630)
  .png({ compressionLevel: 8 })
  .toFile(ogOut);
console.log(`✔ og-image.png (1200×630)`);

// Classic favicon.ico: multi-resolution ICO container (16/32/48)
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(faviconSvg, { density: densityFor(size, 64) })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer(),
  ),
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
  path.join(publicDir, "favicon.ico"),
  Buffer.concat([header, directory, ...icoPngs]),
);
console.log(`✔ favicon.ico (${icoSizes.join("/")})`);

console.log("\nAll icons and OG images written to public/ successfully.");
