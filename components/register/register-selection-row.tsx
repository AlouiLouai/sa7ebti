import type { RegisterOption } from "@/components/register/register-flow.data";

type RegisterSelectionRowProps = {
  option: RegisterOption;
  selected: boolean;
  onClick: () => void;
};

export function RegisterSelectionRow({
  option,
  selected,
  onClick
}: RegisterSelectionRowProps) {
  const Icon = option.icon;

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
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-white ${
          option.accent ?? "text-terracotta"
        } shadow-[0_10px_22px_rgba(38,37,34,0.08)]`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-[0.96rem] leading-5 text-espresso">{option.title}</h3>
        <p className="text-[0.7rem] leading-4.5 text-espresso/[0.62]">{option.description}</p>
      </div>
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-terracotta bg-terracotta text-white" : "border-espresso/[0.14] text-transparent"
        }`}
      >
        <span className="text-[0.62rem] font-bold">+</span>
      </div>
    </button>
  );
}
