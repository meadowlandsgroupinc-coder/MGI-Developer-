import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MirzaCapital Investments | Multi-Unit Investor Suite",
  description:
    "Analyze deals, calculate CMHC-insured mortgage costs, model MLI Select points, and determine if the numbers work — before you make an offer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
