"use client";

import Link from "next/link";
import Image from "next/image";
import ScrambleLabel from "./ScrambleLabel";
import ThemeToggle from "./ThemeToggle";
import LinkArrow from "./LinkArrow";
import {
  bio,
  workItems,
  projectItems,
  contributionItems,
  galleryImages,
  contactEmail,
  socialLinks,
  meetingLink,
  Entry,
} from "@/content";
import { useEffect, useRef, useState } from "react";

export type TabId = "work" | "projects" | "contributions" | "gallery" | "contact";

const TAB_ORDER: { id: TabId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contributions", label: "Contributions" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

// Reacts to the trailing cursor dot (CustomCursor) arriving at/leaving this
// link, rather than the raw mouse enter/leave — keeps hover-triggered
// effects (like the scramble animation) in sync with the visual cursor.
function NavLink({
  href,
  className,
  onHoverChange,
  children,
}: {
  href: string;
  className: string;
  onHoverChange: (hovering: boolean) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onOver = () => onHoverChange(true);
    const onOut = () => onHoverChange(false);
    el.addEventListener("cursorover", onOver);
    el.addEventListener("cursorout", onOut);
    return () => {
      el.removeEventListener("cursorover", onOver);
      el.removeEventListener("cursorout", onOut);
    };
  }, [onHoverChange]);
  return (
    <Link href={href} className={className} ref={ref}>
      {children}
    </Link>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <div className="entry">
      <div className="role">{entry.role}</div>
      <a className="link" href={entry.linkHref} target="_blank" rel="noreferrer">
        {entry.linkLabel}
        <LinkArrow />
      </a>
      {entry.description && <div className="desc">{entry.description}</div>}
      {entry.images && entry.images.length > 0 && (
        <div className="entry-images">
          {entry.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} className="entry-image" src={src} alt="" loading="lazy" />
          ))}
        </div>
      )}
    </div>
  );
}

function ContactSection() {
  return (
    <div className="contact-section">
      <div className="contact-block">
        <div className="role">Email</div>
        <a className="link" href={`mailto:${contactEmail}`} data-cursor-target>
          {contactEmail}
          <LinkArrow />
        </a>
      </div>

      {meetingLink.href && (
        <div className="contact-block">
          <div className="role">Meet</div>
          <a
            className="link"
            href={meetingLink.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-target
          >
            {meetingLink.label}
            <LinkArrow />
          </a>
        </div>
      )}

      {socialLinks.length > 0 && (
        <div className="contact-block">
          <div className="role">Elsewhere</div>
          <div className="contact-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                className="link"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-target
              >
                {s.label}
                <LinkArrow />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabContent({ tab }: { tab: TabId }) {
  if (tab === "work") {
    return (
      <>
        {workItems.map((e, i) => (
          <EntryBlock key={i} entry={e} />
        ))}
      </>
    );
  }
  if (tab === "projects") {
    return (
      <>
        {projectItems.map((e, i) => (
          <EntryBlock key={i} entry={e} />
        ))}
      </>
    );
  }
  if (tab === "contributions") {
    return (
      <>
        {contributionItems.map((e, i) => (
          <EntryBlock key={i} entry={e} />
        ))}
      </>
    );
  }
  if (tab === "contact") {
    return <ContactSection />;
  }
  return <GalleryGrid />;
}

function GalleryGrid() {
  // Start with the unshuffled order so server and client render identically,
  // then shuffle after mount (client-only) to avoid a hydration mismatch.
  const [shuffled, setShuffled] = useState(galleryImages);
  useEffect(() => {
    setShuffled([...galleryImages].sort(() => Math.random() - 0.5));
  }, []);
  return (
    <div className="gallery-scroll">
      {shuffled.map((src, i) => (
        <div className="gallery-item" key={i}>
          <Image src={src} alt="" width={1600} height={1000} sizes="100vw" />
        </div>
      ))}
    </div>
  );
}

let tabScrollLeft = 0;

type Props = {
  activeTab: TabId;
  isHome: boolean;
};

export default function PortfolioShell({ activeTab, isHome }: Props) {
  const currentTab: TabId = isHome ? "work" : activeTab;
  const [hovered, setHovered] = useState<string | null>(null);
  const tabsRef = useRef<HTMLElement>(null);

  // Each tab is a separate route, so switching tabs remounts this
  // component — restore the bottom nav bar's horizontal scroll position
  // (kept in a module-level variable, not React state, since it must
  // survive the remount) instead of snapping back to the start.
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollLeft = tabScrollLeft;
    const onScroll = () => {
      tabScrollLeft = el.scrollLeft;
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-root" data-home={isHome ? "true" : "false"}>
      <div className="wrap">
        <div className="layout-grid">
          {/* COLUMN 1 — ABOUT */}
          <div className="col-about">
            <NavLink
              href="/"
              className="name-badge"
              onHoverChange={(h) => setHovered((prev) => (h ? "name" : prev === "name" ? null : prev))}
            >
              <ScrambleLabel text={bio.name} className="label" active={hovered === "name"} />
            </NavLink>
            <div className="bio-photo-wrap">
              <Image
                className="bio-photo"
                src={bio.photo}
                alt={bio.name}
                width={600}
                height={750}
              />
            </div>
            <div className="bio">
              <p>{bio.intro}</p>
              <p className="muted">{bio.background}</p>
              <p>I believe in the following principles to do great creative work:</p>
              <div className="tags">
                {bio.tags.map((t) => (
                  <span key={t} data-cursor-target>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNS 2+3 — TABS AND CONTENT, together ~2/3 of the page */}
          <div className="tabs-content-wrap">
            {/* COLUMN 2 — TAB LIST */}
            <nav className="col-tabs" ref={tabsRef}>
              <Link href="/" className={`tab-link about-link${isHome ? " active" : ""}`}>
                About
              </Link>
              {TAB_ORDER.map((t) => (
                <NavLink
                  key={t.id}
                  href={`/${t.id}/`}
                  className={`tab-link${!isHome && currentTab === t.id ? " active" : ""}`}
                  onHoverChange={(h) => setHovered((prev) => (h ? t.id : prev === t.id ? null : prev))}
                >
                  <ScrambleLabel text={t.label} className="label" active={hovered === t.id} />
                </NavLink>
              ))}
              <ThemeToggle />
            </nav>

            {/* COLUMN 3 — ACTIVE TAB CONTENT */}
            <div className="col-content" key={currentTab}>
              <TabContent tab={currentTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
