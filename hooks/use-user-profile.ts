"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import { createEmptyUserProfileDraft, type UserProfileDraft, type UvReminderPreference } from "@/lib/domain/profile";

const PROFILE_STORAGE_KEY = "sa7ebti-profile-draft";
const EMPTY_PROFILE_DRAFT = createEmptyUserProfileDraft();
const listeners = new Set<() => void>();
let cachedRawValue: string | null = null;
let cachedProfileDraft = EMPTY_PROFILE_DRAFT;

function emitProfileChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === PROFILE_STORAGE_KEY) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getServerSnapshot() {
  return EMPTY_PROFILE_DRAFT;
}

function getClientSnapshot() {
  return readStoredProfileDraft();
}

export function useUserProfile() {
  const profileDraft = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    isHydrated,
    profileDraft,
    saveProfileDraft,
    updateUvReminderPreference
  };
}

export function saveProfileDraft(nextDraft: UserProfileDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizeProfileDraft(nextDraft)));
  emitProfileChange();
}

export function updateUvReminderPreference(nextPreference: UvReminderPreference) {
  if (typeof window === "undefined") {
    return;
  }

  const current = readStoredProfileDraft();

  saveProfileDraft({
    ...current,
    uvReminderPreference: nextPreference
  });
}

function readStoredProfileDraft() {
  if (typeof window === "undefined") {
    return EMPTY_PROFILE_DRAFT;
  }

  const rawValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!rawValue) {
    cachedRawValue = null;
    cachedProfileDraft = EMPTY_PROFILE_DRAFT;

    return cachedProfileDraft;
  }

  if (rawValue === cachedRawValue) {
    return cachedProfileDraft;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<UserProfileDraft>;

    cachedRawValue = rawValue;
    cachedProfileDraft = normalizeProfileDraft({
      ...EMPTY_PROFILE_DRAFT,
      ...parsedValue
    });

    return cachedProfileDraft;
  } catch {
    cachedRawValue = null;
    cachedProfileDraft = EMPTY_PROFILE_DRAFT;

    return cachedProfileDraft;
  }
}

function normalizeProfileDraft(profileDraft: Partial<UserProfileDraft>): UserProfileDraft {
  return {
    ...EMPTY_PROFILE_DRAFT,
    ...profileDraft,
    concerns: Array.isArray(profileDraft.concerns) ? profileDraft.concerns : [],
    ingredientAvoidances: Array.isArray(profileDraft.ingredientAvoidances)
      ? profileDraft.ingredientAvoidances
      : [],
    sensitivityFlags: Array.isArray(profileDraft.sensitivityFlags)
      ? profileDraft.sensitivityFlags
      : []
  };
}
