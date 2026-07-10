import type { Metadata } from "next";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata: Metadata = {
  title: "Contact — Philippe Schroeder",
};

export default function ContactPage() {
  return <PortfolioShell activeTab="contact" isHome={false} />;
}
