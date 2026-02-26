"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  getBasePremium,
  getAmortSurcharge,
  getMLITier,
  fmtPct,
  fmtCur,
} from "@/lib/cmhc-data";

interface DealInputs {
  purchasePrice: number;
  units: number;
  avgRent: number;
  vacancy: number;
  opexPerUnit: number;
  capexReserve: number;
  ltv: number;
  rate: number;
  amort: number;
  mliPoints: number;
  purpose: "purchase" | "construction";
  renoPerUnit: number;
}

const defaults: DealInputs = {
  purchasePrice: 2000000,
  units: 12,
  avgRent: 1400,
  vacancy: 5,
  opexPerUnit: 400,
  capexReserve: 3,
  ltv: 85,
  rate: 4.5,
  amort: 40,
  mliPoints: 0,
  purpose: "purchase",
  renoPerUnit: 0,
};

function computeDeal(d: DealInputs) {
  const totalValue = d.purchasePrice + d.renoPerUnit * d.units;
  const loanAmt = totalValue * (d.ltv / 100);
  const downPayment = totalValue - loanAmt;

  const gri = d.avgRent * d.units * 12;
  const vacLoss = gri * (d.vacancy / 100);
  const egi = gri - vacLoss;
  const opex = d.opexPerUnit * d.units * 12;
  const capex = gri * (d.capexReserve / 100);
  const noi = egi - opex - capex;

  // CMHC premium
  const basePremium = getBasePremium(d.ltv, d.purpose);
  const amortSurcharge = getAmortSurcharge(d.amort);
  const tier = getMLITier(d.mliPoints);
  const discountPct = tier ? tier.discount : 0;
  const grossPremiumPct = basePremium + amortSurcharge;
  const effectivePremiumPct = grossPremiumPct * (1 - discountPct);
  const premiumDollars = loanAmt * (effectivePremiumPct / 100);
  const totalLoan = loanAmt + premiumDollars;

  // Mortgage payment
  const mr = d.rate / 100 / 12;
  const n = d.amort * 12;
  const monthlyPayment =
    mr > 0
      ? (totalLoan * (mr * Math.pow(1 + mr, n))) /
        (Math.pow(1 + mr, n) - 1)
      : totalLoan / n;
  const annualDS = monthlyPayment * 12;

  const dscr = annualDS > 0 ? noi / annualDS : 0;
  const cashFlow = noi - annualDS;
  const cocReturn = downPayment > 0 ? (cashFlow / downPayment) * 100 : 0;
  const capRate = totalValue > 0 ? (noi / totalValue) * 100 : 0;
  const pricePerUnit = d.purchasePrice / d.units;

  return {
    totalValue,
    loanAmt,
    downPayment,
    gri,
    egi,
    opex,
    capex,
    noi,
    basePremium,
    amortSurcharge,
    discountPct,
    grossPremiumPct,
    effectivePremiumPct,
    premiumDollars,
    totalLoan,
    monthlyPayment,
    annualDS,
    dscr,
    cashFlow,
    cocReturn,
    capRate,
    pricePerUnit,
    vacLoss,
  };
}

