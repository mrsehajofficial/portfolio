"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSON } from "@/lib/content";
import { NAV_ROUTES } from "@/lib/routes";

/** True when `pathname` is this nav link's route — used to mark the current page. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname === `${href}/`;
}

/**
 * Nav — quiet and spacious. Hides on scroll down, returns on scroll up, and
 * gains a hairline + denser background once the page has moved. No status
 * dots, no tickers: the page already demonstrates plenty.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > lastY.current && y > 140);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`nav${hidden ? " hidden" : ""}${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-inner">
          <Link className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">S</span>
            {PERSON.name}
          </Link>

          <nav className="nav-links" aria-label="Sections">
            {NAV_ROUTES.map((l) => (
              <Link
                key={l.href}
                className={`nav-link${isActive(pathname, l.href) ? " active" : ""}`}
                href={l.href}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <a className="nav-cta" href="/#contact">
            Get in touch
          </a>

          <button
            className={`nav-toggle${open ? " open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {/* Three spans animate into an "×". Grid + gap on the parent keeps
                the pitch exact, so the translate values below never drift. */}
            <span className="nav-bar" />
            <span className="nav-bar" />
            <span className="nav-bar" />
          </button>
        </div>
      </header>

      <div className={`drawer${open ? " open" : ""}`}>
        <div className="container" style={{ display: "grid", gap: 4 }}>
          {NAV_ROUTES.map((l) => (
            <Link
              key={l.href}
              className="drawer-link"
              href={l.href}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            className="btn primary"
            href="/#contact"
            style={{ marginTop: 24, justifySelf: "start" }}
            onClick={() => setOpen(false)}
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
