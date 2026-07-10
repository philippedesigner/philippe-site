"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small top-right-pointing arrow shown next to in-tab links. Slides in from
 * the bottom-left when the cursor (or, as a fallback, the real pointer)
 * enters the parent link, and slides out to the top-right when it leaves —
 * synced with CustomCursor's "cursorover"/"cursorout" events where
 * available. Also toggles "link-in"/"link-out" classes on the parent link
 * so its underline can animate in/out in step.
 */
export default function LinkArrow() {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"idle" | "entering" | "leaving">("idle");

  useEffect(() => {
    const link = ref.current?.parentElement;
    if (!link) return;
    const enter = () => {
      setPhase("entering");
      link.classList.remove("link-out");
      link.classList.add("link-in");
    };
    const leave = () => {
      setPhase("leaving");
      link.classList.remove("link-in");
      link.classList.add("link-out");
    };
    link.addEventListener("cursorover", enter);
    link.addEventListener("cursorout", leave);
    link.addEventListener("mouseenter", enter);
    link.addEventListener("mouseleave", leave);
    return () => {
      link.removeEventListener("cursorover", enter);
      link.removeEventListener("cursorout", leave);
      link.removeEventListener("mouseenter", enter);
      link.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <span className={`link-arrow${phase !== "idle" ? ` ${phase}` : ""}`} ref={ref} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
        <path
          d="M5 11L11 5M11 5V9.5M11 5H6.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
