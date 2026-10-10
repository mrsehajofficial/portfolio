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
 * Priority reflects where a visitor's intent lands first, not nav order:
 *
 *   /           1.0  — the whole demonstration, one page
 *   /work       0.95 — projects: what a hiring manager actually opens first
 *   /pipeline   0.9  — the deepest technical proof (best "RAG pipeline" target)
 *   /stack      0.85 — best "Python / Flask / LLM stack" query surface
 *   /about      0.8  — trust and availability
 *   /takes      0.75 — differentiation; converts readers, not searches
 *   /explorations 0.7 — current deep-dive projects
 *   /faq        0.7  — long-tail query capture
 *   /stream     0.6  — live demo, little standalone search value
 *
 * Every URL is built from the one canonical-origin constant in lib/site.ts
 * (https://sehaj.wasmer.app) and the route table in lib/routes.ts — the same
 * table the nav reads. A route can be added to the nav and forgotten here
 * only if the two lists drift; keeping both pointed at lib/routes.ts values
 * makes that impossible.
 *
 * Contact lives on the homepage only (no /contact route), so there is no
 * entry for it.
 */
const PAGES: readonly PageSpec[] = [
  { path: PAGE_PATHS.home, changeFrequency: "weekly", priority: 1 },
  { path: PAGE_PATHS.work, changeFrequency: "monthly", priority: 0.95 },
  { path: PAGE_PATHS.pipeline, changeFrequency: "monthly", priority: 0.9 },
  { path: PAGE_PATHS.stack, changeFrequency: "monthly", priority: 0.85 },
  { path: PAGE_PATHS.about, changeFrequency: "monthly", priority: 0.8 },
  { path: PAGE_PATHS.takes, changeFrequency: "monthly", priority: 0.75 },
  { path: PAGE_PATHS.explorations, changeFrequency: "monthly", priority: 0.7 },
  { path: PAGE_PATHS.faq, changeFrequency: "monthly", priority: 0.7 },
  { path: PAGE_PATHS.stream, changeFrequency: "monthly", priority: 0.6 },
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
