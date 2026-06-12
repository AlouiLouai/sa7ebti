"use client";

import type { ProductCategory } from "@/lib/domain/product-fit";
import { scanCategoryOptions } from "@/lib/domain/scan-flow";

export function AnalysisCategoryPicker({
  onSelect,
  selectedCategory
}: {
  onSelect: (category: Exclude<ProductCategory, "unknown">) => void;
  selectedCategory: ProductCategory;
}) {
  return (
    <div className="rounded-[1.2rem] border border-terracotta/15 bg-[#F6EEE7] p-3.5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
        no3 l produit
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {scanCategoryOptions.map((option) => {
          const isSelected = option.value === selectedCategory;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-full px-3 py-2 text-[0.72rem] font-semibold transition-all duration-300 active:scale-[0.98] ${
                isSelected
                  ? "bg-[#C97A53] text-white shadow-button"
                  : "border border-espresso/[0.08] bg-white text-espresso/[0.74]"
              }`}
            >
              {option.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
