import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const tools = [
  {
    title: "Deal Analyzer",
    description:
      "Evaluate rental property deals with comprehensive cash flow analysis, cap rate calculations, and cash-on-cash return projections.",
    href: "/tools/deal-analyzer",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
  },
  {
    title: "Mortgage Calculator",
    description:
      "Calculate monthly payments, total interest, and amortization schedules for Canadian mortgages with stress test rates.",
    href: "/tools/mortgage-calculator",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <rect x="8" y="14" width="3" height="3" />
        <rect x="13" y="14" width="3" height="3" />
      </svg>
    ),
  },
  {
    title: "MLI Select Scorer",
    description:
      "Score your multi-unit residential project against CMHC MLI Select criteria for premium discounts on mortgage insurance.",
    href: "/tools/mli-select",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "CMHC Reference Guide",
    description:
      "Quick-reference guide for CMHC insurance premiums, eligibility rules, and program requirements for multi-unit properties.",
    href: "/tools/cmhc-guide",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="9" y1="7" x2="16" y2="7" />
        <line x1="9" y1="11" x2="16" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="gradient-primary pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
              <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full" />
              Canadian Real Estate Investment Tools
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Smarter Decisions,{" "}
              <span className="text-[var(--color-accent)]">
                Better Returns
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
              Professional-grade analysis tools to evaluate deals, calculate
              mortgage scenarios, and navigate CMHC programs. Built for
              Canadian real estate investors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#tools"
                className="gradient-accent text-[var(--color-primary)] font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Explore Tools
              </Link>
              <Link
                href="/tools/deal-analyzer"
                className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Analyze a Deal
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Tools Available", value: "4" },
              { label: "Calculations", value: "Instant" },
              { label: "Data Sources", value: "CMHC" },
              { label: "Cost", value: "Free" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">
              Investment Analysis Tools
            </h2>
            <p className="text-[var(--color-text-muted)] mt-3 max-w-xl mx-auto">
              Everything you need to analyze deals and make informed investment
              decisions in the Canadian real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="card-hover group bg-white rounded-xl border border-[var(--color-border)] p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--color-primary)]/5 text-[var(--color-primary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] mt-3">
                    Open Tool
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5-5-5-5" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Start Analyzing Your Next Investment
          </h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">
            Use our professional tools to evaluate deals and make confident
            investment decisions.
          </p>
          <Link
            href="/tools/deal-analyzer"
            className="inline-block mt-8 gradient-accent text-[var(--color-primary)] font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started — It&apos;s Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
