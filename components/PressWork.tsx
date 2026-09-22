"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import CurtainReveal from "./CurtainReveal";
import { PROJECTS, EVIDENCE, PERSON } from "@/lib/content";
import { onIdleAsync, loadGsap } from "@/lib/idle";
import { SITE_URL } from "@/lib/site";

// Same rationale as FrontPage: gsap.matchMedia() cleanup must run before
// React removes the DOM on unmount (layout-effect cleanup) so ScrollTrigger
// state is reverted before the section node is deleted. This component does
// not pin today, but keeping the same effect type prevents the classic
// "removeChild" reconciliation error if a pin is ever added here.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * PressWork — the flagship case studies on the inverted ink-density sheet.
 * GSAP is code-split and set up only after idle: it scrubs the build log in
 * one-by-one, fills the vermilion ink bar, and parallaxes the ghost form
 * number — all fromTo with immediateRender:false, so every element is
 * VISIBLE by default and can never be stranded hidden.
 */
export default function PressWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    let teardown: (() => void) | undefined;

    const cancel = onIdleAsync(async () => {
      const { gsap } = await loadGsap();
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          motionOk: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motionOk } = context.conditions as {
            desktop: boolean;
            motionOk: boolean;
          };
          if (!desktop || !motionOk || !sectionRef.current) return;

          // FromTo + immediateRender:false → the build log starts VISIBLE and
          // only becomes hidden the moment its scrub range actually begins.
          const items = gsap.utils.toArray<HTMLElement>(".buildlog-item");
          gsap.fromTo(
            items,
            { opacity: 0, yPercent: 18 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
              force3D: true,
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 45%",
                scrub: 1,
              },
            }
          );

          // Ghost form number parallax + ink bar fill — both also start from
          // their current/visible values until the scrub begins.
          gsap.fromTo(
            ".presswork .form-no",
            { yPercent: 10 },
            {
              yPercent: -8,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            ".ink-bar-fill",
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 45%",
                scrub: 1,
              },
            }
          );
        }
      );

      teardown = () => mm.revert();
    });

    return () => {
      cancel();
      teardown?.();
    };
  }, []);

  return (
    <section id="work" className="presswork" ref={sectionRef}>
      <div className="container">
        <CurtainReveal>
          <header className="section-head">
            <div>
              <p className="form-eyebrow mono">Form 02 — selected work</p>
              <h2 className="section-title">
                Projects built from scratch,{" "}
                <em className="accent-over">end to end.</em>
              </h2>
            </div>
            <p className="section-note">
              Proof over promises — flagship systems shipped end to end,
              plus the automation and AI work behind the numbers.
            </p>
          </header>
        </CurtainReveal>

        <div className="projects-spread-wrap">
          {PROJECTS.map((project) => (
            <div className="spread" key={project.id} id={`project-${project.id}`}>
              <div className="form-no" aria-hidden="true">
                {project.projectNo}
              </div>

              <div>
                <h3 className="case-title">{project.title}</h3>
                <p className="case-sub">{project.subtitle}</p>

                <p className="case-label mono">01 — the problem</p>
                <p className="case-body">{project.problem}</p>

                <p className="case-label mono">02 — build log</p>
                <div className="buildlog">
                  {project.built.map((line, i) => (
                    <div className="buildlog-item" key={line}>
                      <span className="buildlog-num mono">
                        step {String(i + 1).padStart(2, "0")}
                      </span>
                      <p>{line}</p>
                    </div>
                  ))}
                </div>

                <p className="case-label mono">03 — the result</p>
                <p className="case-body">{project.result}</p>

                <div className="tag-row">
                  {project.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="plate-actions">
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="plate-source"
                  >
                    view source ↗
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="plate-source live-pill"
                    >
                      live showcase ↗
                    </a>
                  )}
                  <span className="plate-year mono">
                    shot &amp; shipped {project.year}
                  </span>
                </div>

                <div className="ink-bar" aria-hidden="true">
                  <div className="ink-bar-fill" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <CurtainReveal className="ev-wrap">
          <p className="eyebrow-late mono">appendix — more evidence</p>
          <div className="ev-grid">
            {EVIDENCE.map((card) => (
              <div className="ev-card" data-cursor-hover key={card.id}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </CurtainReveal>
      </div>

      {/* Structured data so search engines attribute the repositories properly. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            PROJECTS.map((project) => ({
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              name: project.title,
              description: project.subtitle,
              codeRepository: project.sourceUrl,
              programmingLanguage: project.tags,
              author: { "@type": "Person", name: PERSON.name, url: SITE_URL },
            }))
          ),
        }}
      />
    </section>
  );
}