"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fixed round cursor that follows the pointer, shrinking and dimming to
 * 50% opacity over links/buttons. Only activates on fine-pointer devices
 * (desktop); mobile/touch keeps the native cursor automatically via the
 * CSS media query in globals.css.
 *
 * Hover effects (opacity dim, tab/tag highlight, scramble animation) are
 * driven by where the *visual* (eased) dot currently is, not the raw mouse
 * position — otherwise they'd fire the instant the real pointer arrives,
 * before the trailing dot visually catches up, which looks disconnected.
 * Elements under the eased position get a "cursor-hover" class plus a
 * "cursorover"/"cursorout" event so React components elsewhere in the tree
 * can react to it without polling.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Target = real pointer position, updated instantly on mousemove.
    // Rendered position eases toward the target every frame, producing a
    // smooth drag/lag trail instead of 1:1 tracking.
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const EASE = 0.18;
    let rafId = 0;
    let current: HTMLElement | null = null;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * EASE;
      pos.y += (target.y - pos.y) * EASE;
      dot.style.left = pos.x + "px";
      dot.style.top = pos.y + "px";

      const el = document.elementFromPoint(pos.x, pos.y);
      const next = (el?.closest("a, button, [data-cursor-target]") as HTMLElement | null) ?? null;
      if (next !== current) {
        if (current) {
          current.classList.remove("cursor-hover");
          current.dispatchEvent(new CustomEvent("cursorout"));
        }
        if (next) {
          next.classList.add("cursor-hover");
          next.dispatchEvent(new CustomEvent("cursorover"));
        }
        current = next;
        setHovering(!!next);
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      current?.classList.remove("cursor-hover");
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="cursor-dot"
      ref={dotRef}
      style={{
        width: hovering ? "0.5rem" : "1.375rem",
        height: hovering ? "0.5rem" : "1.375rem",
        opacity: hovering ? 0.5 : 1,
      }}
    />
  );
}
