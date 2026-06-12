import { ShieldSunIcon, WarmSunIcon } from "@/components/sa7ebti-icons";
import type { DailyUvCardModel } from "@/lib/domain/daily-advice";

type DailyUvCardProps = {
  data: DailyUvCardModel;
  compact?: boolean;
};

export function DailyUvCard({ data, compact = false }: DailyUvCardProps) {
  return (
    <article className="rounded-[1.6rem] bg-espresso p-4 text-white shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-ochre">
            lyoum m3a sa7ebti
          </p>
          <h2 className="mt-2 font-display text-[1.34rem] leading-[1.02]">{data.title}</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8">
          {data.state === "ready" ? (
            <WarmSunIcon className="h-5 w-5 text-ochre" />
          ) : (
            <ShieldSunIcon className="h-5 w-5 text-ochre" />
          )}
        </div>
      </div>

      <p className={`mt-3 text-white/78 ${compact ? "text-[0.82rem] leading-5" : "text-[0.88rem] leading-6"}`}>
        {data.body}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/92">
          {data.cityLabel}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/92">
          {data.reminderLabel}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.68rem] font-medium text-white/92">
          {data.severityLabel}
        </span>
      </div>
    </article>
  );
}
