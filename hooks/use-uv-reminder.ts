"use client";

import { useSyncExternalStore } from "react";
import { useUserProfile, updateUvReminderPreference } from "@/hooks/use-user-profile";
import { buildUvReminderSettings, type UvReminderPermissionState } from "@/lib/domain/uv-reminders";

const UV_REMINDER_PERMISSION_KEY = "sa7ebti-uv-reminder-permission";
const listeners = new Set<() => void>();
let cachedPermissionRawValue: string | null = null;
let cachedPermissionState: UvReminderPermissionState = "unknown";

export function useUvReminder() {
  const { profileDraft } = useUserProfile();
  const permissionState = useSyncExternalStore(subscribe, getClientPermissionSnapshot, getServerPermissionSnapshot);

  return {
    settings: buildUvReminderSettings(profileDraft, permissionState),
    enableReminderPreference: () => updateUvReminderPreference("enabled"),
    disableReminderPreference: () => updateUvReminderPreference("disabled"),
    setPermissionState
  };
}

export function setPermissionState(nextState: UvReminderPermissionState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(UV_REMINDER_PERMISSION_KEY, nextState);
  cachedPermissionRawValue = nextState;
  cachedPermissionState = nextState;
  emitPermissionChange();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      listeners.delete(listener);
    };
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === UV_REMINDER_PERMISSION_KEY) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function emitPermissionChange() {
  listeners.forEach((listener) => listener());
}

function getServerPermissionSnapshot() {
  return "unknown" as const;
}

function getClientPermissionSnapshot() {
  if (typeof window === "undefined") {
    return "unknown" as const;
  }

  const rawValue = window.localStorage.getItem(UV_REMINDER_PERMISSION_KEY);

  if (!rawValue) {
    cachedPermissionRawValue = null;
    cachedPermissionState = "unknown";
    return cachedPermissionState;
  }

  if (rawValue === cachedPermissionRawValue) {
    return cachedPermissionState;
  }

  if (rawValue === "granted-demo" || rawValue === "denied" || rawValue === "unknown") {
    cachedPermissionRawValue = rawValue;
    cachedPermissionState = rawValue;
    return cachedPermissionState;
  }

  cachedPermissionRawValue = null;
  cachedPermissionState = "unknown";
  return cachedPermissionState;
}
