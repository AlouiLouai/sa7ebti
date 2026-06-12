import { getFitHeadline, getFitLabel, type IngredientSignal } from "@/lib/domain/product-fit";
import { getCategoryOption, type CurrentScanDraft } from "@/lib/domain/scan-flow";
import type { ScannedProductRecord } from "@/lib/domain/scanned-product";

export interface AnalysisHeroViewModel {
  fitLabel: string;
  headline: string;
  scoreLabel: string;
  categoryLabel: string;
  familyLabel: string;
  sourceLabel: string;
  summary: string;
}

export interface AnalysisUvViewModel {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
}

export interface AnalysisListSectionViewModel {
  eyebrow: string;
  title: string;
  items: string[];
  fallback: string;
}

export interface IngredientConcernChipViewModel {
  id: string;
  label: string;
  tone: "good" | "warn";
}

export interface AnalysisIngredientItemViewModel {
  name: string;
  body: string;
  signal: IngredientSignal;
  chips: IngredientConcernChipViewModel[];
}

export interface AnalysisCategoryPromptViewModel {
  title: string;
  body: string;
}

export interface AnalysisViewModel {
  hero: AnalysisHeroViewModel;
  uv: AnalysisUvViewModel;
  fitReasons: AnalysisListSectionViewModel;
  cautions: AnalysisListSectionViewModel;
  ingredientItems: AnalysisIngredientItemViewModel[];
  adviceTitle: string;
  adviceBody: string;
  categoryPrompt: AnalysisCategoryPromptViewModel | null;
}

export function buildAnalysisViewModel({
  currentScanDraft,
  record
}: {
  currentScanDraft: CurrentScanDraft | null;
  record: ScannedProductRecord;
}): AnalysisViewModel {
  const categoryMeta = getCategoryOption(record.product.category);
  const needsManualCategory = currentScanDraft?.selectedCategory === "unknown";

  return {
    hero: {
      fitLabel: getFitLabel(record.fitResult.status),
      headline: getFitHeadline(record.fitResult.status),
      scoreLabel: record.fitResult.compatibilityScore === null ? "--" : `${record.fitResult.compatibilityScore}%`,
      categoryLabel: categoryMeta?.label ?? "no3 mazel ma howech ma3rouf",
      familyLabel: categoryMeta?.family === "makeup" ? "makeup" : "skincare",
      sourceLabel: record.product.source === "camera" ? "men camera" : "men galerie",
      summary: record.fitResult.summary
    },
    uv: {
      eyebrow: "chams lyoum",
      title: record.fitResult.todayContext
        ? `UV ${record.fitResult.todayContext.uvIndex} (${record.fitResult.todayContext.uvLevelLabel})`
        : "UV mazel ma howech mawjoud",
      subtitle: record.fitResult.todayContext?.cityLabel ?? "ma fama ch ma3loumet lyoum",
      note: record.fitResult.todayContext?.advice ?? "zid ma3loumet l UV ba3d"
    },
    fitReasons: {
      eyebrow: "3leh",
      title: getFitReasonsTitle(record.product.category, record.fitResult.status),
      items: record.fitResult.whyItFits,
      fallback: record.fitResult.headline
    },
    cautions: {
      eyebrow: "intibeh",
      title: getCautionsTitle(record.product.category),
      items: record.fitResult.cautions,
      fallback: record.fitResult.recommendedUsage[0] ?? "mazel ma fama ch note okhra."
    },
    ingredientItems: record.fitResult.ingredientInsights.map((ingredient) => ({
      name: ingredient.name,
      body: `${ingredient.reasonTag}: ${ingredient.summary}`,
      signal: ingredient.signal,
      chips: buildIngredientConcernChips(record, ingredient.signal)
    })),
    adviceTitle: getAdviceTitle(record.product.category),
    adviceBody: record.recommendationSummary.dailyRoutineNote,
    categoryPrompt: needsManualCategory
      ? {
          title: "ikhtar no3 l produit",
          body: "bech sa7ebti t7okem b s7i7, ikhtar idha hedha cleanser, serum, SPF wala makeup."
        }
      : null
  };
}

function getFitReasonsTitle(category: ScannedProductRecord["product"]["category"], status: ScannedProductRecord["fitResult"]["status"]) {
  if (status === "ma-ynesbekch-jemla") {
    return "3leh ahsen tab3ed 3lih";
  }

  switch (category) {
    case "foundation":
    case "primer":
      return "3leh hedha yji m3a makeup mte3ek";
    case "sunscreen":
      return "3leh hedha yji m3a routine sbeh";
    default:
      return "3leh hedha yji m3a bachretek";
  }
}

function getCautionsTitle(category: ScannedProductRecord["product"]["category"]) {
  switch (category) {
    case "foundation":
    case "primer":
      return "intibeh 9bal makeup";
    case "sunscreen":
      return "SPF w retouche";
    default:
      return "intibeh fil ista3mel";
  }
}

function getAdviceTitle(category: ScannedProductRecord["product"]["category"]) {
  switch (category) {
    case "cleanser":
      return "conseil sa7ebti lel naDafa";
    case "sunscreen":
      return "conseil sa7ebti lel SPF";
    case "foundation":
    case "primer":
      return "conseil sa7ebti lel makeup";
    default:
      return "conseil sa7ebti";
  }
}

function buildIngredientConcernChips(record: ScannedProductRecord, signal: IngredientSignal) {
  const chips: IngredientConcernChipViewModel[] = [];
  const { concerns, ingredientAvoidances, skinType } = record.profileSnapshot;

  if (signal === "fragrance-risk") {
    chips.push({
      id: "fragrance-risk",
      label: "parfum risk",
      tone: "warn"
    });

    if (concerns.includes("redness") || ingredientAvoidances.includes("fragrance-free")) {
      chips.push({
        id: "sensitivity-risk",
        label: "7assasiya risk",
        tone: "warn"
      });
    }
  }

  if (signal === "alcohol-risk") {
    chips.push({
      id: "alcohol-risk",
      label: "alcool risk",
      tone: "warn"
    });

    if (
      skinType === "dry" ||
      concerns.includes("dehydration") ||
      ingredientAvoidances.includes("alcohol-caution")
    ) {
      chips.push({
        id: "dehydration-risk",
        label: "nchaf risk",
        tone: "warn"
      });
    }
  }

  if (signal === "comedogenic-risk") {
    chips.push({
      id: "comedogenic-risk",
      label: "pores risk",
      tone: "warn"
    });

    if (concerns.includes("acne") || ingredientAvoidances.includes("non-comedogenic")) {
      chips.push({
        id: "acne-match",
        label: "7boub concern",
        tone: "warn"
      });
    }
  }

  if (signal === "hydration" && concerns.includes("dehydration")) {
    chips.push({
      id: "hydration-benefit",
      label: "moufid lel nchaf",
      tone: "good"
    });
  }

  if ((signal === "soothing" || signal === "barrier-support") && concerns.includes("redness")) {
    chips.push({
      id: "soothing-benefit",
      label: "moufid lel 7mira",
      tone: "good"
    });
  }

  if (signal === "uv-support" && ingredientAvoidances.includes("spf-friendly")) {
    chips.push({
      id: "spf-match",
      label: "yemshe m3a SPF",
      tone: "good"
    });
  }

  return chips;
}
