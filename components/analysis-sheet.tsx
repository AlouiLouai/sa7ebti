"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  HeartIcon,
  ImageIcon,
  LeafIcon,
  LightbulbIcon,
  PetalIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WarmSunIcon,
  WaterDropIcon
} from "@/components/sa7ebti-icons";
import { AnalysisCategoryPicker } from "@/components/analysis/analysis-category-picker";
import { AnalysisConcernChip } from "@/components/analysis/analysis-concern-chip";
import { AnalysisExplainabilityCard } from "@/components/analysis/analysis-explainability-card";
import { AnalysisGlassCard } from "@/components/analysis/analysis-glass-card";
import { AnalysisIngredientRow } from "@/components/analysis/analysis-ingredient-row";
import { SparkIcon } from "@/components/icons";
import { ProvenanceBadgeList } from "@/components/shared/provenance-badge-list";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";
import { Sa7ebtiTopBar } from "@/components/sa7ebti-shell";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { useCurrentScan } from "@/hooks/use-current-scan";
import { useScanHistory } from "@/hooks/use-scan-history";
import { buildAnalysisViewModel } from "@/lib/domain/analysis-view";
import { buildExplainabilityModel } from "@/lib/domain/explainability";
import { isFeatureEnabled } from "@/lib/feature-flags";
import type { IngredientSignal } from "@/lib/domain/product-fit";

const topbarAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbWL_OavFB6ye1fYuyGrJlzftJEf8WcVASQnIIxxnrY8aWjini5Z9uaR-wbOgZP1KRn-TGEh8CLTL4NY2z3vJuzkR25LqYeY9UO_FAuAJnvb1PwaTVwjkP6q1vZqXIvTdenL7-Jdd0VcpGRhI0MmhoeNXPWYgnk4S_7giwLUdisn6s8EDFyMSjfSNFaIxxhqDb8Zi2QFhZhlGh36rf48Z5QiNeqEz5H_pur1IWezPcK8swBC_QHC-Tu0yB8bOTQmyVJadHSDoo0nIH";

