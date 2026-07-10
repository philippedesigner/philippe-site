import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Gallery — Philippe Schroeder",
};

export default function GalleryPage() {
  return <PortfolioShell activeTab="gallery" isHome={false} />;
}
