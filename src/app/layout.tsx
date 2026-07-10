import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { bio } from "@/content";
import { bodyFont } from "@/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://philippeschroeder.com"),
  title: bio.name,
  description: bio.intro,
  authors: [{ name: bio.name }],
  openGraph: {
    title: bio.name,
    description: bio.intro,
    siteName: bio.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: bio.name,
    description: bio.intro,
  },
  icons: {
    icon: [
      { url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-light.svg",
  },
};

// Runs before paint to avoid a flash of the wrong theme (and favicon) on
// reload. Keeps the favicon in sync with the site's own light/dark toggle
// (localStorage), not just the OS-level prefers-color-scheme fallback set
// in metadata.icons.
const themeInitScript = `
(function() {
  try {
    var saved = window.localStorage.getItem('theme');
    var theme = saved === 'dark' || saved === 'light' ? saved : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    var href = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    var links = document.querySelectorAll('link[rel="icon"]');
    for (var i = 0; i < links.length; i++) {
      links[i].removeAttribute('media');
      links[i].href = href;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={bodyFont.variable}>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
