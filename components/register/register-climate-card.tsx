import type { RegisterOption } from "@/components/register/register-flow.data";

type RegisterClimateCardProps = {
  option: RegisterOption;
  selected: boolean;
  onClick: () => void;
};

export function RegisterClimateCard({
  option,
  selected,
  onClick
}: RegisterClimateCardProps) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[186px] shrink-0 snap-start rounded-[1.2rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#262522] text-white shadow-soft"
          : "border-espresso/[0.08] bg-white/[0.58] text-espresso hover:border-terracotta/40"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          selected ? "bg-white/[0.14] text-ivory" : "bg-[#FAFAED] text-terracotta"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-3 font-display text-[1rem] leading-5">{option.title}</h3>
      <p
        className={`mt-1.5 text-[0.72rem] leading-4.5 ${
          selected ? "text-white/[0.76]" : "text-espresso/[0.62]"
        }`}
      >
        {option.description}
      </p>
    </button>
  );
}
