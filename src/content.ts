// ---------------------------------------------------------------------------
// EDIT ME: this file is the only place you should need to touch to update
// text, links, or images. Nothing here affects layout or animation logic.
// ---------------------------------------------------------------------------

export type Entry = {
  role: string;
  linkLabel: string;
  linkHref: string;
  // One or more screenshots/photos for this entry. Optional — omit for a
  // text-only entry. Multiple images stack vertically, left-aligned with
  // the rest of the section, capped at 200px tall.
  images?: string[];
  description?: string;
};

export const greetings = ["Moien!", "Bonjour!", "Hallo!", "Hello!"];

export const bio = {
  name: "Philippe Schroeder",
  photo: "/images/profile.jpg",
  intro:
    "Innovator, strategist, and product designer, I have spent the last years building products and innovation strategies at the intersection of technology, human behavior, and AI.",
  background:
    "I have 6+ years of experience building AI-first digital products and innovation strategies for startups and established companies. I manage projects with many stakeholders, being responsible for deep user research, synthesizing complexity into clear insights, and combining insights, tech expertise, and regulatory constraints into the design of digital products or concept proposals. I have domain experience across healthtech, fintech, manufacturing, IoT, and Media. I am particularly curious about how to create responsible AI technology that solves complex societal and individual problems.",
  tags: [
    "Curiosity",
    "Reflective Practice",
    "Connection to Nature",
    "Self-experimenting",
    "Collaboration",
    "Intentionality",
  ],
};

export const workItems: Entry[] = [
  {
    role: "Founder, Strategist, Designer",
    linkLabel: "@Postscript Studio",
    linkHref: "https://postscript.studio",
    images: ["/images/postscript.jpg"],
    description: "A user-centered innovation studio based in Luxembourg spanning user research, product design, and concept development.",
  },
  {
    role: "Photographer",
    linkLabel: "@photosbyphilippe",
    linkHref: "https://www.instagram.com/photos.byphilippe/",
    images: ["/images/wedding.jpg"],
    description: "Intentional travel, campaign and wedding photography. Currently only taking friends or past clients :)",
  },
  {
    role: "Founding Product Designer",
    linkLabel: "@Frameway (2026)",
    images: ["/images/frameway.jpg"],
    linkHref: "https://frameway.ai",

  },
   {
    role: "Founding Product Designer",
    linkLabel: "@Manex AI (2024-2025)",
    linkHref: "https://www.manex.ai/en",
  },
  {
    role: "UX Designer",
    linkLabel: "@adidas (2021–22)",
    linkHref: "https://adidas.com",
  },
  {
    role: "Marketing Manager",
    linkLabel: "@Microsoft (2020)",
    linkHref: "https://microsoft.com",
  },
];

export const projectItems: Entry[] = [
  {
    role: "Creator",
    linkLabel: "@Humane Tech Design Guidelines",
    linkHref: "https://philippeschroeder.notion.site/Responsible-Tech-Design-Guidelines-f223c19a06df4e94943e46d3da41c25e",
    images: ["/images/guidelines.webp"],
    description: "A collaborative standard for human-aligned AI product design.",
  },
   {
    role: "Creator",
    linkLabel: "@Shutterclub",
    linkHref: "https://shutterclub.lu",
    images: ["/images/shutterclub.png"],
    description: "A rental store for unique cameras.",
  },
    {
    role: "Co-creator",
    linkLabel: "@umbok (2025)",
    linkHref: "https://www.instagram.com/umbok.352/",
    images: ["/images/umbok.jpg"],
    description: "A 1-month pop-up shop and event space.",
  },
  {
    role: "Creator",
    linkLabel: "@humanaligned.eu (coming soon)",
    linkHref: "#",
  },
];

export const contributionItems: Entry[] = [
  {
    role: "Researcher, Writer (volunteer)",
    linkLabel: "@All Tech Is Human",
    linkHref: "https://alltechishuman.org",
  },
  {
    role: "Researcher, Writer (volunteer)",
    linkLabel: "@AIxDesign",
    linkHref: "https://aixdesign.co",
  },
  {
    role: "Writer",
    linkLabel: "@Medium",
    linkHref: "https://medium.com/@philippeschroeder",
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

// Shown on the Contact tab. Add/remove entries as needed — label is what's
// displayed, href is where it links to.
export const socialLinks: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://lu.linkedin.com/in/philippe-schroeder-1aa186177" },
  { label: "Instagram", href: "https://www.instagram.com/philippeschroeder/" },
];

// A scheduling link (Calendly, Cal.com, etc.) shown as a "book a slot"
// call-to-action on the Contact tab. Set href to "" to hide this block.
export const meetingLink = {
  label: "Book a call",
  href: "https://cal.com/philippeschroeder",
};
