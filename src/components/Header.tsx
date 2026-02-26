"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-[var(--color-primary)] font-extrabold text-lg">
                M
              </span>
            </div>
            <div>
              <span className="text-white font-bold text-lg tracking-tight">
                MirzaCapital
              </span>
              <span className="hidden sm:inline text-white/50 text-sm ml-2">
                Investments
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/tools/deal-analyzer">Deal Analyzer</NavLink>
            <NavLink href="/tools/mortgage-calculator">
              Mortgage Calculator
            </NavLink>
            <NavLink href="/tools/mli-select">MLI Select</NavLink>
            <NavLink href="/tools/cmhc-guide">CMHC Guide</NavLink>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-primary)] border-t border-white/10 px-4 pb-4">
          <MobileNavLink
            href="/tools/deal-analyzer"
            onClick={() => setMobileOpen(false)}
          >
            Deal Analyzer
          </MobileNavLink>
          <MobileNavLink
            href="/tools/mortgage-calculator"
            onClick={() => setMobileOpen(false)}
          >
            Mortgage Calculator
          </MobileNavLink>
          <MobileNavLink
            href="/tools/mli-select"
            onClick={() => setMobileOpen(false)}
          >
            MLI Select Scorer
          </MobileNavLink>
          <MobileNavLink
            href="/tools/cmhc-guide"
            onClick={() => setMobileOpen(false)}
          >
            CMHC Guide
          </MobileNavLink>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-3 text-white/70 hover:text-white border-b border-white/5 transition-colors"
    >
      {children}
    </Link>
  );
}
