import type { ProductCategory } from "@/lib/domain/product-fit";
import { buildProvenanceList } from "@/lib/domain/provenance";
import type { ScanSource, ScannedProductRecord } from "@/lib/domain/scanned-product";
import { scanRecordOverrides } from "@/lib/fixtures/scan-record-overrides";
import { missingDataAnalysisFixture, scannedProductRecordsFixture } from "@/lib/fixtures/p0-core-data";

export type ScanCategoryState = "manual-selected" | "needs-manual-selection";

export interface ScanCategoryOption {
  value: Exclude<ProductCategory, "unknown">;
  label: string;
  shortLabel: string;
  family: "skincare" | "makeup";
  helper: string;
}

export interface CurrentScanDraft {
  id: string;
  fileName: string;
  source: ScanSource;
  selectedCategory: ProductCategory;
  categoryState: ScanCategoryState;
  createdAtIso: string;
}

export const scanCategoryOptions: ScanCategoryOption[] = [
  { value: "cleanser", label: "cleanser", shortLabel: "cleanser", family: "skincare", helper: "naDafa" },
  { value: "serum", label: "serum", shortLabel: "serum", family: "skincare", helper: "traitement" },
  {
    value: "moisturizer",
    label: "hydratant",
    shortLabel: "hydratant",
    family: "skincare",
    helper: "ratba"
  },
  { value: "sunscreen", label: "SPF", shortLabel: "SPF", family: "skincare", helper: "7meya" },
  { value: "foundation", label: "fond de teint", shortLabel: "teint", family: "makeup", helper: "base" },
  { value: "primer", label: "primer", shortLabel: "primer", family: "makeup", helper: "9bal teint" },
  { value: "mask", label: "mask", shortLabel: "mask", family: "skincare", helper: "care" }
];

export function createCurrentScanDraft({
  fileName,
  selectedCategory,
  source
}: {
  fileName: string;
  selectedCategory: ProductCategory;
  source: ScanSource;
}): CurrentScanDraft {
  return {
    id: `current-scan-${Date.now()}`,
    fileName,
    source,
    selectedCategory,
    categoryState: selectedCategory === "unknown" ? "needs-manual-selection" : "manual-selected",
    createdAtIso: new Date().toISOString()
  };
}

export function updateCurrentScanDraftCategory(
  draft: CurrentScanDraft,
  category: Exclude<ProductCategory, "unknown">
): CurrentScanDraft {
  return {
    ...draft,
    selectedCategory: category,
    categoryState: "manual-selected"
  };
}

export function buildRecordFromCurrentScan(draft: CurrentScanDraft | null | undefined) {
  if (!draft) {
    return scannedProductRecordsFixture[0];
  }

  switch (draft.selectedCategory) {
    case "cleanser":
      return buildRecordFromTemplate(scannedProductRecordsFixture[2], draft, {
        name: "Cleanser balance",
        brand: "Sa7ebti Care"
      });
    case "foundation":
      return buildRecordFromTemplate(scannedProductRecordsFixture[1], draft, {
        name: "Fond de teint soft matte",
        brand: "Sa7ebti Makeup"
      });
    case "moisturizer":
      return buildMoisturizerRecord(draft);
    case "sunscreen":
      return buildSunscreenRecord(draft);
    case "primer":
      return buildPrimerRecord(draft);
    case "mask":
      return buildMaskRecord(draft);
    case "serum":
      return buildRecordFromTemplate(scannedProductRecordsFixture[0], draft, {
        name: "Serum hydra calm",
        brand: "Sa7ebti Lab"
      });
    case "unknown":
    default:
      return buildUnknownRecord(draft);
  }
}

export function getCategoryOption(category: ProductCategory) {
  return scanCategoryOptions.find((option) => option.value === category) ?? null;
}

function buildUnknownRecord(draft: CurrentScanDraft) {
  return {
    ...missingDataAnalysisFixture,
    id: `${missingDataAnalysisFixture.id}-${draft.id}`,
    product: {
      ...missingDataAnalysisFixture.product,
      name: "produit jdida",
      brand: "scan mte3ek",
      scannedAtIso: draft.createdAtIso,
      source: draft.source
    },
    provenance: buildProvenanceList("demo-fixture", "derived-local")
  } satisfies ScannedProductRecord;
}

