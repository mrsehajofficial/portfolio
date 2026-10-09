import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";
import { PAGE_PATHS } from "../lib/routes";

type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];

interface PageSpec {
  path: PagePath;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}

/**
 * Every URL here is built from the one canonical-origin constant in
 * lib/site.ts (https://sehaj.wasmer.app) and the route table in
 * lib/routes.ts — the same table the nav reads. A route can exist in the nav
 * and be missing from the sitemap only if the two drift; they can't, because
 * both entries list lib/routes.ts values explicitly.
 *
 * Contact lives on the homepage only (no /contact route), so there is no entry
 * for it.
 */
const PAGES: readonly PageSpec[] = [
  { path: PAGE_PATHS.home, changeFrequency: "weekly", priority: 1 },
  { path: PAGE_PATHS.pipeline, changeFrequency: "monthly", priority: 0.9 },
  { path: PAGE_PATHS.work, changeFrequency: "monthly", priority: 0.9 },
  { path: PAGE_PATHS.stream, changeFrequency: "monthly", priority: 0.8 },
  { path: PAGE_PATHS.takes, changeFrequency: "monthly", priority: 0.8 },
  { path: PAGE_PATHS.about, changeFrequency: "monthly", priority: 0.8 },
  { path: PAGE_PATHS.stack, changeFrequency: "monthly", priority: 0.7 },
  { path: PAGE_PATHS.faq, changeFrequency: "monthly", priority: 0.6 },
];

// Shared across all entries so every <lastmod> in a build agrees, instead of
// each entry capturing its own slightly-different Date.now().
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    // SITE_URL ends with "/", so the homepage is the bare constant and every
    // other route appends its path.
    url: path === "/" ? SITE_URL : `${SITE_URL}${path.slice(1)}`,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));
}
