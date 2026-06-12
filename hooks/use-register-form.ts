"use client";

import { useState } from "react";

export type RegisterFormState = {
  skinType: string;
  climate: string;
  makeupStyle: string;
  concerns: string[];
  ingredientFilters: string[];
};

const initialFormState: RegisterFormState = {
  skinType: "",
  climate: "",
  makeupStyle: "",
  concerns: [],
  ingredientFilters: []
};

export function useRegisterForm() {
  const [form, setForm] = useState<RegisterFormState>(initialFormState);

  function selectSkinType(value: string) {
    setForm((current) => ({ ...current, skinType: value }));
  }

  function selectClimate(value: string) {
    setForm((current) => ({ ...current, climate: value }));
  }

  function selectMakeupStyle(value: string) {
    setForm((current) => ({ ...current, makeupStyle: value }));
  }

  function toggleConcern(value: string) {
    setForm((current) => ({
      ...current,
      concerns: current.concerns.includes(value)
        ? current.concerns.filter((item) => item !== value)
        : [...current.concerns, value]
    }));
  }

  function toggleIngredientFilter(value: string) {
    setForm((current) => ({
      ...current,
      ingredientFilters: current.ingredientFilters.includes(value)
        ? current.ingredientFilters.filter((item) => item !== value)
        : [...current.ingredientFilters, value]
    }));
  }

  return {
    form,
    isReady: Boolean(form.skinType && form.climate && form.makeupStyle),
    selectSkinType,
    selectClimate,
    selectMakeupStyle,
    toggleConcern,
    toggleIngredientFilter
  };
}
