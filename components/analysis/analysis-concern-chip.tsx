import type { IngredientConcernChipViewModel } from "@/lib/domain/analysis-view";

export function AnalysisConcernChip({ chip }: { chip: IngredientConcernChipViewModel }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] ${
        chip.tone === "good" ? "bg-[#E6F2EA] text-[#2F6B45]" : "bg-[#F6DFD9] text-[#9A4C3B]"
      }`}
    >
      {chip.label}
    </span>
  );
}
