"use client";

import { useMemo } from "react";
import { buildDailyAdviceModel, resolveActiveProfileDraft } from "@/lib/domain/daily-advice";
import { useScanHistory } from "@/hooks/use-scan-history";
import { useUserProfile } from "@/hooks/use-user-profile";

export function useDailyAdvice() {
  const { isHydrated, profileDraft } = useUserProfile();
  const { records } = useScanHistory();
  const activeProfile = useMemo(
    () => resolveActiveProfileDraft(profileDraft, records),
    [profileDraft, records]
  );
  const dailyAdvice = useMemo(
    () =>
      buildDailyAdviceModel({
        profile: activeProfile,
        recentRecords: records
      }),
    [activeProfile, records]
  );

  return {
    isHydrated,
    activeProfile,
    dailyAdvice,
    recentRecords: records
  };
}