export function AnalysisSheet() {
  const { currentScanDraft, currentScanRecord, isHydrated, selectCurrentScanCategory } = useCurrentScan();
  const { activeAnalysisRecord, isFavoriteRecord, toggleFavoriteRecord } = useScanHistory();
  const displayedRecord = activeAnalysisRecord ?? currentScanRecord;
  const displayedDraft =
    currentScanDraft && displayedRecord.id === currentScanRecord.id ? currentScanDraft : null;
  const viewModel = buildAnalysisViewModel({
    currentScanDraft: displayedDraft,
    record: displayedRecord
  });
  const explainability = buildExplainabilityModel(displayedRecord);
  const isFavorite = isFavoriteRecord(displayedRecord.id);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-surface text-on-surface">
        <Sa7ebtiTopBar
          leading={
            <Link href="/scan" className="inline-flex items-center justify-center text-primary active:scale-95">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          }
          avatarSrc={topbarAvatar}
        />
        <main className="mx-auto min-h-screen max-w-2xl px-4 pb-28 pt-20">
          <div className="h-56 animate-pulse rounded-[1.6rem] bg-[#F5EEE7]" />
        </main>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-surface font-body text-on-surface">
      <Sa7ebtiTopBar
        leading={
          <Link href="/scan" className="inline-flex items-center justify-center text-primary active:scale-95">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        }
        title={sa7ebtiCopy.routes.analysis}
        avatarSrc={topbarAvatar}
      />

      <main className="sa7ebti-zellige-pattern mx-auto min-h-screen max-w-2xl px-4 pb-28 pt-20">
        <section className="relative mb-8">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="group relative">
              <div className="aspect-square overflow-hidden rounded-[1.4rem] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  alt={displayedRecord.product.name}
                  src={displayedRecord.product.imageUrl ?? "/icon.svg"}
                  width={768}
                  height={768}
                  priority
                  quality={72}
                  sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-20" />
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="relative mb-2.5 h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-secondary-container"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="22"
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-primary">
                    {viewModel.hero.scoreLabel}
                  </span>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.1em] text-on-surface-variant">
                    {viewModel.hero.fitLabel}
                  </span>
                </div>
              </div>

              <div className="mb-2 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-terracotta">
                  {viewModel.hero.categoryLabel}
                </span>
                <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-espresso/[0.66]">
                  {viewModel.hero.sourceLabel}
                </span>
              </div>

              {isFeatureEnabled("provenanceBadges") ? (
                <div className="mb-2">
                  <ProvenanceBadgeList provenance={displayedRecord.provenance} compact />
                </div>
              ) : null}

              <p className="font-display text-[1.15rem] leading-6 text-on-surface">{viewModel.hero.headline}</p>
              <p className="mt-1 text-[0.82rem] text-on-surface-variant">{viewModel.hero.summary}</p>
              <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-terracotta">
                {viewModel.hero.familyLabel}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4">
          {viewModel.categoryPrompt ? (
            <AnalysisGlassCard>
              <div className="mb-2.5 flex items-center gap-2.5 text-primary">
                <LightbulbIcon className="h-4 w-4" />
                <h2 className="font-display text-[1.12rem] leading-6">{viewModel.categoryPrompt.title}</h2>
              </div>
              <p className="text-[0.84rem] leading-6 text-on-surface-variant">{viewModel.categoryPrompt.body}</p>

              <div className="mt-3">
                <AnalysisCategoryPicker
                  selectedCategory={currentScanDraft?.selectedCategory ?? "unknown"}
                  onSelect={selectCurrentScanCategory}
                />
              </div>
            </AnalysisGlassCard>
          ) : null}

          <AnalysisGlassCard>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="mb-1 block text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-primary">
                  {viewModel.uv.eyebrow}
                </span>
                <div className="flex items-center gap-2.5">
                  <WarmSunIcon className="h-4 w-4 text-tertiary" />
                  <span className="font-display text-[1.1rem] leading-6 text-on-surface">{viewModel.uv.title}</span>
                </div>
                <p className="mt-1 text-[0.78rem] text-on-surface-variant">{viewModel.uv.subtitle}</p>
              </div>
              <div className="rounded-[0.9rem] bg-tertiary-container/20 p-2.5 text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-tertiary">
                  7meya mel chams
                </p>
                <p className="text-[0.78rem] font-bold text-on-surface">{viewModel.uv.note}</p>
              </div>
            </div>
          </AnalysisGlassCard>

          <AnalysisListSection
            icon={<ShieldCheckIcon className="h-4 w-4" />}
            eyebrow={viewModel.fitReasons.eyebrow}
            title={viewModel.fitReasons.title}
            items={viewModel.fitReasons.items}
            fallback={viewModel.fitReasons.fallback}
            tone="tertiary"
          />

          {isFeatureEnabled("explainabilityBlocks") ? (
            <AnalysisExplainabilityCard model={explainability} />
          ) : null}

          <AnalysisGlassCard>
            <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
              ta7lil l ingredients
            </h3>
            <div className="space-y-4">
              {viewModel.ingredientItems.map((ingredient) => (
                <div key={ingredient.name} className="space-y-2.5">
                  <AnalysisIngredientRow
                    icon={getIngredientIcon(ingredient.signal)}
                    iconClassName={getIngredientTone(ingredient.signal)}
                    title={ingredient.name}
                    body={ingredient.body}
                  />
                  {ingredient.chips.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pl-14">
                      {ingredient.chips.map((chip) => (
                        <AnalysisConcernChip key={`${ingredient.name}-${chip.id}`} chip={chip} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </AnalysisGlassCard>

          <AnalysisListSection
            icon={<ShieldSunIcon className="h-4 w-4" />}
            eyebrow={viewModel.cautions.eyebrow}
            title={viewModel.cautions.title}
            items={viewModel.cautions.items}
            fallback={viewModel.cautions.fallback}
            tone="primary"
          />

          <div className="relative overflow-hidden rounded-[1.2rem] bg-primary-container p-4 text-on-primary-container shadow-lg">
            <div className="absolute -right-8 -top-8 rotate-12 opacity-10">
              <PetalIcon className="h-20 w-20" />
            </div>
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <SparkIcon className="h-4 w-4" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  {viewModel.adviceTitle}
                </span>
              </div>
              <p className="mb-1 font-display text-[1.08rem] italic leading-6">
                &quot;{displayedRecord.product.name}&quot;
              </p>
              <p className="text-[0.82rem] italic leading-5 text-on-primary-container/90">{viewModel.adviceBody}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => toggleFavoriteRecord(displayedRecord.id)}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-on-primary transition-opacity hover:opacity-90"
          >
            <HeartIcon className="h-4 w-4" />
            {isFavorite ? sa7ebtiCopy.cta.removeFavorite : sa7ebtiCopy.cta.addFavorite}
          </button>
          <Link
            href="/scan"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-primary/20 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/5"
          >
            <ImageIcon className="h-4 w-4" />
            jarrab produit ekher
          </Link>
        </div>
      </main>

      <Sa7ebtiBottomNav active="scan" />
    </div>
  );
}

function AnalysisListSection({
  eyebrow,
  fallback,
  icon,
  items,
  title,
  tone
}: {
  eyebrow: string;
  fallback: string;
  icon: ReactNode;
  items: string[];
  title: string;
  tone: "primary" | "tertiary";
}) {
  return (
    <AnalysisGlassCard>
      <div className={`mb-2.5 flex items-center gap-2.5 ${tone === "primary" ? "text-primary" : "text-tertiary"}`}>
        {icon}
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">{eyebrow}</p>
          <h2 className="font-display text-[1.12rem] leading-6">{title}</h2>
        </div>
      </div>
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <p key={item} className="text-[0.84rem] leading-6 text-on-surface-variant">
              {item}
            </p>
          ))
        ) : (
          <p className="text-[0.84rem] leading-6 text-on-surface-variant">{fallback}</p>
        )}
      </div>
    </AnalysisGlassCard>
  );
}

function getIngredientIcon(signal: IngredientSignal) {
  switch (signal) {
    case "hydration":
      return <WaterDropIcon className="h-5 w-5 text-[#002020]" />;
    case "soothing":
    case "barrier-support":
      return <LeafIcon className="h-5 w-5 text-[#4c4733]" />;
    case "fragrance-risk":
    case "alcohol-risk":
    case "comedogenic-risk":
      return <ShieldSunIcon className="h-5 w-5 text-[#7A2E1C]" />;
    default:
      return <LeafIcon className="h-5 w-5 text-[#4c4733]" />;
  }
}

function getIngredientTone(signal: IngredientSignal) {
  switch (signal) {
    case "hydration":
      return "bg-tertiary-container";
    case "soothing":
    case "barrier-support":
    case "uv-support":
      return "bg-secondary-container";
    case "fragrance-risk":
    case "alcohol-risk":
    case "comedogenic-risk":
      return "bg-[#F6DFD9]";
    default:
      return "bg-secondary-container";
  }
}
