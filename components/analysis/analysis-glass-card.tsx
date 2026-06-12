import type { ReactNode } from "react";

export function AnalysisGlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="sa7ebti-glass-card relative overflow-hidden rounded-[1.2rem] border border-white/40 p-4 shadow-ambient">
      <div className="sa7ebti-zellige-pattern pointer-events-none absolute inset-0 opacity-5" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
