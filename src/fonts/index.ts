// ---------------------------------------------------------------------------
// To use your own font:
// 1. Drop the font file(s) into this same `src/fonts/` folder
//    (e.g. src/fonts/MyFont-Regular.woff2, src/fonts/MyFont-Bold.woff2).
// 2. Uncomment the block below and update the paths + weights to match
//    your actual files.
// 3. In src/app/layout.tsx, uncomment the two lines marked FONT SETUP.
// 4. In src/app/globals.css, the body font-family already references
//    var(--font-body) first, so it'll pick your font up automatically —
//    nothing else to change there.
// ---------------------------------------------------------------------------

import localFont from "next/font/local";

 export const bodyFont = localFont({
   src: [
     { path: "./UncutSans-Regular.otf", weight: "400", style: "normal" },
     { path: "./UncutSans-Bold.otf", weight: "700", style: "normal" },
   ],
   variable: "--font-body",
   display: "swap",
 });

export {};
