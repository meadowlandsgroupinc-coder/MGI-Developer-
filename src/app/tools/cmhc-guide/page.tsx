"use client";

import ToolPageLayout from "@/components/ToolPageLayout";
import { LTV_PREMIUMS_STANDARD, fmtPct } from "@/lib/cmhc-data";

export default function CMHCGuidePage() {
  return (
    <ToolPageLayout>
      <h2 style={{ fontSize: 26, fontWeight: 300, color: "#fff", margin: "0 0 6px" }}>
        CMHC Quick Reference
      </h2>
      <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", marginBottom: 24 }}>
        Updated to reflect the July 14, 2025 premium restructuring (Advice 264)
        and Advice 268 MLI Select changes.
      </p>

      {/* Premium Table */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label" style={{ color: "#8ab4f8" }}>
          Base LTV Premiums — Standard Rental Housing
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            fontFamily: "sans-serif",
            fontSize: 12,
          }}
        >
          {["LTV Band", "Purchase / Refi", "Construction"].map((h) => (
            <div
              key={h}
              style={{
                padding: "10px 12px",
                color: "#666",
                fontWeight: 600,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                fontSize: 10,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {h}
            </div>
          ))}
          {LTV_PREMIUMS_STANDARD.purchase.map((row, i) => {
            const prevMax =
              i > 0 ? LTV_PREMIUMS_STANDARD.purchase[i - 1].max : 0;
            const label =
              prevMax > 0 ? `${prevMax + 1}\u2013${row.max}%` : `\u2264${row.max}%`;
            return (
              <PremiumRow
                key={i}
                label={label}
                purchaseRate={row.rate}
                constructionRate={LTV_PREMIUMS_STANDARD.construction[i].rate}
              />
            );
          })}
        </div>
      </div>

      {/* Surcharges */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label" style={{ color: "#f87171" }}>
          Premium Surcharges (Added to Base)
        </div>
        {[
          {
            item: "Extended Amortization",
            detail:
              "+0.25% per 5 years beyond 25yr (e.g., 40yr amort = +0.75%)",
          },
          {
            item: "Non-Residential Space",
            detail: "+1.00% on portion attributable to commercial",
          },
          {
            item: "Second Mortgage",
            detail: "+0.50% on outstanding balance of first",
          },
          {
            item: "EGI Not Met at First Advance",
            detail: "+0.25% (not applicable to construction loans)",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: "10px 0",
              borderBottom:
                i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 12,
                color: "#fff",
                fontWeight: 600,
                minWidth: 180,
              }}
            >
              {s.item}
            </div>
            <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999" }}>
              {s.detail}
            </div>
          </div>
        ))}
      </div>

      {/* MLI Select Discounts */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label" style={{ color: "#4ade80" }}>
          MLI Select Premium Discounts
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "#888",
            marginBottom: 14,
          }}
        >
          Discounts apply to (base premium + surcharges). The more points, the
          bigger the discount.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          {[
            {
              pts: "50\u201369 pts",
              discount: "10%",
              amort: "Up to 40yr",
              ltv: "Up to 85%",
            },
            {
              pts: "70\u201399 pts",
              discount: "20%",
              amort: "Up to 45yr",
              ltv: "Up to 90%",
            },
            {
              pts: "100 pts",
              discount: "30%",
              amort: "Up to 50yr",
              ltv: "Up to 95%",
            },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                background: "rgba(0,0,0,0.3)",
                borderRadius: 8,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#4ade80",
                }}
              >
                {d.pts}
              </div>
              <div
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 11,
                  color: "#ccc",
                  marginTop: 8,
                  lineHeight: 1.8,
                }}
              >
                {d.discount} discount
                <br />
                {d.amort}
                <br />
                {d.ltv}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Requirements */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-label" style={{ color: "#facc15" }}>
          CMHC Multi-Unit Key Requirements
        </div>
        {[
          { label: "Minimum Units", val: "5+ rental units (same building/lot)" },
          {
            label: "Minimum DSCR",
            val: "1.1x (lenders typically want 1.2x+)",
          },
          {
            label: "Net Worth Requirement",
            val: "\u226525% of property value",
          },
          {
            label: "Liquidity Requirement",
            val: "\u226510% of property value in liquid assets",
          },
          {
            label: "Affordability Commitment",
            val: "Minimum 10 years; 20yr commitment = bonus 30 points",
          },
          {
            label: "Rent Increases (Affordable Units)",
            val: "Capped at CPI or applicable rent control legislation",
          },
          {
            label: "Energy Efficiency",
            val: "Measured vs. baseline; 25% improvement = 30 pts",
          },
          {
            label: "Accessibility",
            val: "Based on CSA B651:23 standard; % of accessible units",
          },
          {
            label: "Application Fee",
            val: "Per-unit basis, payable by lender at application",
          },
          {
            label: "Approval Timeline",
            val: "~3\u20136 months (varies by project complexity)",
          },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              padding: "8px 0",
              borderBottom:
                i < 9 ? "1px solid rgba(255,255,255,0.03)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: 12,
                color: "#fff",
                fontWeight: 600,
                minWidth: 200,
              }}
            >
              {r.label}
            </div>
            <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999" }}>
              {r.val}
            </div>
          </div>
        ))}
      </div>

      {/* Important Notes */}
      <div
        style={{
          background: "rgba(138,180,248,0.04)",
          border: "1px solid rgba(138,180,248,0.15)",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <div className="section-label" style={{ color: "#8ab4f8" }}>
          Important Notes (July 2025 Changes)
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "#999",
            lineHeight: 1.8,
          }}
        >
          &bull; Premiums now standardized across Market Rental and MLI Select
          (unified grid based on LTV + purpose).
          <br />
          &bull; Rental achievement holdbacks removed for MLI Market Rental
          construction loans (can advance up to 85% LTC/LTV).
          <br />
          &bull; MLI Select holdbacks remain case-by-case.
          <br />
          &bull; New amortization surcharges now apply to MLI Select (previously
          exempt): +0.25% per 5yr beyond 25yr.
          <br />
          &bull; Premium discounts (10/20/30%) apply after all surcharges —
          meaning points are worth more on deals with surcharges.
          <br />
          &bull; All figures are for standard rental housing. Other Shelter
          Models (SRO, student, retirement, supportive) have higher base
          premiums.
          <br />
          &bull; These rates effective for applications submitted on or after
          July 14, 2025.
          <br />
          &bull; Always verify current rates with your CMHC-approved lender
          before submitting. This tool is for estimation only.
        </div>
      </div>
    </ToolPageLayout>
  );
}

function PremiumRow({
  label,
  purchaseRate,
  constructionRate,
}: {
  label: string;
  purchaseRate: number;
  constructionRate: number;
}) {
  return (
    <>
      <div
        style={{
          padding: "8px 12px",
          color: "#ccc",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          fontFamily: "sans-serif",
          fontSize: 12,
        }}
      >
        {label}
      </div>
      <div
        style={{
          padding: "8px 12px",
          color: "#4ade80",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          fontFamily: "sans-serif",
          fontSize: 12,
        }}
      >
        {fmtPct(purchaseRate)}
      </div>
      <div
        style={{
          padding: "8px 12px",
          color: "#facc15",
          borderBottom: "1px solid rgba(255,255,255,0.03)",
          fontFamily: "sans-serif",
          fontSize: 12,
        }}
      >
        {fmtPct(constructionRate)}
      </div>
    </>
  );
}
