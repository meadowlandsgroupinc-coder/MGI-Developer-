// ─── CMHC Premium Data (July 2025 Update) ─────────────────────────
export const LTV_PREMIUMS_STANDARD = {
  purchase: [
    { max: 65, rate: 2.6 },
    { max: 70, rate: 3.1 },
    { max: 75, rate: 3.6 },
    { max: 80, rate: 4.35 },
    { max: 85, rate: 5.35 },
    { max: 90, rate: 5.75 },
    { max: 95, rate: 6.15 },
  ],
  construction: [
    { max: 65, rate: 3.2 },
    { max: 70, rate: 3.7 },
    { max: 75, rate: 4.2 },
    { max: 80, rate: 5.0 },
    { max: 85, rate: 6.0 },
    { max: 90, rate: 6.4 },
    { max: 95, rate: 7.0 },
  ],
};

export const MLI_POINTS_TIERS = [
  { min: 50, max: 69, label: "50+ pts", discount: 0.1, maxAmort: 40, maxLTV: 85 },
  { min: 70, max: 99, label: "70+ pts", discount: 0.2, maxAmort: 45, maxLTV: 90 },
  { min: 100, max: 999, label: "100 pts", discount: 0.3, maxAmort: 50, maxLTV: 95 },
];

export const AFFORDABILITY_POINTS = [
  { desc: "≥10% units at ≤30% median renter income (10yr)", pts: 25 },
  { desc: "≥20% units at ≤30% median renter income (10yr)", pts: 50 },
  { desc: "≥10% units at ≤30% median renter income (20yr)", pts: 55 },
  { desc: "≥25% units at ≤30% median renter income (10yr)", pts: 70 },
  { desc: "≥20% units at ≤30% median renter income (20yr)", pts: 80 },
  { desc: "≥25% units at ≤30% median renter income (20yr)", pts: 100 },
];

export const ENERGY_POINTS = [
  { desc: "15% improvement in energy & GHG", pts: 15 },
  { desc: "25% improvement in energy & GHG", pts: 30 },
];

export const ACCESSIBILITY_POINTS = [
  { desc: "100% of units visitable", pts: 5 },
  { desc: "≥10% units fully accessible (CSA B651)", pts: 10 },
  { desc: "≥20% units fully accessible (CSA B651)", pts: 20 },
];

// ─── Helpers ───────────────────────────────────────────────────────
export function getBasePremium(
  ltv: number,
  purpose: "purchase" | "construction"
): number {
  const table =
    purpose === "construction"
      ? LTV_PREMIUMS_STANDARD.construction
      : LTV_PREMIUMS_STANDARD.purchase;
  for (const row of table) {
    if (ltv <= row.max) return row.rate;
  }
  return table[table.length - 1].rate;
}

export function getAmortSurcharge(amortYears: number): number {
  if (amortYears <= 25) return 0;
  return Math.ceil((amortYears - 25) / 5) * 0.25;
}

export function getMLITier(points: number) {
  for (const tier of [...MLI_POINTS_TIERS].reverse()) {
    if (points >= tier.min) return tier;
  }
  return null;
}

export function fmt(n: number): string {
  return n.toLocaleString("en-CA", { maximumFractionDigits: 0 });
}

export function fmtPct(n: number): string {
  return n.toFixed(2) + "%";
}

export function fmtCur(n: number): string {
  return "$" + fmt(n);
}
