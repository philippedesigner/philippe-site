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
      &#10035;
    </button>
  );
}
