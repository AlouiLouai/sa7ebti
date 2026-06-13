"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { DailyUsefulnessPanel } from "@/components/daily/daily-usefulness-panel";
import { AnalysisExplainabilityCard } from "@/components/analysis/analysis-explainability-card";
import { UvReminderCard } from "@/components/notifications/uv-reminder-card";
import { RescanSuggestionsCard } from "@/components/profile/rescan-suggestions-card";
import { HeartIcon, ShieldCheckIcon, ShieldSunIcon } from "@/components/sa7ebti-icons";
import { ProvenanceBadgeList } from "@/components/shared/provenance-badge-list";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";
import { useDailyAdvice } from "@/hooks/use-daily-advice";
import { useScanHistory } from "@/hooks/use-scan-history";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { buildExplainabilityModel } from "@/lib/domain/explainability";
import { getFitLabel } from "@/lib/domain/product-fit";
import { getCategoryOption } from "@/lib/domain/scan-flow";
import { isFeatureEnabled } from "@/lib/feature-flags";

export function NtijaScreen() {
  const { dailyAdvice, isHydrated: isDailyHydrated } = useDailyAdvice();
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

  const olderRecords = records.filter((record) => record.id !== latestRecord.id).slice(0, 3);
  const latestExplainability = buildExplainabilityModel(latestRecord);
  const usableProducts = (favoriteRecords.length > 0
    ? favoriteRecords
    : records.filter(
        (record) => record.fitResult.status === "ynesbek" || record.fitResult.status === "ynesbek-chwaya"
      )
  ).slice(0, 3);
  const latestRoutineStep = routinePlan[0];
  const dailySummary = isDailyHydrated
    ? dailyAdvice.warning ?? dailyAdvice.uvCard.body
    : "nsi7a yawmia 3la hsab profilk w akher scan.";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-espresso">
      <Sa7ebtiTopBar title={sa7ebtiCopy.routes.results} />

      <main className="sa7ebti-page-shell sa7ebti-zellige-pattern min-h-screen">
        <section className="rounded-[1.8rem] bg-espresso p-5 text-white shadow-soft">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
            produits mte3ek
          </p>
          <h1 className="mt-2 font-display text-[1.7rem] font-semibold leading-[1.02]">
            hedhom produitsk, routinek, w akher qrar.
          </h1>
          <p className="mt-3 text-[0.9rem] leading-6 text-white/75">
            chouf chnowa yestahel yab9a qoddemek tawa, w ifta7 tafasil akther ken t7eb.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/scan"
              className="flex h-11 items-center justify-center rounded-full bg-white text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-espresso shadow-[0_10px_22px_rgba(0,0,0,0.14)] transition-all duration-300 active:scale-[0.98]"
            >
              scan jdida
            </Link>
            <Link
              href="/analysis"
              onClick={() => setActiveAnalysisRecordId(latestRecord.id)}
              className="flex h-11 items-center justify-center rounded-full border border-white/14 bg-white/10 text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-white transition-all duration-300 active:scale-[0.98]"
            >
              akher qrar
            </Link>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3">
          <article className="rounded-[1.35rem] border border-espresso/[0.08] bg-white/[0.84] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
              yjiw m3ak tawa
            </p>
            <p className="mt-2 font-display text-[1.7rem] leading-none text-espresso">{usableProducts.length}</p>
            <p className="mt-1 text-[0.74rem] leading-5 text-espresso/[0.64]">
              produits ynajmou yodkhlou fil routine.
            </p>
          </article>

          <article className="rounded-[1.35rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,239,230,0.94))] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)]">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
              favoris
            </p>
            <p className="mt-2 font-display text-[1.7rem] leading-none text-espresso">{favoriteRecords.length}</p>
            <p className="mt-1 text-[0.74rem] leading-5 text-espresso/[0.64]">
              {favoriteRecords.length > 0 ? "mawjouda bech tal9ahom sra3." : "mazel ma 7atit 7atta favori."}
            </p>
          </article>
        </section>

        <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                produits nesta3melhom
              </p>
              <p className="mt-1 text-[0.82rem] leading-5 text-espresso/[0.68]">
                {favoriteRecords.length > 0
                  ? "men favoris mte3ek bech tal9ahom dima qoddemek."
                  : "scanat yodhhr yensbou m3ak tawa."}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {usableProducts.length > 0 ? (
              usableProducts.map((record) => (
                <article key={record.id} className="rounded-[1.2rem] bg-[#FAF6F0] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-[0.98rem] text-espresso">{record.product.name}</p>
                      <p className="mt-1 text-[0.72rem] uppercase tracking-[0.08em] text-terracotta">
                        {getCategoryOption(record.product.category)?.label ?? record.product.category}
                      </p>
                      <p className="mt-2 text-[0.76rem] leading-5 text-espresso/[0.68]">
                        {record.recommendationSummary.actionLabel}
                      </p>
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
                      className="flex h-10 flex-1 items-center justify-center rounded-full border border-espresso/[0.08] bg-white text-[0.72rem] font-semibold uppercase tracking-[0.05em] text-espresso"
                    >
                      {sa7ebtiCopy.cta.viewDetails}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavoriteRecord(record.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/[0.08] bg-white text-terracotta"
                      aria-label="badel favori"
                    >
                      <HeartIcon className={`h-4 w-4 ${isFavoriteRecord(record.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[1.2rem] bg-[#FAF6F0] p-3">
                <p className="text-[0.78rem] leading-5 text-espresso/[0.68]">
                  ma fama ch produit yensbek tawa. a3mel scan jdid wala kamel profilk bech l qrar ywali ad9a9.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-4 rounded-[1.7rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)] backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                akher scan
              </p>
              <h2 className="mt-2 font-display text-[1.28rem] leading-[1.02] text-espresso">
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
            <div className="mt-3">
              <ProvenanceBadgeList provenance={latestRecord.provenance} />
            </div>
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
              aria-label="badel favori"
            >
              <HeartIcon className={`h-4 w-4 ${isFavoriteRecord(latestRecord.id) ? "fill-current" : ""}`} />
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-[1.55rem] border border-espresso/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,239,230,0.92))] p-4 shadow-[0_18px_36px_rgba(38,37,34,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
                routine tawa
              </p>
              <h2 className="mt-2 font-display text-[1.12rem] leading-[1.04] text-espresso">
                {latestRoutineStep ? latestRoutineStep.title : "mazel ma fama ch step mouhem tawa"}
              </h2>
              <p className="mt-2 text-[0.8rem] leading-5 text-espresso/[0.68]">
                {latestRoutineStep ? latestRoutineStep.productName : dailySummary}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
              <ShieldSunIcon className="h-5 w-5" />
            </div>
          </div>
        </section>

        {isFeatureEnabled("explainabilityBlocks") ? (
          <ExpandablePanel
            eyebrow="3leh"
            title="3leh akher qrar"
            summary={latestExplainability.condensedSummary}
            className="mt-4"
          >
            <AnalysisExplainabilityCard model={latestExplainability} />
          </ExpandablePanel>
        ) : null}

        <ExpandablePanel
          eyebrow="lyoum"
          title="nsi7a yawmia"
          summary={dailySummary}
          className="mt-4"
        >
          <DailyUsefulnessPanel variant="compact" />
        </ExpandablePanel>

        <ExpandablePanel
          eyebrow="routine"
          title="routine kamla"
          summary={latestRoutineStep ? `${latestRoutineStep.time} - ${latestRoutineStep.title}` : "mazel ma fama ch routine kamla."}
          className="mt-4"
        >
          <div className="space-y-2.5">
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
        </ExpandablePanel>

        <ExpandablePanel
          eyebrow="extra"
          title="tafasil okhrin"
          summary="reminders, rescan notes, w scans 9dom."
          className="mt-4"
        >
          <div className="space-y-3">
            <UvReminderCard />
            <RescanSuggestionsCard />
          </div>

          <div className="mt-3 space-y-3">
            {olderRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-[1.2rem] border border-espresso/[0.08] bg-white/[0.82] p-3 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-[0.96rem] leading-5 text-espresso">{record.product.name}</p>
                    <p className="mt-1 text-[0.68rem] uppercase tracking-[0.08em] text-terracotta">
                      {getCategoryOption(record.product.category)?.label ?? record.product.category}
                    </p>
                    <p className="mt-1 text-[0.68rem] text-espresso/[0.46]">
                      {formatScanDate(record.product.scannedAtIso)}
                    </p>
                    <p className="mt-2 text-[0.76rem] leading-5 text-espresso/[0.68]">
                      {record.recommendationSummary.shortNote}
                    </p>
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
                    aria-label="badel favori"
                  >
                    <HeartIcon className={`h-4 w-4 ${isFavoriteRecord(record.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </ExpandablePanel>
      </main>

      <Sa7ebtiBottomNav active="results" />
    </div>
  );
}

function ExpandablePanel({
  eyebrow,
  title,
  summary,
  className = "",
  children
}: {
  eyebrow: string;
  title: string;
  summary: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <details
      className={`${className} group rounded-[1.3rem] border border-espresso/[0.08] bg-white/[0.72] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md`}
    >
      <summary className="list-none cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
              {eyebrow}
            </p>
            <h3 className="mt-1.5 font-display text-[1.02rem] leading-5 text-espresso">{title}</h3>
            <p className="mt-1 text-[0.76rem] leading-5 text-espresso/[0.66]">{summary}</p>
          </div>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta transition-transform duration-200 group-open:rotate-45">
            +
          </span>
        </div>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
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
