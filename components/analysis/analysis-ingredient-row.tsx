import type { ReactNode } from "react";

type AnalysisIngredientRowProps = {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  body: string;
};

export function AnalysisIngredientRow({
  icon,
  iconClassName,
  title,
  body
}: AnalysisIngredientRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconClassName}`}>
        {icon}
      </div>
      <div>
        <p className="text-[0.92rem] font-bold leading-5 text-on-surface">{title}</p>
        <p className="text-[0.76rem] leading-5 text-on-surface-variant">{body}</p>
      </div>
    </div>
  );
}
