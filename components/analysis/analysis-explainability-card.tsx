import { ShieldCheckIcon } from "@/components/sa7ebti-icons";
import type { ExplainabilityModel } from "@/lib/domain/explainability";

export function AnalysisExplainabilityCard({ model }: { model: ExplainabilityModel }) {
  return (
    <section className="rounded-[1.2rem] border border-espresso/[0.08] bg-white/[0.82] p-4 shadow-[0_16px_34px_rgba(38,37,34,0.05)]">
      <div className="flex items-center gap-2.5 text-terracotta">
        <ShieldCheckIcon className="h-4 w-4" />
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">3leh hedhi ntiija</p>
          <h3 className="font-display text-[1.12rem] leading-6 text-espresso">{model.title}</h3>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <ExplainabilityBlock title="asbeb el mouhema" items={model.topReasons} fallback={model.condensedSummary} />
        <ExplainabilityBlock
          title="hajet lezem intibeh lhom"
          items={model.cautionReasons}
          fallback="ma fama ch intibeh kbir tawa."
        />
        <ExplainabilityBlock
          title="profil eli ather"
          items={model.affectedProfileFields}
          fallback="profil mawjoud ama details mazel ma tfar3ouch."
        />
      </div>
    </section>
  );
}

function ExplainabilityBlock({
  title,
  items,
  fallback
}: {
  title: string;
  items: string[];
  fallback: string;
}) {
  return (
    <div className="rounded-[1rem] bg-[#FAF6F0] p-3">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-terracotta">{title}</p>
      <div className="mt-2 space-y-1.5">
        {(items.length > 0 ? items : [fallback]).map((item) => (
          <p key={item} className="text-[0.78rem] leading-5 text-espresso/[0.7]">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
