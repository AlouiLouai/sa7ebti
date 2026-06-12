import type { ScannedProductRecord } from "@/lib/domain/scanned-product";

export interface ExplainabilityModel {
  title: string;
  topReasons: string[];
  cautionReasons: string[];
  affectedProfileFields: string[];
  condensedSummary: string;
}

export function buildExplainabilityModel(record: ScannedProductRecord): ExplainabilityModel {
  const { profileSnapshot, fitResult, product } = record;
  const affectedProfileFields = [
    profileSnapshot.skinType ? `no3 lbachra: ${getSkinTypeLabel(profileSnapshot.skinType)}` : null,
    profileSnapshot.climateRegion ? `manta9a: ${getClimateLabel(profileSnapshot.climateRegion)}` : null,
    profileSnapshot.makeupUsage ? `style: ${getMakeupUsageLabel(profileSnapshot.makeupUsage)}` : null,
    profileSnapshot.concerns.length > 0
      ? `awlawiyet: ${profileSnapshot.concerns.map(getConcernLabel).join(", ")}`
      : null,
    profileSnapshot.ingredientAvoidances.length > 0
      ? `filters: ${profileSnapshot.ingredientAvoidances.map(getFilterLabel).join(", ")}`
      : null
  ].filter((item): item is string => item !== null);

  return {
    title: "3leh sa7ebti 9alet hakka",
    topReasons: fitResult.whyItFits.slice(0, 3),
    cautionReasons: fitResult.cautions.slice(0, 3),
    affectedProfileFields,
    condensedSummary: `${product.name}: ${fitResult.summary}`
  };
}

function getSkinTypeLabel(value: ScannedProductRecord["profileSnapshot"]["skinType"]) {
  switch (value) {
    case "oily":
      return "dahniya";
    case "dry":
      return "yebsa";
    case "combination":
      return "mokhtlta";
    case "sensitive":
      return "7assasa";
  }
}

function getClimateLabel(value: ScannedProductRecord["profileSnapshot"]["climateRegion"]) {
  switch (value) {
    case "grand-tunis":
      return "tunis l kobra";
    case "coastal":
      return "sa7el";
    case "center-south":
      return "dakhel / janoub";
  }
}

function getMakeupUsageLabel(value: ScannedProductRecord["profileSnapshot"]["makeupUsage"]) {
  switch (value) {
    case "bare-minimal":
      return "mekyaj khfif";
    case "daily-base":
      return "base kol nhar";
    case "long-wear":
      return "thbat twil";
    case "treatment-first":
      return "bachrti a9bal";
  }
}

function getConcernLabel(value: ScannedProductRecord["profileSnapshot"]["concerns"][number]) {
  switch (value) {
    case "acne":
      return "7boub";
    case "hyperpigmentation":
      return "b9a3";
    case "dehydration":
      return "nchaf";
    case "redness":
      return "7mira";
  }
}

function getFilterLabel(value: ScannedProductRecord["profileSnapshot"]["ingredientAvoidances"][number]) {
  switch (value) {
    case "fragrance-free":
      return "bla parfum";
    case "non-comedogenic":
      return "ma ysakkerch pores";
    case "alcohol-caution":
      return "alcool 9wi";
    case "spf-friendly":
      return "yemshe m3a SPF";
  }
}
