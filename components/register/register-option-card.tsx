import type { RegisterOption } from "@/components/register/register-flow.data";

type RegisterOptionCardProps = {
  option: RegisterOption;
  selected: boolean;
  onClick: () => void;
};

export function RegisterOptionCard({
  option,
  selected,
  onClick
}: RegisterOptionCardProps) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.1rem] border p-3 text-left transition-all duration-300 ${
        selected
          ? "border-terracotta bg-[#E6CCB2]/[0.38] shadow-[0_16px_30px_rgba(201,122,83,0.1)]"
          : "border-espresso/[0.08] bg-white/50 hover:border-terracotta/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white text-terracotta shadow-[0_10px_20px_rgba(38,37,34,0.06)]">
          <Icon className="h-4 w-4" />
        </div>
        {selected ? (
          <div className="rounded-full bg-sage px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-white">
            match
          </div>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-[0.96rem] leading-5 text-espresso">{option.title}</h3>
      <p className="mt-1 text-[0.7rem] leading-4.5 text-espresso/[0.62]">{option.description}</p>
    </button>
  );
}
