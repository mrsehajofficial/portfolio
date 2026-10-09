/**
 * lib/routes.ts — the route table.
 *
 * The nav links in components/Nav.tsx and the sitemap both read from here, so
 * a route can never exist in one and be missing from the other. If a label
 * appears in the nav, its page must exist in app/.
 */
export const PAGE_PATHS = {
  home: "/",
  pipeline: "/pipeline",
  stream: "/stream",
  work: "/work",
  takes: "/takes",
  about: "/about",
  stack: "/stack",
  faq: "/faq",
} as const;

export type PagePath = (typeof PAGE_PATHS)[keyof typeof PAGE_PATHS];

/** Nav order — matches the reading order of the homepage. */
export const NAV_ROUTES = [
  { href: PAGE_PATHS.pipeline, label: "Pipeline" },
  { href: PAGE_PATHS.stream, label: "Live stream" },
  { href: PAGE_PATHS.work, label: "Work" },
  { href: PAGE_PATHS.takes, label: "Takes" },
  { href: PAGE_PATHS.about, label: "About" },
  { href: PAGE_PATHS.stack, label: "Stack" },
] as const;
