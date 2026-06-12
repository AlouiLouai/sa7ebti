import type { IngredientAvoidance, ProfileConcern, ProfileSnapshot, SkinType } from "@/lib/domain/profile";

export type ProductCategory =
  | "serum"
  | "cleanser"
  | "moisturizer"
  | "sunscreen"
  | "foundation"
  | "primer"
  | "mask"
  | "unknown";

export type IngredientSignal =
  | "hydration"
  | "soothing"
  | "barrier-support"
  | "fragrance-risk"
  | "comedogenic-risk"
  | "alcohol-risk"
  | "uv-support";

export type FitStatus = "ynesbek" | "ynesbek-chwaya" | "ma-ynesbekch-jemla" | "ma3loumet-na9sa";

export type FitConfidence = "high" | "medium" | "low";

export type MissingInput =
  | "profile.skinType"
  | "profile.climateRegion"
  | "profile.makeupUsage"
  | "product.category"
  | "product.ingredients";

export interface IngredientInsight {
  name: string;
  signal: IngredientSignal;
  summary: string;
  reasonTag: string;
}

export interface ProductTodayContext {
  uvIndex: number;
  uvLevelLabel: string;
  cityLabel: string;
  advice: string;
}

export interface ProductFitResult {
  status: FitStatus;
  confidence: FitConfidence;
  compatibilityScore: number | null;
  missingInputs: MissingInput[];
  headline: string;
  summary: string;
  whyItFits: string[];
  cautions: string[];
  recommendedUsage: string[];
  profileSignals: Array<SkinType | ProfileConcern | IngredientAvoidance>;
  ingredientInsights: IngredientInsight[];
  todayContext: ProductTodayContext | null;
  profileSnapshot: ProfileSnapshot | null;
}

export function hasMinimumFitData(result: ProductFitResult) {
  return result.missingInputs.length === 0 && result.profileSnapshot !== null;
}

export function getFitLabel(status: FitStatus) {
  switch (status) {
    case "ynesbek":
      return "ynesbek";
    case "ynesbek-chwaya":
      return "ynesbek chwaya";
    case "ma-ynesbekch-jemla":
      return "ma ynesbekch jemla";
    case "ma3loumet-na9sa":
      return "ma3loumet na9sa";
  }
}

export function getFitHeadline(status: FitStatus) {
  switch (status) {
    case "ynesbek":
      return "yji m3ak barcha";
    case "ynesbek-chwaya":
      return "ynajem yji m3ak b chwaya intibeh";
    case "ma-ynesbekch-jemla":
      return "ahsen tab3ed 3lih";
    case "ma3loumet-na9sa":
      return "mazelna n7ebbou ma3loumet akther";
  }
}
