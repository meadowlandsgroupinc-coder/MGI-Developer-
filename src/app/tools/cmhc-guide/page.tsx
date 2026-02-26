"use client";

import { useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";

const sections = [
  {
    id: "insurance-premiums",
    title: "CMHC Insurance Premiums",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Mortgage insurance is required when the down payment is less than 20%
          of the purchase price. The premium is calculated as a percentage of
          the mortgage amount and can be added to the mortgage.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Down Payment
                </th>
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Premium (% of Mortgage)
                </th>
                <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">
                  Example ($500K property)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/50">
              <tr>
                <td className="py-2 pr-4">5% (up to $500K)</td>
                <td className="py-2 pr-4 font-semibold">4.00%</td>
                <td className="py-2">$19,000</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">10%</td>
                <td className="py-2 pr-4 font-semibold">3.10%</td>
                <td className="py-2">$13,950</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">15%</td>
                <td className="py-2 pr-4 font-semibold">2.80%</td>
                <td className="py-2">$11,900</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">20%+</td>
                <td className="py-2 pr-4 font-semibold">Not required</td>
                <td className="py-2">$0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <strong>Note:</strong> For properties over $500,000, the minimum down
          payment is 5% on the first $500,000 and 10% on the portion above
          $500,000 (up to $1.5M for insured mortgages).
        </div>
      </div>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility Requirements",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">
              Eligible Properties
            </h4>
            <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
              <li>Owner-occupied 1–4 unit properties</li>
              <li>Purchase price up to $1,500,000</li>
              <li>Maximum 25-year amortization (insured)</li>
              <li>30-year amortization for first-time buyers (new builds)</li>
              <li>Minimum credit score of 600</li>
              <li>Property must be in Canada</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">
              Not Eligible
            </h4>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Properties over $1,500,000</li>
              <li>Non-owner-occupied (for standard insurance)</li>
              <li>Properties requiring major renovation</li>
              <li>Land-only purchases</li>
              <li>Borrowers with active consumer proposals</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "mli-select",
    title: "MLI Select Program",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          CMHC MLI Select is a multi-unit mortgage loan insurance product that
          offers premium discounts for projects meeting social outcome criteria
          in three categories: Affordability, Energy Efficiency, and Accessibility.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              Affordability (50 pts)
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Points awarded based on percentage of units rented below median
              market rents. Greater depth and breadth of affordability earns
              higher scores.
            </p>
          </div>
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              Energy Efficiency (25 pts)
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Points for exceeding National Energy Code benchmarks, ENERGY STAR
              certification, Net Zero Ready, or Net Zero Energy standards.
            </p>
          </div>
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              Accessibility (25 pts)
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Points for accessible and adaptable unit design, universal design
              principles, and exceeding accessibility code requirements.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Tier
                </th>
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Score Required
                </th>
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Premium Discount
                </th>
                <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">
                  Key Benefits
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/50">
              <tr>
                <td className="py-2 pr-4 font-semibold text-purple-700">
                  Platinum
                </td>
                <td className="py-2 pr-4">70+</td>
                <td className="py-2 pr-4">Up to 40%</td>
                <td className="py-2">
                  Maximum premium reduction, up to 50-year amortization
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-yellow-700">
                  Gold
                </td>
                <td className="py-2 pr-4">50–69</td>
                <td className="py-2 pr-4">Up to 25%</td>
                <td className="py-2">
                  Strong premium reduction, extended amortization
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-gray-600">
                  Silver
                </td>
                <td className="py-2 pr-4">25–49</td>
                <td className="py-2 pr-4">Up to 15%</td>
                <td className="py-2">Moderate premium reduction</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-orange-700">
                  Bronze
                </td>
                <td className="py-2 pr-4">1–24</td>
                <td className="py-2 pr-4">Up to 5%</td>
                <td className="py-2">Entry-level discount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "multi-unit",
    title: "Multi-Unit Insurance (5+ Units)",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          For rental properties with 5 or more units, CMHC offers mortgage loan
          insurance through different programs than standard homeowner insurance.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-2 pr-4 font-medium text-[var(--color-text-muted)]">
                  Feature
                </th>
                <th className="text-left py-2 font-medium text-[var(--color-text-muted)]">
                  Standard Multi-Unit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]/50">
              <tr>
                <td className="py-2 pr-4 text-[var(--color-text-muted)]">
                  Minimum Equity
                </td>
                <td className="py-2 font-medium">15%</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-[var(--color-text-muted)]">
                  Max Amortization
                </td>
                <td className="py-2 font-medium">
                  40 years (50 with MLI Select Platinum)
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-[var(--color-text-muted)]">
                  DSCR Requirement
                </td>
                <td className="py-2 font-medium">Minimum 1.10x</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-[var(--color-text-muted)]">
                  Premium Range
                </td>
                <td className="py-2 font-medium">
                  1.25% – 5.75% of loan amount
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-[var(--color-text-muted)]">
                  Application Fee
                </td>
                <td className="py-2 font-medium">Varies by project size</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <strong>Tip:</strong> Multi-unit properties can benefit significantly
          from MLI Select — premium discounts of up to 40% and extended
          amortizations of up to 50 years dramatically improve cash flow.
        </div>
      </div>
    ),
  },
  {
    id: "stress-test",
    title: "Mortgage Stress Test",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          All federally regulated lenders in Canada must qualify borrowers at the
          higher of: the mortgage contract rate + 2%, or the Bank of Canada
          qualifying rate (currently 5.25%).
        </p>
        <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
            <div className="p-4">
              <h4 className="font-semibold text-[var(--color-primary)] mb-2">
                Insured Mortgages
              </h4>
              <ul className="text-sm text-[var(--color-text-muted)] space-y-1 list-disc list-inside">
                <li>Down payment less than 20%</li>
                <li>Must pass stress test</li>
                <li>GDS ratio max 39%</li>
                <li>TDS ratio max 44%</li>
              </ul>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-[var(--color-primary)] mb-2">
                Uninsured Mortgages
              </h4>
              <ul className="text-sm text-[var(--color-text-muted)] space-y-1 list-disc list-inside">
                <li>Down payment 20% or more</li>
                <li>Must still pass stress test</li>
                <li>Lender sets GDS/TDS limits</li>
                <li>No CMHC insurance premium</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-700">
          <strong>Important:</strong> The stress test applies to all new
          mortgages, renewals with a new lender, and refinances. It ensures
          borrowers can handle potential rate increases.
        </div>
      </div>
    ),
  },
  {
    id: "programs",
    title: "CMHC Programs Overview",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              First-Time Home Buyer Incentive
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Shared-equity mortgage with the Government of Canada. 5% for
              existing homes, 5–10% for new construction. Income limit of
              $120,000; purchase price capped at 4x income.
            </p>
          </div>
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              Rental Construction Financing
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Low-cost loans for new purpose-built rental housing. Favorable
              terms for projects meeting affordability, accessibility, and
              energy targets.
            </p>
          </div>
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              MLI Select
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Premium discounts and extended amortization for multi-unit
              residential properties meeting social outcome criteria. Score-based
              tier system.
            </p>
          </div>
          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-primary)] mb-2">
              Canada Greener Homes
            </h4>
            <p className="text-sm text-[var(--color-text-muted)]">
              Grants and interest-free loans for home energy retrofits. Up to
              $5,000 in grants and $40,000 in interest-free loans for
              qualifying improvements.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function CMHCGuidePage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <ToolPageLayout
      title="CMHC Reference Guide"
      description="Quick-reference guide for CMHC insurance premiums, eligibility, MLI Select, and program requirements."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Side Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-[var(--color-border)] p-2 lg:sticky lg:top-24">
            <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-3 py-2">
              Sections
            </div>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? "bg-[var(--color-primary)] text-white font-medium"
                    : "text-[var(--color-text-muted)] hover:bg-gray-50"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className={activeSection === section.id ? "block" : "hidden"}
            >
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
                <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
                  {section.title}
                </h2>
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
