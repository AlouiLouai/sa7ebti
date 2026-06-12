export const FEATURE_FLAGS = {
  provenanceBadges: true,
  explainabilityBlocks: true,
  localUvReminderMvp: true,
  rescanSuggestions: true
} as const;

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(flagName: FeatureFlagName) {
  return FEATURE_FLAGS[flagName];
}
