"use client";

import { useEffect, useState } from "react";

function syncFavicon(theme: "light" | "dark") {
  const href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
  document.querySelectorAll('link[rel="icon"]').forEach((link) => {
    link.removeAttribute("media");
    (link as HTMLLinkElement).href = href;
  });
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") {
      setTheme(current);
      syncFavicon(current);
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
    syncFavicon(next);
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark mode">
      {/* Inline SVG instead of the ✳ glyph — some platforms (iOS) render
          that character as a colored emoji rather than plain text, which
          broke the icon's look on mobile. */}
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
      </svg>
    </button>
  );
}
