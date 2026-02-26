"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { fmtCur } from "@/lib/cmhc-data";

interface MortgageInputs {
  loanAmount: number;
  rate: number;
  amort: number;
  term: number;
}

const defaults: MortgageInputs = {
  loanAmount: 1700000,
  rate: 4.5,
  amort: 40,
  term: 5,
};

function calcMortgage(m: MortgageInputs) {
  const mr = m.rate / 100 / 12;
  const n = m.amort * 12;
  const monthly =
    mr > 0
      ? (m.loanAmount * (mr * Math.pow(1 + mr, n))) /
        (Math.pow(1 + mr, n) - 1)
      : m.loanAmount / n;
  const annual = monthly * 12;
  const totalPaid = monthly * n;
  const totalInterest = totalPaid - m.loanAmount;

  // Amortization schedule — first 10 years
  const schedule: {
    year: number;
    interest: number;
    principal: number;
    balance: number;
  }[] = [];
  let balance = m.loanAmount;
  for (let yr = 1; yr <= Math.min(m.amort, 10); yr++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let mo = 0; mo < 12; mo++) {
      const intPayment = balance * mr;
      const prinPayment = monthly - intPayment;
      yearInterest += intPayment;
      yearPrincipal += prinPayment;
      balance -= prinPayment;
    }
    schedule.push({
      year: yr,
      interest: yearInterest,
      principal: yearPrincipal,
      balance: Math.max(0, balance),
    });
  }

  // Term-end balance
  const termMonths = m.term * 12;
  let termBalance = m.loanAmount;
  for (let mo = 0; mo < termMonths; mo++) {
    const intP = termBalance * mr;
    termBalance -= monthly - intP;
  }

  return {
    monthly,
    annual,
    totalPaid,
    totalInterest,
    schedule,
    termBalance: Math.max(0, termBalance),
  };
}

export default function MortgageCalculatorPage() {
  const [m, setM] = useState<MortgageInputs>(defaults);
  const u = <K extends keyof MortgageInputs>(k: K, v: MortgageInputs[K]) =>
    setM((p) => ({ ...p, [k]: v }));

  const calc = useMemo(() => calcMortgage(m), [m]);

  const inputFields: {
    label: string;
    field: keyof MortgageInputs;
    prefix?: string;
    suffix?: string;
    step: number;
    min?: number;
    max?: number;
  }[] = [
    { label: "Loan Amount (incl. premium)", field: "loanAmount", prefix: "$", step: 10000 },
    { label: "Interest Rate", field: "rate", suffix: "%", step: 0.05, min: 1, max: 12 },
    { label: "Amortization", field: "amort", suffix: "years", step: 5, min: 15, max: 50 },
    { label: "Mortgage Term", field: "term", suffix: "years", step: 1, min: 1, max: 10 },
  ];

  return (
    <ToolPageLayout>
      <h2 style={{ fontSize: 26, fontWeight: 300, color: "#fff", margin: "0 0 6px" }}>
        Mortgage Calculator
      </h2>
      <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", marginBottom: 24 }}>
        Model monthly payments across different rates, amortizations, and loan
        amounts.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left: Inputs + Quick Results */}
        <div className="card">
          <div className="section-label" style={{ color: "#8ab4f8" }}>
            Loan Parameters
          </div>
          {inputFields.map(({ label, field, prefix, suffix, step, min, max }) => (
            <div
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <label
                style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999" }}
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
                  value={m[field]}
                  onChange={(e) => u(field, Number(e.target.value))}
                  min={min}
                  max={max}
                  step={step}
                  className="input-field input-field-lg"
                />
                {suffix && (
                  <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555" }}>
                    {suffix}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Quick results */}
          <div
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {[
              { label: "Monthly Payment", val: fmtCur(calc.monthly), color: "#8ab4f8" },
              { label: "Annual Payment", val: fmtCur(calc.annual), color: "#8ab4f8" },
              { label: "Total Interest", val: fmtCur(calc.totalInterest), color: "#f87171" },
              {
                label: `Balance at ${m.term}yr Term`,
                val: fmtCur(calc.termBalance),
                color: "#facc15",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 12,
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 18,
                    fontWeight: 300,
                    color: item.color,
                  }}
                >
                  {item.val}
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
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Amortization Schedule */}
        <div className="card">
          <div className="section-label" style={{ color: "#c4b5fd" }}>
            Amortization Schedule (First 10 Years)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 1fr 1fr",
              gap: 0,
              fontFamily: "sans-serif",
              fontSize: 11,
            }}
          >
            {["Yr", "Principal", "Interest", "Balance"].map((h) => (
              <div
                key={h}
                style={{
                  padding: "8px 6px",
                  color: "#666",
                  fontWeight: 600,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontSize: 9,
                }}
              >
                {h}
              </div>
            ))}
            {calc.schedule.map((row) => (
              <ScheduleRow key={row.year} row={row} />
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function ScheduleRow({
  row,
}: {
  row: { year: number; principal: number; interest: number; balance: number };
}) {
  const cells = [
    { value: String(row.year), color: "#888" },
    { value: fmtCur(row.principal), color: "#4ade80" },
    { value: fmtCur(row.interest), color: "#f87171" },
    { value: fmtCur(row.balance), color: "#ccc" },
  ];
  return (
    <>
      {cells.map((cell, j) => (
        <div
          key={j}
          style={{
            padding: "7px 6px",
            color: cell.color,
            borderBottom: "1px solid rgba(255,255,255,0.03)",
            fontSize: 12,
            fontFamily: "sans-serif",
          }}
        >
          {cell.value}
        </div>
      ))}
    </>
  );
}
