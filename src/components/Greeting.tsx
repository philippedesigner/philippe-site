"use client";

import { useEffect, useState } from "react";
import { greetings } from "@/content";

const INTERVAL = 2200;
const LETTER_DELAY = 0.035;

// Small decorative tag that sits behind the name badge, cycling through
// "hello" in a few languages. Each greeting fades in letter by letter —
// keying each letter span on the current index forces React to remount
// them on every cycle, which restarts the CSS fade-in animation.
export default function Greeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIndex((i) => (i + 1) % greetings.length);
    }, INTERVAL);
    return () => clearInterval(iv);
  }, []);

  const text = greetings[index];

  return (
    <span className="greeting-tag" aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span
          key={`${index}-${i}`}
          className="greeting-letter"
          style={{ animationDelay: `${i * LETTER_DELAY}s` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
