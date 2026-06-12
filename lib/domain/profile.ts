export type SkinType = "oily" | "dry" | "combination" | "sensitive";

export type TunisiaClimateRegion = "grand-tunis" | "coastal" | "center-south";

export type MakeupUsageLevel =
  | "bare-minimal"
  | "daily-base"
  | "long-wear"
  | "treatment-first";

export type ProfileConcern = "acne" | "hyperpigmentation" | "dehydration" | "redness";

export type IngredientAvoidance =
  | "fragrance-free"
  | "non-comedogenic"
  | "alcohol-caution"
  | "spf-friendly";

export type SpfHabit = "daily" | "sometimes" | "rarely" | "unknown";

export type SensitivityFlag = "fragrance" | "alcohol" | "heavy-textures" | "strong-actives";

export type UvReminderPreference = "enabled" | "disabled";

export interface UserProfile {
  skinType: SkinType;
  climateRegion: TunisiaClimateRegion;
  makeupUsage: MakeupUsageLevel;
  concerns: ProfileConcern[];
  ingredientAvoidances: IngredientAvoidance[];
  spfHabit: SpfHabit;
  sensitivityFlags: SensitivityFlag[];
  uvReminderPreference: UvReminderPreference;
}

export interface UserProfileDraft extends Partial<UserProfile> {
  concerns: ProfileConcern[];
  ingredientAvoidances: IngredientAvoidance[];
  sensitivityFlags: SensitivityFlag[];
}

export type ProfileSnapshot = Pick<
  UserProfile,
  "skinType" | "climateRegion" | "makeupUsage" | "concerns" | "ingredientAvoidances"
>;

export function createEmptyUserProfileDraft(): UserProfileDraft {
  return {
    concerns: [],
    ingredientAvoidances: [],
    sensitivityFlags: [],
    spfHabit: "unknown",
    uvReminderPreference: "disabled"
  };
}
