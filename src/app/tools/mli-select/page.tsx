"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

interface MLICriteria {
  // Energy Efficiency
  energyEfficiency: number; // 0-25 points
  // Accessibility
  accessibility: number; // 0-25 points
  // Affordability
  affordability: number; // 0-50 points
}

const energyOptions = [
  { label: "No energy efficiency measures", value: 0, desc: "Base level — no additional measures" },
  { label: "10% below National Energy Code", value: 5, desc: "Modest improvement over code" },
  { label: "25% below National Energy Code", value: 10, desc: "Meaningful reduction in energy use" },
  { label: "ENERGY STAR certified", value: 15, desc: "Recognized efficiency standard" },
  { label: "Net Zero Ready / Passive House", value: 20, desc: "High-performance building envelope" },
  { label: "Net Zero Energy", value: 25, desc: "Maximum energy efficiency points" },
];

const accessibilityOptions = [
  { label: "No accessibility features", value: 0, desc: "Standard construction" },
  { label: "10% accessible / adaptable units", value: 5, desc: "Basic accessibility provision" },
  { label: "20% accessible + common areas", value: 10, desc: "Moderate accessibility" },
  { label: "Universal design principles applied", value: 15, desc: "Broad design accessibility" },
  { label: "30%+ fully accessible units", value: 20, desc: "Strong accessibility commitment" },
  { label: "Exceeds all accessibility standards", value: 25, desc: "Maximum accessibility points" },
];

const affordabilityOptions = [
  { label: "Market rents — no affordability", value: 0, desc: "No discount from market rents" },
  { label: "10% below median market rent (min 20% units)", value: 10, desc: "Basic affordability commitment" },
  { label: "20% below median market rent (min 20% units)", value: 20, desc: "Meaningful rent savings" },
  { label: "20% below median (min 100% units)", value: 30, desc: "Broad affordability" },
  { label: "30% below median market rent (min 20% units)", value: 40, desc: "Deep affordability for some units" },
  { label: "30% below median (min 100% units)", value: 50, desc: "Maximum affordability points" },
];

function getPremiumDiscount(totalScore: number): {
  discount: number;
  tier: string;
} {
  if (totalScore >= 70) return { discount: 40, tier: "Platinum" };
  if (totalScore >= 50) return { discount: 25, tier: "Gold" };
  if (totalScore >= 25) return { discount: 15, tier: "Silver" };
  if (totalScore > 0) return { discount: 5, tier: "Bronze" };
  return { discount: 0, tier: "Not Eligible" };
}

function ScoreBar({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <span className="font-semibold text-[var(--color-primary)]">
          {score} / {max}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background:
              pct >= 80
                ? "#16a34a"
                : pct >= 50
                  ? "#ca8a04"
                  : pct > 0
                    ? "#ea580c"
                    : "#e5e7eb",
          }}
        />
      </div>
    </div>
  );
}

export default function MLISelectPage() {
  const [criteria, setCriteria] = useState<MLICriteria>({
    energyEfficiency: 0,
    accessibility: 0,
    affordability: 0,
  });

  const totalScore = useMemo(
    () =>
      criteria.energyEfficiency +
      criteria.accessibility +
      criteria.affordability,
    [criteria]
  );
  const { discount, tier } = useMemo(
    () => getPremiumDiscount(totalScore),
    [totalScore]
  );

  const tierColor =
    tier === "Platinum"
      ? "text-purple-700 bg-purple-50 border-purple-200"
      : tier === "Gold"
        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
        : tier === "Silver"
          ? "text-gray-600 bg-gray-50 border-gray-200"
          : tier === "Bronze"
            ? "text-orange-700 bg-orange-50 border-orange-200"
            : "text-red-600 bg-red-50 border-red-200";

  return (
    <ToolPageLayout
      title="MLI Select Scorer"
      description="Score your multi-unit residential project against CMHC MLI Select criteria and determine your premium discount tier."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Energy Efficiency */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-1">
              Energy Efficiency
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Up to 25 points for energy performance above code requirements.
            </p>
            <div className="space-y-2">
              {energyOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    criteria.energyEfficiency === opt.value
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="energy"
                    checked={criteria.energyEfficiency === opt.value}
                    onChange={() =>
                      setCriteria((p) => ({
                        ...p,
                        energyEfficiency: opt.value,
                      }))
                    }
                    className="mt-0.5 accent-[var(--color-accent)]"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {opt.label}{" "}
                      <span className="text-[var(--color-accent)] font-semibold">
                        ({opt.value} pts)
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {opt.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-1">
              Accessibility
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Up to 25 points for accessible and adaptable unit design.
            </p>
            <div className="space-y-2">
              {accessibilityOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    criteria.accessibility === opt.value
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="accessibility"
                    checked={criteria.accessibility === opt.value}
                    onChange={() =>
                      setCriteria((p) => ({
                        ...p,
                        accessibility: opt.value,
                      }))
                    }
                    className="mt-0.5 accent-[var(--color-accent)]"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {opt.label}{" "}
                      <span className="text-[var(--color-accent)] font-semibold">
                        ({opt.value} pts)
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {opt.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Affordability */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-1">
              Affordability
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Up to 50 points for providing rents below median market levels.
            </p>
            <div className="space-y-2">
              {affordabilityOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    criteria.affordability === opt.value
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                      : "border-[var(--color-border)] hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="affordability"
                    checked={criteria.affordability === opt.value}
                    onChange={() =>
                      setCriteria((p) => ({
                        ...p,
                        affordability: opt.value,
                      }))
                    }
                    className="mt-0.5 accent-[var(--color-accent)]"
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {opt.label}{" "}
                      <span className="text-[var(--color-accent)] font-semibold">
                        ({opt.value} pts)
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {opt.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-4">
          <div className="bg-[var(--color-primary)] rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-1">Total Score</h2>
            <div className="text-5xl font-extrabold text-[var(--color-accent)]">
              {totalScore}
              <span className="text-2xl text-white/50"> / 100</span>
            </div>
          </div>

          <div
            className={`rounded-xl border p-4 text-center ${tierColor}`}
          >
            <div className="text-sm font-medium mb-1">Premium Discount Tier</div>
            <div className="text-3xl font-extrabold">{tier}</div>
            {discount > 0 && (
              <div className="text-sm mt-1 font-semibold">
                {discount}% premium reduction
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 space-y-3">
            <h3 className="font-semibold text-[var(--color-primary)]">
              Score Breakdown
            </h3>
            <ScoreBar
              label="Energy Efficiency"
              score={criteria.energyEfficiency}
              max={25}
            />
            <ScoreBar
              label="Accessibility"
              score={criteria.accessibility}
              max={25}
            />
            <ScoreBar
              label="Affordability"
              score={criteria.affordability}
              max={50}
            />
          </div>

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 text-sm">
            <h3 className="font-semibold text-[var(--color-primary)] mb-2">
              Tier Thresholds
            </h3>
            <div className="space-y-1.5 text-[var(--color-text-muted)]">
              <div className="flex justify-between">
                <span>Platinum (40% off)</span>
                <span className="font-medium">70+ pts</span>
              </div>
              <div className="flex justify-between">
                <span>Gold (25% off)</span>
                <span className="font-medium">50–69 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Silver (15% off)</span>
                <span className="font-medium">25–49 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Bronze (5% off)</span>
                <span className="font-medium">1–24 pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
