"use client";

import { Sa7ebtiRouteStatus } from "@/components/sa7ebti-route-status";

export default function AnalysisError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Sa7ebtiRouteStatus
      badge="ghalta fel analyse"
      title="resultat l produit ma dhharsh kollo."
      description={error.message || "saret ghalta wa9t li nattla3ou l resultat."}
      tone="error"
      action={
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#C97A53] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white shadow-button transition-opacity hover:opacity-95"
        >
          3awed l analyse
        </button>
      }
    />
  );
}
