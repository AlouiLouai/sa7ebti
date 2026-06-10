import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  HeartIcon,
  ImageIcon,
  LightbulbIcon,
  PetalIcon,
  ShieldCheckIcon,
  ShieldSunIcon,
  WarmSunIcon,
  WaterDropIcon,
  LeafIcon
} from "@/components/elyssette-icons";
import { SparkIcon } from "@/components/icons";
import { ElyssetteTopBar } from "@/components/elyssette-shell";
import { Sa7ebtiBottomNav } from "@/components/sa7ebti-bottom-nav";

const topbarAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDbWL_OavFB6ye1fYuyGrJlzftJEf8WcVASQnIIxxnrY8aWjini5Z9uaR-wbOgZP1KRn-TGEh8CLTL4NY2z3vJuzkR25LqYeY9UO_FAuAJnvb1PwaTVwjkP6q1vZqXIvTdenL7-Jdd0VcpGRhI0MmhoeNXPWYgnk4S_7giwLUdisn6s8EDFyMSjfSNFaIxxhqDb8Zi2QFhZhlGh36rf48Z5QiNeqEz5H_pur1IWezPcK8swBC_QHC-Tu0yB8bOTQmyVJadHSDoo0nIH";

const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBi6LtVNR_-Ja9HrOPu_EfNWqdxpsGGNLQi1LDGXa3lCoKkBtxlFdvSx7X0YLPPg6zOrwp-NZlg3f6YUM-l2L_W2ckamKqHSzvEDSY1nUCOqyOh5eXeQFG7CfPdmWgRrrkEYbbFo6mRIWxQLRZejjzmbuSpSqBU1i8wW8bcv1dX2_u0aHtPDu46pOkEETCkmj4j778ZUEwaACM2YLsSbP9ypQglwaP7x6yROIcSUW1obeGTMynraU8qXShkC-bFBsoi7uO4DoPVaFxV";

export function AnalysisSheet() {
  return (
    <div className="overflow-x-hidden bg-surface font-body text-on-surface">
      <ElyssetteTopBar
        leading={
          <Link href="/scan" className="inline-flex items-center justify-center text-primary active:scale-95">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        }
        avatarSrc={topbarAvatar}
      />

      <main className="ely-zellige-pattern mx-auto min-h-screen max-w-2xl px-4 pb-28 pt-20">
        <section className="relative mb-8">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
            <div className="group relative">
              <div className="aspect-square overflow-hidden rounded-[1.4rem] shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  alt="Scanned product"
                  src={productImage}
                  width={768}
                  height={768}
                  priority
                  quality={72}
                  sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-20" />
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="relative mb-2.5 h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary-container" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset="22"
                    className="text-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-[1.8rem] font-bold leading-none tracking-[-0.02em] text-primary">
                    92%
                  </span>
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.1em] text-on-surface-variant">
                    Match
                  </span>
                </div>
              </div>
              <p className="font-display text-[1.15rem] leading-6 text-on-surface">Perfect Compatibility</p>
              <p className="mt-1 text-[0.82rem] text-on-surface-variant">
                Analysis complete for your skin profile.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4">
          <GlassCard>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="mb-1 block text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-primary">
                  Daily UV Forecast
                </span>
                <div className="flex items-center gap-2.5">
                  <WarmSunIcon className="h-4 w-4 text-tertiary" />
                  <span className="font-display text-[1.1rem] leading-6 text-on-surface">UV Index: 8 (High)</span>
                </div>
                <p className="mt-1 text-[0.78rem] text-on-surface-variant">Tunis, Tunisia</p>
              </div>
              <div className="rounded-[0.9rem] bg-tertiary-container/20 p-2.5 text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-tertiary">
                  Sun Safety
                </p>
                <p className="text-[0.78rem] font-bold text-on-surface">Reapply SPF every 2h</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-2.5 flex items-center gap-2.5 text-tertiary">
              <ShieldCheckIcon className="h-4 w-4" />
              <h2 className="font-display text-[1.12rem] leading-6">Why it works for your Oily skin</h2>
            </div>
            <p className="text-[0.84rem] leading-6 text-on-surface-variant">
              This formula leverages ultra-lightweight hydration that won&apos;t clog pores. The
              base pH matches your natural skin barrier, specifically targeting sebum regulation.
              While this serum does not contain SPF, its antioxidant-rich base enhances your
              skin&apos;s resilience against UV-induced oxidative stress, maintaining the luminous
              &quot;Sidi Bou Said&quot; glow.
            </p>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
              Ingredient Analysis
            </h3>
            <div className="space-y-4">
              <IngredientRow
                icon={<WaterDropIcon className="h-5 w-5 text-[#002020]" />}
                iconClassName="bg-tertiary-container"
                title="Hyaluronic Acid"
                body="Deep hydration without oiliness. 100% safe for your profile."
              />
              <IngredientRow
                icon={<LeafIcon className="h-5 w-5 text-[#4c4733]" />}
                iconClassName="bg-secondary-container"
                title="Green Tea Extract"
                body="Anti-inflammatory properties to soothe redness and balance tone."
              />
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-2.5 flex items-center gap-2.5 text-primary">
              <ShieldSunIcon className="h-4 w-4" />
              <h2 className="font-display text-[1.12rem] leading-6">Mediterranean Sun Defense</h2>
            </div>
            <p className="mb-3 text-[0.84rem] leading-6 text-on-surface-variant">
              Under the intense Tunisian sun, we recommend pairing this serum with a mineral-based
              SPF 50. For a traditional cooling ritual, apply a thin layer of jasmine-infused white
              clay (Tfal) in the evening to soothe sun-exposed skin.
            </p>
            <div className="flex items-center gap-2.5 rounded-[0.95rem] bg-secondary-container/30 p-2.5">
              <LightbulbIcon className="h-4 w-4 text-primary" />
              <p className="text-[0.76rem] font-semibold">Pro Tip: Apply serum 15 mins before sunscreen.</p>
            </div>
          </GlassCard>

          <div className="relative overflow-hidden rounded-[1.2rem] bg-primary-container p-4 text-on-primary-container shadow-lg">
            <div className="absolute -right-8 -top-8 rotate-12 opacity-10">
              <PetalIcon className="h-20 w-20" />
            </div>
            <div className="relative z-10">
              <div className="mb-2 flex items-center gap-2">
                <SparkIcon className="h-4 w-4" />
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em]">
                  Tunisian Beauty Tip
                </span>
              </div>
              <p className="mb-1 font-display text-[1.08rem] italic leading-6">&quot;The Jasmine Infusion&quot;</p>
              <p className="text-[0.82rem] italic leading-5 text-on-primary-container/90">
                For enhanced results, apply this serum immediately after a light steam with
                Jasmine-infused water. In our heritage, the warmth of the steam opens the
                &apos;gates of the skin&apos;, allowing the product to penetrate as deeply as the roots
                of an ancient olive tree.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2.5">
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-primary text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-on-primary transition-opacity hover:opacity-90"
          >
            <HeartIcon className="h-4 w-4" />
            Save to Ritual
          </button>
          <Link
            href="/scan"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-primary/20 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-primary/5"
          >
            <ImageIcon className="h-4 w-4" />
            Try Another
          </Link>
        </div>
      </main>

      <Sa7ebtiBottomNav active="analysis" />
    </div>
  );
}

function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.2rem] border border-white/40 p-4 shadow-ambient ely-glass-card">
      <div className="pointer-events-none absolute inset-0 opacity-5 ely-zellige-pattern" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function IngredientRow({
  icon,
  iconClassName,
  title,
  body
}: {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  body: string;
}) {
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
