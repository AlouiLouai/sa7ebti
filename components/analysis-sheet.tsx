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
  const decision = getDecisionSummary(displayedRecord.fitResult.status);

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
        <main className="sa7ebti-page-shell min-h-screen">
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

      <main className="sa7ebti-page-shell sa7ebti-zellige-pattern min-h-screen">
        <section className="mb-4 rounded-[1.55rem] bg-espresso p-4 text-white shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ochre">
                l decision
              </p>
              <h1 className="mt-2 font-display text-[1.56rem] font-semibold leading-[1.02]">
                {decision.title}
              </h1>
              <p className="mt-2 text-[0.84rem] leading-5 text-white/76">{decision.body}</p>
            </div>
            <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold ${decision.tone}`}>
              {viewModel.hero.fitLabel}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-semibold text-white/92">
              {viewModel.hero.categoryLabel}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-semibold text-white/92">
              {viewModel.hero.sourceLabel}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => toggleFavoriteRecord(displayedRecord.id)}
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-white text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-espresso shadow-[0_10px_22px_rgba(0,0,0,0.14)] transition-all duration-300 active:scale-[0.98]"
            >
              <HeartIcon className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "favori mawjoud" : "7otou favori"}
            </button>
            <Link
              href="/scan"
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/10 text-[0.74rem] font-semibold uppercase tracking-[0.05em] text-white transition-all duration-300 active:scale-[0.98]"
            >
              <ImageIcon className="h-4 w-4" />
              scan ekher
            </Link>
          </div>
        </section>

        <section className="relative mb-4 rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.76] p-3.5 shadow-[0_18px_36px_rgba(38,37,34,0.06)] backdrop-blur-md">
          <div className="flex items-start gap-3">
            <div className="group relative h-28 w-24 shrink-0 overflow-hidden rounded-[1.2rem] shadow-lg">
              <Image
                alt={displayedRecord.product.name}
                src={displayedRecord.product.imageUrl ?? "/icon.svg"}
                width={320}
                height={384}
                priority
                quality={72}
                sizes="96px"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-20" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
                produit tawa
              </p>
              <h2 className="mt-1.5 font-display text-[1.16rem] leading-[1.04] text-on-surface">
                {displayedRecord.product.name}
              </h2>
              <p className="mt-2 text-[0.8rem] leading-5 text-on-surface-variant">{viewModel.hero.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-terracotta">
                  score {viewModel.hero.scoreLabel}
                </span>
                <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-espresso/[0.72]">
                  {viewModel.hero.fitLabel}
                </span>
                <span className="rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-espresso/[0.72]">
                  {viewModel.hero.familyLabel}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-espresso/[0.06] px-3 py-1 text-[0.66rem] font-semibold text-espresso/[0.72]">
                  {viewModel.hero.categoryLabel}
                </span>
                <span className="rounded-full bg-espresso/[0.06] px-3 py-1 text-[0.66rem] font-semibold text-espresso/[0.72]">
                  {viewModel.hero.sourceLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-[1.15rem] bg-[#FAF6F0] p-3">
            <p className="font-display text-[1rem] leading-5 text-on-surface">{viewModel.hero.headline}</p>
            <p className="mt-1 text-[0.78rem] leading-5 text-on-surface-variant">{decision.body}</p>
            {isFeatureEnabled("provenanceBadges") ? (
              <div className="mt-3">
                <ProvenanceBadgeList provenance={displayedRecord.provenance} compact />
              </div>
            ) : null}
          </div>
        </section>

        <div className="grid gap-3">
          <AnalysisListSection
            icon={<ShieldCheckIcon className="h-4 w-4" />}
            eyebrow={viewModel.fitReasons.eyebrow}
            title={viewModel.fitReasons.title}
            items={viewModel.fitReasons.items}
            fallback={viewModel.fitReasons.fallback}
            tone="tertiary"
          />

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

          <ExpandableSection
            eyebrow="ingredients"
            title={`ta7lil ingredients (${Math.min(viewModel.ingredientItems.length, 3)})`}
            summary="chouf ahamm 3 ingredients fil qrar."
          >
            <div className="space-y-4">
              {viewModel.ingredientItems.slice(0, 3).map((ingredient) => (
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
            {viewModel.ingredientItems.length > 3 ? (
              <p className="mt-4 text-[0.74rem] leading-5 text-on-surface-variant">
                fama ingredients okhrin zeda, ama hne rakkazna 3al ahamm 3lik fil qrar.
              </p>
            ) : null}
          </ExpandableSection>

          <ExpandableSection
            eyebrow={viewModel.cautions.eyebrow}
            title={viewModel.cautions.title}
            summary={viewModel.cautions.items[0] ?? viewModel.cautions.fallback}
          >
            <div className="space-y-3">
              <AnalysisListSection
                icon={<ShieldSunIcon className="h-4 w-4" />}
                eyebrow={viewModel.cautions.eyebrow}
                title={viewModel.cautions.title}
                items={viewModel.cautions.items}
                fallback={viewModel.cautions.fallback}
                tone="primary"
              />

              <AnalysisGlassCard>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="mb-1 block text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-primary">
                      {viewModel.uv.eyebrow}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <WarmSunIcon className="h-4 w-4 text-tertiary" />
                      <span className="font-display text-[1.02rem] leading-6 text-on-surface">{viewModel.uv.title}</span>
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
            </div>
          </ExpandableSection>

          {isFeatureEnabled("explainabilityBlocks") ? (
            <ExpandableSection
              eyebrow="3leh"
              title="3leh sa7ebti 9alet hakka"
              summary={explainability.condensedSummary}
            >
              <AnalysisExplainabilityCard model={explainability} />
            </ExpandableSection>
          ) : null}

        </div>

        <div className="mt-6 rounded-[1.3rem] border border-espresso/[0.08] bg-white/70 p-3 shadow-[0_14px_28px_rgba(38,37,34,0.04)]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
            chnowa ba3d
          </p>
          <p className="mt-1 text-[0.8rem] leading-5 text-on-surface-variant">
            {decision.title === "ma yjiich tawa"
              ? "khir jarrab scan ekher wala option a9rab l style mte3ek."
              : "ken 3jbek hedha, hoth favori. ken le, kamel scans okhrin."}
          </p>
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

function ExpandableSection({
  eyebrow,
  title,
  summary,
  children
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-[1.3rem] border border-espresso/[0.08] bg-white/[0.72] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md">
      <summary className="list-none cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-terracotta">
              {eyebrow}
            </p>
            <h3 className="mt-1.5 font-display text-[1.02rem] leading-5 text-espresso">{title}</h3>
            <p className="mt-1 text-[0.76rem] leading-5 text-on-surface-variant">{summary}</p>
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

function getDecisionSummary(status: "ynesbek" | "ynesbek-chwaya" | "ma-ynesbekch-jemla" | "ma3loumet-na9sa") {
  switch (status) {
    case "ynesbek":
      return {
        title: "nesta3mlou tawa",
        body: "hedha yodhher yji m3ak, tnajjem tdkhalou fil routine b ra7a.",
        tone: "bg-[#E6F2EA] text-[#2F6B45]"
      };
    case "ynesbek-chwaya":
      return {
        title: "nesta3mlou b chwaya",
        body: "ynajem yemchi, ama khir ebda b qlil wala m3a intibeh zeyed.",
        tone: "bg-[#F7EBD8] text-[#8A5A22]"
      };
    case "ma-ynesbekch-jemla":
      return {
        title: "ma yjiich tawa",
        body: "ahsen tab3ed 3lih tawa w tal9a option akthar ra7a m3a profil mte3ek.",
        tone: "bg-[#F6DFD9] text-[#9A4C3B]"
      };
    default:
      return {
        title: "mazelna nestannew",
        body: "3tina no3 l produit wala ma3louma okhra bech n9arrbou l decision.",
        tone: "bg-[#ECE6DF] text-[#5E544E]"
      };
  };
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
