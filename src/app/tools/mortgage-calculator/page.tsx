"use client";

import { useState, useMemo } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

interface MortgageInputs {
  propertyPrice: number;
  downPaymentPct: number;
  interestRate: number;
  amortization: number;
  paymentFrequency: "monthly" | "biweekly" | "accelerated-biweekly";
}

const defaults: MortgageInputs = {
  propertyPrice: 500000,
  downPaymentPct: 20,
  interestRate: 5.5,
  amortization: 25,
  paymentFrequency: "monthly",
};

function calcMortgage(inputs: MortgageInputs) {
  const downPayment = inputs.propertyPrice * (inputs.downPaymentPct / 100);
  const principal = inputs.propertyPrice - downPayment;

  // CMHC insurance for <20% down
  let cmhcPremiumRate = 0;
  if (inputs.downPaymentPct < 20) {
    if (inputs.downPaymentPct >= 15) cmhcPremiumRate = 2.8;
    else if (inputs.downPaymentPct >= 10) cmhcPremiumRate = 3.1;
    else cmhcPremiumRate = 4.0;
  }
  const cmhcPremium = principal * (cmhcPremiumRate / 100);
  const totalMortgage = principal + cmhcPremium;

  const monthlyRate = inputs.interestRate / 100 / 12;
  const numMonthlyPayments = inputs.amortization * 12;

  const monthlyPayment =
    monthlyRate > 0
      ? (totalMortgage *
          (monthlyRate * Math.pow(1 + monthlyRate, numMonthlyPayments))) /
        (Math.pow(1 + monthlyRate, numMonthlyPayments) - 1)
      : totalMortgage / numMonthlyPayments;

  let payment = monthlyPayment;
  let paymentsPerYear = 12;
  if (inputs.paymentFrequency === "biweekly") {
    payment = (monthlyPayment * 12) / 26;
    paymentsPerYear = 26;
  } else if (inputs.paymentFrequency === "accelerated-biweekly") {
    payment = monthlyPayment / 2;
    paymentsPerYear = 26;
  }

  const totalPaid = monthlyPayment * numMonthlyPayments;
  const totalInterest = totalPaid - totalMortgage;

  // Stress test rate (higher of contract + 2% or 5.25%)
  const stressRate = Math.max(inputs.interestRate + 2, 5.25);
  const stressMonthlyRate = stressRate / 100 / 12;
  const stressPayment =
    stressMonthlyRate > 0
      ? (totalMortgage *
          (stressMonthlyRate *
            Math.pow(1 + stressMonthlyRate, numMonthlyPayments))) /
        (Math.pow(1 + stressMonthlyRate, numMonthlyPayments) - 1)
      : totalMortgage / numMonthlyPayments;

  // Amortization schedule (yearly summary)
  const schedule: {
    year: number;
    principalPaid: number;
    interestPaid: number;
    balance: number;
  }[] = [];
  let balance = totalMortgage;
  for (let year = 1; year <= inputs.amortization; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let month = 0; month < 12; month++) {
      if (balance <= 0) break;
      const interestPortion = balance * monthlyRate;
      const principalPortion = Math.min(
        monthlyPayment - interestPortion,
        balance
      );
      yearPrincipal += principalPortion;
      yearInterest += interestPortion;
      balance -= principalPortion;
    }
    schedule.push({
      year,
      principalPaid: yearPrincipal,
      interestPaid: yearInterest,
      balance: Math.max(balance, 0),
    });
  }

  return {
    downPayment,
    principal,
    cmhcPremium,
    cmhcPremiumRate,
    totalMortgage,
    monthlyPayment,
    payment,
    paymentsPerYear,
    totalPaid,
    totalInterest,
    stressRate,
    stressPayment,
    schedule,
  };
}

