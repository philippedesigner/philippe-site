// ---------------------------------------------------------------------------
// EDIT ME: this file is the only place you should need to touch to update
// text, links, or images. Nothing here affects layout or animation logic.
// ---------------------------------------------------------------------------

export type Entry = {
  role: string;
  linkLabel: string;
  linkHref: string;
  // One or more screenshots/photos for this entry. Optional — omit for a
  // text-only entry. Multiple images stack vertically, full-bleed width,
  // each separated by a hairline rule spanning the full screen.
  images?: string[];
  description?: string;
};

export const bio = {
  name: "Philippe Schroeder",
  photo: "/images/profile.jpg",
  intro:
    "I am a wine lover, user experience designer & creative technologist exploring how the design of technology impacts society.",
  background:
    "Background in Computer Science, UX design & AI, with 8 years of experience in photography, and 5 years in freelance design & development across multiple industries, from start-ups to large-scale companies like adidas. Interested in solving complex problems and aligning tech with humane values and goals.",
  tags: [
    "Slowness",
    "Reflective Practice",
    "Connection to Nature",
    "Self-experimenting",
    "Collaboration",
    "Open-mindedness",
  ],
};

export const workItems: Entry[] = [
  {
    role: "Founder, Designer, Developer",
    linkLabel: "@Postscript Studio (WIP)",
    linkHref: "https://example.com",
    images: ["/images/work-postscript.jpg"],
  },
  {
    role: "Photographer",
    linkLabel: "@photosbyphilippe",
    linkHref: "https://example.com",
    images: ["/images/work-photography.jpg"],
  },
  {
    role: "UX Designer",
    linkLabel: "@adidas (2021–22)",
    linkHref: "https://example.com",
  },
  {
    role: "UX Designer",
    linkLabel: "@Microsoft (2020)",
    linkHref: "https://example.com",
  },
];

export const projectItems: Entry[] = [
  {
    role: "Creator",
    linkLabel: "@www.humanetech.design",
    linkHref: "https://example.com",
    description: "A public standard for human-aligned AI product design.",
  },
  {
    role: "Creator",
    linkLabel: "@AIxDesign",
    linkHref: "https://example.com",
  },
];

export const contributionItems: Entry[] = [
  {
    role: "Researcher, Writer (volunteer)",
    linkLabel: "@All Tech Is Human",
    linkHref: "https://example.com",
  },
  {
    role: "Researcher, Writer (volunteer)",
    linkLabel: "@AIxDesign",
    linkHref: "https://example.com",
  },
  {
    role: "Writer",
    linkLabel: "@Medium",
    linkHref: "https://example.com",
  },
];

// Drop image files into /public/images/gallery/ and list the filenames here.
// Order is shuffled client-side on load, so it doesn't matter what order you list them in.
export const galleryImages: string[] = [
  "/images/gallery/photo-1.jpg",
  "/images/gallery/photo-2.jpg",
  "/images/gallery/photo-3.jpg",
  "/images/gallery/photo-4.jpg",
  "/images/gallery/photo-5.jpg",
  "/images/gallery/photo-6.jpg",
];

export const contactEmail = "hello@philippeschroeder.com";
