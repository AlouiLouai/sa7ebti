import type { ReactNode } from "react";

type RegisterFormSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function RegisterFormSection({
  eyebrow,
  title,
  description,
  children
}: RegisterFormSectionProps) {
  return (
    <section className="rounded-[1.45rem] border border-espresso/[0.08] bg-white/[0.72] p-3.5 shadow-[0_16px_34px_rgba(38,37,34,0.05)] backdrop-blur-md">
      <div className="mb-3">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-terracotta">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 font-display text-[1.28rem] leading-none text-espresso">{title}</h2>
        <p className="mt-1.5 text-[0.8rem] leading-5 text-espresso/[0.66]">{description}</p>
      </div>
      {children}
    </section>
  );
}
