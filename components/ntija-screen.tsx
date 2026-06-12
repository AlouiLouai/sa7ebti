"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { DailyUsefulnessPanel } from "@/components/daily/daily-usefulness-panel";
import { AnalysisExplainabilityCard } from "@/components/analysis/analysis-explainability-card";
import { UvReminderCard } from "@/components/notifications/uv-reminder-card";
import { RescanSuggestionsCard } from "@/components/profile/rescan-suggestions-card";
import {
  HeartIcon,
  LeafIcon,
  ScannerFocusIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WaterDropIcon
} from "@/components/sa7ebti-icons";
import { ProvenanceBadgeList } from "@/components/shared/provenance-badge-list";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";
import { useScanHistory } from "@/hooks/use-scan-history";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { buildExplainabilityModel } from "@/lib/domain/explainability";
import { isFeatureEnabled } from "@/lib/feature-flags";
import { getFitLabel } from "@/lib/domain/product-fit";
import { getCategoryOption } from "@/lib/domain/scan-flow";

export function NtijaScreen() {
  const {
    favoriteRecords,
    isFavoriteRecord,
    latestRecord,
    records,
    routinePlan,
    setActiveAnalysisRecordId,
    toggleFavoriteRecord
  } = useScanHistory();

  if (!latestRecord) {
    return null;
  }

  const olderRecords = records.filter((record) => record.id !== latestRecord.id);
  const latestExplainability = buildExplainabilityModel(latestRecord);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <Sa7ebtiTopBar title={sa7ebtiCopy.routes.results} />

      <main className="sa7ebti-zellige-pattern mx-auto min-h-screen max-w-md px-4 pb-28 pt-20">
        <section className="rounded-[1.8rem] bg-espresso p-5 text-white shadow-soft">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
            items eli tscannaw
          </p>
          <h1 className="mt-2 font-display text-[1.7rem] font-semibold leading-[1.02]">
            kol produit w kifeh yji m3ak.
          </h1>
          <p className="mt-3 text-[0.9rem] leading-6 text-white/75">
            hne tal9a akher scan, favoris mte3ek, w routine yawmia tnajjem temchi 3liha.
          </p>
        </section>

        <section className="mt-4">
          <DailyUsefulnessPanel />
        </section>

        <section className="mt-4 space-y-3">
          <UvReminderCard />
          <RescanSuggestionsCard />
        </section>

        <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                akher scan
              </p>
              <h2 className="mt-2 font-display text-[1.32rem] leading-[1.02] text-espresso">
                {latestRecord.product.name}
              </h2>
              <p className="mt-2 text-[0.82rem] leading-5 text-espresso/[0.68]">
                {latestRecord.recommendationSummary.shortNote}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[0.66rem] font-semibold ${getStatusTone(latestRecord.fitResult.status)}`}
            >
              {getFitLabel(latestRecord.fitResult.status)}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.68rem] font-semibold text-terracotta">
              {getCategoryOption(latestRecord.product.category)?.label ?? latestRecord.product.category}
            </span>
            <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.68rem] font-semibold text-espresso/[0.68]">
              {formatScanDate(latestRecord.product.scannedAtIso)}
            </span>
          </div>

          {isFeatureEnabled("provenanceBadges") ? (
            <ProvenanceBadgeList provenance={latestRecord.provenance} />
          ) : null}

          <div className="mt-4 flex gap-2">
            <Link
              href="/analysis"
              onClick={() => setActiveAnalysisRecordId(latestRecord.id)}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#C97A53] text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-white shadow-button"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              {sa7ebtiCopy.cta.viewDetails}
            </Link>
            <button
              type="button"
              onClick={() => toggleFavoriteRecord(latestRecord.id)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/[0.08] bg-[#FAF6F0] text-terracotta"
              aria-label="toggle favorite"
            >
              <HeartIcon className={`h-4 w-4 ${isFavoriteRecord(latestRecord.id) ? "fill-current" : ""}`} />
            </button>
          </div>
        </section>

        {isFeatureEnabled("explainabilityBlocks") ? (
          <section className="mt-4">
            <AnalysisExplainabilityCard model={latestExplainability} />
          </section>
        ) : null}

        {favoriteRecords.length > 0 ? (
          <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  favoris mte3i
                </p>
                <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                  produits elli 3jbouk w t7eb traja3 lhoum.
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
                <HeartIcon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {favoriteRecords.map((record) => (
                <article key={record.id} className="rounded-[1.2rem] bg-white/85 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[0.98rem] text-espresso">{record.product.name}</p>
                      <p className="mt-1 text-[0.74rem] leading-5 text-espresso/[0.64]">
                        {record.recommendationSummary.actionLabel}
                      </p>
                    </div>
                    <Link
                      href="/analysis"
                      onClick={() => setActiveAnalysisRecordId(record.id)}
                      className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold text-terracotta"
                    >
                      {sa7ebtiCopy.cta.viewDetails}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                routine yawmia
              </p>
              <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                routine mabniya 3la produits elli ynesbou m3ak.
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
              <ShieldSunIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {routinePlan.map((step, index) => (
              <div key={step.time} className="rounded-[1.2rem] bg-[#FAF6F0] p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta text-[0.7rem] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
                    {step.time}
                  </p>
                </div>
                <p className="mt-2 font-display text-[0.98rem] text-espresso">{step.title}</p>
                <p className="mt-1 text-[0.78rem] leading-5 text-espresso/[0.68]">{step.body}</p>
                <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-terracotta">
                  {step.productName}
                </p>
                <p className="mt-1 text-[0.74rem] leading-5 text-espresso/[0.58]">{step.reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                kol l history
              </p>
              <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                irja3 li ay scan w chouf detail mte3ou.
              </p>
            </div>
            <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.68rem] font-semibold text-terracotta">
              {records.length} items
            </span>
          </div>

          <div className="space-y-3">
            {olderRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-[1.06rem] leading-5 text-espresso">{record.product.name}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.08em] text-terracotta">
                      {getCategoryOption(record.product.category)?.label ?? record.product.category}
                    </p>
                    <p className="mt-1 text-[0.68rem] text-espresso/[0.46]">
                      {formatScanDate(record.product.scannedAtIso)}
                    </p>
                    <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.68]">
                      {record.recommendationSummary.shortNote}
                    </p>
                    {isFeatureEnabled("provenanceBadges") ? (
                      <ProvenanceBadgeList provenance={record.provenance} compact />
                    ) : null}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.66rem] font-semibold ${getStatusTone(record.fitResult.status)}`}
                  >
                    {getFitLabel(record.fitResult.status)}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/analysis"
                    onClick={() => setActiveAnalysisRecordId(record.id)}
                    className="flex h-10 flex-1 items-center justify-center rounded-full border border-espresso/[0.08] bg-[#FAF6F0] text-[0.72rem] font-semibold uppercase tracking-[0.05em] text-espresso"
                  >
                    {sa7ebtiCopy.cta.viewDetails}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFavoriteRecord(record.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/[0.08] bg-white text-terracotta"
                    aria-label="toggle favorite"
                  >
                    <HeartIcon className={`h-4 w-4 ${isFavoriteRecord(record.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-3 gap-2">
          <MiniCard icon={<ScannerFocusIcon className="h-4 w-4" />} label="scan jdida" />
          <MiniCard icon={<ShieldSunIcon className="h-4 w-4" />} label="SPF dima" />
          <MiniCard icon={<WaterDropIcon className="h-4 w-4" />} label="ratba mohema" />
        </section>

        <Link
          href="/scan"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C97A53] text-[0.78rem] font-semibold uppercase tracking-[0.05em] text-white shadow-button transition-all duration-300 active:scale-[0.98]"
        >
          <LeafIcon className="h-4 w-4" />
          {sa7ebtiCopy.cta.rescan}
        </Link>
      </main>

      <Sa7ebtiBottomNav active="results" />
    </div>
  );
}

function MiniCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="rounded-[1.2rem] border border-espresso/[0.08] bg-white/80 p-3 text-center shadow-[0_14px_28px_rgba(38,37,34,0.04)]">
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta">
        {icon}
      </div>
      <p className="mt-2 text-[0.72rem] font-semibold text-espresso/[0.76]">{label}</p>
    </div>
  );
}

function getStatusTone(status: string) {
  switch (status) {
    case "ynesbek":
      return "bg-[#E6F2EA] text-[#2F6B45]";
    case "ynesbek-chwaya":
      return "bg-[#F7EBD8] text-[#8A5A22]";
    case "ma-ynesbekch-jemla":
      return "bg-[#F6DFD9] text-[#9A4C3B]";
    default:
      return "bg-[#ECE6DF] text-[#5E544E]";
  }
}

function formatScanDate(dateIso: string) {
  const date = new Date(dateIso);
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");

  return `${day}/${month}`;
}
