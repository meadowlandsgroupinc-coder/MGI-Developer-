"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

interface DealInputs {
  purchasePrice: number;
  downPaymentPct: number;
  interestRate: number;
  amortization: number;
  grossRent: number;
  vacancy: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  management: number;
  utilities: number;
  otherExpenses: number;
  closingCosts: number;
}

const defaults: DealInputs = {
  purchasePrice: 500000,
  downPaymentPct: 20,
  interestRate: 5.5,
  amortization: 25,
  grossRent: 3500,
  vacancy: 5,
  propertyTax: 350,
  insurance: 150,
  maintenance: 200,
  management: 0,
  utilities: 0,
  otherExpenses: 0,
  closingCosts: 15000,
};

function computeDeal(inputs: DealInputs) {
  const downPayment = inputs.purchasePrice * (inputs.downPaymentPct / 100);
  const loanAmount = inputs.purchasePrice - downPayment;
  const totalCashInvested = downPayment + inputs.closingCosts;

  // Monthly mortgage payment (P&I)
  const monthlyRate = inputs.interestRate / 100 / 12;
  const numPayments = inputs.amortization * 12;
  const monthlyMortgage =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  const effectiveGrossRent = inputs.grossRent * (1 - inputs.vacancy / 100);
  const totalExpenses =
    inputs.propertyTax +
    inputs.insurance +
    inputs.maintenance +
    inputs.management +
    inputs.utilities +
    inputs.otherExpenses;

  const noi = effectiveGrossRent - totalExpenses;
  const monthlyCashFlow = noi - monthlyMortgage;
  const annualCashFlow = monthlyCashFlow * 12;

  const annualNOI = noi * 12;
  const capRate = (annualNOI / inputs.purchasePrice) * 100;
  const cashOnCash =
    totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
  const dscr = monthlyMortgage > 0 ? noi / monthlyMortgage : 0;
  const expenseRatio =
    effectiveGrossRent > 0 ? (totalExpenses / effectiveGrossRent) * 100 : 0;

  return {
    downPayment,
    loanAmount,
    totalCashInvested,
    monthlyMortgage,
    effectiveGrossRent,
    totalExpenses,
    noi,
    monthlyCashFlow,
    annualCashFlow,
    annualNOI,
    capRate,
    cashOnCash,
    dscr,
    expenseRatio,
  };
}

function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full border border-[var(--color-border)] rounded-lg py-2.5 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none transition ${prefix ? "pl-7" : "pl-3"} ${suffix ? "pr-10" : "pr-3"}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-4">
      <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${color || "text-[var(--color-primary)]"}`}>
        {value}
      </div>
    </div>
  );
}

export default function DealAnalyzerPage() {
  const [inputs, setInputs] = useState<DealInputs>(defaults);

  const update = (field: keyof DealInputs) => (v: number) =>
    setInputs((prev) => ({ ...prev, [field]: v }));

  const results = computeDeal(inputs);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <ToolPageLayout
      title="Deal Analyzer"
      description="Evaluate rental property deals with cash flow analysis, cap rate, and cash-on-cash return projections."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Property &amp; Financing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Purchase Price"
                value={inputs.purchasePrice}
                onChange={update("purchasePrice")}
                prefix="$"
              />
              <InputField
                label="Down Payment"
                value={inputs.downPaymentPct}
                onChange={update("downPaymentPct")}
                suffix="%"
              />
              <InputField
                label="Interest Rate"
                value={inputs.interestRate}
                onChange={update("interestRate")}
                suffix="%"
              />
              <InputField
                label="Amortization"
                value={inputs.amortization}
                onChange={update("amortization")}
                suffix="yrs"
              />
              <InputField
                label="Closing Costs"
                value={inputs.closingCosts}
                onChange={update("closingCosts")}
                prefix="$"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Income
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Gross Monthly Rent"
                value={inputs.grossRent}
                onChange={update("grossRent")}
                prefix="$"
              />
              <InputField
                label="Vacancy Rate"
                value={inputs.vacancy}
                onChange={update("vacancy")}
                suffix="%"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Monthly Expenses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Property Tax"
                value={inputs.propertyTax}
                onChange={update("propertyTax")}
                prefix="$"
              />
              <InputField
                label="Insurance"
                value={inputs.insurance}
                onChange={update("insurance")}
                prefix="$"
              />
              <InputField
                label="Maintenance"
                value={inputs.maintenance}
                onChange={update("maintenance")}
                prefix="$"
              />
              <InputField
                label="Property Management"
                value={inputs.management}
                onChange={update("management")}
                prefix="$"
              />
              <InputField
                label="Utilities"
                value={inputs.utilities}
                onChange={update("utilities")}
                prefix="$"
              />
              <InputField
                label="Other Expenses"
                value={inputs.otherExpenses}
                onChange={update("otherExpenses")}
                prefix="$"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-[var(--color-primary)] rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-1">Monthly Cash Flow</h2>
            <div
              className={`text-4xl font-extrabold ${results.monthlyCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {fmt(results.monthlyCashFlow)}
            </div>
            <div className="text-white/50 text-sm mt-1">
              {fmt(results.annualCashFlow)} / year
            </div>
          </div>

          <ResultCard label="Cap Rate" value={`${results.capRate.toFixed(2)}%`} />
          <ResultCard
            label="Cash-on-Cash Return"
            value={`${results.cashOnCash.toFixed(2)}%`}
            color={results.cashOnCash >= 8 ? "text-green-600" : results.cashOnCash >= 4 ? "text-yellow-600" : "text-red-600"}
          />
          <ResultCard label="DSCR" value={results.dscr.toFixed(2)} />
          <ResultCard label="Expense Ratio" value={`${results.expenseRatio.toFixed(1)}%`} />

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 space-y-2 text-sm">
            <h3 className="font-semibold text-[var(--color-primary)]">Summary</h3>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Down Payment</span>
              <span className="font-medium">{fmt(results.downPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Loan Amount</span>
              <span className="font-medium">{fmt(results.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Total Cash Invested</span>
              <span className="font-medium">{fmt(results.totalCashInvested)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Monthly Mortgage</span>
              <span className="font-medium">{fmt(results.monthlyMortgage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Effective Rent</span>
              <span className="font-medium">{fmt(results.effectiveGrossRent)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">Total Expenses</span>
              <span className="font-medium">{fmt(results.totalExpenses)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">NOI (monthly)</span>
              <span className="font-medium">{fmt(results.noi)}</span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
