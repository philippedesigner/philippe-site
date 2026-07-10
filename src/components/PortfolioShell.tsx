"use client";

import Link from "next/link";
import Image from "next/image";
import ScrambleLabel from "./ScrambleLabel";
import {
  bio,
  workItems,
  projectItems,
  contributionItems,
  galleryImages,
  contactEmail,
  Entry,
} from "@/content";
import { useMemo } from "react";

export type TabId = "work" | "projects" | "contributions" | "gallery";

const TAB_ORDER: { id: TabId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "contributions", label: "Contributions" },
  { id: "gallery", label: "Gallery" },
];

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <div className="entry">
      <div className="role">{entry.role}</div>
      <a className="link" href={entry.linkHref} target="_blank" rel="noreferrer">
        {entry.linkLabel}
      </a>
      {entry.description && <div className="desc">{entry.description}</div>}
      {entry.images && entry.images.length > 0 && (
        <div className="entry-image-bleed">
          {entry.images.map((src, i) => (
            <div className="entry-image-row" key={i}>
              <Image src={src} alt="" width={1600} height={900} sizes="100vw" />
            </div>
          ))}
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
  return <GalleryGrid />;
}

function GalleryGrid() {
  const shuffled = useMemo(() => [...galleryImages].sort(() => Math.random() - 0.5), []);
  return (
    <div className="gallery-scroll">
      {shuffled.map((src, i) => (
        <div className="gallery-item" key={i}>
          <Image src={src} alt="" width={500} height={650} />
        </div>
      ))}
    </div>
  );
}

type Props = {
  activeTab: TabId;
  isHome: boolean;
};

export default function PortfolioShell({ activeTab, isHome }: Props) {
  const currentTab: TabId = isHome ? "work" : activeTab;

  return (
    <div className="page-root" data-home={isHome ? "true" : "false"}>
      <div className="wrap">
        <div className="layout-grid">
          {/* COLUMN 1 — ABOUT */}
          <div className="col-about">
            <span className="name-badge">{bio.name}</span>
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
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNS 2+3 — TABS AND CONTENT, together ~2/3 of the page */}
          <div className="tabs-content-wrap">
            {/* COLUMN 2 — TAB LIST */}
            <nav className="col-tabs">
              <Link href="/" className={`tab-link about-link${isHome ? " active" : ""}`}>
                About
              </Link>
              {TAB_ORDER.map((t) => (
                <Link
                  key={t.id}
                  href={`/${t.id}/`}
                  className={`tab-link${currentTab === t.id ? " active" : ""}`}
                >
                  <ScrambleLabel text={t.label} className="label" />
                </Link>
              ))}
              <a href={`mailto:${contactEmail}`} className="tab-link" data-cursor-target>
                <ScrambleLabel text="Contact" hoverText={contactEmail} className="label" />
              </a>
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
