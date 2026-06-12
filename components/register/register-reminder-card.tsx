import { ShieldSunIcon } from "@/components/sa7ebti-icons";

type RegisterReminderCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

export function RegisterReminderCard({
  title,
  description,
  selected,
  onClick
}: RegisterReminderCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[1.1rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#E6CCB2]/40 shadow-[0_16px_32px_rgba(201,122,83,0.12)]"
          : "border-espresso/[0.08] bg-white/[0.45] hover:border-terracotta/40"
      }`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_22px_rgba(38,37,34,0.08)]">
        <ShieldSunIcon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-[0.96rem] leading-5 text-espresso">{title}</h3>
        <p className="text-[0.7rem] leading-4.5 text-espresso/[0.62]">{description}</p>
      </div>
      <div
        className={`h-5 w-9 rounded-full border p-0.5 transition-colors ${
          selected ? "border-terracotta bg-terracotta" : "border-espresso/[0.14] bg-[#ECE6DF]"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            selected ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}
