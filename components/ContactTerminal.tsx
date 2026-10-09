"use client";

import { useState } from "react";
import { CONTACT, PERSON } from "@/lib/content";

/**
 * Contact — an invitation, not a terminal.
 * One clear action (email), one secondary (copy), and the facts a visitor
 * actually wants: where you are, what you're available for, how fast you reply.
 */
export default function ContactTerminal() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(PERSON.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="contact-card">
          <p className="eyebrow" style={{ position: "relative" }}>Contact</p>
          <h2 className="contact-title">
            Got a workflow that <em>annoys you?</em>
          </h2>
          <p className="lead contact-sub">
            {CONTACT.sub}
          </p>

          <div className="contact-actions">
            <a className="btn primary" href={`mailto:${PERSON.email}`}>
              {PERSON.email}
            </a>
            <button className="btn outline" onClick={copyEmail}>
              {copied ? "Copied — go write it" : "Copy address"}
            </button>
            <a
              className="btn outline"
              href={PERSON.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="btn outline"
              href={PERSON.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="avail">
            {CONTACT.availability.map((a) => (
              <span className="avail-item" key={a}>{a}</span>
            ))}
          </div>

          <div className="contact-facts">
            <div>
              <p className="fact-label">Based in</p>
              <p className="fact-value">India — remote worldwide</p>
            </div>
            <div>
              <p className="fact-label">Response time</p>
              <p className="fact-value">Within a day, usually faster</p>
            </div>
            <div>
              <p className="fact-label">Currently available for</p>
              <p className="fact-value">{CONTACT.availability.join(" · ")}</p>
            </div>
            <div>
              <p className="fact-label">Also on</p>
              <p className="fact-value">
                <a
                  href={PERSON.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)" }}
                >
                  Instagram ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
