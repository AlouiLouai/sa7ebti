import type { ProductCategory, ProductFitResult } from "@/lib/domain/product-fit";
import type { DataProvenance } from "@/lib/domain/provenance";
import type { ProfileSnapshot } from "@/lib/domain/profile";

export type ScanSource = "camera" | "gallery";

export interface ScannedProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl: string | null;
  scannedAtIso: string;
  source: ScanSource;
  ingredientList: string[];
}

export interface ProductRecommendationSummary {
  shortNote: string;
  dailyRoutineNote: string;
  actionLabel: string;
}

export interface DailyRoutineStep {
  time: "sbeh" | "wost-nhar" | "lil";
  title: string;
  body: string;
}

export interface ScannedProductRecord {
  id: string;
  product: ScannedProduct;
  fitResult: ProductFitResult;
  profileSnapshot: ProfileSnapshot;
  recommendationSummary: ProductRecommendationSummary;
  dailyRoutine: DailyRoutineStep[];
  provenance: DataProvenance[];
}
