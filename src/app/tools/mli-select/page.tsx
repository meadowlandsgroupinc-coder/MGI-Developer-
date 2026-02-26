"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  AFFORDABILITY_POINTS,
  ENERGY_POINTS,
  ACCESSIBILITY_POINTS,
  MLI_POINTS_TIERS,
  getMLITier,
} from "@/lib/cmhc-data";

interface Selections {
  affordability: number;
  energy: number;
  accessibility: number;
}

function PointCategory({
  title,
  items,
  field,
  color,
  selected,
  onSelect,
}: {
  title: string;
  items: { desc: string; pts: number }[];
  field: string;
  color: string;
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="section-label" style={{ color }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={() => onSelect(-1)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background:
              selected === -1
                ? "rgba(255,255,255,0.06)"
                : "transparent",
            border: `1px solid ${
              selected === -1
                ? "rgba(255,255,255,0.15)"
                : "rgba(255,255,255,0.04)"
            }`,
            borderRadius: 6,
            padding: "10px 14px",
            cursor: "pointer",
            color: "#999",
            fontFamily: "sans-serif",
            fontSize: 12,
            textAlign: "left",
            width: "100%",
          }}
        >
          <span>None / Not applicable</span>
          <span style={{ color: "#555" }}>0 pts</span>
        </button>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background:
                selected === i ? `${color}15` : "transparent",
              border: `1px solid ${
                selected === i ? color + "44" : "rgba(255,255,255,0.04)"
              }`,
              borderRadius: 6,
              padding: "10px 14px",
              cursor: "pointer",
              color: selected === i ? "#fff" : "#999",
              fontFamily: "sans-serif",
              fontSize: 12,
              textAlign: "left",
              width: "100%",
              transition: "all 0.15s",
            }}
          >
            <span style={{ flex: 1, marginRight: 12 }}>{item.desc}</span>
            <span
              style={{
                fontWeight: 600,
                color: selected === i ? color : "#555",
                whiteSpace: "nowrap",
              }}
            >
              {item.pts} pts
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MLISelectPage() {
  const [selections, setSelections] = useState<Selections>({
    affordability: -1,
    energy: -1,
    accessibility: -1,
  });

  const totalPoints = useMemo(() => {
    let pts = 0;
    if (selections.affordability >= 0)
      pts += AFFORDABILITY_POINTS[selections.affordability].pts;
    if (selections.energy >= 0) pts += ENERGY_POINTS[selections.energy].pts;
    if (selections.accessibility >= 0)
      pts += ACCESSIBILITY_POINTS[selections.accessibility].pts;
    return pts;
  }, [selections]);

  const tier = getMLITier(totalPoints);

  return (
    <ToolPageLayout>
      <h2 style={{ fontSize: 26, fontWeight: 300, color: "#fff", margin: "0 0 6px" }}>
        MLI Select Points Scorer
      </h2>
      <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", marginBottom: 24 }}>
        Select your commitments to see your MLI Select score and the financing
        incentives you unlock.
      </p>

      {/* Score Display */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: 20,
            background: tier
              ? `${totalPoints >= 100 ? "#4ade80" : totalPoints >= 70 ? "#facc15" : "#8ab4f8"}08`
              : "rgba(255,255,255,0.02)",
            border: `1px solid ${
              tier
                ? totalPoints >= 100
                  ? "#4ade8033"
                  : totalPoints >= 70
                    ? "#facc1533"
                    : "#8ab4f833"
                : "rgba(255,255,255,0.06)"
            }`,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: tier ? "#fff" : "#555",
            }}
          >
            {totalPoints}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#888",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Total Points
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 11,
              color: totalPoints >= 50 ? "#4ade80" : "#f87171",
              marginTop: 6,
            }}
          >
            {totalPoints >= 50
              ? "\u2713 Qualifies"
              : `Need ${50 - totalPoints} more pts`}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: tier ? "#8ab4f8" : "#555",
            }}
          >
            {tier ? `${(tier.discount * 100).toFixed(0)}%` : "\u2014"}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#888",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Premium Discount
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: tier ? "#facc15" : "#555",
            }}
          >
            {tier ? `${tier.maxAmort}yr` : "25yr"}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#888",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Max Amortization
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: tier ? "#c4b5fd" : "#555",
            }}
          >
            {tier ? `${tier.maxLTV}%` : "85%"}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 9,
              letterSpacing: 1.5,
              color: "#888",
              textTransform: "uppercase",
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            Max LTV
          </div>
        </div>
      </div>

      <PointCategory
        title="Affordability"
        items={AFFORDABILITY_POINTS}
        field="affordability"
        color="#4ade80"
        selected={selections.affordability}
        onSelect={(i) =>
          setSelections((p) => ({ ...p, affordability: i }))
        }
      />
      <PointCategory
        title="Energy Efficiency"
        items={ENERGY_POINTS}
        field="energy"
        color="#8ab4f8"
        selected={selections.energy}
        onSelect={(i) => setSelections((p) => ({ ...p, energy: i }))}
      />
      <PointCategory
        title="Accessibility"
        items={ACCESSIBILITY_POINTS}
        field="accessibility"
        color="#facc15"
        selected={selections.accessibility}
        onSelect={(i) =>
          setSelections((p) => ({ ...p, accessibility: i }))
        }
      />

      {/* Tier Benefits */}
      <div className="card">
        <div className="section-label" style={{ color: "#c4b5fd" }}>
          MLI Select Tier Benefits
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
          }}
        >
          {MLI_POINTS_TIERS.map((t, i) => {
            const isActive =
              totalPoints >= t.min &&
              (i === MLI_POINTS_TIERS.length - 1 ||
                totalPoints < MLI_POINTS_TIERS[i + 1].min);
            return (
              <div
                key={i}
                style={{
                  padding: 16,
                  borderRadius: 8,
                  textAlign: "center",
                  background: isActive
                    ? "rgba(138,180,248,0.08)"
                    : "rgba(0,0,0,0.2)",
                  border: isActive
                    ? "1px solid rgba(138,180,248,0.3)"
                    : "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 11,
                    color: "#888",
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  Up to {t.maxLTV}% LTV
                  <br />
                  Up to {t.maxAmort}yr amort
                  <br />
                  {(t.discount * 100).toFixed(0)}% premium discount
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolPageLayout>
  );
}
