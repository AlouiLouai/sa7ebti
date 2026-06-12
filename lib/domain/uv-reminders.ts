import type { UserProfileDraft } from "@/lib/domain/profile";

export type UvReminderPermissionState = "unknown" | "granted-demo" | "denied";

export interface UvReminderSettings {
  preference: UserProfileDraft["uvReminderPreference"];
  permission: UvReminderPermissionState;
  note: string;
}

export function buildUvReminderSettings(
  profile: UserProfileDraft,
  permission: UvReminderPermissionState
): UvReminderSettings {
  return {
    preference: profile.uvReminderPreference,
    permission,
    note: "mvp fel mobile: settings mawjouda, ama mazel ma fama ch notification sahi7a."
  };
}
