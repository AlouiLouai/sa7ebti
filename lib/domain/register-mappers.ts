import type { RegisterFormState } from "@/hooks/use-register-form";
import type {
  IngredientAvoidance,
  ProfileConcern,
  TunisiaClimateRegion,
  UvReminderPreference,
  UserProfileDraft,
  MakeupUsageLevel,
  SkinType
} from "@/lib/domain/profile";

export function createProfileDraftFromRegisterForm(form: RegisterFormState): UserProfileDraft {
  return {
    skinType: form.skinType || undefined,
    climateRegion: form.climate || undefined,
    makeupUsage: form.makeupStyle || undefined,
    concerns: form.concerns,
    ingredientAvoidances: form.ingredientFilters,
    sensitivityFlags: deriveSensitivityFlags(form.ingredientFilters),
    spfHabit: form.ingredientFilters.includes("spf-friendly") ? "daily" : "unknown",
    uvReminderPreference: form.uvReminderPreference
  };
}

function deriveSensitivityFlags(filters: IngredientAvoidance[]) {
  return [
    filters.includes("fragrance-free") ? "fragrance" : null,
    filters.includes("alcohol-caution") ? "alcohol" : null,
    filters.includes("non-comedogenic") ? "heavy-textures" : null
  ].filter((value): value is "fragrance" | "alcohol" | "heavy-textures" => value !== null);
}

export type RegisterSkinType = SkinType | "";
export type RegisterClimate = TunisiaClimateRegion | "";
export type RegisterMakeupUsage = MakeupUsageLevel | "";
export type RegisterConcern = ProfileConcern;
export type RegisterFilter = IngredientAvoidance;
export type RegisterUvReminder = UvReminderPreference;
