import Link from "next/link";
import type { ReactNode } from "react";
import { FlareIcon, PetalIcon } from "@/components/sa7ebti-icons";

type Sa7ebtiRouteStatusProps = {
  badge: string;
  title: string;
  description: string;
  tone?: "loading" | "error";
  action?: ReactNode;
};

export function Sa7ebtiRouteStatus({
  badge,
  title,
  description,
  tone = "loading",
  action
}: Sa7ebtiRouteStatusProps) {
  const isLoading = tone === "loading";

  return (
    <main className="sa7ebti-jasmine-pattern relative flex min-h-screen items-center overflow-hidden bg-[#FDFBF7] px-4 py-10 text-espresso">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,122,83,0.08),transparent_42%)]" />

      <section className="relative mx-auto w-full max-w-xl rounded-[1.8rem] border border-espresso/[0.08] bg-white/[0.76] p-6 shadow-[0_20px_60px_rgba(38,37,34,0.08)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div className="rounded-full border border-espresso/10 bg-[#FAFAED] p-3 text-terracotta shadow-[0_10px_24px_rgba(38,37,34,0.06)]">
            {isLoading ? (
              <PetalIcon className="h-5 w-5 animate-pulse" />
            ) : (
              <FlareIcon className="h-5 w-5" />
            )}
          </div>

          <Link
            href="/"
            className="rounded-full border border-espresso/[0.08] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-espresso/[0.72] transition-colors hover:bg-[#FAFAED]"
          >
            Dar
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-terracotta">
            {badge}
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-semibold leading-[1.02] text-espresso">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-[0.92rem] leading-6 text-espresso/[0.68]">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <StatusChip label={isLoading ? "tsanna chweya" : "kol chay mazelt stable"} />
          <StatusChip label="style sa7ebti mazel kif kif" />
          <StatusChip label={isLoading ? "dakhel transition sghira" : "tnajjem t3awed"} />
        </div>

        {action ? <div className="mt-6">{action}</div> : null}
      </section>
    </main>
  );
}

function StatusChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-espresso/[0.08] bg-[#FAFAED] px-3 py-1.5 text-[0.68rem] font-medium text-espresso/[0.7]">
      {label}
    </span>
  );
}
