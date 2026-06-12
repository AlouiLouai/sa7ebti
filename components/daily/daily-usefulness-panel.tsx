"use client";

import { ShieldCheckIcon } from "@/components/sa7ebti-icons";
import { DailyAdviceItemCard } from "@/components/daily/daily-advice-item-card";
import { DailyUvCard } from "@/components/daily/daily-uv-card";
import { ProvenanceBadgeList } from "@/components/shared/provenance-badge-list";
import { useDailyAdvice } from "@/hooks/use-daily-advice";
import { isFeatureEnabled } from "@/lib/feature-flags";

type DailyUsefulnessPanelProps = {
  variant?: "compact" | "full";
};

export function DailyUsefulnessPanel({ variant = "full" }: DailyUsefulnessPanelProps) {
  const { dailyAdvice, isHydrated } = useDailyAdvice();
  const visibleItems = variant === "compact" ? dailyAdvice.items.slice(0, 2) : dailyAdvice.items;

  if (!isHydrated) {
    return (
      <section className="rounded-[1.6rem] border border-espresso/[0.08] bg-white/[0.72] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)]">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
          lyoum m3a sa7ebti
        </p>
        <div className="mt-3 h-24 animate-pulse rounded-[1.2rem] bg-[#F5EEE7]" />
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <DailyUvCard data={dailyAdvice.uvCard} compact={variant === "compact"} />

      {dailyAdvice.warning ? (
        <div className="rounded-[1.2rem] border border-terracotta/15 bg-[#F6E8E2] p-3 text-espresso">
          <div className="flex items-center gap-2 text-terracotta">
            <ShieldCheckIcon className="h-4 w-4" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]">intibeh</p>
          </div>
          <p className="mt-1.5 text-[0.8rem] leading-5 text-espresso/[0.74]">{dailyAdvice.warning}</p>
        </div>
      ) : null}

      <div className={variant === "compact" ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 gap-2.5"}>
        {visibleItems.map((item) => (
          <DailyAdviceItemCard key={item.id} item={item} />
        ))}
      </div>

      {isFeatureEnabled("provenanceBadges") ? (
        <div className="flex flex-col items-center gap-2">
          <ProvenanceBadgeList provenance={dailyAdvice.provenance} compact />
          <p className="text-center text-[0.66rem] font-medium uppercase tracking-[0.12em] text-espresso/[0.48]">
            ta9dir demo 3la hsab profil w akher scan
          </p>
        </div>
      ) : (
        <p className="text-center text-[0.66rem] font-medium uppercase tracking-[0.12em] text-espresso/[0.48]">
          ta9dir demo 3la hsab profil w akher scan
        </p>
      )}
    </section>
  );
}
