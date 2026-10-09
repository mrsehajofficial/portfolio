"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";

/**
 * AskConsole — the fact surface.
 * The hero already demonstrates retrieval; this is the corroborating panel:
 * the same index, expanded as plain answers, with the FAQ set kept here for
 * indexing.
 */
export default function AskConsole() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Questions</p>
          <h2 className="section-title">
            Asked often, <em>answered plainly.</em>
          </h2>
          <p className="lead section-note">
            Nothing here is generated. These are the same facts the retrieval
            index reads from, written the way I&apos;d say them on a call.
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="faq">
              {FAQS.map(({ question, answer }, i) => {
                const isOpen = open === i;
                return (
                  <div className="faq-item" key={question}>
                    <button
                      className="faq-head"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                    >
                      <span className="faq-q">{question}</span>
                      <span className="faq-mark" aria-hidden="true">+</span>
                    </button>
                    <div
                      id={`faq-${i}`}
                      style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.45s var(--ease)",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <p className="faq-a">{answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