function InputRow({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <label
        style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999", flex: 1 }}
      >
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {prefix && (
          <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555" }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step || 1}
          className="input-field"
        />
        {suffix && (
          <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color?: string;
  sub?: string;
}) {
  return (
    <div
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
          fontSize: 22,
          fontWeight: 300,
          color: color || "#fff",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: 10,
          letterSpacing: 1,
          color: "#888",
          textTransform: "uppercase",
          marginTop: 4,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{ fontFamily: "sans-serif", fontSize: 10, color: "#555", marginTop: 2 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

export default function DealAnalyzerPage() {
  const [d, setD] = useState<DealInputs>(defaults);
  const u = <K extends keyof DealInputs>(k: K, v: DealInputs[K]) =>
    setD((p) => ({ ...p, [k]: v }));

  const calc = useMemo(() => computeDeal(d), [d]);

  const passColor =
    calc.dscr >= 1.2 ? "#4ade80" : calc.dscr >= 1.1 ? "#facc15" : "#f87171";
  const cashColor = calc.cashFlow >= 0 ? "#4ade80" : "#f87171";

  return (
    <ToolPageLayout>
      <h2
        style={{ fontSize: 26, fontWeight: 300, color: "#fff", margin: "0 0 6px" }}
      >
        Deal Analyzer
      </h2>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: 13,
          color: "#666",
          marginBottom: 24,
        }}
      >
        Input property details and financing terms. All CMHC premiums
        auto-calculate using July 2025 rates.
      </p>

      {/* Key Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10,
          marginBottom: 24,
        }}
      >
        <Metric
          label="DSCR"
          value={calc.dscr.toFixed(2)}
          color={passColor}
          sub={calc.dscr >= 1.1 ? "CMHC Pass" : "Below Min"}
        />
        <Metric label="Cap Rate" value={fmtPct(calc.capRate)} color="#8ab4f8" />
        <Metric
          label="Cash-on-Cash"
          value={fmtPct(calc.cocReturn)}
          color={calc.cocReturn > 0 ? "#4ade80" : "#f87171"}
        />
        <Metric
          label="Annual Cash Flow"
          value={fmtCur(calc.cashFlow)}
          color={cashColor}
        />
        <Metric
          label="Price/Unit"
          value={fmtCur(calc.pricePerUnit)}
          color="#c4b5fd"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left: Inputs */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label" style={{ color: "#8ab4f8" }}>
              Property
            </div>
            <InputRow
              label="Purchase Price"
              value={d.purchasePrice}
              onChange={(v) => u("purchasePrice", v)}
              prefix="$"
              step={10000}
            />
            <InputRow
              label="Number of Units"
              value={d.units}
              onChange={(v) => u("units", v)}
              min={5}
            />
            <InputRow
              label="Avg Monthly Rent / Unit"
              value={d.avgRent}
              onChange={(v) => u("avgRent", v)}
              prefix="$"
              step={50}
            />
            <InputRow
              label="Vacancy Rate"
              value={d.vacancy}
              onChange={(v) => u("vacancy", v)}
              suffix="%"
              min={0}
              max={20}
            />
            <InputRow
              label="OpEx / Unit / Month"
              value={d.opexPerUnit}
              onChange={(v) => u("opexPerUnit", v)}
              prefix="$"
              step={25}
            />
            <InputRow
              label="CapEx Reserve"
              value={d.capexReserve}
              onChange={(v) => u("capexReserve", v)}
              suffix="% of GRI"
            />
            <InputRow
              label="Reno Cost / Unit (Value-Add)"
              value={d.renoPerUnit}
              onChange={(v) => u("renoPerUnit", v)}
              prefix="$"
              step={5000}
            />
          </div>

          <div className="card">
            <div className="section-label" style={{ color: "#8ab4f8" }}>
              Financing
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <label
                style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999" }}
              >
                Loan Purpose
              </label>
              <select
                value={d.purpose}
                onChange={(e) =>
                  u("purpose", e.target.value as "purchase" | "construction")
                }
                className="select-field"
              >
                <option value="purchase">Purchase / Refinance</option>
                <option value="construction">Construction</option>
              </select>
            </div>
            <InputRow
              label="Loan-to-Value"
              value={d.ltv}
              onChange={(v) => u("ltv", v)}
              suffix="%"
              min={50}
              max={95}
            />
            <InputRow
              label="Interest Rate"
              value={d.rate}
              onChange={(v) => u("rate", v)}
              suffix="%"
              step={0.05}
              min={2}
              max={10}
            />
            <InputRow
              label="Amortization"
              value={d.amort}
              onChange={(v) => u("amort", v)}
              suffix="years"
              min={15}
              max={50}
              step={5}
            />
            <InputRow
              label="MLI Select Points"
              value={d.mliPoints}
              onChange={(v) => u("mliPoints", v)}
              min={0}
              max={100}
            />
          </div>
        </div>

        {/* Right: Breakdown */}
        <div>
          {/* Income & NOI */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label" style={{ color: "#4ade80" }}>
              Income &amp; NOI
            </div>
            {(
              [
                ["Gross Rental Income", fmtCur(calc.gri)],
                ["\u2212 Vacancy Loss", `(${fmtCur(calc.vacLoss)})`],
                ["= Effective Gross Income", fmtCur(calc.egi)],
                ["\u2212 Operating Expenses", `(${fmtCur(calc.opex)})`],
                ["\u2212 CapEx Reserve", `(${fmtCur(calc.capex)})`],
                ["= Net Operating Income", fmtCur(calc.noi)],
              ] as const
            ).map(([l, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom:
                    i === 5 ? "none" : "1px solid rgba(255,255,255,0.03)",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  fontWeight: l.startsWith("=") ? 600 : 400,
                  color: l.startsWith("=")
                    ? "#fff"
                    : l.startsWith("\u2212")
                      ? "#f87171"
                      : "#aaa",
                }}
              >
                <span>{l}</span>
                <span
                  style={{
                    color: l.startsWith("=") ? "#4ade80" : undefined,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* CMHC Insurance */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-label" style={{ color: "#facc15" }}>
              CMHC Insurance
            </div>
            {(
              [
                ["Total Property Value", fmtCur(calc.totalValue)],
                ["Loan Amount (before premium)", fmtCur(calc.loanAmt)],
                ["Down Payment Required", fmtCur(calc.downPayment)],
                ["Base LTV Premium", fmtPct(calc.basePremium)],
                ["Amortization Surcharge", `+${fmtPct(calc.amortSurcharge)}`],
                ["Gross Premium", fmtPct(calc.grossPremiumPct)],
                [
                  "MLI Select Discount",
                  calc.discountPct > 0
                    ? `\u2212${(calc.discountPct * 100).toFixed(0)}%`
                    : "None",
                ],
                ["Effective Premium", fmtPct(calc.effectivePremiumPct)],
                ["Premium in Dollars", fmtCur(calc.premiumDollars)],
                ["Total Loan (incl. premium)", fmtCur(calc.totalLoan)],
              ] as const
            ).map(([l, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom:
                    i === 9 ? "none" : "1px solid rgba(255,255,255,0.03)",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  fontWeight: i === 7 || i === 9 ? 600 : 400,
                  color: i === 7 || i === 9 ? "#fff" : "#aaa",
                }}
              >
                <span>{l}</span>
                <span
                  style={{
                    color: i === 7 || i === 9 ? "#facc15" : undefined,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Debt Service */}
          <div className="card">
            <div className="section-label" style={{ color: "#c4b5fd" }}>
              Debt Service
            </div>
            {(
              [
                ["Monthly Mortgage Payment", fmtCur(calc.monthlyPayment)],
                ["Annual Debt Service", fmtCur(calc.annualDS)],
                ["NOI", fmtCur(calc.noi)],
                ["Annual Cash Flow", fmtCur(calc.cashFlow)],
                ["Monthly Cash Flow", fmtCur(calc.cashFlow / 12)],
              ] as const
            ).map(([l, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom:
                    i === 4 ? "none" : "1px solid rgba(255,255,255,0.03)",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  fontWeight: i >= 3 ? 600 : 400,
                  color: i >= 3 ? "#fff" : "#aaa",
                }}
              >
                <span>{l}</span>
                <span
                  style={{
                    color:
                      i >= 3
                        ? calc.cashFlow >= 0
                          ? "#4ade80"
                          : "#f87171"
                        : undefined,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DSCR Verdict */}
      <div
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 10,
          background:
            calc.dscr >= 1.2
              ? "rgba(74,222,128,0.06)"
              : calc.dscr >= 1.1
                ? "rgba(250,204,21,0.06)"
                : "rgba(248,113,113,0.06)",
          border: `1px solid ${
            calc.dscr >= 1.2
              ? "rgba(74,222,128,0.2)"
              : calc.dscr >= 1.1
                ? "rgba(250,204,21,0.2)"
                : "rgba(248,113,113,0.2)"
          }`,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 13,
            color: passColor,
            fontWeight: 600,
          }}
        >
          {calc.dscr >= 1.2
            ? "\u2713 STRONG DEAL"
            : calc.dscr >= 1.1
              ? "\u26A0 BORDERLINE \u2014 CMHC minimum is 1.1 DSCR"
              : "\u2717 DOES NOT MEET CMHC MINIMUM DSCR (1.1)"}
        </div>
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "#888",
            marginTop: 6,
          }}
        >
          DSCR of {calc.dscr.toFixed(2)} means your NOI covers debt service{" "}
          {calc.dscr.toFixed(2)}x. CMHC requires minimum 1.1x. Lenders
          typically want 1.2x+.
          {calc.cashFlow > 0
            ? ` This deal cash flows ${fmtCur(calc.cashFlow / 12)}/month after debt service.`
            : " This deal is negative cash flow at current terms."}
        </div>
      </div>
    </ToolPageLayout>
  );
}
