"use client";

import Link from "next/link";
import { ShieldCheckIcon } from "@/components/sa7ebti-icons";
import { useScanHistory } from "@/hooks/use-scan-history";
import { useUserProfile } from "@/hooks/use-user-profile";
import { sa7ebtiCopy } from "@/lib/copy/sa7ebti-copy";
import { isFeatureEnabled } from "@/lib/feature-flags";
import { buildRescanSuggestions } from "@/lib/domain/rescan-reminders";

export function RescanSuggestionsCard() {
  if (!isFeatureEnabled("rescanSuggestions")) {
    return null;
  }

  const { profileDraft } = useUserProfile();
  const { records, setActiveAnalysisRecordId } = useScanHistory();
  const suggestions = buildRescanSuggestions({
    currentProfile: profileDraft,
    records
  });

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[1.6rem] border border-terracotta/15 bg-[#F6E8E2] p-4">
      <div className="flex items-start gap-2.5 text-terracotta">
        <ShieldCheckIcon className="mt-0.5 h-4 w-4" />
        <div>
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em]">i9tirah rescan</p>
          <h3 className="mt-1 font-display text-[1.12rem] leading-6 text-espresso">
            fama produits lezemhom rescan
          </h3>
        </div>
      </div>

      <div className="mt-3 space-y-2.5">
        {suggestions.slice(0, 3).map((suggestion) => (
          <article key={suggestion.recordId} className="rounded-[1rem] bg-white/85 p-3">
            <p className="font-display text-[0.96rem] text-espresso">{suggestion.productName}</p>
            <p className="mt-1 text-[0.76rem] leading-5 text-espresso/[0.66]">
              {suggestion.reasons.join(", ")}
            </p>
            <Link
              href="/analysis"
              onClick={() => setActiveAnalysisRecordId(suggestion.recordId)}
              className="mt-2 inline-flex rounded-full bg-[#F5EEE7] px-3 py-1 text-[0.68rem] font-semibold text-terracotta"
            >
              {sa7ebtiCopy.cta.viewDetails}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
