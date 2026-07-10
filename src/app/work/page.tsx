import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Work — Philippe Schroeder",
};

export default function WorkPage() {
  return <PortfolioShell activeTab="work" isHome={false} />;
}
