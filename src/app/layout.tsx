import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";
import { bio } from "@/content";
// FONT SETUP: once you've added your font file(s) and uncommented the
// loader in src/fonts/index.ts, uncomment this import too:
// import { bodyFont } from "@/fonts";

export const metadata: Metadata = {
  title: bio.name,
  description: bio.intro,
};

// Runs before paint to avoid a flash of the wrong theme on reload.
const themeInitScript = `
(function() {
  try {
    var saved = window.localStorage.getItem('theme');
    var theme = saved === 'dark' || saved === 'light' ? saved : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      {/* FONT SETUP: add bodyFont.variable to the <body> className below, e.g.
          <body className={bodyFont.variable}> */}
      <body>
        <CustomCursor />
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
