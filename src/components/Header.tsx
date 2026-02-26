"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/tools/deal-analyzer", label: "Deal Analyzer" },
  { href: "/tools/mortgage-calculator", label: "Mortgage Calculator" },
  { href: "/tools/mli-select", label: "MLI Select Scorer" },
  { href: "/tools/cmhc-guide", label: "CMHC Reference" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      {/* Brand Bar */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d1117 50%, #0f1a12 100%)",
          borderBottom: "1px solid rgba(138,180,248,0.12)",
          padding: "36px 28px 28px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 10,
                letterSpacing: 4,
                color: "#8ab4f8",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              MirzaCapital Investments
            </div>
          </Link>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 300,
              color: "#fff",
              margin: "0 0 8px",
              lineHeight: 1.2,
            }}
          >
            Multi-Unit{" "}
            <span style={{ color: "#8ab4f8" }}>Investor Suite</span>
          </h1>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 13,
              color: "#777",
              margin: 0,
              maxWidth: 580,
            }}
          >
            Analyze deals, calculate CMHC-insured mortgage costs, model MLI
            Select points, and determine if the numbers work — before you make
            an offer.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(6,8,12,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "0 28px",
        }}
      >
        <nav
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            gap: 0,
            overflowX: "auto",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: "none",
                  borderBottom: isActive
                    ? "2px solid #8ab4f8"
                    : "2px solid transparent",
                  color: isActive ? "#8ab4f8" : "#555",
                  fontFamily: "sans-serif",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  padding: "14px 20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "#555",
          padding: 14,
          cursor: "pointer",
        }}
        aria-label="Toggle menu"
      >
        Menu
      </button>

      {mobileOpen && (
        <div
          style={{
            background: "rgba(6,8,12,0.98)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "8px 28px 16px",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                fontFamily: "sans-serif",
                fontSize: 12,
                color: pathname === item.href ? "#8ab4f8" : "#777",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
