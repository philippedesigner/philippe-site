"use client";

import { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEPS = 14;
const DURATION = 500;

type Props = {
  text: string;
  hoverText?: string;
  className?: string;
};

/**
 * Displays `text`. On hover, rapidly cycles random letters before resolving
 * to `hoverText` (defaults to `text` itself, i.e. a pure scramble-in-place).
 * On mouse leave, if a distinct hoverText was shown, scrambles back to `text`.
 */
export default function ScrambleLabel({ text, hoverText, className }: Props) {
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
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealCount || target[i] === " ") out += target[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (step >= STEPS) {
        clearInterval(iv);
        setDisplay(target);
      }
    }, DURATION / STEPS);
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
