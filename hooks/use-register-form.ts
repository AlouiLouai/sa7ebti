"use client";

import { useEffect, useState } from "react";
import { createProfileDraftFromRegisterForm } from "@/lib/domain/register-mappers";
import type {
  RegisterClimate,
  RegisterConcern,
  RegisterFilter,
  RegisterMakeupUsage,
  RegisterSkinType,
  RegisterUvReminder
} from "@/lib/domain/register-mappers";
import { createEmptyUserProfileDraft, type UserProfileDraft } from "@/lib/domain/profile";

export type RegisterFormState = {
  skinType: RegisterSkinType;
  climate: RegisterClimate;
  makeupStyle: RegisterMakeupUsage;
  concerns: RegisterConcern[];
  ingredientFilters: RegisterFilter[];
  uvReminderPreference: RegisterUvReminder;
};

const initialFormState: RegisterFormState = {
  skinType: "",
  climate: "",
  makeupStyle: "",
  concerns: [],
  ingredientFilters: [],
  uvReminderPreference: "disabled"
};

export function useRegisterForm(savedDraft?: UserProfileDraft) {
  const [form, setForm] = useState<RegisterFormState>(initialFormState);

  useEffect(() => {
    if (!savedDraft) {
      return;
    }

    const emptyDraft = createEmptyUserProfileDraft();
    const mergedDraft = {
      ...emptyDraft,
      ...savedDraft
    };
    const uvReminderPreference: RegisterUvReminder =
      mergedDraft.uvReminderPreference === "enabled" ? "enabled" : "disabled";

    setForm({
      skinType: mergedDraft.skinType ?? "",
      climate: mergedDraft.climateRegion ?? "",
      makeupStyle: mergedDraft.makeupUsage ?? "",
      concerns: mergedDraft.concerns,
      ingredientFilters: mergedDraft.ingredientAvoidances,
      uvReminderPreference
    });
  }, [savedDraft]);

  function selectSkinType(value: RegisterSkinType) {
    setForm((current) => ({ ...current, skinType: value }));
  }

  function selectClimate(value: RegisterClimate) {
    setForm((current) => ({ ...current, climate: value }));
  }

  function selectMakeupStyle(value: RegisterMakeupUsage) {
    setForm((current) => ({ ...current, makeupStyle: value }));
  }

  function toggleConcern(value: RegisterConcern) {
    setForm((current) => ({
      ...current,
      concerns: current.concerns.includes(value)
        ? current.concerns.filter((item) => item !== value)
        : [...current.concerns, value]
    }));
  }

  function toggleIngredientFilter(value: RegisterFilter) {
    setForm((current) => ({
      ...current,
      ingredientFilters: current.ingredientFilters.includes(value)
        ? current.ingredientFilters.filter((item) => item !== value)
        : [...current.ingredientFilters, value]
    }));
  }

  function setUvReminderPreference(value: RegisterUvReminder) {
    setForm((current) => ({ ...current, uvReminderPreference: value }));
  }

  return {
    form,
    profileDraft: createProfileDraftFromRegisterForm(form),
    isReady: Boolean(form.skinType && form.climate && form.makeupStyle),
    selectSkinType,
    selectClimate,
    selectMakeupStyle,
    toggleConcern,
    toggleIngredientFilter,
    setUvReminderPreference
  };
}
