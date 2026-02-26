import Link from "next/link";
import Footer from "@/components/Footer";

const tools = [
  {
    id: "deal",
    title: "Deal Analyzer",
    description:
      "Input property details and financing terms. Auto-calculates CMHC premiums, DSCR, cap rate, and cash-on-cash return using July 2025 rates.",
    href: "/tools/deal-analyzer",
    color: "#4ade80",
  },
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    description:
      "Model monthly payments across different rates, amortizations, and loan amounts. Includes amortization schedule and term-end balance.",
    href: "/tools/mortgage-calculator",
    color: "#8ab4f8",
  },
  {
    id: "mli",
    title: "MLI Select Scorer",
    description:
      "Select your affordability, energy, and accessibility commitments to see your MLI Select score and unlocked financing incentives.",
    href: "/tools/mli-select",
    color: "#facc15",
  },
  {
    id: "reference",
    title: "CMHC Reference",
    description:
      "Updated to reflect the July 14, 2025 premium restructuring (Advice 264) and Advice 268 MLI Select changes. Full premium tables and requirements.",
    href: "/tools/cmhc-guide",
    color: "#c4b5fd",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header / Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #0d1117 50%, #0f1a12 100%)",
          borderBottom: "1px solid rgba(138,180,248,0.12)",
          padding: "60px 28px 48px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 10,
              letterSpacing: 4,
              color: "#8ab4f8",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            MirzaCapital Investments
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 300,
              color: "#fff",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Multi-Unit{" "}
            <span style={{ color: "#8ab4f8" }}>Investor Suite</span>
          </h1>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: 14,
              color: "#777",
              margin: "0 0 32px",
              maxWidth: 580,
              lineHeight: 1.6,
            }}
          >
            Analyze deals, calculate CMHC-insured mortgage costs, model MLI
            Select points, and determine if the numbers work — before you make
            an offer.
          </p>

          {/* Tool Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="tool-card"
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: 24,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 10,
                    letterSpacing: 2,
                    color: tool.color,
                    textTransform: "uppercase",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {tool.title}
                </div>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 12,
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {tool.description}
                </p>
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 11,
                    color: tool.color,
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  Open Tool →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 28px 0", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { label: "Premium Data", value: "July 2025", color: "#8ab4f8" },
            { label: "Tools", value: "4", color: "#4ade80" },
            { label: "Calculations", value: "Instant", color: "#facc15" },
            { label: "Cost", value: "Free", color: "#c4b5fd" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: 16,
                background: "rgba(255,255,255,0.02)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 18,
                  fontWeight: 300,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 9,
                  letterSpacing: 1,
                  color: "#666",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      <Footer />
    </div>
  );
}