export default function MortgageCalculatorPage() {
  const [inputs, setInputs] = useState<MortgageInputs>(defaults);
  const results = useMemo(() => calcMortgage(inputs), [inputs]);

  const update =
    <K extends keyof MortgageInputs>(field: K) =>
    (v: MortgageInputs[K]) =>
      setInputs((prev) => ({ ...prev, [field]: v }));

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);

  const fmtDetailed = (n: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 2,
    }).format(n);

  return (
    <ToolPageLayout
      title="Mortgage Calculator"
      description="Calculate payments, total interest, and amortization schedules for Canadian mortgages with stress test rates."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Mortgage Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Property Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={inputs.propertyPrice}
                    onChange={(e) =>
                      update("propertyPrice")(parseFloat(e.target.value) || 0)
                    }
                    className="w-full border border-[var(--color-border)] rounded-lg py-2.5 pl-7 pr-3 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Down Payment
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.downPaymentPct}
                    onChange={(e) =>
                      update("downPaymentPct")(parseFloat(e.target.value) || 0)
                    }
                    className="w-full border border-[var(--color-border)] rounded-lg py-2.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.interestRate}
                    onChange={(e) =>
                      update("interestRate")(parseFloat(e.target.value) || 0)
                    }
                    className="w-full border border-[var(--color-border)] rounded-lg py-2.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Amortization
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inputs.amortization}
                    onChange={(e) =>
                      update("amortization")(parseInt(e.target.value) || 0)
                    }
                    className="w-full border border-[var(--color-border)] rounded-lg py-2.5 pl-3 pr-10 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm">
                    yrs
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">
                  Payment Frequency
                </label>
                <select
                  value={inputs.paymentFrequency}
                  onChange={(e) =>
                    update("paymentFrequency")(
                      e.target.value as MortgageInputs["paymentFrequency"]
                    )
                  }
                  className="w-full border border-[var(--color-border)] rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] outline-none bg-white"
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-Weekly</option>
                  <option value="accelerated-biweekly">
                    Accelerated Bi-Weekly
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
            <h2 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
              Amortization Schedule (Yearly)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 pr-4 text-[var(--color-text-muted)] font-medium">
                      Year
                    </th>
                    <th className="text-right py-2 px-4 text-[var(--color-text-muted)] font-medium">
                      Principal
                    </th>
                    <th className="text-right py-2 px-4 text-[var(--color-text-muted)] font-medium">
                      Interest
                    </th>
                    <th className="text-right py-2 pl-4 text-[var(--color-text-muted)] font-medium">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((row) => (
                    <tr
                      key={row.year}
                      className="border-b border-[var(--color-border)]/50 hover:bg-gray-50"
                    >
                      <td className="py-2 pr-4">{row.year}</td>
                      <td className="text-right py-2 px-4">
                        {fmt(row.principalPaid)}
                      </td>
                      <td className="text-right py-2 px-4">
                        {fmt(row.interestPaid)}
                      </td>
                      <td className="text-right py-2 pl-4 font-medium">
                        {fmt(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-[var(--color-primary)] rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-1">
              {inputs.paymentFrequency === "monthly"
                ? "Monthly"
                : "Bi-Weekly"}{" "}
              Payment
            </h2>
            <div className="text-4xl font-extrabold text-[var(--color-accent)]">
              {fmtDetailed(results.payment)}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 space-y-3 text-sm">
            <h3 className="font-semibold text-[var(--color-primary)]">
              Mortgage Summary
            </h3>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">
                Down Payment
              </span>
              <span className="font-medium">{fmt(results.downPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">
                Mortgage Amount
              </span>
              <span className="font-medium">{fmt(results.principal)}</span>
            </div>
            {results.cmhcPremium > 0 && (
              <>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">
                    CMHC Premium ({results.cmhcPremiumRate}%)
                  </span>
                  <span className="font-medium text-red-600">
                    +{fmt(results.cmhcPremium)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">
                    Total w/ Insurance
                  </span>
                  <span className="font-medium">
                    {fmt(results.totalMortgage)}
                  </span>
                </div>
              </>
            )}
            <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
              <span className="text-[var(--color-text-muted)]">
                Total Interest
              </span>
              <span className="font-medium text-red-600">
                {fmt(results.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">
                Total Amount Paid
              </span>
              <span className="font-medium">{fmt(results.totalPaid)}</span>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 text-sm">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Stress Test
            </h3>
            <p className="text-yellow-700 text-xs mb-2">
              Canadian lenders require qualification at the higher of your
              contract rate + 2% or 5.25%.
            </p>
            <div className="flex justify-between">
              <span className="text-yellow-700">Stress Test Rate</span>
              <span className="font-bold text-yellow-800">
                {results.stressRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-yellow-700">Qualifying Payment</span>
              <span className="font-bold text-yellow-800">
                {fmtDetailed(results.stressPayment)}/mo
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
