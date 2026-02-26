import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MirzaCapital Investments | Real Estate Investment Tools",
  description:
    "Professional real estate investment analysis tools — Deal Analyzer, Mortgage Calculator, MLI Select Scorer, and CMHC Reference Guide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
