# Philippe Schroeder — personal site

Next.js (App Router) + TypeScript, statically exported. No backend, no database,
no monthly CMS fee — just static files you can host anywhere for free.

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed. Then, from this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it hot-reloads as you edit.

## Editing content

Everything you'll want to change day-to-day lives in **`src/content.ts`**:
bio text, tags, work/project/contribution entries, gallery image paths, and
your contact email. You should never need to touch a component file just to
update text or add an entry.

To add a photo:
1. Drop the image file into `public/images/` (or `public/images/gallery/` for
   the gallery).
2. Reference it in `src/content.ts`, e.g. `"/images/my-photo.jpg"`.

The placeholder gray images currently in `public/images/` are stand-ins —
swap them for your real photos whenever you're ready.

## Project structure

```
src/
  app/
    layout.tsx        — root HTML shell, loads cursor + theme toggle
    page.tsx           — home ("/"), Work tab open by default
    work/page.tsx       — "/work" route
    projects/page.tsx     — "/projects" route
    contributions/page.tsx — "/contributions" route
    gallery/page.tsx     — "/gallery" route
    globals.css        — all styling (CSS variables drive light/dark mode)
  components/
    PortfolioShell.tsx  — sidebar + accordion tabs, shared by every route
    ScrambleLabel.tsx    — the letter-scramble hover effect
    CustomCursor.tsx     — the round custom cursor
    ThemeToggle.tsx      — dark/light toggle button
  content.ts           — ← your content lives here
```

Contact is intentionally not a routed page — it's a direct `mailto:` link
(per the original spec), so there's no `/contact` folder.

## Building for production

```bash
npm run build
```

This generates a fully static site in the `out/` folder — every route
(`/`, `/work/`, `/projects/`, `/contributions/`, `/gallery/`) is pre-rendered
HTML, so it's fast, crawlable, and works even with JavaScript disabled for
the initial view. `npm run dev` above is only for local editing; `out/` is
what actually gets deployed.

## Deploying

**Recommended: Vercel (free for this use case)**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Vercel auto-detects Next.js; no config needed. Every push to `main`
   redeploys automatically.
4. Add your custom domain under Project Settings → Domains, then update your
   DNS (same kind of change you made pointing collegeveterinaire.lu at
   Webflow — I can walk through the exact records when you're there).

**Alternative: any static host** (Netlify, Cloudflare Pages, GitHub Pages)
— just point it at the `out/` folder after running `npm run build`. Since
this is a fully static export, it'll work anywhere that serves static files.

## Using your own font

1. Drop your font file(s) into `src/fonts/` (e.g. `MyFont-Regular.woff2`,
   `MyFont-Bold.woff2`).
2. Open `src/fonts/index.ts` and uncomment the `localFont` block, updating
   the paths/weights to match your files.
3. Open `src/app/layout.tsx` and uncomment the two lines marked
   `FONT SETUP`.
4. Nothing to change in `globals.css` — it already references
   `var(--font-body)` first in the font stack, so your font takes over
   automatically once it's wired up.

Your font needs a license that permits self-hosting/embedding on a website —
most commercial and open-source licenses allow this, but worth a quick check
if it's a paid font.

## Layout: three columns

- **Column 1 (About)**: capped at a max-width (`.col-about` in
  `globals.css`) so it never stretches too wide on large screens.
- **Columns 2+3 (Tabs / Content)**: together take roughly two-thirds of the
  page (`.layout-grid` uses a `1fr / 2fr` split), with the tab list itself
  a fixed 170px next to the content, which fills the rest
  (`.tabs-content-wrap`). Adjust the `170px` or the `1fr 2fr` ratio in
  `globals.css` if you want the balance different.
- On mobile (≤768px), everything collapses to a single column: About, then
  a horizontal nav row (including "About" to jump back), then the active
  tab's content.

## Screenshots / entry images

Each work/project/contribution entry can now take multiple images via the
`images: [...]` array in `content.ts`. They render full-bleed (edge to edge
of the browser, breaking out of the page's normal margins) and stacked
vertically, each separated by a hairline rule that spans the entire screen
width — the same rule used elsewhere on the page, so it feels consistent
rather than like a separate design language.

## Notes on things you asked about

- **Scramble hover + orange highlight**: `ScrambleLabel.tsx` + the
  `.tab-header` / `.tab-header.active` rules in `globals.css`.
- **Custom cursor**: `CustomCursor.tsx`. Only activates on mice/trackpads
  (`@media (hover: hover) and (pointer: fine)`), so touch devices keep their
  native cursor automatically.
- **Dark/light mode**: toggled via a `data-theme` attribute on `<html>`,
  persisted in `localStorage`, with a small inline script in `layout.tsx`
  that sets it before first paint (avoids a flash of the wrong theme).
- **Mobile behavior**: on screens ≤768px, the home page shows only the bio +
  a simple text nav; visiting a tab route hides the bio and shows just that
  tab's content with an "← About" link back. This is done with pure CSS
  driven by the `isHome` prop — no extra JavaScript needed for it.
- **Gallery order**: shuffled client-side on each page load
  (`GalleryGrid` in `PortfolioShell.tsx`).

## Known limitation to fix before real photos go in

Images use `unoptimized: true` in `next.config.js` because Next's built-in
image optimizer needs a server, which a static export doesn't have. Right
now that just means images are served at their original file size — fine
for now, but worth compressing/resizing your real photos yourself before
adding them (or we can wire up a proper image CDN later if the Gallery ends
up with a lot of high-res shots).
