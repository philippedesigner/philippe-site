import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Contributions — Philippe Schroeder",
};

export default function ContributionsPage() {
  return <PortfolioShell activeTab="contributions" isHome={false} />;
}
