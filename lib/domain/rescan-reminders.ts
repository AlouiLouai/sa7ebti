import type { UserProfileDraft } from "@/lib/domain/profile";
import type { ScannedProductRecord } from "@/lib/domain/scanned-product";

export interface RescanSuggestion {
  recordId: string;
  productName: string;
  reasons: string[];
}

export function buildRescanSuggestions({
  currentProfile,
  records
}: {
  currentProfile: UserProfileDraft;
  records: ScannedProductRecord[];
}) {
  return records
    .map((record) => {
      const reasons = getProfileChangeReasons(currentProfile, record);

      if (reasons.length === 0) {
        return null;
      }

      return {
        recordId: record.id,
        productName: record.product.name,
        reasons
      } satisfies RescanSuggestion;
    })
    .filter((item): item is RescanSuggestion => item !== null);
}

function getProfileChangeReasons(currentProfile: UserProfileDraft, record: ScannedProductRecord) {
  const reasons: string[] = [];

  if (currentProfile.skinType && currentProfile.skinType !== record.profileSnapshot.skinType) {
    reasons.push("skin type tbaddel");
  }

  if (currentProfile.climateRegion && currentProfile.climateRegion !== record.profileSnapshot.climateRegion) {
    reasons.push("manta9a tbaddlet");
  }

  if (currentProfile.makeupUsage && currentProfile.makeupUsage !== record.profileSnapshot.makeupUsage) {
    reasons.push("style makeup tbaddel");
  }

  if (
    currentProfile.ingredientAvoidances.some(
      (avoidance) => !record.profileSnapshot.ingredientAvoidances.includes(avoidance)
    )
  ) {
    reasons.push("filters jdod zedou");
  }

  if (currentProfile.concerns.some((concern) => !record.profileSnapshot.concerns.includes(concern))) {
    reasons.push("awlawiyet jdod zedou");
  }

  return reasons;
}
