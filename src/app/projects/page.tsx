import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Projects — Philippe Schroeder",
};

export default function ProjectsPage() {
  return <PortfolioShell activeTab="projects" isHome={false} />;
}
