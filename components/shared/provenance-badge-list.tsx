import { buildProvenanceBadgeModel, type DataProvenance } from "@/lib/domain/provenance";

export function ProvenanceBadgeList({
  provenance,
  compact = false
}: {
  provenance: DataProvenance[];
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-3"}`}>
      {provenance.map((item) => {
        const badge = buildProvenanceBadgeModel(item);

        return (
          <span
            key={badge.id}
            title={badge.description}
            className={`rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] ${
              badge.tone === "warm" ? "bg-[#F7EBD8] text-[#8A5A22]" : "bg-[#ECE6DF] text-[#5E544E]"
            }`}
          >
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}
