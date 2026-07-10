"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed round cursor that follows the pointer and shrinks over links/buttons.
 * Only activates on fine-pointer devices (desktop); mobile/touch keeps the
 * native cursor automatically via the CSS media query in globals.css.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const move = (e: MouseEvent) => {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-target]")) {
        dot.classList.add("hovering");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-target]")) {
        dot.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div className="cursor-dot" ref={dotRef} />;
}
