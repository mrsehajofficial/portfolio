import { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";
import { PAGE_PATHS } from "../lib/routes";
import { PROJECT_IDS } from "../lib/content";

type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];

interface PageSpec {
  path: PagePath;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}

interface DynamicSpec {
  path: string;
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
 *   /work/*     0.9  — individual project case studies
 *   /pipeline   0.85 — the deepest technical proof (best "RAG pipeline" target)
 *   /stack      0.8  — best "Python / Flask / LLM stack" query surface
 *   /about      0.75 — trust and availability
 *   /takes      0.7  — differentiation; converts readers, not searches
 *   /explorations 0.7 — current deep-dive projects
 *   /faq        0.65 — long-tail query capture
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
  { path: PAGE_PATHS.pipeline, changeFrequency: "monthly", priority: 0.85 },
  { path: PAGE_PATHS.stack, changeFrequency: "monthly", priority: 0.8 },
  { path: PAGE_PATHS.about, changeFrequency: "monthly", priority: 0.75 },
  { path: PAGE_PATHS.takes, changeFrequency: "monthly", priority: 0.7 },
  { path: PAGE_PATHS.explorations, changeFrequency: "monthly", priority: 0.7 },
  { path: PAGE_PATHS.faq, changeFrequency: "monthly", priority: 0.65 },
  { path: PAGE_PATHS.stream, changeFrequency: "monthly", priority: 0.6 },
];

// Dynamic project case-study pages, e.g. /work/aegis
const DYNAMIC: readonly DynamicSpec[] = PROJECT_IDS.map((id) => ({
  path: `/work/${id}`,
  changeFrequency: "monthly" as NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>,
  priority: 0.9,
}));

// Shared across all entries so every <lastmod> in a build agrees, instead of
// each entry capturing its own slightly-different Date.now().
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = PAGES.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path.slice(1)}`,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));

  const dynamicEntries = DYNAMIC.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path.slice(1)}`,
    lastModified: BUILD_TIME,
    changeFrequency,
    priority,
  }));

  return [...staticEntries, ...dynamicEntries];
}
