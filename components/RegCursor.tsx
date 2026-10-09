"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor — a soft ring that trails slightly behind the pointer and expands on
 * interactive elements. Deliberately gentle: it should feel like the page is
 * paying attention, not that a targeting reticle locked on.
 */
export default function RegCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 2.5}px, ${y - 2.5}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, input, [data-cursor-hover]"));
    };

    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      className="reg-cursor"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s var(--ease)" }}
    >
      <div ref={dotRef} className="reg-dot" />
      <div ref={ringRef} className={`reg-ring${hovering ? " hovering" : ""}`} />
    </div>
  );
}
