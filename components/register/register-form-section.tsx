import type { ReactNode } from "react";

type RegisterFormSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function RegisterFormSection({
  eyebrow,
  title,
  description,
  children,
  defaultOpen = false
}: RegisterFormSectionProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.72] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md"
    >
      <summary className="list-none cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
              {eyebrow}
            </p>
            <h2 className="mt-1.5 font-display text-[1.16rem] leading-none text-espresso">{title}</h2>
            <p className="mt-1.5 text-[0.78rem] leading-5 text-espresso/[0.66]">{description}</p>
          </div>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EEE7] text-terracotta transition-transform duration-200 group-open:rotate-45">
            +
          </span>
        </div>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
