import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-[var(--color-primary)] font-extrabold text-sm">
                  M
                </span>
              </div>
              <span className="text-white font-bold text-lg">
                MirzaCapital
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Professional real estate investment analysis tools for Canadian
              investors. Make data-driven decisions with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/tools/deal-analyzer"
                  className="hover:text-white transition-colors"
                >
                  Deal Analyzer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mortgage-calculator"
                  className="hover:text-white transition-colors"
                >
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/mli-select"
                  className="hover:text-white transition-colors"
                >
                  MLI Select Scorer
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/cmhc-guide"
                  className="hover:text-white transition-colors"
                >
                  CMHC Reference Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Disclaimer</h3>
            <p className="text-sm leading-relaxed">
              Tools are for informational purposes only. Not financial advice.
              Always consult qualified professionals before making investment
              decisions.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} MirzaCapital Investments. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