function buildMoisturizerRecord(draft: CurrentScanDraft) {
  const baseRecord = buildRecordFromTemplate(scannedProductRecordsFixture[0], draft, scanRecordOverrides.moisturizer);

  return {
    ...baseRecord,
    fitResult: {
      ...baseRecord.fitResult,
      summary: scanRecordOverrides.moisturizer.summary ?? baseRecord.fitResult.summary,
      whyItFits: scanRecordOverrides.moisturizer.whyItFits ?? baseRecord.fitResult.whyItFits,
      recommendedUsage:
        scanRecordOverrides.moisturizer.recommendedUsage ?? baseRecord.fitResult.recommendedUsage,
      ingredientInsights:
        scanRecordOverrides.moisturizer.ingredientInsights ?? baseRecord.fitResult.ingredientInsights
    },
    recommendationSummary:
      scanRecordOverrides.moisturizer.recommendationSummary ?? baseRecord.recommendationSummary
  } satisfies ScannedProductRecord;
}

function buildSunscreenRecord(draft: CurrentScanDraft) {
  const baseRecord = buildRecordFromTemplate(scannedProductRecordsFixture[0], draft, scanRecordOverrides.sunscreen);

  return {
    ...baseRecord,
    fitResult: {
      ...baseRecord.fitResult,
      compatibilityScore: 95,
      headline: "yji m3ak w ykammel routine lyoum",
      summary: scanRecordOverrides.sunscreen.summary ?? baseRecord.fitResult.summary,
      whyItFits: scanRecordOverrides.sunscreen.whyItFits ?? baseRecord.fitResult.whyItFits,
      cautions: scanRecordOverrides.sunscreen.cautions ?? baseRecord.fitResult.cautions,
      recommendedUsage:
        scanRecordOverrides.sunscreen.recommendedUsage ?? baseRecord.fitResult.recommendedUsage,
      ingredientInsights:
        scanRecordOverrides.sunscreen.ingredientInsights ?? baseRecord.fitResult.ingredientInsights,
      todayContext: scanRecordOverrides.sunscreen.todayContext ?? baseRecord.fitResult.todayContext
    },
    recommendationSummary:
      scanRecordOverrides.sunscreen.recommendationSummary ?? baseRecord.recommendationSummary
  } satisfies ScannedProductRecord;
}

function buildPrimerRecord(draft: CurrentScanDraft) {
  const baseRecord = buildRecordFromTemplate(scannedProductRecordsFixture[1], draft, scanRecordOverrides.primer);

  return {
    ...baseRecord,
    fitResult: {
      ...baseRecord.fitResult,
      summary: scanRecordOverrides.primer.summary ?? baseRecord.fitResult.summary,
      whyItFits: scanRecordOverrides.primer.whyItFits ?? baseRecord.fitResult.whyItFits,
      cautions: scanRecordOverrides.primer.cautions ?? baseRecord.fitResult.cautions,
      recommendedUsage:
        scanRecordOverrides.primer.recommendedUsage ?? baseRecord.fitResult.recommendedUsage,
      ingredientInsights:
        scanRecordOverrides.primer.ingredientInsights ?? baseRecord.fitResult.ingredientInsights
    },
    recommendationSummary: scanRecordOverrides.primer.recommendationSummary ?? baseRecord.recommendationSummary
  } satisfies ScannedProductRecord;
}

function buildMaskRecord(draft: CurrentScanDraft) {
  const baseRecord = buildRecordFromTemplate(scannedProductRecordsFixture[0], draft, scanRecordOverrides.mask);

  return {
    ...baseRecord,
    fitResult: {
      ...baseRecord.fitResult,
      compatibilityScore: 82,
      summary: scanRecordOverrides.mask.summary ?? baseRecord.fitResult.summary,
      whyItFits: scanRecordOverrides.mask.whyItFits ?? baseRecord.fitResult.whyItFits,
      cautions: scanRecordOverrides.mask.cautions ?? baseRecord.fitResult.cautions,
      recommendedUsage: scanRecordOverrides.mask.recommendedUsage ?? baseRecord.fitResult.recommendedUsage,
      ingredientInsights:
        scanRecordOverrides.mask.ingredientInsights ?? baseRecord.fitResult.ingredientInsights
    },
    recommendationSummary: scanRecordOverrides.mask.recommendationSummary ?? baseRecord.recommendationSummary
  } satisfies ScannedProductRecord;
}

function buildRecordFromTemplate(
  template: ScannedProductRecord,
  draft: CurrentScanDraft,
  overrides?: {
    name?: string;
    brand?: string;
  }
) {
  return {
    ...template,
    id: `${template.id}-${draft.id}`,
    product: {
      ...template.product,
      name: overrides?.name ?? template.product.name,
      brand: overrides?.brand ?? template.product.brand,
      category: draft.selectedCategory,
      scannedAtIso: draft.createdAtIso,
      source: draft.source
    },
    provenance:
      draft.selectedCategory === "unknown"
        ? buildProvenanceList("demo-fixture", "derived-local")
        : buildProvenanceList("demo-fixture", "derived-local", "manual-input")
  } satisfies ScannedProductRecord;
}
