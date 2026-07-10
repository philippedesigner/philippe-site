"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = 14;
const DURATION = 500;

// Scrambles only the letters that make up `target` itself (not random
// characters), permuting the not-yet-revealed positions among each other.
// Since the exact same set of glyphs is always on screen — just reordered —
// the rendered width stays effectively constant instead of jumping around
// as different-width random characters cycle in.
function scramble(target: string, revealCount: number) {
  const chars = target.split("");
  const pool: number[] = [];
  const letters: string[] = [];
  for (let i = revealCount; i < chars.length; i++) {
    if (chars[i] !== " ") {
      pool.push(i);
      letters.push(chars[i]);
    }
  }
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  pool.forEach((idx, k) => {
    chars[idx] = letters[k];
  });
  return chars.join("");
}

type Props = {
  text: string;
  hoverText?: string;
  className?: string;
  // Pass this when a parent wraps the whole clickable area (e.g. a nav
  // link) and tracks hover itself, so the scramble starts the instant the
  // pointer enters the link's padding — not only when it's directly over
  // the letters. If omitted, falls back to tracking hover on the label
  // itself.
  active?: boolean;
};

export default function ScrambleLabel({ text, hoverText, className, active }: Props) {
  const [display, setDisplay] = useState(text);
  const runId = useRef(0);

  function run(target: string) {
    const id = ++runId.current;
    let step = 0;
    const iv = setInterval(() => {
      if (id !== runId.current) {
        clearInterval(iv);
        return;
      }
      step++;
      const revealCount = Math.floor((step / STEPS) * target.length);
      setDisplay(scramble(target, revealCount));
      if (step >= STEPS) {
        clearInterval(iv);
        setDisplay(target);
      }
    }, DURATION / STEPS);
  }

  const controlled = active !== undefined;

  useEffect(() => {
    if (!controlled) return;
    if (active) run(hoverText || text);
    else if (hoverText) run(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (controlled) {
    return <span className={className}>{display}</span>;
  }

  return (
    <span
      className={className}
      onMouseEnter={() => run(hoverText || text)}
      onMouseLeave={() => {
        if (hoverText) run(text);
      }}
    >
      {display}
    </span>
  );
}
