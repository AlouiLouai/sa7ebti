import type { DailyAdviceItem } from "@/lib/domain/daily-advice";

type DailyAdviceItemCardProps = {
  item: DailyAdviceItem;
};

export function DailyAdviceItemCard({ item }: DailyAdviceItemCardProps) {
  return (
    <article className={`rounded-[1.2rem] p-3 ${getToneClassName(item.tone)}`}>
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
        {item.moment}
      </p>
      <h3 className="mt-1 font-display text-[1rem] leading-5 text-espresso">{item.title}</h3>
      <p className="mt-1.5 text-[0.78rem] leading-5 text-espresso/[0.68]">{item.body}</p>
    </article>
  );
}

function getToneClassName(tone: DailyAdviceItem["tone"]) {
  switch (tone) {
    case "sun":
      return "bg-[#F5EEE7]";
    case "warn":
      return "bg-[#F6E8E2]";
    default:
      return "bg-[#FAF6F0]";
  }
}
