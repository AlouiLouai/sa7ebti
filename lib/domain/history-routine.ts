import type { FitStatus } from "@/lib/domain/product-fit";
import type { DailyRoutineStep, ScannedProductRecord } from "@/lib/domain/scanned-product";

export interface RoutinePlanStep extends DailyRoutineStep {
  recordId: string | null;
  productName: string;
  reason: string;
}

export function mergeHistoryRecords(
  persistedRecords: ScannedProductRecord[],
  fixtureRecords: ScannedProductRecord[]
) {
  const recordMap = new Map<string, ScannedProductRecord>();

  [...persistedRecords, ...fixtureRecords].forEach((record) => {
    if (!recordMap.has(record.id)) {
      recordMap.set(record.id, record);
    }
  });

  return Array.from(recordMap.values()).sort(
    (left, right) =>
      new Date(right.product.scannedAtIso).getTime() - new Date(left.product.scannedAtIso).getTime()
  );
}

export function buildRoutinePlan(records: ScannedProductRecord[]): RoutinePlanStep[] {
  const compatibleRecords = records.filter((record) => isRoutineCompatible(record.fitResult.status));
  const cleanser = findFirstByCategory(compatibleRecords, ["cleanser"]);
  const serum = findFirstByCategory(compatibleRecords, ["serum", "moisturizer"]);
  const sunscreen = findFirstByCategory(compatibleRecords, ["sunscreen", "foundation", "primer"]);
  const nightCare = findFirstByCategory(compatibleRecords, ["mask", "moisturizer", "serum"]);

  return [
    cleanser
      ? {
          time: "sbeh",
          title: "sbeh nebdew b hnin",
          body: `${cleanser.product.name} ba3d naDafa bech bachretk tebda merta7a.`,
          productName: cleanser.product.name,
          recordId: cleanser.id,
          reason: getRoutineReason(cleanser)
        }
      : serum
        ? {
            time: "sbeh",
            title: "sbeh ratba khfifa",
            body: `${serum.product.name} yji fil sbeh 5ater khfif w y3awen bachretk.`,
            productName: serum.product.name,
            recordId: serum.id,
            reason: getRoutineReason(serum)
          }
        : createFallbackRoutineStep("sbeh", "sbeh routine sghira", "cleanser hnin, ba3d hydratation 5fifa."),
    sunscreen
      ? {
          time: "wost-nhar",
          title: "wost nhar check srii3",
          body: `${sunscreen.product.name} ywaffe9 wost nhar ken t7eb retouche wala protection.`,
          productName: sunscreen.product.name,
          recordId: sunscreen.id,
          reason: getRoutineReason(sunscreen)
        }
      : createFallbackRoutineStep(
          "wost-nhar",
          "wost nhar retouche",
          "ken fama chams wala lama3, 3awed SPF wala na77i chwaya shine."
        ),
    nightCare
      ? {
          time: "lil",
          title: "lil comfort",
          body: `${nightCare.product.name} yji fil lil bech yheddi bachretk ba3d nhar twil.`,
          productName: nightCare.product.name,
          recordId: nightCare.id,
          reason: getRoutineReason(nightCare)
        }
      : createFallbackRoutineStep("lil", "lil hnin", "naDafa bel behi, ba3d hydratant wala care hnin.")
  ];
}

function createFallbackRoutineStep(time: DailyRoutineStep["time"], title: string, body: string): RoutinePlanStep {
  return {
    time,
    title,
    body,
    productName: "routine mte3ek",
    recordId: null,
    reason: "3la hsab eli mawjoud tawa."
  };
}

function findFirstByCategory(records: ScannedProductRecord[], categories: ScannedProductRecord["product"]["category"][]) {
  return records.find((record) => categories.includes(record.product.category)) ?? null;
}

function isRoutineCompatible(status: FitStatus) {
  return status === "ynesbek" || status === "ynesbek-chwaya";
}

function getRoutineReason(record: ScannedProductRecord) {
  return record.recommendationSummary.shortNote;
}
